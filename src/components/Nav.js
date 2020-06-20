import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = (authedUser) => {
    console.log(authedUser)
    return (
        <nav className='nav'>
            <ul className='nav-float-left'>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Leaderboard
                    </NavLink>
                </li>
            </ul>
            <div className='nav-float-right'>
                Hello, {authedUser.authedUser.name}
                <NavLink to="/logout">
                    <button>
                        Logout
                        </button>
                </NavLink>
            </div>
        </nav>
    )
};

export default Nav;