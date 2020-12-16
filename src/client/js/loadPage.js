const axios = require('axios')

const loadPage = async (response) => {
    const data = response.data
    if (data.status === admin) {
        await axios.get('https://localhost:8082/api/posts/admin')
        
    } 
    else if (data.status === user) {

    }
}

export default loadPage

//TODO: Import vao dau do