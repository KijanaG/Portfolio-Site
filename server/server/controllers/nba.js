const $ = require('cheerio');
const pptr = require('puppeteer');
const nbaURL = "https://stats.nba.com";
const schedURL = "/schedule/#!?PD=N&Week=";
const playoffURL = "/schedule/#!?Month=7&PD=N";
const weekURL = "/schedule/#!?PD=N&Week=";
const bbrefURL = "https://www.basketball-reference.com/leagues/NBA_2019.html";

const getStats = async (url) => {
    var schedule;
    const browser = await pptr.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(nbaURL + url);
    await page.waitForSelector('div.stats-schedule-page', { timeout: 1800 });
    const body = await page.evaluate(() => {
        return document.querySelector('div.stats-schedule-page div.stats-schedule-page').innerHTML;
    })
    schedule = $('section.schedule-content', body).map((index, data) => {
        const date = $('header h1.schedule-content__date a', data).text();
        const games = $('div.schedule-game__content', data).map((i, game) => {
            const status = $("div.schedule-game__status div span[ng-if='::game.stt != 'PPD'']", game).html();
            const season = $("div.schedule-game__status div span.schedule-game__season", game).html();
            const match = $('tr', game).map((i, info) => {
                let team = $('th.schedule-game__team-name', info).text().trim();
                let score = $('td.schedule-game__team-score', info).text().trim();
                if (score.length === 0)
                    score = null;
                if(season === "Playoffs")
                    return { team: team, score: score }
                else
                    return null;
            }).get();
            if(match.length > 0) {
                return { 'status': status, 'home': match['0'], 'away': match['1'] }
            }
        }).get();
        if(games.length > 0) {
            return { 'date': date, 'games': games };
        }
    }).get();
    await browser.close();
    return { "week": "Playoffs", "data": schedule };
}

module.exports = {
    teamStats: async () => {
        try {
            const browser = await pptr.launch({args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.goto(bbrefURL);
            const tag = "#team-stats-per_game";
            await page.waitForSelector(tag, { timeout: 800 });
            const body = await page.evaluate(() => {
                return document.querySelector("body.bbr").innerHTML;
            })
            var table = $(tag, body).html();
            const teamData = $('tr', table).map((i, data) => {
                let rank = $('th', data).text().trim();
                let team = $('td', data).map((j, stats) => {
                    var obj = {};
                    let stat = $(stats).data()['stat'];
                    if (stat !== "mp" && stat !== "fg" && stat !== "fg3" &&
                        stat !== "fg2" && stat !== "ft" && stat !== "pf") {
                        obj[$(stats).data()['stat']] = $(stats).text();
                        return obj;
                    }
                }).get();
                if (!rank)
                    rank = "N/A"
                team.push({ 'rank': rank });
                if (rank.length < 5)
                    return [team];
            }).get();
            return teamData;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
    playoffStats: async () => {
        var objData;
        try {
            objData = await getStats("/schedule/#!?Month=8&PD=N");
            console.log("Success");
        } catch (e) {
            objData = await getStats("/schedule/#!?Month=8&PD=N");
        }
        return objData;
    },
    callStats: async (i) => {
        var objData;
        try {
            objData = await getStats(i, schedURL);
            console.log("Success with Week: ", i);
        } catch (e) {
            console.log(e);
            objData = this.callStats(i);
        }
        return objData;
    },
    getWeek: async () => {
        try {
            const browser = await pptr.launch({args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.goto(nbaURL + "/schedule/");
            const tag = "div.schedule-content__game-week-header";
            await page.waitForSelector(tag, { timeout: 1800 });
            const body = await page.evaluate(() => {
                return document.querySelector("main.stats-container").innerHTML;
            })
            var week = $(tag, body).text();
            const extraInfo = $(tag + " span", body).text();
            week = week.replace(extraInfo, "").trim();
            console.log("Success");
            return week.split(" ")[1];
        } catch (e) {
            console.log(e);
            return "26";
        }
    },
    updateWeek: async (i) => {
        var objData;
        try {
            objData = await getStats(i, weekURL);
        } catch (e) {
            console.log(e);
            objData = this.updateWeek(i);
        }
        return objData;
    }
}
