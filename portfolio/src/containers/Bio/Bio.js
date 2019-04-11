import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePhoto } from '../../store/actions/index';
import ME from '../../assets/img/me.jpg';
import classes from './Bio.css';
import Coverflow from 'react-coverflow';
import Youtube from 'react-youtube';
import BigData from '../../assets/img/bigdata.jpg';
import Data from '../../assets/img/data.jpg';
import Baba from '../../assets/img/baba.jpg';
import Tech from '../../assets/img/tech.jpg';
import Doll from '../../assets/img/doll.jpg';
import Yao from '../../assets/img/yao.jpg';
import Tour from '../../assets/img/tour.jpg';
import MA from '../../assets/img/ma.jpg';
import Intro from '../../assets/img/intro.jpg';
import List from '../../assets/img/list.jpg';
import Form from '../../assets/img/form.jpg';
import Items from '../../assets/img/items.jpg';
import Login from '../../assets/img/login.jpg';
import Admin from '../../assets/img/admin.jpg';
import TLogin from '../../assets/img/tlogin.jpg';
import Listening from '../../assets/img/listening.jpg';
import Sabor from '../../assets/img/sabo.jpg';
import Instructions from '../../assets/img/instructions.jpg';
import Song2 from '../../assets/img/song2.jpg';
import Song3 from '../../assets/img/song3.jpg';

class Bio extends Component {
    _onReady(event) {
        event.target.pauseVideo();
    }

    componentWillMount() {
        if (this.props.backgroundImage !== "code.png") {
            this.props.changePhoto("code.png")
        }
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1
            }
        };
        return (
            <div className={classes.Main}>
                <h1 style={{ fontSize: "280%", letterSpacing: "0.2em" }}>Who Am I?</h1>
                <img className={classes.ME} src={ME} alt="KJ Garrett" />
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; Greetings, I'm Kijana 'KJ' Garrett. I'm both a pragmatist and an idealist. Both a self-starter
                                and a dreamer. Both a student and an athlete. I was born in London, England but was raised in Manhattan Beach, CA.
                                I'm the product of a chill & sunny suburban beach town, but grew up as world-traveller with a yearning for
                                wanderlust and a humble acceptance for the world's cultures. I grew up with the ambitions to play professional basketball
                                and continued these ambitions my first two years of college competing at the highest collegiate level at the University of Washington (UW), in Seattle. Throughout that period,
                                quite a lot changed and my development as an individual led me down another path. I ended up transferring to Tufts University in Boston to
                                further pursue my education at an elite East Coast Liberal Arts school. I'm currently finishing school with a focus in Economics and Computer Science and
                                have ambitions to join the tech industry, as the innovation there is too exciting to be <span style={{ fontStyle: "italic", textDecoration: "none", fontWeight: "bold" }}>sidelined</span> from.</h4>
                <h1>Why Tech?</h1>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; When I attended the UW, the basketball team & I were very fortunate to have been invited to play in the inaugural
                    PAC-12 China Game, in Novemeber of 2015, where the PAC-12 athletic conference aimed to expand its media reach to viewers and fans outside of the US. Both teams, UW and the University of Texas Austin
                    had the opportunity to tour the Alibaba Headquarters and learn about what the executives were trying to achieve from a global business perspective. One of the most profound moments for me
                    was listening to a lecture by a few of the executives at Alibaba explain how much they value, and how they approach, Big Data Analytics to gain insights from their business through a statistical lens.
                    The talk specifically had to do with their Ecommerce business but they touched on subsidiaries, like <span style={{ fontStyle: "italic", textDecoration: "none", fontWeight: "bold" }}>Taobao</span> and
                    <span style={{ fontStyle: "italic", textDecoration: "none", fontWeight: "bold" }}> Alipay</span> as well.
                </h4>
                <Coverflow width="500" height="450" displayQuantityOfSide={2} navigation={false} enableScroll={true}
                    clickable={true} active={3} currentFigureScale={2.0} otherFigureScale={0.8} enableHeading={true} >
                    <div tabIndex="0" role="menuitem">
                        <img src={Baba} alt='Alibaba' style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div role="menuitem" tabIndex="1">
                        <img src={BigData} alt='Lecture' style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="2" role="menuitem">
                        <img src={Tech} alt="Technology" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <img src={MA} alt="Meeting Jack Ma" style={{ display: 'block', width: '100%' }} />
                    <div tabIndex="4" role="menuitem">
                        <img src={Data} alt='Big Data Insights' style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="5" role="menuitem">
                        <img src={Doll} alt="NYSE IPO Doll" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <img src={Yao} alt="Meeting Yao Ming" style={{ display: 'block', width: '100%' }} />
                    <img src={Tour} alt="Tour with Bill Walton" style={{ display: 'block', width: '100%' }} />
                </Coverflow>
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    <Youtube videoId="XMlFla0UWmU" opts={opts} onReady={this._onReady} />
                </div>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; The following year, as I relocated to begin a new journey
                    at Tufts, I met an old colleague for dinner, who was previously the head of basketball analytics (and is in one of the above photos) at the UW. He had transferred jobs
                    and was now amazingly the head of innovation and analytics for the six-time championed Golden State Warriors. He told me about the data that they had been gathering
                    with everything from on-body sensors to cameras staged around the arena. This data was being analyzed by leveraging cloud technology and by gathering specific insights
                    from the trends in the data and through the metrics that they were targeting. I was astonished to learn about how a field like sports can benefit from these futuristic
                    technologies. </h4>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; My curiosity didn't stop there and led me to ideas for applications
                both mobile and web-based that I wanted to share with the world. I began to see more and more how technology is shaping the world and thought of nothing more exciting than
                to contribute to the innovation myself and find ways to add value to the field. <br /><br /> &nbsp; &nbsp;So this past summer of 2018 I decided to attend a 3-month intensive program for web development.
                    For 10-12 hours a day for 14 weeks, I practiced building websites through learning the web fundamentals (HTML, CSS & JavaScript), learning OOP, algorithm & data structure
                knowledge in JavaScript, Python & Java and implementing these languages through various frameworks & libraries – Django, Flask, MEAN & Spring. </h4>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; Since I had transferred schools and the graduation requirements were different
                at UW and Tufts, I had to stay one more semester to finish the various culture and economics requirements to finish my degree. But after the summer, I was so excited from the
                new skills that I had learned, I decided to stay another year and minor in Computer Science. This year I have learned Data Structures using C++, the mathematical Logic and Algorithms
                that going into computer science and System Architecture with the C & Assembly. Along with this web application, I have built and deployed two mobile apps using various technologies.</h4>
                <h1>What I've Built</h1>
                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                    <h2 className={classes.Apps}>Coffee Cart</h2>
                </div>
                <Coverflow width="500" height="450" displayQuantityOfSide={2} navigation={false} enableScroll={true}
                    clickable={true} active={0} currentFigureScale={1.2} otherFigureScale={0.8} enableHeading={true} >
                    <div tabIndex="0" role="menuitem">
                        <img src={Login} alt="Form" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="1" role="menuitem">
                        <img src={Intro} alt="Intro" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="2" role="menuitem">
                        <img src={List} alt="Intro" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="3" role="menuitem">
                        <img src={Form} alt="Form" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="4" role="menuitem">
                        <img src={Items} alt="Form" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="5" role="menuitem">
                        <img src={Admin} alt="Form" style={{ display: 'block', width: '100%' }} />
                    </div>
                </Coverflow>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; I was grateful to receive the opportunity to build a mobile application for
                    the special needs department of Bainbridge High School in Seattle, WA. The heads of the department are piloting a program – Coffee Cart – where special needs students build point-of-sale
                    system skills by taking teachers' orders for coffee or tea, preparing and then delivering the orders. The app was built using React Native, Redux and NoSQL Google FireBase as the
                    database. It is a CRUD app, where a password prompted screen allows access to an admin portal, where the items (Coffee, Tea, Milk, Sugar, etc.) can be created, deleted and updated. <br /><br />
                    &nbsp; &nbsp; In order to design the app to be versatile and scale, I allowed the administrators to create and item with as many add-ons as they'd like instead of hardcoding the items in from the
                    developer side. After a student creates an order for a teacher, a signature is prompted for the teacher to sign in order to emulate a true transaction. Colors also play a big role
                    in that they uniquely correspond to a an item and each instance of an order of that item. Excitingly enough, the project is ongoing and I will be helping the department build future
                    implementations of the application! </h4>
                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                    <h2 className={classes.Apps}>Toane</h2>
                </div>
                <Coverflow width="500" height="450" displayQuantityOfSide={2} navigation={false} enableScroll={true}
                    clickable={true} active={0} currentFigureScale={1.2} otherFigureScale={0.8} enableHeading={true} >
                    <div tabIndex="0" role="menuitem">
                        <img src={TLogin} alt="Toane Login" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="1" role="menuitem">
                        <img src={Listening} alt="Toane Listen" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="2" role="menuitem">
                        <img src={Sabor} alt="Song1" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="3" role="menuitem">
                        <img src={Instructions} alt="Instructions" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="4" role="menuitem">
                        <img src={Song2} alt="Song2" style={{ display: 'block', width: '100%' }} />
                    </div>
                    <div tabIndex="5" role="menuitem">
                        <img src={Song3} alt="Song3" style={{ display: 'block', width: '100%' }} />
                    </div>
                </Coverflow>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; A friend of mine who participated in a Hackathon at Tufts in 2017 had the
                idea to build an application that listened to the conversation in a room, discover mood of the room and play music based on the tone of the room. The project was too long
                to embark on in 24 hours with a group of 5 engineers, but their concept and code got them second place in the eent. With my freshly acquired mobile app development skills,
                I decided to recreate the app from scratch. My version of the application leverages the Spotify SDK and Google Sentiment Analysis along with a few React Native and Python APIs
                in order to complete the task. <br /><br /> &nbsp; &nbsp; A user signs in with their Spotify Premium account, and the app uses the native features of the iPhone to listen to the conversation.
                    It then parses the text and sends it to a Flask server hosted on AWS Elastic BeanStalk. The Python REST API instantiates a User object based on the username in the request body and either
                    gathers the current user's data (stored as a JSON object using Python file system) or creates a new user based off of a template. It then sends the formatted text to Google's NLP
                    Sentiment Analysis API and returns a given numerical score (positive, negative or neutral)and an emotional magnitude. The score is then used to return a list of songs that correspond to the
                user's preferences. A user can rate the given song/genre and the server will update their preferences for a given mood. <br /><br /> &nbsp; &nbsp; The server uses OOP principles to create Genre Nodes
                    with a grouping of very similar genres that will be used to request songs from Spotify. Each user has a randomized priority queue of genre nodes (11 in total) and three variations
                    of the list for each of the three aforementioned moods. The mood initially starts on neutral, but as speech is analyzed and mood changes, the server orders the client to alert the user
                    who can decide to keep the mood or change the mood. If changed, the mood-specified list of genre nodes will return a group of genres based on probability and fetch corresponding songs
                    from Spotify. An arrays of URIs are sent to the client, where React Native's Spotify API allows the app to play the songs and continue to match the tone of the room. Toane continues to listen
                    to the conversation and decides if the mood should be changed every 50 seconds. The React Native Spotify library and the React Native Navigation (v1) API are currently not stable together
                    in production, but work well in iOS simulator on XCode. A future version of the app will aim to take care of the bug that deals with the req/res cycle of the client-side APIs.
                </h4>
                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                    <h2 className={classes.Apps}>KJGarrett.com</h2>
                </div>
                <h4 style={{ fontWeight: "bold", margin: "45px", textAlign: "justify", lineHeight: 2 }}> &nbsp; &nbsp; The goal behind this site is to show who I am and a little bit of what
                I'm passionate about. It's a utility site for me to see what is going on around the world and in the NBA, as well as share my story and showcase a few of my skills. The theme
                represents data visualization in a few of its many forms. <br /><br /> &nbsp; &nbsp; For example the weather application in the world tab takes raw UTC data from the OpenWeatherMap API and transforms it
                    into a readable and user-friendly format for both 12-hour and 24-hour clocks. Similarly both the metric system (& Celsius) and the imperial system (& Fahrenheit) are represented
                    through algorithms that display the data in a binary manner. Furthermore, in order to get your current location data and any location's data through the search, Google Maps'
                Geolocation & Timezone APIs were used respectively. <br /><br /> &nbsp; &nbsp; Below the weather app, you can find a map from the Mapbox SDK that displays Twitter icons in the
                    lat & long coordinates of each weather component in the above section. By clicking on these you can discover the top Twitter trends in that given area and further find a live
                    feed of tweets discussing each topic by clicking on the trend. Since the Twitter API leverages OAuth, client-side http requests are not allowed, therefore, the twitter data is
                    rendered on a Node.js server hosted on an AWS EC2 instance. The APIs use the latitude & longitude data stored on the web client to respond with location-based trends and tweets.
                <br /><br /> &nbsp; &nbsp; The basketball page was an exciting, yet challenging endeavor. It required me to inspect the HTML code on NBA.com and Basketball-Reference.com and find the
                    html tags and classes that corresponded to the data that I wanted to represent on my site. Since these webpages are dynamic, and use client-side JavaScript to load the data, the
                    statistics and schedule information that I wanted could not be scraped with a normal web crawler. Therefore, I had to use Google Chrome's Puppeteer, which creates a Headless
                    Chrome instance that can wait for JavaScript to render page data before extracting the HTML. This data is then recursively parsed on the Node server and the filtered data is
                    streamed to AWS DynamoDB NoSQL database to be stored until called upon by the browser. The NBA Leaderboards section can further be sorted on the server with an awesome line of JS:
                <span style={{ textDecoration: "none", fontFamily: "Courier New", fontWeight: "bold" }}> Items.sort((a, b) => (b['L'].find(obj => Object.keys(obj)[0] === cat)[cat] - a['L'].find(obj =>
                Object.keys(obj)[0] === cat)[cat]));</span> that employs three native JS methods to sort a nested list of nested objects, where <span style={{ textDecoration: "none", fontFamily: "Courier New", fontWeight: "bold" }}> L </span>
                    is an array and <span style={{ textDecoration: "none", fontFamily: "Courier New", fontWeight: "bold" }}> cat </span> is each category. <br /><br /> &nbsp; &nbsp; I used React.js
                    to build the site, which is hosted in an AWS S3 bucket, because I really enjoy building in React and because of the principles it embodies. The CS principles of polymorphism,
                    abstraction and modularity are all utilized when building React components. React's versatility with respect to both mobile & web drew me towards the framework and allows me to
                    continue to learn about backend server-side languages, integrating new APIs, tooling with databases and more while maintaing the same CS principles that I learn to embody each and
                every day. Future versions of this website will include a study tab, where I will be able to quiz myself with notecards on things like Spanish Vocabulary! </h4>
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
        changePhoto: (photo) => dispatch(changePhoto(photo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bio);