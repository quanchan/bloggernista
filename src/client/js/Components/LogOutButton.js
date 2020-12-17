import { useHistory } from "react-router-dom"

function LogOutButton() {
    const history = useHistory()
    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("status")
        history.push('authentication')
    }

    return(
        <div className="link" onClick={logOut}>
            Log out
        </div>
    )
}

export default LogOutButton