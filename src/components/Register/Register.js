import React from 'react';
class Register extends React.Component{
    constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      name:''
    }
  }

  onnamechange=(event)=>{
    this.setState({name:event.target.value})
  }
  onemailchange=(event)=>{
    this.setState({email:event.target.value})
  }
  onpsdchange=(event)=>{
    this.setState({password:event.target.value})
  }
  onsubmitsignin=()=>{
    fetch('https://ancient-harbor-94121.herokuapp.com/register',{
      method:'post',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        name:this.state.name
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if(user.id){
        this.props.loaduser(user);
        this.props.onrouteChange('home');
      }
    })
    
  }
  render(){
  return(
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
<main className="pa4 black-80">
  <form className="measure">
    <fieldset id="register" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"  
        id="name"
        onChange={this.onnamechange}/>
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address" 
        id="email-address"
        onChange={this.onemailchange}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password" 
        id="password"
        onChange={this.onpsdchange}/>
      </div>
    </fieldset>
    <div className="">
      <p onClick={this.onsubmitsignin} className="bw1 ph3 pv2 input-reset b--solid black bg-transparent grow pointer f6 dib" type="submit">Register</p>
   </div>
  </form>
</main>
</article>
)};
}
  export default Register;