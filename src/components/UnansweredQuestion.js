import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { formatDate, formatQuestion } from '../utils/helpers'
import { handleAddQuestionAnswer } from '../actions/shared';

class UnansweredQuestion extends Component {
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
        const { question } = this.props

        if (question === null) {
            return <div className='no-question'>
                <p>This Question doesn't exist</p>
            </div>
        }

        const {
            name, avatar, timestamp, optionOne, optionTwo, id
        } = question

        const { selected, submitted } = this.state;

        const link = `/question/${id}/results`;

        if (submitted === true) {
            return <Redirect to={link} />;
        }

        return (
            <div className='leaders'>
                <div className='question'>
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <form onSubmit={(e) => this.handleSubmit(e, id)}>
                            <div>
                                <div className='header'>{name} asked {formatDate(timestamp)}</div>
                                <h3>Would you rather...?</h3>
                                <div className='options'>
                                    <input type="radio"
                                        id="optionOne"
                                        name="option"
                                        value="optionOne"
                                        onChange={this.handleChange}></input>
                                    <label htmlFor="opt1" className='option'>{optionOne.text}</label>
                                </div>
                                <div className='options'>
                                    <input type="radio"
                                        id="optionTwo"
                                        name="option"
                                        value="optionTwo"
                                        onChange={this.handleChange}></input>
                                    <label htmlFor="opt2" className='option'>{optionTwo.text}</label><br></br>
                                </div>

                                <div>
                                    <button
                                        className='btn submittable'
                                        type='submit'
                                        disabled={selected === ''}>
                                        Submit
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    const { id } = props.match.params

    const question = questions[id]

    return {
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null,
        authedUser
    }
}

export default connect(mapStateToProps)(UnansweredQuestion)