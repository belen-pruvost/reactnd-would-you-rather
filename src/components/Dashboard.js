import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
    state = {
        'questionsToShow': 'unanswered',
        'activeTab': 'unanswered'
    };

    handleTabChange = (e, tab) => {
        this.setState(() => ({
            questionsToShow: tab,
            activeTab: tab
        }));
    };

    render() {
        const { questionsToShow, activeTab } = this.state;
        console.log("----------------------")
        console.log(this.props.zeroAnswered)
        console.log(this.props.zeroUnanswered)
        console.log("----------------------")

        return (
            <div>
                <div>
                    <div>
                        <div className='center'>
                            <div>
                                <div>
                                    <button type='button'
                                        className={"btn btn-info " + (activeTab === 'unanswered' ? 'active' : null)}
                                        onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered
                                    Questions
                                    </button>
                                    <button type='button'
                                        className={"btn btn-info " + (activeTab === 'answered' ? 'active' : null)}
                                        onClick={(e) => this.handleTabChange(e, 'answered')}>Answered
                                    Questions
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                {this.props.zeroAnswered === true &&
                                    <div>
                                        <p> There are no Answered Questions</p>
                                    </div>
                                }
                                {this.props.zeroUnanswered === true &&
                                    <div>
                                        <p> There are no unanswered Questions</p>
                                    </div>
                                }
                                {this.props.questionIds.map((id) => {
                                    return (
                                        <Question key={id} id={id}
                                            questionsToShow={questionsToShow} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ login, questions, users }) {
    const authedUser = login.loggedInUser.id

    let zeroAnswered, zeroUnanswered, total, user

    total = Object.keys(questions).length
    user = users[authedUser]

    zeroAnswered = Object.keys(user.answers).length === 0
    zeroUnanswered = Object.keys(user.answers).length === total


    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        zeroAnswered,
        zeroUnanswered
    }
}

export default connect(mapStateToProps)(Dashboard)