import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeComment } from '../../actions/post'
import Moment from 'react-moment'
import { post } from 'request'

const CommentItem = ({ postid, comment: { _id, text, name, avatar, user, date }, removeComment, auth }) => (
    <div class="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    class="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p class="my-1">
                {text}
            </p>
            <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && auth.user._id === user && (
                <button onClick={(e) => removeComment(postid, _id)} className='btn btn-danger' type='button' ><i className='fas fa-times'></i></button>
            )}
        </div>
    </div>
)


const mapStateToProps = state => ({
    auth: state.register
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
