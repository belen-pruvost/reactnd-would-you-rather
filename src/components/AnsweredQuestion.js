import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatQuestion } from '../utils/helpers'
import { handleAddQuestionAnswer } from '../actions/shared';

class AnsweredQuestion extends Component {
    state = {
        selected: '',
        submitted: false
    };

    handleSubmit(e, questionId) {
        e.preventDefault();

        const { dispatch } = this.props;
        const { selected } = this.state;

        dispatch(handleAddQuestionAnswer(questionId, selected));

        this.setState(() => ({
            selected: '',
            submitted: true
        }));
    }

    handleChange = (e) => {
        const value = e.target.value;

        this.setState(() => ({
            selected: value
        }));
    };

    render() {
        const { question, authedUser } = this.props

        if (question === null) {
            return <div className='no-question'>
                <p>This Question doesn't exist</p>
            </div>
        }

        const {
            name, avatar, timestamp, optionOne, optionTwo
        } = question

        const optionOneVotes = optionOne.votes.length
        const optionTwoVotes = optionTwo.votes.length

        const totalVotes = optionOneVotes + optionTwoVotes;

        const authedUserAnswer = optionOne.votes.includes(authedUser.id) ? "optionOne" : "optionTwo";

        let optionOneWidth = Math.round((optionOneVotes / totalVotes) * 100);
        let optionTwoWidth = Math.round((optionTwoVotes / totalVotes) * 100);

        return (
            <div className='leaders'>
                <div className='question'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <div className='header'>{name} asked {formatDate(timestamp)}</div>
                        <div className='results-header'>Results:</div>
                        <div className={`card results 
                        ${(authedUserAnswer === 'optionOne')
                                ? "answer"
                                : ""}`}>
                            Would you rather {question.optionOne.text}?
                            <div className="progress m-progress--sm">
                                <div className="progress-bar m--bg-success"
                                    style={{ width: optionOneWidth + '%' }}
                                ></div>
                            </div>
                            <div>
                                <span>
                                    {optionOneVotes} out of {totalVotes} votes. ({optionOneWidth}%)
                                </span>
                            </div>

                        </div>
                        <div className={`card results 
                        ${(authedUserAnswer === 'optionTwo')
                                ? "answer"
                                : ""}`}>
                            Would you rather {question.optionTwo.text}?
                            <div className="progress m-progress--sm">
                                <div className="progress-bar m--bg-success"
                                    style={{ width: optionTwoWidth + '%' }}
                                ></div>
                            </div>
                            <div>
                                <span>
                                    {optionTwoVotes} out of {totalVotes} votes. ({optionTwoWidth}%)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ login, questions, users }, props) {
    const { id } = props.match.params

    const question = questions[id]

    return {
        question: question
            ? formatQuestion(question, users[question.author], login.loggedInUser.id)
            : null,
        authedUser: login.loggedInUser.id
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)