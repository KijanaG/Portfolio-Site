import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from './Basketball.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NBASchedule from '../../components/Schedule/Schedule';
import { Table } from 'react-bootstrap';
import $ from '../../assets/nba/nba.json'
import URL from '../../assets/APIKeys/WeatherAPI.json';

class Basketball extends PureComponent {
    state = {
        week: null,
        games: [],
        stats: null,
        orderBy: null
    }

    getWeek = (week) => {
        if (week < 1 || week > 26) return;
        axios({
            url: '/api/NBA/games',
            method: 'GET',
            baseURL: URL.prod,
            params: { week: week }
        }).then(res => {
            let $ = res.data.weeks[0];
            this.setState({ week: $.weekId, games: $.M });
        })
        this.props.setWeek(week)
    }
    getStats = (cat, i) => {
        if (cat === "Games") return;
        else if (cat === "Team") return;
        else if (cat === "Rank") cat = null;
        else if (cat && cat[2] === "%") {
            cat = cat.substr(0, 2);
            cat += "_pct";
        }
        if (cat && cat[0] === "2") {
            cat = cat.substr(2, cat.length);
            cat = "fg2" + cat;
        } else if (cat && cat[0] === "3") {
            cat = cat.substr(2, cat.length);
            cat = "fg3" + cat;
        }
        if (cat)
            cat = cat.toLowerCase();
        axios({
            url: '/api/NBA/stats',
            method: 'GET',
            baseURL: URL.prod,
            params: { category: cat }
        }).then(res => {
            let avg = res.data.stats.find(obj => obj[Object.keys(obj)[0]] === "League Average");
            let index = res.data.stats.indexOf(avg);
            let league_avg = res.data.stats.splice(index, 1);
            let arr = res.data.stats.concat(league_avg);
            this.setState({ stats: arr, orderBy: i });
        })
    }


    componentWillMount() {
        this.getStats(null, 18);
        this.getWeek(this.props.week);
        if(this.props.backgroundImage !== "bball") {
            this.props.changePhoto("bball");
        }
    }

    render() {
        let schedule = <Spinner />;
        if (this.state.week)
            schedule = <NBASchedule week={Number(this.state.week)} games={this.state.games} getWeek={this.getWeek} />;
        var stats = null;
        if (this.state.stats) {
            //stats = <NBAStats stats={this.state.stats} orderBy={this.state.orderBy} getStats={this.getStats} />;
            stats = (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            {$.Headers.map((title, i) => {
                                return <td onClick={() => this.getStats(title, i)} style={{ fontWeight: "bold", cursor: title !== "Team" && title !== "Games" ? "pointer" : null }} key={i}>{title}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stats.map(($, j) => {
                            return (
                                <tr key={j}>
                                    {$.L.map((stat, i) => {
                                        return <td style={{ fontWeight: this.state.orderBy === i || j === 30 || i === 0 ? "bold" : null }} key={i}>{stat[Object.keys(stat)[0]]}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }
        return (
            <div className={classes.BBall}>
                <h1>NBA Schedule</h1>
                <h4>Data <span style={{fontStyle: "italic", textDecoration: "none"}}>Scraped</span> From NBA.com</h4>
                {schedule}
                <h1>NBA Leaderboards</h1>
                <h4>Data <span style={{fontStyle: "italic", textDecoration: "none"}}>Scraped</span> From Basketball-References.com</h4>
                <h6>Click to sort by stat:</h6>
                {stats}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        week: state.nbaData.week,
        backgroundImage: state.worldData.backgroundImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWeek: (week) => dispatch(actions.setWeek(week)),
        changePhoto: (photo) => dispatch(actions.changePhoto(photo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basketball);