import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
    return (
        <Route {...rest} render={(props) => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
    )
}

const mapStateToProps = state => ({
    auth: state.register
})

export default connect(mapStateToProps, null)(PrivateRoute)
