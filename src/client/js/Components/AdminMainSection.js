import { useState, useEffect } from 'react'

function AdminMainSection(props) {
    const [posts, setPosts] = useState([])
    const [currPost, setCurrPost] = useState([])
    const [id, setId] = useState(0)
    useEffect(() => {
        setPosts([...props.posts])
        setId(props.posts[0])
    }, [props]
    )

    const renderPost = () => {
        console.log("props", props)
        console.log("All posts", posts)
        // const targetPost = posts.find(o => o._id === id)
        // targetPost below only for testing purpose
        const targetPost = posts[0]
        if (targetPost) { 
            setCurrPost(
                <article className="post-content">
                    <h2>{targetPost.title}</h2>
                    <h3>Author: {targetPost.author}</h3>
                    <p>{targetPost.body}</p>
                </article>
            )
            console.log("targetPost", targetPost)

        } 
    }

    useEffect(renderPost, [posts])
    
    if(currPost) {
        return <section>{currPost}</section>
    }

    return <p>No posts available</p>
    
}

export default AdminMainSection