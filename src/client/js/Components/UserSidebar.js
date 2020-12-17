import { useState, useEffect } from 'react'

function UserSidebar(props) {
    const [posts, setPosts] = useState([])

    const openPost = (id) => {
        console.log("Clicked ", id)
        props.setCurrId(id)
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
        <div className = "user-sidebar">
            <ul className="post-list">
                {posts}
            </ul>
        </div>
    )
}

export default UserSidebar