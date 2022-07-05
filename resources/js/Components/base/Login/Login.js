import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import styled from 'styled-components';
import "./Login.css"
import {MdClose} from 'react-icons/md'

export const Login = () => {
  return (
    <>
      

            <ModalWrapper >
                  <div>
              <Container className='mt-5'>
                  <Row>
                    <Col lg={4} md = {6} sm={12} className='text-center'>
                      <img className='icon-svg' src={"http://localhost:8000/images/bookcover/user.svg"}/>
                      <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                        
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                      </Form>
                    </Col>
                    <Col lg={8} md = {6} sm={12}>
                    </Col>
                  </Row>
              </Container>
          </div>
            </ModalWrapper>

    </>
  )
}


const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
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