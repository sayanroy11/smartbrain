import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm =({onInputChange,onbtnSubmit})=>{
	return(
		<div className='ma3 mt0'>
		<p className='f3'>
		{'This Magic Brain Detects Faces. Give it a try!'}
		</p>
		<div className='center'>
		<div className='form center pa4 br3 shadow-5'>
		<input className='f4 pa2 w-80 center' placeholder='enter url' type='text' onChange={onInputChange}/>
		<button className='ba grow f5 link ph3 pv2 dib white bg-light-purple'
		onClick={onbtnSubmit}
		>Detect</button>
		</div>
		</div>
		</div>
		);
}
export default ImageLinkForm;