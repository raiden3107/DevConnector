import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from '../Posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ post: { post, loading }, getPost, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postid={post._id} />
        <div className='comments'>
            {post.comments.map(comment => (<CommentItem key={comment._id} comment={comment} postid={post._id} />))}
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
