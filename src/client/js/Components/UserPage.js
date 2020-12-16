import UserSidebar from "./UserSidebar"
import UserMainSection from "./UserMainSection"

function UserPage() {
    
    return(
        <div className="user-page page">
            <UserSidebar admin={false}/>
            <UserMainSection/>        
        </div>
    )
}

export default UserPage;