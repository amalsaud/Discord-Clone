import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import Navigation from "../components/Navigation";
import myStyles from "../pages/styles.module.css";

function Chat() {
    return (
            <div className="wrapper" style={{overflow:"hidden"}}>
                <Navigation />
                <Row>
                    <Col md={3} className={myStyles.scroll}>
                        <Sidebar />
                    </Col>
                    <Col md={9}>
                        <MessageForm />
                    </Col>
                </Row>
            </div>

    );
}

export default Chat;
