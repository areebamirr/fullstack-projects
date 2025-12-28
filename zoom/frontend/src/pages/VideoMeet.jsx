import React, { use, useEffect, useRef, useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "../styles/videoComponent.css";
import connectToSocket from "../../../backend/src/controllers/socketManager";

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers":[
        {"urls": "stun:stun.l.google.con:19302"}
    ]
}

export default function VideoMeetComponent(){

    var socketRef = useRef()
    let socketIRef = useRef()

    let localVideoRef = useRef()

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState();

    let [screenAvailable, setScreenAvailable] = useState();

    let [message, setMessage] = useState("");

    let [newMessage, setNewMessages] = useState(0);

    let [askForUsername, setUsername] = useState(true);

    let [username, SetUsername] = useState("")

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    const getPermissions = async () =>{
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video:true})

            if (videoPermission){
                setVideoAvailable(true);
            }else{
                setVideoAvailable(false)
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true})

            if (audioPermission){
                setAudioAvailable(true);
            }else{
                setAudioAvailable(false)
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            } else{
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable, audio:audioAvailable})
                if(userMediaStream){
                    window.localStream = userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
             

        }catch(err){
            console.log(err)
        }
    }

    let getUserMediaSuccess = (stream) =>{

    }

    let getUserMedia = () =>{
        if((video && videoAvailable) || (audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video, audio:audio})
            .then(()=>{}) // TODO: getUserMediaSuccess
            .then((stream)=>{})
            .catch((e)=>console.log(e))
        }else{
            try{
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(target => tracks.stop())
            }catch(e){

            }
        }
    }

    useEffect(()=>{
        if (video !== undefined && audio !== undefined){
            getUserMedia();
        }
    }, [audio, video])

    let getMedia = () =>{
        setVideo(videoAvailable)
        setAudio(audioAvailable)

        // connectToSocketServer();
    }

    // if(isChrome() === true){
        
    // }

    return(
        <div>
            {askForUsername === true ?
                <div>
                    <h2>Enter into a Lobby</h2>
                    {username}
                    <TextField id="outlined-basic" label="Username" value={username} variant="outlined" onChange={e => setUsername(e.target.value)} />
                    <Button variant="outlined" onClick={connectToSocket}>Connect</Button>

                    <div>
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>

                </div> : <></>
            }
        </div>
    )
}