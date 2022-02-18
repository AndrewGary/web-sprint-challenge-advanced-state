import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const [disabled, setDisabled] = useState(true);

  console.log('sldkfjaljka props: ', props)

  useEffect(() => {
    if(props.form.newFalseAnswer && props.form.newQuestion && newTrueAnswer){
      setDisabled(false);
    }
  }, [props.form])

  const onChange = e => {
    props.inputChange(e.target.id, e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input name='newQuestion' maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input name='trueAnswer' maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input name='falseAnswer' maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button disabled={disabled} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
