import React from 'react'
import * as actionCreators from '../state/action-creators';
import { connect } from 'react-redux';

function Message(props) {
  return <div id="message">Nice job!</div>
}


export default connect(state => state, actionCreators)(Message);
