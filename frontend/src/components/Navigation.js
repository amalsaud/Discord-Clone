import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.svg";
import "./Navbar.css";
import { AppContext } from "../context/appContext";
import { useContext } from "react";


function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
    const { currentRoom, privateMemberMsg } = useContext(AppContext);

    return (
        <Navbar className="nav">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} style={{ width: 50, height: 50 }} />
                    </Navbar.Brand>
                </LinkContainer>
                {user && !privateMemberMsg?._id && <div className="room-info col offset-2"># {currentRoom} room</div>}
                {user && privateMemberMsg?._id && (
                    <>
                        <div className="room-info col offset-2">
                            <div>
                                <img src={privateMemberMsg.picture} className="conversation-profile-img" />
                                <span className="mb-5">@ {privateMemberMsg.name}</span>
                            </div>
                        </div>
                    </>
                )}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        <p className="nav" style={{ display: "inline" }}>{user.name}</p>
                                    </>
                                }
                                id="basic-nav-dropdown" variant="secondary"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item>
                                    <Button onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navigation;
