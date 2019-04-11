import React, { Component } from 'react';
import classes from './WorldMap.css';
import MapGL, { Marker } from "react-map-gl";
import { connect } from 'react-redux';
import Bird from '../../../components/UI/TwitterBird/TwitterBird';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import APIKeys from '../../../assets/APIKeys/WeatherAPI.json';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

var zoomOut = null;

class WorldMap extends Component {

    state = {
        viewport: {
            latitude: 37.7577,
            longitude: -50.4376,
            zoom: 1.8,
            bearing: 0,
            width: "100",
            height: 500,
            pitch: 15
        },
        trends: "",
        twitterData: [],
        lat: "",
        long: "",
        tweetData: [],
        cannotFind: false,
        loading: false
    }

    componentDidMount() {
        zoomOut = setTimeout(() => {
            let viewport = this.state.viewport;
            viewport.zoom = 1.6;
            this.setState({ viewport: viewport });
        }, 3000)
    }

    componentWillUnmount() {
        clearTimeout(zoomOut);
    }

    getTweets = (lat, long, name) => {
        let title = "Current Trends in " + name;
        this.setState({ trends: title, lat: lat, long: long });
        axios({
            url: '/api/getTrends',
            method: 'POST',
            baseURL: APIKeys.prod,
            data: {
                lat: lat,
                long: long
            }
        })
            .then(res => {
                this.setState({ twitterData: res.data, tweetData: [] });
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    listTweetTrend = (name) => {
        this.setState({ loading: true, tweetData: [] });
        axios({
            url: '/api/getTweets',
            method: 'POST',
            baseURL: APIKeys.prod,
            data: {
                name: name,
                lat: this.state.lat,
                long: this.state.long
            }
        })
            .then(res => {
                let tweetData = [];
                for (var obj of res.data)
                    tweetData.push(obj['id_str']);
                if (tweetData.length === 0)
                    this.setState({ tweetData: [], cannotFind: true, loading: false })
                else
                    this.setState({ tweetData: tweetData, cannotFind: false, loading: false });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let markers = null;
        if (this.props.weatherData.length > 0) {
            markers = this.props.weatherData.map(city => {
                return (
                    <div key={Object.keys(city)[0]}
                        className={classes.Nav}
                        onClick={() => {
                            this.getTweets(
                                city[Object.keys(city)[0]].coord.lat,
                                city[Object.keys(city)[0]].coord.lon,
                                Object.keys(city)[0])
                        }}>
                        <Marker
                            longitude={city[Object.keys(city)[0]].coord.lon}
                            latitude={city[Object.keys(city)[0]].coord.lat}>
                            <Bird />
                        </Marker>
                    </div>
                );
            })
        }
        let currentMarker = null;
        if (this.props.currentLocation) {
            let currLocation = this.props.currentLocation;
            currentMarker = (
                <div key={Object.keys(currLocation)[0]}
                    className={classes.Nav}
                    onClick={() => {
                        this.getTweets(
                            currLocation[Object.keys(currLocation)[0]].coord.lat,
                            currLocation[Object.keys(currLocation)[0]].coord.lon,
                            Object.keys(currLocation)[0])
                    }}>
                    <Marker
                        longitude={currLocation[Object.keys(currLocation)[0]].coord.lon}
                        latitude={currLocation[Object.keys(currLocation)[0]].coord.lat}>
                        <Bird />
                    </Marker>
                </div>
            )
        }
        let anyMarker = null;
        if (this.props.anyLocation) {
            let anyLocation = this.props.anyLocation;
            anyMarker = (
                <div key={Object.keys(anyLocation)[0]}
                    className={classes.Nav}
                    onClick={() => {
                        this.getTweets(
                            anyLocation[Object.keys(anyLocation)[0]].coord.lat,
                            anyLocation[Object.keys(anyLocation)[0]].coord.lon,
                            Object.keys(anyLocation)[0])
                    }}>
                    <Marker
                        longitude={anyLocation[Object.keys(anyLocation)[0]].coord.lon}
                        latitude={anyLocation[Object.keys(anyLocation)[0]].coord.lat}>
                        <Bird />
                    </Marker>
                </div>
            )
        }
        let showPopUp = null;
        if (this.state.twitterData.length > 0) {
            showPopUp = { display: "block" }
        }
        let showTwitterFeed = null;
        if (this.state.tweetData.length > 0) {
            showTwitterFeed = { display: "block", height: "600px" }
        } else if (this.state.cannotFind || this.state.loading) {
            showTwitterFeed = { display: "block", height: "200px" }
        }
        let tweets = null;
        if (this.state.loading) {
            tweets = <Spinner />;
        } else if (this.state.tweetData.length > 0) {
            tweets = this.state.tweetData.map(id => {
                return <TwitterTweetEmbed className={classes.Embed} key={id} tweetId={id} />
            })
        } else if (this.state.cannotFind) {
            tweets = <h1>Sorry! Cannot find tweets for this trend.</h1>
        }
        return (
            <div style={{ padding: "20px auto 40px auto" }}>
            <div style={{textAlign: "center"}}>
            <h1 style={{ fontFamily: "Georgia", letterSpacing: "0.2em", fontWeight: "bold", fontSize:24, marginTop:10 }}> Twitter Trends & Feeds By Location </h1>
            </div>
                <div className={classes.PopUp} style={showPopUp}>
                    <h2 className={classes.Trends}>{this.state.trends}</h2>
                    <hr />
                    <div className={classes.TweetTrends}>
                        {this.state.twitterData.length > 0 ? this.state.twitterData.map(tweet => {
                            return (
                                <div key={tweet.url} onClick={() => this.listTweetTrend(tweet.name)}>
                                    <h5 className={classes.Trend}>{tweet.name}</h5>&nbsp;&nbsp;
                                    <img
                                        onClick={() => window.open(tweet.url, "_blank")}
                                        src={require('../../../assets/img/twitter.png')}
                                        alt="twitter"
                                        style={{ width: "20px", height: "20px", display: "inline-block" }}
                                    />
                                    <hr />
                                </div>
                            );
                        }, this) : null}
                    </div>
                </div>
                <div className={classes.Tweets} style={showTwitterFeed}>{tweets}</div>
                <MapGL
                    {...this.state.viewport}
                    mapStyle="mapbox://styles/kjgarrett/cjqt7xa890dlq2qpiyd9iflkb"
                    mapboxApiAccessToken={APIKeys.MapGL}
                    onViewportChange={(viewport) => this.setState({ viewport })}>
                    <div>
                        {markers}
                        {currentMarker}
                        {anyMarker}
                    </div>
                </MapGL>
                <br />
                <br />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        weatherData: state.worldData.weatherData,
        currentLocation: state.worldData.currentLocation,
        anyLocation: state.worldData.anyLocation
    }
}

export default connect(mapStateToProps)(withErrorHandler(WorldMap, axios));