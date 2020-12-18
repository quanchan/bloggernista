import { useState, useEffect } from "react"
const axios = require('axios')
function AddPostPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [visibility, setVisibility] = useState('public')
    const [users, setUsers] = useState([])
    const [permitedViewer, setPermitedViewer] = useState([])
    const [availViewer, setAvailViewer] = useState([])
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
                    const token = localStorage.getItem("token")
                    const config = {
                        headers: {
                            "Auth-Token": token,
                        }
                    }
                    const usersData = await axios.get(
                        'http://localhost:8082/api/users',
                        config
                    )
                    setUsers(usersData.data)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchUsers()
        },
    [])
    useEffect(() => { 
        const viewer = (visibility === "public") ? '' : <ViewerPicker users={users} setPermitedViewer={setPermitedViewer} permitedViewer={permitedViewer}/>
        setAvailViewer(viewer)
    }, [visibility, permitedViewer])

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
                {availViewer}
                <input type="submit" onClick={handleSubmit} value="Create New Post"></input>
            </form>
        </section>
    )    
}
function ViewerPicker (props) {
    useEffect(() => {
        console.log("permitedViewer", props.permitedViewer)
    },[props.permitedViewer])

    return (
        <>  
            <br/>
            <label htmlFor="permited-viewer">Choose who can view this post:</label>
            <select 
                name="pick-permited-viewer" 
                id="pick-permited-viewer"
                onChange={(e) => {
                    const splittedArr = e.target.value.split(' ')
                    const user = {
                        username: splittedArr[0],
                        _id: splittedArr[1]
                    }
                    console.log("permitedViewer", props.permitedViewer)
                    console.log(props.permitedViewer.some(viewer => viewer.username === user.username))
                    if (!props.permitedViewer.some(viewer => viewer.username === user.username)) {
                        props.setPermitedViewer(prevViewer => [
                            ...prevViewer, user
                        ])
                    }
                }}

            > 
                {props.users.map(user => {
                    return (
                        <option  
                            value={`${user.username} ${user._id}`}
                        >
                            {user.username}
                        </option>
                    )
                })}
            </select>
            <div id="permited-viewer">
                {props.permitedViewer.map(user => {
                    return <span>{user.username} </span>
                })}
            </div>
        </>
    )
}
export default AddPostPage