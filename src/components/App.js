import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AnsweredQuestion from './AnsweredQuestion'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import Login from './Login';
import Logout from './Logout';
import NewQuestion from './NewQuestion'
import ProtectedRoute from './ProtectedRoute'
import Nav from './Nav'
import UnansweredQuestion from './UnansweredQuestion'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authenticated == null
            ? null
            : <Nav authedUser={this.props.loggedInUser} />
          }
          <div className='container'>
            {this.props.loading === true
              ? null
              : <div>
                <ProtectedRoute path='/' exact component={Dashboard} isAuthenticated={this.props.authenticated}/>
                <ProtectedRoute path='/question/:id' exact component={connect(mapStateToProps)(UnansweredQuestion)} isAuthenticated={this.props.authenticated}/>
                <ProtectedRoute path='/question/:id/results' exact component={connect(mapStateToProps)(AnsweredQuestion)} isAuthenticated={this.props.authenticated}/>
                <ProtectedRoute path='/new' component={NewQuestion} isAuthenticated={this.props.authenticated}/>
                <ProtectedRoute path='/leaderboard' component={Leaderboard} isAuthenticated={this.props.authenticated}/>
                <Route path="/login" exact component={withRouter(Login)} />
                <Route path="/logout" exact component={withRouter(Logout)} />
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ login }) {
  return {
    loading: false,
    loggedInUser: login.loggedInUser,
    authenticated: login.authenticated
  }
}

export default connect(mapStateToProps)(App)