import React from 'react';
import classes from './Schedule.css';
import NBA from '../../assets/nba/nba.json';

const schedule = (props) => {

    var games = null;
    if (props.week) {
        games = props.games.map((day, i) => {
            return (
                <div key={i}>
                    <h1 className={classes.Date}>{day.date}</h1>
                    <table className={classes.Games}>
                        {day.games.map((game, index) => {
                            return (
                                <tbody key={index} className={classes.GameInfo}>
                                    <tr>
                                        <td className={classes.Team1}>{game.away.team} <img className={classes.IMG} style={{ marginLeft: 15 }} src={NBA[game.away.team]} alt={game.away.team} /></td>
                                        <td className={classes.AT}> &nbsp; @ &nbsp; </td>
                                        <td className={classes.Team2}><img className={classes.IMG} style={{ marginRight: 15 }} src={NBA[game.home.team]} alt={game.home.team} />{game.home.team}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.Team1} style={{ "paddingRight": 50, fontWeight: Number(game.away.score) > Number(game.home.score) ? "bold" : null }}>{game.status[game.status.length - 1] !== "T" ? game.away.score : 0}</td>
                                        <td className={classes.Status}>{game.status}</td>
                                        <td className={classes.Team2} style={{ "paddingLeft": 50, fontWeight: Number(game.home.score) > Number(game.away.score) ? "bold" : null }}>{game.status[game.status.length - 1] !== "T" ? game.home.score : 0}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            )
        })
    }

    let disabledR = null;
    if (props.week === 27)
        disabledR = { disabled: true };
    let disabledL = null;
    if (props.week === 1)
        disabledL = { disabled: true };
    return (
        <div className={classes.Schedule}>
            <button {...disabledL} className={classes.Left} onClick={() => props.getWeek(props.week - 1)}>{"<"} Previous</button>
            <button {...disabledR} className={classes.Right} onClick={() => props.getWeek(props.week + 1)}>Next {">"}</button>
            {props.week ?
                props.week === 27 ?
                    <div style={{ marginTop: 40 }}>
                        <h1 className={classes.Week}>Playoffs</h1>
                    </div> :
                    <div style={{ marginTop: 40 }}>
                        <h1 className={classes.Week}>Week {props.week}</h1>
                    </div> :
                null}
            <div className={classes.Days}>
                {games}
            </div>
        </div>
    )
}

export default schedule;