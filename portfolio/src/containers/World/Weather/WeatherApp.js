import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherComponent from '../../../components/Weather/WeatherComponent/WeatherComponent';
import axios from 'axios';
import classes from './WeatherApp.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Switch from '@material-ui/core/Switch';
import Modal from '../../../components/UI/Modal/Modal';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

var locationOut = null;
var cityOut = null;
var weatherOut = null;
var checkInterval = null;

class WeatherApp extends Component {
    state = {
        weatherData: false,
        locationData: false,
        anyLocationData: false,
        checked: true,
        timer: false,
        getCurrent: false,
        showButton: true,
        input: "",
        loading: false,
        anyLocationLoading: false
    }

    componentDidMount() {
        weatherOut = setTimeout(() => {
            this.setState({ weatherData: true })
        }, 2200)
        checkInterval = setInterval(() => {
            var checked = this.state.timer;
            this.setState({ timer: !checked })
        }, 45000)
    }

    componentWillUnmount() {
        clearTimeout(locationOut);
        clearTimeout(cityOut);
        clearTimeout(weatherOut);
        clearInterval(checkInterval);
    }

    changeSwitchHandler = () => {
        let bool = this.state.checked;
        this.setState({ checked: !bool });
    }

    getLocationHandler = () => {
        this.props.onLocationHandler();
        this.setState({ loading: true });
        locationOut = setTimeout(() => {
            this.changeModal();
            let boolButton = this.state.showButton;
            this.setState({ locationData: true, loading: false, showButton: !boolButton })
        }, 2000);
    }

    getInput = (e) => {
        if (e.key === "Enter")
            this.searchInputCity();
    }
    searchInputCity = () => {
        this.props.onAnyLocationHandler(this.state.input);
        this.setState({ anyLocationLoading: true });
        cityOut = setTimeout(() => {
            this.setState({ anyLocationData: true, anyLocationLoading: false });
        }, 1900)
    }

    updateStateHandler = (e) => {
        this.setState({ input: e.target.value });
    }

    changeModal = () => {
        var getBool = this.state.getCurrent;
        this.setState({ getCurrent: !getBool });
    }


    render() {
        let weather;
        if (!this.state.weatherData)
            weather = <Spinner />;
        else {
            weather = this.props.worldData.map(city => {
                return <WeatherComponent
                    metric={this.state.checked}
                    key={Object.keys(city)[0]}
                    data={city[Object.keys(city)[0]]} />;
            })
        }
        let component = null;
        if (this.state.locationData && !this.props.locationError) {
            component = (
                <WeatherComponent
                    GMTPlus={this.props.currentGMT}
                    current={this.props.currentTime}
                    metric={this.state.checked}
                    key={Object.keys(this.props.currentLocation)[0]}
                    data={this.props.currentLocation[Object.keys(this.props.currentLocation)[0]]} />
            );
        }
        let otherComponent = null;
        if (this.state.anyLocationLoading)
            otherComponent = <Spinner />;
        else {
            if (this.state.anyLocationData && !this.props.anyError) {
                otherComponent = (
                    <WeatherComponent
                        GMTPlus={this.props.anyGMT}
                        current={this.props.anyTime}
                        metric={this.state.checked}
                        key={Object.keys(this.props.anyLocation)[0]}
                        data={this.props.anyLocation[Object.keys(this.props.anyLocation)[0]]} />
                );
            }
        }

        let modal = (
            <Modal show={this.state.getCurrent} modalClosed={() => this.changeModal()}>
                <h1>Get Weather Data for <span>your</span> current location</h1>
                <button className={classes.ModalPrompt}
                    onClick={() => this.getLocationHandler()}> Yes </button>
                <button className={[classes.ModalPrompt, classes.Deny].join(' ')}
                    onClick={() => this.changeModal()}> No </button>
            </Modal>
        );
        if (this.state.loading)
            modal = (
                <Modal show={this.state.getCurrent} modalClosed={() => this.changeModal()}>
                    <Spinner />
                </Modal>
            );

        var btnStyle = "";
        if (!this.state.checked) btnStyle = classes.USA;
        let inputStyle = { backgroundImage: 'url(' + require('../../../assets/img/search.png') + ')' }
        let goStyle = {
            all: "none", width: "60px", height: "30px", borderRadius: "10px", position: "relative",
            top: "0px", background: "#317FE5", textDecoration: "none", display: "inline-block",
            color: "white", cursor: "pointer", textAlign: "center", fontWeight: "bold"
        }

        return (
            <div className={classes.WeatherCards}>
                {modal}
                <h1 style={{ fontFamily: "Georgia", letterSpacing: "0.2em", fontWeight: "bold" }}> OpenWeatherMap API </h1>
                <Switch
                    checked={this.state.checked}
                    color="default"
                    icon={
                        <img className={classes.Both} onClick={() => this.changeSwitchHandler()}
                            src={require('../../../assets/img/US.png')} alt="US" />}
                    checkedIcon={
                        <img className={classes.Both} onClick={() => this.changeSwitchHandler()}
                            src={require('../../../assets/img/globe.png')} alt="International" />}
                />
                {this.state.showButton ?
                    <button
                        className={[classes.FAB, btnStyle].join(' ')}
                        onClick={() => this.changeModal()}></button> : null}
                <hr />
                {weather}
                {component}
                {otherComponent}
                <hr />
                <h1
                    style={{
                        fontFamily: "Georgia",
                        letterSpacing: "0.2em",
                        fontWeight: "bold",
                        marginTop: "15px"
                    }}
                >| Check Another City |</h1>
                <input
                    type="text"
                    placeholder="Rancho Santa Margarita, California"
                    style={inputStyle}
                    onKeyPress={this.getInput}
                    value={this.state.input}
                    onChange={(e) => this.updateStateHandler(e)} />
                <button onClick={this.searchInputCity} style={goStyle}>Search</button>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        worldData: state.worldData.weatherData,
        currentLocation: state.worldData.currentLocation,
        currentTime: state.worldData.currentTime,
        currentGMT: state.worldData.currentGMT,
        locationError: state.worldData.locationError,
        anyLocation: state.worldData.anyLocation,
        anyTime: state.worldData.anyTime,
        anyGMT: state.worldData.anyGMT,
        anyError: state.worldData.anyError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLocationHandler: () => dispatch(actions.getLocationData()),
        onAnyLocationHandler: (city) => dispatch(actions.getAnyLocationData(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WeatherApp, axios));