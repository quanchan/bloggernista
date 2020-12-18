import { useState, useEffect } from 'react'
import AddPostPage from './AddPostPage'
function AdminMainSection(props) {
    const [posts, setPosts] = useState([])
    const [currPost, setCurrPost] = useState([])
    useEffect(() => {
        setPosts([...props.posts])
    }, [props]
    )

    const renderPost = () => {
        const targetPost = posts.find(o => o._id === props.currId)
        // targetPost below only for testing purpose
        if (targetPost) { 
            setCurrPost(
                <article className="post-content">
                    <h2>{targetPost.title}</h2>
                    <h3>Author: {targetPost.author}</h3>
                    <p>{targetPost.body}</p>
                </article>
            )

        } 
    }

    useEffect(renderPost, [posts])
    
    if(props.addingPost === true) {
        return <AddPostPage/>
    }

    if(currPost) {
        return <section>{currPost}</section>
    }
    console.log("Are we adding post", props.addingPost)


    return <p>No posts available</p>
    
}

export default AdminMainSection