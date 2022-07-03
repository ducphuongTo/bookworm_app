import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "./header.css"

function Header() {
    const [showLogin, setShowLogin] = useState(false);

    const openModal = () => {
        setShowLogin((prev) => !prev);
    };

    return (
        <Nav>
            <NavLink to="/">
                {" "}
                <Logo src="http://localhost:8000/images/bookcover/BOOKWORM-logo.png" />{" "}
            </NavLink>
            <NavMenu>
                <NavLink to="/" style={{ textDecoration: "none", color: "white" }}
                                className={({ isActive }) => 
                                (isActive ? "link-active" : "link")}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/shop"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) => 
                      (isActive ? "link-active" : "link")}
                >
                    Shop
                </NavLink>
                <NavLink
                    to="/about"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) => 
                      (isActive ? "link-active" : "link")}
                >
                    About
                </NavLink>
                
                <NavLink
                    to="/cart"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) => 
                      (isActive ? "link-active" : "link")}
                >
                    Cart(0)
                </NavLink>
                <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                >
                    Log in
                </NavLink>
            </NavMenu>
        </Nav>
    );
}

export default Header;

const Nav = styled.nav`
    height: 70px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`;

const Logo = styled.img`
    width: 380px;
`;

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    justify-content: right;
    align-items: center;
    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            color: white;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;

                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`;
