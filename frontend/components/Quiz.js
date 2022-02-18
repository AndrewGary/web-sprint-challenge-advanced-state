import React, { useEffect } from 'react'
import * as actionCreators from '../state/action-creators';
import { connect } from 'react-redux';

function Quiz(props) {

  useEffect(() => {
    console.log('inside of useEffect');
    props.fetchQuiz();
  }, [])

  const handleSelection = e => {

    const answers = document.querySelectorAll('.answer');

    console.log('answers: ', answers);
    console.log('propssss: ', props);

    if(answers[0].classList.contains('selected')){
      props.selectAnswer(0);
    }
    if(answers[1].classList.contains('selected')){
      props.selectAnswer(1);
    }
    // console.log('proooooooooo: ', props);
    // if(e.target.parentElement.classList.contains('selected')){

    // }else{
    //   const answers = document.querySelectorAll('.answer')
    //   for(let i = 0; i < answers.length; i++){
    //     if(answers[i].classList.contains('selected')){
    //       answers[i].classList.remove('selected');
    //     }else{
    //       answers[i].classList.add('selected');
    //     }
    //   }
    // }

    // if(answers[0].classList.contains('selected')){
    //   props.selectAnswer(0)
    // }
    // if(answers[1].classList.contains('selected')){
    //   props.selectAnswer(1);
    // }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button onClick={handleSelection}>
                  {props.selectedAnswer && props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className="answer">
                An elephant
                <button onClick={handleSelection}>
                {props.selectedAnswer && props.selectedAnswer === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz);
