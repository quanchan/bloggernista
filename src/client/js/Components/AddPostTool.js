
function AddPostTool(props) {
    const openPostEditor = () => {
        props.setAddingPost(true)
        console.log("Clicked AddPost")
    }

    return (
        <li onClick={openPostEditor} className="AddPostTool">
            Add Post
        </li>
    )    
}

export default AddPostTool