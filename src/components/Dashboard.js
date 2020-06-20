import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { getZeroAnswered, getZeroUnanswered } from '../selectors/index'
  
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
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        zeroAnswered: getZeroAnswered({login, users, questions}),
        zeroUnanswered: getZeroUnanswered({login, users, questions})
    }
}

export default connect(mapStateToProps)(Dashboard)