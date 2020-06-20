import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render() {
        const { question, questionsToShow } = this.props

        if (question === null) {
            return <div className='no-question'>
                <p>This Question doesn't exist</p>
            </div>
        }

        const {
            name, avatar, timestamp, optionOne, optionTwo, id, hasVoted
        } = question

        if (questionsToShow === 'answered' && hasVoted !== true) {
            return false;
        } else if (questionsToShow === 'unanswered' && hasVoted === true) {
            return false;
        }

        let link = '';

        if (questionsToShow === 'answered') {
            link = `/question/${id}/results`;
        } else if (questionsToShow === 'unanswered') {
            link = `/question/${id}`;
        }

        return (
            <Link to={link} className='question'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <div>
                        <div>{name} asked {formatDate(timestamp)}</div>
                        <h3>Would you rather...</h3>
                        <p><b>{optionOne.text} </b>
                            or
                        <b> {optionTwo.text}</b>
                            ?</p>
                        <button
                            className='btn submittable'>
                            View Poll
                        </button>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({ login, users, questions }, { id, questionsToShow }) {
    const question = questions[id]

    const authedUser = login.loggedInUser.id

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        questionsToShow
    }
}

export default withRouter(connect(mapStateToProps)(Question))