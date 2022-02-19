import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(currentlyActive) {
  return({type: types.MOVE_CLOCKWISE, payload: currentlyActive})
}

export function moveCounterClockwise(currentlyActive) {
  return({type: types.MOVE_COUNTERCLOCKWISE, payload: currentlyActive})
}

export function selectAnswer(whichAnswer) {
  return({type: types.SET_SELECTED_ANSWER, payload: whichAnswer})
}

export function setMessage(newMessage) {
  return({type: types.SET_INFO_MESSAGE, payload: newMessage})
}

export function setQuiz(newQuiz) {
  return({type: types.SET_QUIZ_INTO_STATE, payload: newQuiz})
}

export function inputChange(targetName, value) {
  return({type: types.INPUT_CHANGE, payload: { targetName: targetName, value: value}})
}

export function resetForm() {
  return({type: types.RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios.get('http://localhost:9000/api/quiz/next')
    .then(resp => {
      dispatch(setQuiz(resp.data))
    })
    .catch(error => {
      console.log(error);
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}

export function postAnswer(answerObject) {
  return function (dispatch) {

    console.log('answerObject: ', answerObject);

    axios.post('http://localhost:9000/api/quiz/answer', answerObject)
    .then(resp => {
      dispatch({type: types.SET_SELECTED_ANSWER, payload: null})
      dispatch({type: types.SET_INFO_MESSAGE, payload: resp.data.message})
      fetchQuiz();
    })
    .catch(error => {
      console.log(error);
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {

    axios.post('http://localhost:9000/api/quiz/new', newQuiz)
    .then(resp => {
      console.log('postQuiz resp: ', resp);
      dispatch(setMessage(`Congrats: "${resp.data.question}" is a great question!`))
      dispatch(resetForm());
    })
    .catch(error => {
      console.log(error);
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
