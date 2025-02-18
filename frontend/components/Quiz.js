import React, { useEffect, useState } from 'react'
import * as actionCreators from '../state/action-creators';
import { connect } from 'react-redux';

function Quiz(props) {
  // const [ disabled, setDisabled ] = useState(true);
  
  useEffect(() => {
    if(!props.quiz){
    props.fetchQuiz();
    }
  }, [])

  const disabled = () => {
    return props.selectedAnswer === null
  }

  // useEffect(() => {
  //   if(props.selectedAnswer !== null){
  //     setDisabled(false)
  //   }
  // }, [props.selectedAnswer])

  const handleSubmit = e => {
    e.preventDefault();

    const answers = document.querySelectorAll('.answer');

    const selectedAnswer = answers[0].classList.contains('selected') 
    ? {quiz_id: props.quiz.quiz_id, answer_id: props.quiz.answers[0].answer_id} 
    : {quiz_id: props.quiz.quiz_id, answer_id: props.quiz.answers[1].answer_id};
    
    props.postAnswer(selectedAnswer);
    props.fetchQuiz();
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

      props.selectAnswer(selectedAnswer);
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>
          
            <div id="quizAnswers">
              <div className="answer1 answer">
                {props.quiz.answers ? props.quiz.answers[0].text : null}
                <button onClick={handleSelection}>
                  {props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className="answer2 answer">
              {props.quiz.answers ? props.quiz.answers[1].text : null}
                <button onClick={handleSelection}>
                {props.selectedAnswer === 1 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled={disabled()} onClick={handleSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz);
