
function AddPostTool(props) {
    const openPostEditor = () => {
        props.setAddingPost(true)
    }

    return (
        <li onClick={openPostEditor} className="AddPostTool">
            Add Post
        </li>
    )    
}

export default AddPostTool