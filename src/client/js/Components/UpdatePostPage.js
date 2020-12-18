
import { useState, useEffect } from "react"
import deleteIcon from '../../img/clear.png'
const axios = require('axios')
function UpdatePostPage({post}) {
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const v = post.isPrivate ? 'private' : 'public'
    const id = post._id
    const [visibility, setVisibility] = useState(v)
    const [users, setUsers] = useState([])
    const [permitedViewer, setPermitedViewer] = useState(post.permitedViewer)
    const [availViewer, setAvailViewer] = useState([])
    // Token
    const token = localStorage.getItem("token")
    
    const config = {
        headers: {
            "Auth-Token": token,
        }
    }
    
    const handleVisibilityChange = (e) => {
        setVisibility(e.target.id)
    }
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    
    const handleSubmit = async () => {
        console.log("Clicked submit button")
        // TODO: submit data to server and update the current post
        const isPrivate = visibility === 'private'
        const response = await axios.put(
            `http://localhost:8082/api/posts/${id}`,
            {title, body, isPrivate, permitedViewer},
            config
            )
        console.log(response)
    }
        
    useEffect(
        () => {
            const fetchUsers = async() => {
                try {

                    const usersData = await axios.get(
                        'http://localhost:8082/api/users',
                        config
                    )
                    setUsers(usersData.data)
                    console.log("users", users)
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
        <section className='update-post-page'>
            <form>
                <label htmlFor="title">Post Title:</label>
                <input onChange={handleTitleChange} value={title} type="text" id="title"/>
                <label htmlFor="body">Post Content:</label>
                <textarea onChange={handleBodyChange} value={body} id="body"></textarea>
                <input type="radio" checked={'public' === visibility} onChange={handleVisibilityChange} id="public" name="visibility" value="public"/>
                <label htmlFor="public">Public</label>
                <input type="radio" checked={'private' === visibility} id="private" onChange={handleVisibilityChange} name="visibility" value="private"/>
                <label htmlFor="private">Private</label>
                {availViewer}
                <input type="submit" onClick={handleSubmit} value="Update Current Post"></input>
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
                    return <span>{user.username} <DeleteViewer user={user} setPermitedViewer={props.setPermitedViewer}/> </span>
                })}
            </div>
        </>
    )
}
// TODO: fix permitedViwer so we can see their username
function DeleteViewer({user, setPermitedViewer}) {
    return(
        <img 
            alt="Delete viewer"
            width="12px"
            src={deleteIcon}
            onClick={() => {
                setPermitedViewer(prevViewer => {
                    return prevViewer.filter(viewer => viewer.username !== user.username)
                })
            }}

        />
    )
}
export default UpdatePostPage