import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";
import Navigation from "./componenets/Navigation/Navigation.js";
import FaceDetection from "./componenets/FaceDetection/FaceDetection.js";
import Signin from "./componenets/Signin/Signin.js";
import Register from "./componenets/Register/Register.js";
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
      imageurl: "",
      box: {},
      route: 'Signin',
      isSignedIn: false
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - clarifaiFace.right_col * width,
      bottomrow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({
      box: box
    });
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  onButtonSubmit = () => {
    this.setState({
      imageurl: this.state.input
    });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageurl, route, box } = this.state;
    return (<div className="App">
      <Particles className="particles"
        params={
          particleOptions
        }
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home'
        ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceDetection box={box} imageurl={imageurl} />
        </div>
        : (
          route === 'Signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />

        )
      }

    </div>
    );
  }
}

export default App;