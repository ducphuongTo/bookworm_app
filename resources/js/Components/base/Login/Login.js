import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import styled from 'styled-components';
import "./Login.css"
import {MdClose} from 'react-icons/md'
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';




export const Login = () => {
  const [stateLogin,setStateLogin] = useState({
    email: '',
    password: '',
    error_list: [],

  })
  const handleInput = (e) =>{
    e.persist()
    setStateLogin({...stateLogin, [e.target.name]: e.target.value});
  }
  
  const loginSubmit = (e)=>{
    e.preventDefault()

    const data = {
      email: stateLogin.email,
      password: stateLogin.password
    }
    
    axios.post("http://127.0.0.1:8000/api/login",data)
    .then(res=>{
      if(res.data.status === 200)
      {   
          
          localStorage.setItem('auth_token',res.data.token)
          localStorage.setItem('auth_data',JSON.stringify(res.data.data)) 
          
          swal("Success",res.data.message,"success")
         
      }
      else if(res.data.status === 401){
        swal("Warning",res.data.message,"warning")
      }
      else{
        setStateLogin({...stateLogin, error_list: res.data.validation_errors })
      }
    })
  }
  return (
    <>
            <ModalWrapper >     
              <Container>
                  <Row>
                    <Col className='text-center login-form'>
                      <img className='icon-svg' src={"http://localhost:8000/images/bookcover/user.svg"}/>
                      <Form onSubmit={loginSubmit} >
                          <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleInput} value = {stateLogin.email} />
                            <span>{stateLogin.error_list.email}</span>
                          </Form.Group>
                          <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleInput} value = {stateLogin.password} />
                            <span>{stateLogin.error_list.password}</span>
                          </Form.Group>
                        
                          <Button variant="primary" type="submit" >
                            Submit
                          </Button>
                      </Form>
                    </Col>
                   
                  </Row>
              </Container>
            </ModalWrapper>

    </>
  )
}


const ModalWrapper = styled.div`
  width: 500px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.2);
  background: #fff;
  color: #000;
  
  position: relative;
  z-index: 10;
  border-radius: 10px;

`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;

`