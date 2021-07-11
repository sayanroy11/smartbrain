import React from 'react';
import './FaceRecognition.css';
const FaceRecognition =({imageurl,box})=>{
	return(
		<div className='center ma'>
		<div className='absolute mt2'>
		<img  id='inputimage' className='pb3' alt='' src={imageurl} width='400px' height='auto'/>
		<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
		</div>
		</div>
		);
}
export default FaceRecognition;