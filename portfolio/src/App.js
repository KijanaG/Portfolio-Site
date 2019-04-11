import React, { Component } from 'react';
import TabBar from './components/Navigation/NavigationItems/NavigationItems';
import classes from './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { connect } from 'react-redux';
import { getNBAWeek, changePhoto } from './store/actions/index';
import DUNK from './assets/img/dunk.mov';

import Bio from './containers/Bio/Bio';
import World from './containers/World/World';

const asyncBasketball = asyncComponent(() => {
  return import('./containers/Basketball/Basketball');
})

// const asyncWorld = asyncComponent(() => {
//   return import('./containers/World/World');
// })

// const asyncGames = asyncComponent(() => {
//   return import('./containers/Games/Games');
// })

class App extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.props.NBAWeek();
  }

  changePictureHandler = (key) => {
    if (key === 1) {
      this.props.changePhoto("code.png");
    } else if (key === 3) {
      this.props.changePhoto("montana.jpg");
    } else {
      this.props.changePhoto("bball");
    }
  }

  // changeVideo = () => {
  //   this.props.changePhoto("dunk.jpg");
  // }

  handleScroll = () => {
    console.log(window.scrollY);
  }

  render() {
    let style = {textAlign: "center"};
    if (this.props.backgroundImage !== "bball") {
      style = {
        backgroundImage: 'url(' + require('./assets/img/' + this.props.backgroundImage) + ')',
        opacity: '0.89'
      }
    }

    let routes = (
      <Switch>
        <Route path="/bball" component={asyncBasketball} />
        <Route path="/globe" component={World} />
        {/* <Route path="/games" component={asyncGames} /> */}
        <Route path="/" exact component={Bio} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className={classes.App}>
        <div
          className={classes.Parallax}
          style={style}>
          {this.props.backgroundImage === "bball" ?
          <video id="background-video" loop muted controls autoPlay>
            <source src={DUNK} />
          </video>
          : null}
          {this.props.backgroundImage === "montana.jpg" ?
            <h1 className={classes.Phase}>
              <span className={classes.spanPhase}>Oh </span>
              <span className={classes.spanPhase}>The </span>
              <span className={classes.spanPhase}>Places </span>
              <span className={classes.spanPhase}>You'll </span>
              <span className={classes.spanPhase}>Go </span>
              <span className={classes.spanPhase}>.</span>
              <span className={classes.spanPhase}>.</span>
              <span className={classes.spanPhase}>.</span>
            </h1>
            : null}
        </div>
        <TabBar changePhoto={this.changePictureHandler} />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    backgroundImage: state.worldData.backgroundImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    NBAWeek: () => dispatch(getNBAWeek()),
    changePhoto: (photo) => dispatch(changePhoto(photo))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
