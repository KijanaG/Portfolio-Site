import React from 'react';
import { NavLink } from 'react-router-dom';
import Radium from 'radium';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <>
            <NavLink
                className={classes.NavItem} 
                style={props.style}
                to={props.link}
                exact={props.exact}
                onClick={() => props.changePhoto(props.num)}
                activeClassName={classes.active}>{props.children}</NavLink>
        </>
    );
}

export default Radium(navigationItem);