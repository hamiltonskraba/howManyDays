import React from 'react';
import Particles from 'react-tsparticles';

class Container extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="moon hoverPointer" />
                <h1 className="flex-center title">How Long Since Then?</h1>
                <Particles id="particles-js"
                           params={{
                               "particles": {
                                   "number": {
                                       "value": 128,
                                       "density": {
                                           "enable": false,
                                           "value_area": 1025
                                       }
                                   },
                                   "color": {
                                       "value": "#ffffff"
                                   },
                                   "opacity": {
                                       "value": 0.5,
                                       "random": false,
                                       "anim": {
                                           "enable": false,
                                       }
                                   },
                                   "size": {
                                       "value": 2,
                                       "random": true,
                                       "anim": {
                                           "enable": false,
                                           "speed": 119.88011988011988,
                                           "size_min": 0.1,
                                           "sync": false
                                       }
                                   },
                                   "line_linked": {
                                       "enable": false,
                                   },
                                   "move": {
                                       "enable": true,
                                       "speed": 1,
                                       "direction": "none",
                                       "random": false,
                                       "straight": false,
                                       "out_mode": "out",
                                       "bounce": false,
                                       "attract": {
                                           "enable": false,
                                           "rotateX": 600,
                                           "rotateY": 1200
                                       }
                                   }
                               },
                               "interactivity": {
                                   "events": {
                                       "resize": true
                                   },
                               },
                           }}
                />
            </div>
        );
    }
}

export default Container;
