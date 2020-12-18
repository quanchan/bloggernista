import AddPostTool from './AddPostTool'
import { useState, useEffect } from 'react'
import deleteIcon from '../../img/clear.png'
const axios = require('axios')
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
                    id={post._id}
                    className="post-title"
                    onClick={() => {openPost(post._id)}}
                >
                    {post.title}
                    <DeletePost postId={post._id}/>
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

function DeletePost({postId}) {
    const token = localStorage.getItem("token")

    const config = {
        headers: {
            "Auth-Token": token,
        }
    }

    const handleDeleteClick = async() => {
        console.log("Clicked delete post")
        const response = await axios.delete(`http://localhost:8082/api/posts/${postId}`, config)
        console.log(response)
        // TODO: better way: change state to reload
        window.location.reload()
    }
    return(
        <img 
            alt="Delete post"
            width="12px"
            src={deleteIcon}
            onClick={() => {
                handleDeleteClick()     
            }}

        />
    )
}

export default AdminSidebar