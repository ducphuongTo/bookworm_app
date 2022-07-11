import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "./header.css";
import Popup from "reactjs-popup";
import { Login } from "../Login/Login";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

function Header() {
    let totalQty = JSON.parse(localStorage.getItem("total_cart"));

    useEffect(() => {
        function handleChangeStorage() {
            console.log("run");
        }
        window.addEventListener("storage", handleChangeStorage);
        return () => window.removeEventListener("storage", handleChangeStorage);
    }, []);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/users/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_data");
                swal("Success", res.data.message, "success");
                localStorage.clear();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    };

    let username = JSON.parse(localStorage.getItem("auth_data"));

    console.log(username);

    var AuthButton = "";
    if (!localStorage.getItem("auth_token")) {
        AuthButton = (
            <div>
                <Popup
                    modal
                    trigger={<button className="btn-login">Log in</button>}
                >
                    {(close) => <Login close={close} />}
                </Popup>
            </div>
        );
    } else {
        AuthButton = (
            <div>
                <Dropdown>
                    <Dropdown.Toggle className="username" id="dropdown-basic">
                        {username.full_name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <button
                                className="nav-link btn btn-danger btn-sm"
                                onClick={logoutSubmit}
                                type="button"
                            >
                                Logout
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
    return (
        <Nav>
            <NavLink to="/">
                {" "}
                <Logo src="http://localhost:8000/images/bookcover/BOOKWORM_Header.png" />{" "}
            </NavLink>
            <NavMenu>
                <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/shop"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Shop
                </NavLink>
                <NavLink
                    to="/about"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/cart"
                    style={{ textDecoration: "none", color: "white" }}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Cart({JSON.parse(localStorage.getItem("total_cart"))})
                </NavLink>

                {AuthButton}
            </NavMenu>
        </Nav>
    );
}

export default Header;

const Nav = styled.nav`
    height: 80px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
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
