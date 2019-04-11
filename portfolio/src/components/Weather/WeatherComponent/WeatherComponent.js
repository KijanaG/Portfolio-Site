import React from 'react';
import classes from './WeatherComponent.css';
import weatherPhoto from '../../../assets/weatherObject/weatherID.json';

const weatherComponent = (props) => {
    const isMetric = props.metric;
    /* Extracting data for windspeed, weather description, 
        matching weather icon, city name & temperature provided
        by openweathermap.org weather API JSON data */
    //Get Current Time in City
    const getTime = () => {
        var now = new Date();
        var hours = now.getUTCHours();
        if (props.current) {
            if (props.current < 0) {
                hours += 24;
                hours += props.current;
            } else {
                hours += props.current;
            }
            hours = hours % 24;
        }
        var minutes = now.getUTCMinutes();
        if ((hours - Math.floor(hours)) > 0) {
            minutes += (hours - Math.floor(hours)) * 60;
            if(minutes > 60) {
                hours = Math.floor(hours) + 1;
                minutes = minutes % 60;
            }
        }
        if (hours === 24) hours = 0;
        if ((minutes.toString()).length === 1) minutes = "0" + minutes;
        if(props.data.name === "London")
            hours = (hours + 1) % 24;
        else if (props.data.name === "Barcelona")
            hours = (hours + 2) % 24;
        else if (props.data.name === "Sydney")
            hours = (hours + 10) % 24;
        else if (props.data.name === "Tokyo")
            hours = (hours + 9) % 24;
        else if (props.data.name === "Seattle")
            hours = (hours + 17) % 24;
        var time;
        let ampm = "AM";
        const nonMilitary = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        if (!isMetric) {
            if (hours > 11 && hours < 24) {
                hours = nonMilitary[hours];
                ampm = "PM";
            }
            if (hours === 0) hours = 12;
            time = hours + ":" + minutes + " " + ampm;
        } else {
            time = hours + ":" + minutes;
        }
        return time;
    }
    var time = getTime();
    //Get Time of Day for Sunset/Sunrise UI info
    let daytime;

    const ts = Math.round((new Date()).getTime() / 1000);
    if ((ts > props.data.sys.sunrise && ts < props.data.sys.sunset)
        || (ts > props.data.sys.sunrise + 86400 && ts < props.data.sys.sunset + 86400)
        || (ts < props.data.sys.sunset - 86400 && ts > props.data.sys.sunrise - 86400))
        daytime = true;
    else
        daytime = false;

    //Get Current Temperature of City
    let temperature = Math.round(props.data.main.temp - 273.15);
    if (!isMetric) temperature = Math.round((temperature * (9 / 5)) + 32);

    //Get Wind Speed Data 
    let wind = props.data.wind.speed.toFixed(1);
    if (!isMetric) wind = (props.data.wind.speed * 2.23694).toFixed(1);
    //Get Current Weather Status for UI
    let weather = props.data.weather;
    let num = weather[0]['id'];
    var place = 0;
    for (var i = 0; i < weather.length; i++) {
        if (weather[i]['id'] < num) {
            place = i;
            num = weather[i]['id'];
        }
    }
    let weatherIcon = "";
    let clouds = false;
    let numID = num.toString();
    if (numID[0] === "2" ||
        numID[0] === "3" ||
        numID[0] === "6" ||
        numID[0] === "7") {
        weatherIcon = weatherPhoto[numID[0]];
        clouds = true;
    }
    else if (numID[0] === "5") {
        weatherIcon = weatherPhoto["5"][numID[1]];
        clouds = true;
    } else {
        if (numID[1] === "2" ||
            numID[1] === "3" ||
            numID[1] === "4") {
            weatherIcon = weatherPhoto["8"][numID[1]];
            clouds = true;
        }
        else if (numID[1] === "0") {
            if (daytime) weatherIcon = weatherPhoto["8"]["0"]["d"];
            else weatherIcon = weatherPhoto["8"]["0"]["n"];
        } else {
            if (daytime) weatherIcon = weatherPhoto["8"]["1"]["d"];
            else weatherIcon = weatherPhoto["8"]["1"]["n"];
        }
    }
    //Display Weather Description
    let des = "";
    let container = "";
    if (weather.length === 1) {
        des = weather[0]['description'];
    }
    else if (weather.length === 2) {
        des = weather[0]['description'] + " & " + weather[1]['description'];
    }
    else {
        des = weather[place]['description'];
    }
    if (des.includes('rain')) {
        let list = [8, 23, 36, 47, 59, 77, 90, 107, 122, 144];
        container = list.map(num => {
            return <div key={num} className={classes.drop} style={{ right: num + "px", animationDelay: num % 0.4 + "s", height: num % 9 + 23 + "px" }}></div>
        })
    }
    //Add styles to Weather Cards
    var style = [classes.WeatherCard];
    let cloudAnimation = [classes.cloud, classes.cloud1];
    let cloudContainer = null;
    if (daytime) {
        if (clouds) {
            style.push(classes.DayTimeOverCast);
            cloudContainer = cloudAnimation.map(cloud => {
                return <div key={cloud} className={cloud}></div>
            })
        }
        else
            style.push(classes.DayTime);
    } else {
        if (clouds) {
            style.push(classes.NightOverCast);
            cloudContainer = cloudAnimation.map(cloud => {
                return <div key={cloud} className={cloud}></div>
            })
        }
        else
            style.push(classes.NightTime);
    }

    return (
        <div className={style.join(' ')}>
            <div className={classes.FlipWeatherCard} >
                <div className={classes.WeatherCardFront} >
                    {container}
                    {cloudContainer}
                    {props.data.name.length < 11 ? <h1>{props.data.name}</h1> : <h1 className={classes.LongName}>{props.data.name}</h1>}
                    <img className={classes.IMG} src={require('../../../assets/img/' + weatherIcon + '.png')} alt='thunder' />
                    {des.length <= 16 ? <h3>{des}</h3> : (des.length >= 40 ? <h6>{des}</h6> : <h5>{des}</h5>)}
                    <h2>{temperature}<span style={{ textDecoration: "none" }}>˚</span></h2>
                    <h4>{wind}{isMetric ? " m/s" : " mph"}</h4>
                </div>
                <div className={classes.WeatherCardBack}>
                    <h1>{time}</h1>
                </div>
            </div>
        </div>
    );
}

export default weatherComponent;