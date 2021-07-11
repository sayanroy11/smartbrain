import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';



const particleSettings={
                particles: {
                  number: {
                    value:50,
                    density:{
                      enable:true,
                      value_area:600
                    }
                  }
                }
              }

const initialstate={
      input:'',
      imageurl:'',
      box:{},
      route:'signin',
      issignin:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }

}              
class App extends Component{
  constructor(){
    super();
    this.state= initialstate;     
    }
  loaduser =(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }
    })
  }

   calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onbtnSubmit = () => {
    this.setState({imageurl: this.state.input});
      fetch('https://ancient-harbor-94121.herokuapp.com//imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
    
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ancient-harbor-94121.herokuapp.com//image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  onrouteChange=(route)=>{
    if(route==='signout')
      this.setState(initialstate)
    else if(route==='home'){
      this.setState({issignin:true})
    }
    this.setState({route:route});
  }
      
  render(){
    const{issignin,imageurl,route,box}=this.state;
   return (
    <div className="App">
    <Particles className='particles'
              params={particleSettings}
            />
      <Navigation issignin={issignin} onrouteChange={this.onrouteChange}/>
      {
        route==='home'?
        <div>
        <Logo />
        <Rank 
        name={this.state.user.name} 
        entries={this.state.user.entries}
        />
        <ImageLinkForm
        onInputChange={this.onInputChange} 
        onbtnSubmit={this.onbtnSubmit}
        />
        <FaceRecognition
        box={box}
        imageurl={imageurl}
        />
        </div>
        :(
          route=== 'signin'?
          <Signin loaduser={this.loaduser} onrouteChange={this.onrouteChange}/>
          :
          <Register loaduser={this.loaduser} onrouteChange={this.onrouteChange}/>
          )
      }
    </div>
  );
}
}

export default App;
