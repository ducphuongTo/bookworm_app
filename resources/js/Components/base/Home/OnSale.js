import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Row, Button, Col,Card } from 'react-bootstrap';

import { VscTriangleRight } from "react-icons/vsc";
import {Link} from 'react-router-dom';



function OnSale() {
          const slide_img = [
                    "images/bookcover/book1.jpg",
                    "images/bookcover/book2.jpg",
                    "images/bookcover/book3.jpg",
                    "images/bookcover/book4.jpg",
                    "images/bookcover/book5.jpg",
                    "images/bookcover/book6.jpg",
                    "images/bookcover/book7.jpg",
                    "images/bookcover/book8.jpg",
                    "images/bookcover/book9.jpg",
                    "images/bookcover/book10.jpg"
          ];

  return (
          <div>
                    <Row className="align-items-center mb-4 on_sale">
                              <Col>
                                        <p className='font-weight-semi'>On Sale</p>
                              </Col>
                              <Col className='d-flex justify-content-end'>
                                        <Button className='font-weight-semi ' variant="primary">
                                                  View All  <VscTriangleRight className='icon_triangle' />
                                        </Button>
                              </Col>
                    </Row>

                    <Swiper
                    navigation = {false}
                    loop = {true}
                    autoplay = {{
                              delay: 500000
                    }}
                    
                    spaceBetween={30}
                    slidesPerView={4}
                    className="mySwiper"
                    >
                    
                    {slide_img.map((img, i) => {
                    return (
                      <Link key={i} className='card_list'>
                          <SwiperSlide>
                               <Card >
                                   <Card.Img src= {img} />
                                   <Card.Body>
                                       <Card.Title>Card Title</Card.Title>
                                       <Card.Text>
                                           Some quick example text to build on the card title and
                                           make up the bulk of the card's content.
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                        </SwiperSlide>
                      </Link>
                    );
                    })}
                    </Swiper>
        </div>
  )
}

export default OnSale

