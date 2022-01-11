import { Link } from 'react-router-dom'

function ClassCards({ group }) {
    return (
        <div>
            <Link to={`/class/${group.id}/`}>{group.name}</Link>
        </div>
    )
}

export default ClassCards
