import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "./home.css"


function Feature() {
   

    const [isRecommend, setIsRecommend] = useState(true);
    
    
    const [state, setState] = useState({
        recommendedBookList: [],
        popularBookList: [],
       
    });

   const btnRecommend = async () => {
        const resRecommendedBooks = await Axios.get('http://127.0.0.1:8000/api/books/recommend');
        setState({
            recommendedBookList: resRecommendedBooks.data.data,
            
        })
        setIsRecommend(!isRecommend)
   }

   const btnPopular = async () => {
    const resPopularBooks = await Axios.get('http://127.0.0.1:8000/api/books/popular');
    
    setState({
        popularBookList: resPopularBooks.data.data
    })
    setIsRecommend(!isRecommend)
}
    
    useEffect(() => {
        getBooksData();
    }, [])

    const getBooksData = async () => {
        const resRecommendedBooks = await Axios.get('http://127.0.0.1:8000/api/books/recommend');
        
        setState({
            recommendedBookList: resRecommendedBooks.data.data,
          
        })
        
    };

    return (
        <div className="feature_books">
            <Row className="align-items-center">
                <Col xs={12}>
                    <h4 className="font-weight-semi align-items-center" style={{marginRight:"50px"}}>
                        FEATURED BOOKS
                    </h4>
                </Col>
            </Row>
            <Row className="align-items-center featured ">
                <Col xs={6} className="d-flex justify-content-end">
                    <Button
                        className="font-weight-semi"
                        onClick={btnRecommend}
                        variant={isRecommend ? "primary" : ""}
                    >
                        Recommend &nbsp;
                    </Button>
                </Col>
                <Col className="d-flex justify-content-start" xs={6}>
                    <Button
                        onClick={btnPopular}
                        className="font-weight-semi "
                        variant={isRecommend ? "" : "primary"}
                    >
                        Popular &nbsp;
                    </Button>
                </Col>
            </Row>

            <Container>
                <Row >
                    
                        {   
                                state.recommendedBookList?.map((item) => {
                                    return (
                                        <div className="col-md-3" key={item.id}>
                                            <Link  to={`books/${item.id}`} style={{ textDecoration: 'none' }}>
                                                <Col  key={item.id}>
                                                    <Card className="card-home">
                                                        <Card.Img src={"http://127.0.0.1:8000/images/bookcover/" + item.book_cover_photo + ".jpg"} />
                                                        <Card.Body>
                                                            <Card.Title>
                                                                {item.book_title}
                                                            </Card.Title>
                                                            <Card.Text className="card-author">
                                                                {item.author_name}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <del>
                                                                <span>${item.book_price}</span>
                                                            </del>
                                                            <strong>${item.final_price}</strong>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                            </Link>
                                        </div>
                                    );
                                })}
                   
                       
                </Row>
            </Container>

            <Container>
                <Row >
                        {
                            state.popularBookList?.map((item) => {
                                return (
                                   <div className="col-md-3" key={item.id}>
                                         <Link to={`books/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <Col >
                                                <Card className="card-home">
                                                    <Card.Img src={"http://localhost:8000/images/bookcover/" + item.book_cover_photo + ".jpg"} />
                                                    <Card.Body>
                                                        <Card.Title>
                                                            {item.book_title}
                                                        </Card.Title>
                                                        <Card.Text className="card-author">
                                                            {item.author_name}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <del>
                                                            <span>${item.book_price}</span>
                                                        </del> <strong>${item.final_price}</strong>

                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        </Link>

                                   </div>
                                );
                        })}
                </Row>
            </Container>
        </div>
    );
}

export default Feature;
