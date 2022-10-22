import React, { useContext, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { AppContext } from "../context/appContext";
import myStyles from "./styles.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
        e.preventDefault();
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // socket work
                socket.emit("new-user");
                // navigate to the chat
                navigate("/chat");
            }
        });
    }

    return (
        <div className="signup__bg">
            <Row className="p-5">
                <Col className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
                        <h4>Welcome back!</h4>
                        <p className="small">We're so excited to see you again</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {error && <p className="text-danger">{error.data}</p>}
                            <Form.Label className={myStyles.label}>Email</Form.Label>
                            <Form.Control className={myStyles.input} type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className={myStyles.label}>Password</Form.Label>
                            <Form.Control className={myStyles.input} type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <Button className={myStyles.mybtn} variant="primary" type="submit">
                            {isLoading ? "signing you in..." : "Log In"}
                        </Button>
                        <Link to="/signup" className={myStyles.link}>Need an acoount? Register</Link>

                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
