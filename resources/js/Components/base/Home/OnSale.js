import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Row, Button, Col, Card, Container, Pagination } from "react-bootstrap";
import { VscTriangleRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./home.css"
import { A11y, Navigation, Scrollbar } from "swiper";
function OnSale() {

    const [book, setBook] = useState([]);
    useEffect(() => {
        getBookData();
    }, []);

    const getBookData = () => {
        axios
            .get("http://127.0.0.1:8000/api/books/sale")
            .then((response) => response.data)
            .then(
                (result) => {
                    console.log(result);
                    setBook(result.data);
                },
                (error) => {
                    console.log("sth wrong");
                }
            );
    };

    return (
        <div>
            <Row className="align-items-center on_sale">
                <Col  >
                    <p className="font-weight-semi ">On Sale</p>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="font-weight-semi" variant="primary">
                        <Link to ="/shop" style={{textDecoration: 'none'}} className='btn-view' >View All <VscTriangleRight className="icon_triangle" /></Link>
                    </Button>
                </Col>
            </Row>

            <Swiper
                modules={[Navigation,Scrollbar,A11y]}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 500000,
                }}
                spaceBetween={30}
                slidesPerView={4}
                className="mySwiper"
            >
                <Container>
                    <Row>
                        {book!== null &&
                    book.map((item) => {
                        return (
                                <SwiperSlide>
                                    <Row key={item.id}>
                                    <Link to={`books/${item.id}`} style={{textDecoration: 'none'}} className="card_list">
                                        <Col >
                                                <Card className="card-home">
                                                    <Card.Img src={"http://localhost:8000/images/bookcover/" + item.book_cover_photo + ".jpg"} />
                                                    <Card.Body className="card-slider">
                                                        <Card.Title>{item.book_title}</Card.Title>
                                                        <Card.Text className="card-author">
                                                            {item.author_name}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <del><span>${item.book_price}</span></del> <strong>${item.discount_price}</strong>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        </Link>
                                    </Row>    
                                </SwiperSlide>
                        );
                    })}
                    </Row>
                </Container>
                
            </Swiper>
        </div>
    );
}

export default OnSale;
