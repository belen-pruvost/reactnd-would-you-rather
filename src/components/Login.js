import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetUsers } from '../actions/users';
import { handleLoginUser } from '../actions/auth';

class Login extends Component {
    state = {
        user: ''
    };

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    handleChange = (e) => {
        const user = e.target.value;

        this.setState(() => ({
            user
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(handleLoginUser(this.state.user));
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div />;
        }

        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (this.props.isAuthenticated) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <div>
                    <h1>Login</h1>
                    <div>
                        <div className="main-div">
                            <div className="panel">
                                <p>Please select your user from this drop down list.</p>
                            </div>
                            <form id="Login" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <select
                                        id="userId"
                                        onChange={(e) => this.handleChange(e)}>
                                        <option></option>
                                        {
                                            Object.keys(this.props.users)
                                                .map((u) => {
                                                    return <option
                                                        key={this.props.users[u].id}
                                                        value={this.props.users[u].id}>
                                                        {this.props.users[u].name}
                                                    </option>
                                                })
                                        }
                                    </select>
                                </div>

                                <button type="submit" 
                                    className="btn submittable" 
                                    disabled={this.state.user === ''}>
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, login }) {
    return {
        loading: users === null,
        users,
        isAuthenticated: login.authenticated
    }
}

export default connect(mapStateToProps)(Login);