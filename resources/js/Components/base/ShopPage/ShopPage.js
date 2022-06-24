import React from "react";
import { Card } from "react-bootstrap";
import { Row, Button, Col, DropdownButton, Dropdown } from "react-bootstrap";

function ShopPage() {
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
            <Row className="align-items-center ">
                <Col  className="d-flex justify-content-center" xs={6} md={4}>
                    Filter by
                </Col>

                <Col  className="d-flex justify-content-end" xs={6} md={4}>
                    Showing 1-12 of 126books
                </Col>

                <Col  className="d-flex justify-content-end" xs={6} md={4}>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Sort by on sale"
                    >
                        <Dropdown.Item href="#/action-1">
                            Sort by on sale
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Sort by popularity
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-4">
                            Sort by price: low to high
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Sort by price: high to low
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Show 20"
                    >
                        <Dropdown.Item href="#/action-1">
                            Show 20
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Show 15
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Show 10
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-4">
                            Show 5
                        </Dropdown.Item>
                    </DropdownButton>
                </Col>

               
            </Row>

            <Row>
                <Col >
                </Col>
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

export default ShopPage;
