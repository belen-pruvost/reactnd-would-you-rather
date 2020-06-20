import { createSelector } from 'reselect'

const getLoggedUser = state => state.login.loggedInUser.id

const getUsers = state => state.users

const getQuestions = state => state.questions

const getTotalQuestions = createSelector(
  [getQuestions],
  (questions) => {
    return Object.keys(questions).length
  }
)

const getUser = createSelector(
    [getUsers, getLoggedUser],
    (users, loggedUser) => {
      return users[loggedUser]
    }
  )

const getTotalUserAnswers = createSelector(
    [getUser],
    (user) => {
      return Object.keys(user.answers).length
    }
  )

  export const getZeroAnswered = createSelector(
    [getTotalUserAnswers],
    (answers) => {
      return answers === 0
    }
  )


  export const getZeroUnanswered = createSelector(
    [getTotalUserAnswers, getTotalQuestions],
    (answers, questions) => {
      return answers === questions
    }
  )