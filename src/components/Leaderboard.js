import React from 'react';
import connect from "react-redux/es/connect/connect";

const Leaderboard = (props) => {
    const { users } = props;

    let usersInfo = Object
        .keys(users)
        .map((key, index) => {
            let answered = Object.keys(users[key].answers).length;
            let asked = Object.keys(users[key].questions).length;

            return {
                'name': users[key].name,
                'avatar': users[key].avatarURL,
                'answered': answered,
                'asked': asked,
                'score': answered + asked
            }
        });

    usersInfo.sort((a, b) => b.score - a.score);

    return (
        <div className='leaders'>
            {usersInfo
                .map((user, index) => {
                    return (
                        <div key={index} className='question'>
                            <div>
                                <div className='user'>
                                    <div className='left user-header'>
                                        <img
                                            src={user.avatar}
                                            alt={`Avatar of ${user.name}`}
                                            className='avatar'
                                        />
                                    </div>
                                    <div className='aligned'>
                                        <div className='header second-right'>
                                            <h1>{user.name}</h1>
                                        </div>
                                        <div className='header second-right'>
                                            <h2>Total Score</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='question-info sub-container'>
                                    <div className='left'>
                                        <div>
                                            <p>
                                                <b>
                                                    <span>Answered Questions: </span>
                                                </b>
                                                <span> {user.answered}</span>
                                            </p>
                                            <p>
                                                <span>
                                                    <b>Created Questions: </b>
                                                </span>
                                                <span> {user.asked}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='right badge'>
                                        {user.score}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>

    )
};

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard);