import { useState, useEffect } from 'react'
import AddPostPage from './AddPostPage'
import UpdatePostPage from './UpdatePostPage'
function AdminMainSection(props) {
    const [posts, setPosts] = useState([])
    const [currPost, setCurrPost] = useState([])
    const [updatingPost, setUpdatingPost] = useState(false)
    useEffect(() => {
        setPosts([...props.posts])
    }, [props]
    )

    const toggleUpdatePage = (e) => {
        console.log("Clicked")
        e.preventDefault()
        setUpdatingPost(prevState => !prevState)
    }
 

    const renderPost = () => {
        const targetPost = posts.find(o => o._id === props.currId)

        const updateMenu = updatingPost ? <UpdatePostPage post={targetPost}/> : ""
        
        if (targetPost) { 
            setCurrPost(
                <article className="post-content">
                    <h2>{targetPost.title}</h2>
                    <h3>Author: {targetPost.author}</h3>
                    <p>{targetPost.body}</p>
                    <input type="submit" value="Toggle Update Menu" onClick={toggleUpdatePage}/> 
                    {updateMenu}
                </article>
            )

        } 
    }

    useEffect(renderPost, [posts, updatingPost])
    
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