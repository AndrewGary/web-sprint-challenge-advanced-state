import React, { useEffect, useState } from 'react'
import * as actionCreators from '../state/action-creators';
import { connect } from 'react-redux';

function Quiz(props) {

  const [ disabled, setDisabled ] = useState(true);
  
  useEffect(() => {
    props.fetchQuiz();
  }, [])

  useEffect(() => {
    // props.selectedAnswer ? setDisabled('false'): setDisabled('true')
    console.log('this block should fire everytime You change selected answer')
    if(props.selectedAnswer !== null){
      setDisabled(false)
    }
    
    // if(disabled === true){
    //   setDisabled(false);
    // }
  }, [props.selectedAnswer])

  const handleSubmit = () => {
    console.log("props: ", props);
  }

  const handleSelection = e => {
    const answers = document.querySelectorAll('.answer');

    const selectedAnswer = e.target.parentElement.classList.contains('answer1') ? 0 : 1;
    
    if(!answers[selectedAnswer].classList.contains('selected')){
      for(let i = 0; i < answers.length; i++){
        if(answers[i].classList.contains('selected')){
          answers[i].classList.remove('selected');
        }
      }

      answers[selectedAnswer].classList.add('selected');

      console.log('about to call props.selectAnswer(selectedAnswer): ', selectedAnswer)
      props.selectAnswer(selectedAnswer);
    }
    console.log('selectedAnswer: ', selectedAnswer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer1 answer">
                A function
                <button onClick={handleSelection}>
                  {console.log('props.selectedAnswer: ', props.selectedAnswer)}
                  {props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className="answer2 answer">
                An elephant
                <button onClick={handleSelection}>
                {props.selectedAnswer === 1 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled={disabled} onClick={handleSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz);
