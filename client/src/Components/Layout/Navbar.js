import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/register'

const Navbar = ({ auth: { loading, isAuthenticated }, logout }) => {

    const guestLinks = (
        <ul>
            <li><a href='#!'>Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    const authLinks = (
        <ul>
            <li><a onClick={logout} href="#!"><i className='fas fa-sign-out-alt'>{' '}<span className='hide-sm'>Logout</span></i></a></li>
            <li><Link to="/dashboard"><i className='fas fa-user'>{' '}<span className='hide-sm'>Dashboard</span></i></Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    <i className="fas fa-code">{' '}DevConnector</i>
                </Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

const mapStatetoProps = state => ({
    auth: state.register
})

export default connect(mapStatetoProps, { logout })(Navbar)
