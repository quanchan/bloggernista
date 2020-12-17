import AddPostTool from './AddPostTool'
import { useState, useEffect } from 'react'
function AdminSidebar(props) {
    const propsPosts = props.posts
    const [posts, setPosts] = useState([])
    function generatePost() {
        const editedPosts = props.posts.map(post => {
            return <li key={post._id} className="post-title">{post.title}</li>
        })
        setPosts(editedPosts)

    }

    useEffect(generatePost, [props])

    return (
        <div className = "admin-sidebar">
            <AddPostTool/>
            <ul className="post-list">
                {posts}
            </ul>
        </div>
    )
}

export default AdminSidebar