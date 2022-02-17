
import { useLocation, useParams } from "react-router-dom";
import { useRef, useState } from 'react'

function getSocket(roomName) {
    const socketPath = `ws://${window.location.hostname}:8000/ws/signalRoom/${roomName}/`;
    const chatSocket = new WebSocket(socketPath)
    return chatSocket
}
function Meeting() {
    const { roomName } = useParams()
    const { state } = useLocation()
    const { username, creator } = state
    const localVideo = useRef(null);
    const remoteVideo = useRef(null);
    const [showAcceptButton, setShowAcceptButton] = useState(false)
    const chatSocket = getSocket(roomName)

    // RTCPeerConnection
    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
    const localPeerConnection = new RTCPeerConnection(configuration)
    localPeerConnection.onicecandidate = onIceCandidateFunc
    localPeerConnection.onconnectionstatechange = ConnectionStateChangeFunc
    localPeerConnection.ontrack = trackFunc
    function onIceCandidateFunc(e) {
        if (e.candidate) {
            chatSocket.send(JSON.stringify({
                'action': 'candidate',
                'candidate': e.candidate,
                'username': username

            }))
        }
    }
    function ConnectionStateChangeFunc(e) {
        if (localPeerConnection.connectionState === 'connected') {
            console.log('Peers connected')
        }
    }
    async function trackFunc(e) {
        const [remoteStream] = e.streams;
        remoteVideo.current.srcObject = remoteStream;
    }

    async function createOffer() {
        const offer = await localPeerConnection.createOffer()
        await localPeerConnection.setLocalDescription(offer)
        console.log('Local Description Set and Offer Sent', offer)
        chatSocket.send(JSON.stringify({
            'action': 'offer',
            'offer': offer,
            'username': username
        }))
        addLocalTracks(localPeerConnection)
    }


    // Signalling
    chatSocket.onopen = async e => {
        console.log('Signal connection open')
        if (!creator) {
            chatSocket.send(JSON.stringify({
                'action': 'join',
                'username': username
            }))
        }
    }
    chatSocket.onclose = e => {
        console.log('Signal connection closed')
    }
    chatSocket.onmessage = async e => {
        const data = JSON.parse(e.data)
        if (data['action'] === 'join') {
            if (data[username] !== username) {
                if (creator) {
                    setShowAcceptButton(true)
                }
            }
        }
        else if (data['action'] === 'offer') {
            if (username !== data['username']) {
                await localPeerConnection.setRemoteDescription(data['offer'])
                const answer = await localPeerConnection.createAnswer()
                console.log('Remote Description Set from offer')
                await localPeerConnection.setLocalDescription(answer)
                console.log('Local Description Set from answer')
                chatSocket.send(JSON.stringify({
                    'action': 'answer',
                    'answer': answer,
                    'username': username
                }))
            }
        }
        else if (data['action'] === 'answer') {
            if (username !== data['username'] && localPeerConnection.currentRemoteDescription == null) {
                await localPeerConnection.setRemoteDescription(data['answer'])
                console.log('Remote Description Set from answer')
            }
        }
        else if (data['action'] === 'candidate') {
            if (data['username'] !== username) {
                await localPeerConnection.addIceCandidate(new RTCIceCandidate(data['candidate']))
                console.log('IceCandidate added')
            }
        }
    }

    // Video Chat
    var localStream = new MediaStream()
    const mediaStreamConstraints = {
        'video': true,
        'audio': true
    }
    function gotLocalMediaStream(mediaStream) {
        localStream = mediaStream
        localVideo.current.srcObject = mediaStream
        localPeerConnection.addStream(localStream)
    }
    function handleLocalMediaStreamError(error) {
        console.log('navigator.getUserMedia error: ', error);
    }
    //getting User Media
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream)
        .catch(handleLocalMediaStreamError)

    function addLocalTracks(peer) {
        localStream.getTracks().forEach(track => {
            peer.addTrack(track, localStream)
        })
    }

    const handleAcceptButton = () => {
        console.log('accept button clicked')
        createOffer()
        if (creator) {
            setShowAcceptButton(false)
        }
    }


    return <div>
        {creator ? <p>Creator</p> : <p> attendee: {username}</p>}
        <video ref={localVideo} autoPlay playsInline muted></video>
        <video ref={remoteVideo} autoPlay playsInline muted></video>
        <div>
            {showAcceptButton && <button onClick={handleAcceptButton}>Accept</button>}
            <button id="hangupButton" >Hang Up</button>
        </div>
    </div>;
}

export default Meeting;
