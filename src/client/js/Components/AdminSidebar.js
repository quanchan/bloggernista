import AddPostTool from './AddPostTool'
import SearchTool from './SearchTool'
import Posts from './Posts'

function AdminSidebar() {
    return (
        <div className = "admin-sidebar">
            <AddPostTool/>
            {/* <SearchTool/> */}
            <Posts/>
        </div>
    )
}

export default AdminSidebar