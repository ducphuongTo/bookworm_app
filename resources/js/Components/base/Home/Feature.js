import React from "react";
import { Card } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";

function Feature() {
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
        "images/bookcover/book10.jpg",
    ];

    return (
        <div>
            <Row className="align-items-center">
                <Col xs={12}>
                    <h4 className="font-weight-semi align-items-center">
                        FEATURED BOOKS
                    </h4>
                </Col>
            </Row>
            <Row className="align-items-center featured ">
                <Col xs={6} className="d-flex justify-content-end">
                    <Button className="font-weight-semi" variant="primary">
                        Recommend &nbsp;
                    </Button>
                </Col>
                <Col className="d-flex justify-content-start" xs={6}>
                    <Button className="font-weight-semi " variant="blue">
                        Popular &nbsp;
                    </Button>
                </Col>
            </Row>

            <Row>
                {slide_img.map((img, i) => {
                    return (
                        <Col md={3} key={i}>
                            <Card>
                                <Card.Img src={img} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Feature;
