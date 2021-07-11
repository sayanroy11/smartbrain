import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.gif';
const Logo =()=>{
	return(
		<div className='center ma4 mt0'>
		<Tilt className="Tilt" options={{max:25}} style={{height:150,width:150}}>
		<div className="Tilt-inner">
		<img style={{border:'1px solid black',cursor:'grab'}} src={brain} alt='brain'/>
		</div>
		</Tilt>
		</div>
		);
}
export default Logo;