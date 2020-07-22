import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts()
    }, [])

    return loading ? <Spinner /> : (<Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
            <i className='fas fa-user' /> Welcome To The Community
        </p>
        <PostForm />
        <div className='posts'>
            {posts.map(post => <PostItem key={post._id} post={post} />)}
        </div>
    </Fragment>)
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
