import React from 'react'
import styled from "styled-components";
import { Link, NavLink, } from "react-router-dom";
function Footer() {
  return (
    <Nav>
      
            <NavLink to="/">
                {" "}
                <Logo src="http://localhost:8000/images/bookcover/BOOKWORM_Footer.png" />{" "}
            </NavLink>
        
    </Nav>
);
}

export default Footer;

const Nav = styled.nav`
height: 80px;
background-color: #090b13;
display: flex;
align-items: center;
padding: 0 36px;

`;

const Logo = styled.img`
width: 380px;
height:80px;
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
