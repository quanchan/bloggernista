import { useState, useEffect } from "react"
const axios = require('axios')
function AddPostPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [visibility, setVisibility] = useState('public')
    const handleVisibilityChange = (e) => {
        setVisibility(e.target.id)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: submit data to server and create a new post
    }

    useEffect(
        () => {
            const fetchUsers = async() => {
                try {
                    const usersData = await axios.get(
                        'http://localhost:8082/api/users'
                    )
                    // TODO: do something with the users data
                } catch (err) {
                    console.error(err)
                }
            }
            fetchUsers()
        },
    [])

    const permitedViewer = (visibility === "public") ? '' : <viewerPicker users={}/>

    return (
        <section className='add-post-page'>
            <form>
                <label htmlFor="title">Post Title:</label>
                <input onChange={handleTitleChange} value={title} type="text" id="title"/>
                <label htmlFor="body">Post Content:</label>
                <textarea onChange={handleContentChange} value={content} id="body"></textarea>
                <input type="radio" checked={'public' === visibility} onChange={handleVisibilityChange} id="public" name="visibility" value="public"/>
                <label htmlFor="public">Public</label>
                <input type="radio" checked={'private' === visibility} id="private" onChange={handleVisibilityChange} name="visibility" value="private"/>
                <label htmlFor="private">Private</label>
                <input type="submit" onClick={handleSubmit} value="Create New Post"></input>
                {permitedViewer}
            </form>
        </section>
    )    
}

function viewerPicker (props) {
    return (
        <>
            <label htmlFor="permited-viewer">Choose who can view this post:</label>
            <select name="permited-viewer" id="permited-viewer">
                {props.users}
            </select>
        </>
    )
}
export default AddPostPage