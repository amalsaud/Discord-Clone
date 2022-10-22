import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import myStyles from "./styles.module.css";
import botImg from "../assets/discord.PNG";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "mkfwsxte");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/djezrhxae/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }
    return (
        <div className="signup__bg">
            <Row className="p-4">
                <Col className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                    <h4>Create an account</h4>
                    <div className="signup-profile-pic__container">
                            <img src={imagePreview || botImg} className="signup-profile-pic" />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fa fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>
                        {error && <p className="text-danger">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className={myStyles.label}>Name</Form.Label>
                            <Form.Control className={myStyles.input} type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className={myStyles.label}>Email</Form.Label>
                            <Form.Control className={myStyles.input} type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className={myStyles.label}>Password</Form.Label>
                            <Form.Control className={myStyles.input} type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                        </Form.Group>
                        <Button variant="primary" className={myStyles.mybtn} type="submit">
                            {isLoading ? "signing you up..." : "Sign Up"}
                        </Button>
                        <Link to="/login" className={myStyles.link}>Already have an account? Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Signup;
