import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getCurrentUserProfile } from '../../actions/profile'
import { useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experiences from './Experiences'
import Educations from './Educations'

const Dashboard = ({ getCurrentUserProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentUserProfile()
    }, [])

    return loading && profile === null ? <Spinner /> : (<Fragment><h1 class="large text-primary">
        Dashboard
  </h1>
        <p class="lead"><i class="fas fa-user"></i> Welcome {user && user.name}</p>
        {profile !== null ? <Fragment>
            <DashboardActions />
            <Experiences experience={profile.experience} />
            <Educations education={profile.education} />
        </Fragment> : <Fragment>
                <p>You have not yet setup your profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>CREATE PROFILE</Link>
            </Fragment>}
    </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.register,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard)
