import AdminSidebar from "./AdminSidebar"
import AdminMainSection from "./AdminMainSection"

function AdminPage() {
    
    return(
        <div className="admin-page page">
            <AdminSidebar/>
            <AdminMainSection/>        
        </div>
    )
}

export default AdminPage;