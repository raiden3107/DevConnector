import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getUserProfiles } from '../../actions/profile'
import Spinner from '../Layout/Spinner'
import ProfileItems from './ProfileItems'

const Profiles = ({ getUserProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getUserProfiles()
    }, [])

    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'>
                    Browse and connect with developers
                </i>
            </p>
            <div className='profiles'>
                {profiles.length > 0 ? profiles.map(profile => <ProfileItems key={profile._id} profile={profile} />) : <h4>No profiles found</h4>}
            </div>
        </Fragment>}
    </Fragment>
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getUserProfiles })(Profiles)
