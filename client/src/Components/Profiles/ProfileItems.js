import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItems = ({ profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='rount-img' />
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className='my-1' >{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`}>
                    <button className='btn btn-primary'>View Profile</button>
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => <li className='text-primary' key={index}>
                    <i className='fas fa-check'>{skill}</i>
                </li>)}
            </ul>
        </div>

    )
}

export default ProfileItems
