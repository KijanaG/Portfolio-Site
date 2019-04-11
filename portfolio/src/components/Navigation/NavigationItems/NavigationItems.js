import React from 'react';
import classes from './NavigationItems.css';
import Radium from 'radium';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let aboutMe = {
        backgroundImage: 'url(' + require('../../../assets/img/biography.jpg') + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ':hover': {
            opacity:'0.6'
        }
    }
    let basketball = {
        ...aboutMe,
        backgroundImage: 'url(' + require('../../../assets/img/venice.jpg') + ')'
    }
    let worldImage = {
        ...aboutMe,
        backgroundImage: 'url(' + require('../../../assets/img/soccer.jpg') + ')'
    }
    // let games = {
    //     ...worldImage,
    //     backgroundImage: 'url(' + require('../../../assets/img/games.jpg') + ')'
    // }

    return (
        <>
            <div className={classes.NavBar}>
                <NavigationItem exact link="/" style={aboutMe} changePhoto={props.changePhoto} num={1} className={classes.NavItem} key="1" >Biography</NavigationItem>
                <NavigationItem link="/bball" style={basketball} changePhoto={props.changePhoto} num={2} className={classes.NavItem} key="2" >Basketball</NavigationItem>
                <NavigationItem link="/globe" style={worldImage} changePhoto={props.changePhoto} num={3} className={classes.NavItem} key="3" >Our World</NavigationItem>
                {/* <NavigationItem link="/games" style={games} className={classes.NavItem} key="4" >Games</NavigationItem> */}
            </div>
        </>
    );
}

export default Radium(navigationItems);