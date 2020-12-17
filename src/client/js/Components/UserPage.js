import UserSidebar from "./UserSidebar"
import UserMainSection from "./UserMainSection"
import { useEffect, useState } from "react"
import '../../style/User.scss'
const axios = require('axios')

function UserPage() {
    const [posts, setPosts] = useState([])
    const [currId, setCurrId] = useState(0)

    useEffect(() => {
        const fetchPost = async() => {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "Auth-Token": token,
                }
            }
            let postsData = await axios.get(
                'http://localhost:8082/api/posts',
                config
            )
             
            postsData = postsData.data
            setPosts(prevPosts => [
                ...prevPosts, ...postsData
            ])
        }
        fetchPost()
    }, [])

    useEffect(() => {
        if(posts.length > 0) {
            setCurrId(posts[0]._id)
        }
}, [posts])

    return(
        <div className="user-page page">
            <UserSidebar posts={posts} currId={currId} setCurrId={setCurrId} />
            <UserMainSection posts={posts} currId={currId}/>        
        </div>
    )
}

export default UserPage;