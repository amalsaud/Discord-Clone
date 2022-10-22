import React from "react";
import { Row } from "react-bootstrap";
import "./Home.css";
import logo from "../assets/discordLogo.png";
import { LinkContainer } from "react-router-bootstrap";

function Home() {
    return (
        <Row>
            <div class="mainBody">
                <header>
                    <img src={logo} alt="Discord" class="logo" />
                    <nav class="nav_links">
                        <ul>
                            <li>Download</li>
                            <li>Nitro</li>
                            <li>Safety</li>
                            <li>Support</li>
                        </ul>
                    </nav>
                    <LinkContainer to="/login">
                    <a href="cta"><button class="login-button">Login</button></a>
                    </LinkContainer>

                </header>
                <section id="first">
                    <h1 class="firstBody">IMAGINE A PLACE...</h1>
                    <p class="firstP">...where you can belong to a school club, a gaming group, or a worldwide art community.
                        Where just you
                        and a
                        handful of friends can spend time together. A place that makes it easy to talk every day and hang out
                        more
                        often.</p>
                    <div class="Buttons">
                        <button class="btnL"><i class="lni lni-download"></i>Download For Windows</button>
                        <button class="btnR">Open Discord in your Browser</button>
                    </div>
                </section>
            </div>
        </Row>
    );
}

export default Home;
