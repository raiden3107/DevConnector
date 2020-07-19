import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserProfileById } from '../../actions/profile'
import Spinner from '../Layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({ profile: { profile, loading }, auth, match, getUserProfileById }) => {

    useEffect(() => {
        getUserProfileById(match.params.id)
    }, [])

    return (
        <Fragment>
            {profile === null || loading ? (<Spinner />) : (<Fragment>
                <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />

                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (<Fragment>
                            {profile.experience.map(exp => <ProfileExperience key={exp._id} experience={exp} />)}
                        </Fragment>) : (<h4>No experience added</h4>)}
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (<Fragment>
                            {profile.education.map(edu => <ProfileEducation key={edu._id} education={edu} />)}
                        </Fragment>) : (<h4>No education added</h4>)}
                    </div>

                    {
                        profile.githubusername && (<ProfileGithub username={profile.githubusername} />)
                    }

                </div>
            </Fragment>)}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.register,
    profile: state.profile
})

export default connect(mapStateToProps, { getUserProfileById })(Profile)
