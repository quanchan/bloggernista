import AdminSidebar from "./AdminSidebar"
import AdminMainSection from "./AdminMainSection"
import { useEffect, useState } from "react"
import '../../style/Admin.scss'
const axios = require('axios')
function AdminPage() {
    const [posts, setPosts] = useState([])



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
    
    return(
        <div className="admin-page page">
            <AdminSidebar posts={posts}/>
            <AdminMainSection posts={posts}/>        
        </div>
    )
}

export default AdminPage;