import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";
import axios from 'axios';
axios.defaults.withCredentials = true;

function App() {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    const [newMessages, setNewMessages] = useState({});
    const user = useSelector((state) => state.user);
    return (
        <>
        <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
        </>
    );
}

export default App;
