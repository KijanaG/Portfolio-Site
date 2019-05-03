import React from 'react';
import classes from './Stats.css';
import $ from '../../assets/nba/nba.json';
import { Table } from 'react-bootstrap';
const stats = (props) => {

    var stats = null;
    if (props.stats) {
        stats = (
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        {$.Headers.map((title, i) => {
                            return <td className={classes.Hover} onClick={() => props.getStats(title, i)} style={{ fontWeight: "bold", cursor: title !== "Team" && title !== "Games" ? "pointer" : null }} key={i}>{title}</td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.stats.map(($, j) => {
                        return (
                            <tr key={j}>
                                {$.L.map((stat, i) => {
                                    return <td style={{ fontWeight: props.orderBy === i || j === 30 || i === 0 ? "bold" : null }} key={i}>{stat[Object.keys(stat)[0]]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
    return (
        <div className={classes.Stat}>
            {stats}
        </div>
    )
}

export default stats;