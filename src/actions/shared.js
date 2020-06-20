import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { addUserQuestion, addUserQuestionAnswer } from './users';
import { addQuestion, addQuestionAnswer} from './questions';

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions} ) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleAddQuestionAnswer (questionId, selectedOption) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const { authedUser } = getState();

        saveQuestionAnswer({
            authedUser,
            qid: questionId,
            answer: selectedOption
        }).then(() => {
            dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(hideLoading());
        });
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
        .then((question) => {
            dispatch(addUserQuestion(question));
            dispatch(addQuestion(question));
            dispatch(showLoading());
        })
        .then(() => dispatch(hideLoading()))
    }
}