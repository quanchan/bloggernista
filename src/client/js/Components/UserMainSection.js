import { useState, useEffect } from 'react'

function UserMainSection(props) {
    const [posts, setPosts] = useState([])
    const [currPost, setCurrPost] = useState([])
    useEffect(() => {
        setPosts([...props.posts])
    }, [props]
    )

    const renderPost = () => {
        console.log("props", props)
        console.log("All posts", posts)
        console.log("Id to find", props.currId)
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
            console.log("targetPost", targetPost)

        } 
    }

    useEffect(renderPost, [posts])
    
    if(currPost) {
        return <section>{currPost}</section>
    }
    console.log("Are we adding post", props.addingPost)


    return <p>No posts available</p>
}

export default UserMainSection