export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    if (time.length === 10) {
        return 'on ' + d.toLocaleDateString() + ' at ' + time.substr(0, 4) + ' ' + time.slice(-2) 
    }
    return 'on ' + d.toLocaleDateString() + ' at ' + time.substr(0, 5) + ' ' + time.slice(-2)
  }

  export function formatQuestion (question, author, authedUser) {
    const { id, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author
  
    return {
      name,
      id,
      timestamp,
      optionOne,
      optionTwo,
      avatar: avatarURL,
      hasVoted: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
    }
  }