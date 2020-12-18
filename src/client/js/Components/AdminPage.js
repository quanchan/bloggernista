import AdminSidebar from "./AdminSidebar"
import AdminMainSection from "./AdminMainSection"
import { useEffect, useState } from "react"
import '../../style/Admin.scss'
const axios = require('axios')
function AdminPage() {
    const [posts, setPosts] = useState([])
    const [currId, setCurrId] = useState(0)
    const [addingPost, setAddingPost] = useState(false)


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
        <div className="admin-page page">
            <AdminSidebar posts={posts} currId={currId} setCurrId={setCurrId} setAddingPost={setAddingPost}/>
            <AdminMainSection posts={posts} currId={currId} addingPost={addingPost} />        
        </div>
    )
}

export default AdminPage;