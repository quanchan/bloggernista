import AddPostTool from './AddPostTool'
import { useState, useEffect } from 'react'
function AdminSidebar(props) {
    const [posts, setPosts] = useState([])

    const openPost = (id) => {
        props.setCurrId(id)
        props.setAddingPost(false)
    }

    const generatePost = () => {
        const editedPosts = props.posts.map(post => {
            return (
                <li 
                    key={post._id}
                    className="post-title"
                    onClick={() => {openPost(post._id)}}
                >
                    {post.title}
                </li>
            )
        })
        setPosts(editedPosts)
    }

    useEffect(generatePost, [props.posts])

    return (
        <div className = "admin-sidebar">
            <ul className="post-list">
                <AddPostTool setAddingPost={props.setAddingPost}/>
                {posts}
            </ul>
        </div>
    )
}

export default AdminSidebar