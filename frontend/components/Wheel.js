import React, { useEffect } from 'react'
import * as actionCreators from '../state/action-creators'
import {connect} from 'react-redux'

function Wheel(props) {
  console.log('wheel props: ', props);

  const handleClockwiseChange = () => {
    const wheelArray = document.querySelectorAll('.cog');

    for(let i = 0; i < wheelArray.length; i++){
      if(wheelArray[i].classList.contains('active')){
        wheelArray[i].classList.remove('active');
      }
      if(i === props.wheel){
        wheelArray[i].classList.add('active');
      }
    }
  }
  
  // useEffect(() => {
    //   wheelArray.map(item => {
      //     if(item.classList.contains('active')){
        //       return item.classList.remove('active')
        //     }else{
          //       return item
          //     }
          //   })
          
          // }, [props.wheel])
          
          
          //helper function, returns value of currently active div (0-5)
    const current = () => {
      const wheelArray = document.querySelectorAll('.cog');
      let returnValue = null;

    for(let i = 0; i < wheelArray.length; i++){
      if(wheelArray[i].classList.contains('active')){
        returnValue = i;
      }
    }
    return returnValue;
  }

  const handleClockwiseClick = () => {
    props.moveClockwise(current());
  }

  const handleCounterClockwiseClick = () => {
    props.moveCounterClockwise(current());
  }

  useEffect(() => {
    handleClockwiseChange();
  },[props.wheel])
  
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className='cog active' style={{ "--i": 0 }}>{props.wheel === 0 ? 'B' : ''}</div>
        <div className="cog" style={{ "--i": 1 }}>{props.wheel === 1 ? 'B' : ''}</div>
        <div className="cog" style={{ "--i": 2 }}>{props.wheel === 2 ? 'B' : ''}</div>
        <div className="cog" style={{ "--i": 3 }}>{props.wheel === 3 ? 'B' : ''}</div>
        <div className="cog" style={{ "--i": 4 }}>{props.wheel === 4 ? 'B' : ''}</div>
        <div className="cog" style={{ "--i": 5 }}>{props.wheel === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={handleCounterClockwiseClick}id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockwiseClick} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

export default connect(state => state, actionCreators)(Wheel);
