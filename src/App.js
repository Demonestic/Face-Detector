import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./componenets/Navigation/Navigation.js";
import Logo from "./componenets/Logo/Logo.js";
import ImageLinkForm from "./componenets/ImageLinkForm/ImageLinkForm.js";
import Rank from "./componenets/Rank/Rank.js";

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
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecDetection />} */}
      </div>
    );
  }
}

export default App;
