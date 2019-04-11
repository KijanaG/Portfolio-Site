import React from 'react';
import classes from './TwitterBird.css';

const twitterBird = (props) => {

    return (
        <>
            <div className={classes.Icon}>
                <img className={classes.Tweet} src={require('../../../assets/img/twitter.png')} alt={"twitter"} />
            </div>
        </>
    )
}

export default twitterBird;