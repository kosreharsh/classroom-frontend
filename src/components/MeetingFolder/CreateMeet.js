import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function CreateMeet() {
    const navigate = useNavigate()
    const roomInputRef = useRef()
    const userNameRef = useRef()

    const handleSubmit = () => {
        const roomName = roomInputRef.current.value
        const userName = userNameRef.current.value
        const payload = { username: userName, creator: false }
        navigate(`/meet/${roomName}`, { state: payload })
    }
    const handleCreateButton = () => {
        const roomName = makeid(9)
        const payload = { username: 'creator', creator: true }
        navigate(`/meet/${roomName}`, { state: payload })
    }

    return <div>
        <button onClick={handleCreateButton}>Create Meeting</button>
        <form onSubmit={handleSubmit}>
            <input ref={roomInputRef} type='text' placeholder="Enter Room Name" />
            <input ref={userNameRef} type='text' placeholder="Enter Username" />
            <input type='submit' value="Submit" />
        </form>

    </div>;
}

export default CreateMeet;
