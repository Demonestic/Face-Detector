import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";
import Navigation from "./componenets/Navigation/Navigation.js";
import FaceDetection from "./componenets/FaceDetection/FaceDetection.js";
import Logo from "./componenets/Logo/Logo.js";
import ImageLinkForm from "./componenets/ImageLinkForm/ImageLinkForm.js";
import Rank from "./componenets/Rank/Rank.js";

//this is my own api key pls don't use it
//you can get your own key for free on https://clarifai.com
//when you subscribe you automatically get your own key at https://clarifai.com/developer/account/applications
//for more information you can contact them or just read their documentation
const app = new Clarifai.App({
  apiKey: "0e7f6573441f4a4b9e76171cb6736083"
});

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enabled: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageurl: ""
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageurl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },

      function(err) {
        // there was an error
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetection imageurl={this.state.imageurl} />
      </div>
    );
  }
}

export default App;
