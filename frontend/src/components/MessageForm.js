import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";
import myStyles from "../pages/styles.module.css";

function MessageForm() {
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user);
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
  

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }

    return (

        <div className="messages-output">
            <div className="top">
                           {user &&
                messages.map(({ _id: date, messagesByDate }, idx) => (
                    <div key={idx}>
                        <p className="text-center message-date-indicator text-light">{date}</p>
                        {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                            <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                <div className="message-inner">
                                    <div className="sender">
                                        <img src={sender.picture} style={{ width: 35, height: 35, borderRadius: "50%" }} />
                                        <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                        <p className="message-timestamp-left">{time}</p>
                                    </div>
                                    <p className="message-content">{content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))} 
            </div>
            <Form onSubmit={handleSubmit} className="footer">
                    <Row className="flexy">
                        <Col md={9}>
                            <Form.Group>
                                <Form.Control className={myStyles.input} type="text" placeholder="Your message" disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Button type="submit" disabled={!user} id="sendBtn">
                                <i className="fas fa-paper-plane position-absolute"></i>
                            </Button>
                        </Col>
                    </Row>
                </Form>

  

        </div>

    );
}

export default MessageForm;
