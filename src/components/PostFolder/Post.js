import { ListItem, ListItemText } from "@mui/material"



function Post({ post }) {
    return (

        <ListItem >

            <ListItemText
                primary={post.message}

            />
        </ListItem>
    )
}

export default Post
