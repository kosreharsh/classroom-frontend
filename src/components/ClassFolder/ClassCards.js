import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import FolderIcon from '@mui/icons-material/Folder';
function ClassCards({ group }) {
    return (

        <Link to={`/class/${group.id}/`}>
            <ListItem >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={group.name}

                />
            </ListItem>
        </Link>



    )
}

export default ClassCards
