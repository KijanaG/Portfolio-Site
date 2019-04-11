const Twitter = require('twitter');
const NBA = require('./nba');
const AWS = require('aws-sdk');
const config = require('../config/config');
const isDev = process.env.NODE_ENV === 'production';

const AccessToken = config.TwitterToken;
var client = new Twitter({
    consumer_key: config.TwitterKey,
    consumer_secret: config.TwitterSecret,
    bearer_token: AccessToken
});
const TwelveHours = 43200000;

module.exports = {
    getTrends: function (req, res) {
        var params = {
            lat: req.body.lat,
            long: req.body.long
        }
        client.get(config.URL + "trends/closest.json", params, (err, tweets, response) => {
            if (err) {
                console.log("[ERR] ", err);
                res.send(err);
            } else {
                var woeid = tweets[0].woeid;
                client.get(config.URL + "trends/place.json?id=" + woeid, (err, tweets, response) => {
                    if (err) {
                        console.log(err);
                        res.send(err)
                    } else {
                        res.send(tweets[0]["trends"]);
                    }
                })
            }
        })
    },
    getTweets: function (req, res) {
        var params = {
            q: req.body.name,
            geocode: req.body.lat + "," + req.body.long + ",30mi",
            result_type: "recent",
            count: 100
        }
        client.get(config.URL + "search/tweets.json", params, (err, tweets, response) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(tweets.statuses);
            }
        });
    },
    getWeek: async function (req, res) {
        res.send(await NBA.getWeek());
    },
    uploadWeek: async function (req, res) {
        var { week, data } = await NBA.callStats(req.query.week);
        putItemAWS(week, data, res);
    },
    getGames: async function (req, res) {
        const weekId = req.query.week;
        if (isDev) {
            AWS.config.update(config.aws_local_config);
        } else {
            AWS.config.update(config.aws_remote_config);
        }
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: config.aws_table_week,
            KeyConditionExpression: 'weekId = :i',
            ExpressionAttributeValues: {
                ":i": weekId
            }
        };
        docClient.query(params, (err, data) => {
            if (err) {
                res.send({
                    success: false,
                    message: "Error:", err
                });
            } else {
                const { Items } = data;
                res.send({
                    success: true,
                    weeks: Items
                });
            }
        });
    },
    updateWeek: async function (req, res) {
        var { week, data } = await NBA.updateWeek(req.query.week);
        updateItemAWS(week, data, res);
    },
    postTeamStats: async function (req, res) {
        var data = await NBA.teamStats();
        if(!data) {
            res.send({success: false, message :"Error, no data available"});
            return;
        }
        if(isDev) {
            AWS.config.update(config.aws_local_config);
        } else {
            AWS.config.update(config.aws_remote_config);
        }
        const docClient = new AWS.DynamoDB.DocumentClient();

        for(var i=0; i< data.length;i++) {
            let params = {
                TableName: config.aws_table_stat,
                Key: {
                    team: data[i][0].team_name
                },
                UpdateExpression: "set L = :l",
                ExpressionAttributeValues: {
                    ":l": data[i]
                },
                ReturnValues: "UPDATED_NEW"
            };
            docClient.update(params, (err, data) => {
                if (err) {
                    console.log("Error:", err);
                    res.send({
                        success: false,
                        message: "Error: ", err
                    });
                    return;
                }
            });
        }
        res.send({
            success: true,
            message: "Loaded Week"
        });
        setTimeout(() => {
            this.getTeamStats();
        }, /* Every */ TwelveHours)
    },
    getTeamStats: async function (req, res) {
        var cat;
        if(req.query.category)
            cat = req.query.category;
        else
            cat = "rank";
        if(isDev) {
            AWS.config.update(config.aws_local_config);
        } else {
            AWS.config.update(config.aws_remote_config);
        }
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: config.aws_table_stat
        };
        docClient.scan(params, (err, data) => {
            if(err) {
                res.send({
                    success: false,
                    message: "Error: Server error", err
                })
            } else {
                const { Items } = data;
                if(cat === "rank")
                    Items.sort((a, b) => (a['L'][a['L'].length-1][cat] - b['L'][b['L'].length-1][cat]));
                else {
                    Items.sort((a, b) => (b['L'].find(obj => Object.keys(obj)[0] === cat)[cat] - a['L'].find(obj => Object.keys(obj)[0] === cat)[cat]));
                }
                res.send({
                    success: true,
                    message: "Loaded Stats",
                    stats: Items
                });
            }
        })
    }
}

const updateItemAWS = async (week, data, res) => {
    if (isDev) {
        AWS.config.update(config.aws_local_config);
    } else {
        AWS.config.update(config.aws_remote_config);
    }
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.aws_table_week,
        Key: {
            weekId: week
        },
        UpdateExpression: "set M = :m",
        ExpressionAttributeValues: {
            ":m": data
        },
        ReturnValues: "UPDATED_NEW"
    };
    if(Object.entries(data).length === 0) {
        res.send({success: false, message: "Obj not laoded"});
        return;
    }
    docClient.update(params, (err, data) => {
        if (err) {
            console.log("Error:", err);
            res.send({
                success: false,
                message: "Error: ", err
            });
        } else {
            console.log("Success");
            res.send({
                success: true,
                message: "Loaded Week",
                data: data
            });
        }
    });
}

const putItemAWS = async (week, data, res) => {
    if (isDev) {
        AWS.config.update(config.aws_local_config);
    } else {
        AWS.config.update(config.aws_remote_config);
    }
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.aws_table_week,
        Item: {
            weekId: week,
            Games: "Week" + week,
            "M": data
        }
    };
    if(Object.entries(data).length === 0) {
        res.send({success: false, message: "Obj not laoded"});
        return;
    }
    docClient.put(params, (err, data) => {
        if (err) {
            console.log("Error:", err);
            res.send({
                success: false,
                message: "Error: ", err
            });
        } else {
            console.log("Success");
            res.send({
                success: true,
                message: "Loaded Week",
            });
        }
    });
}
