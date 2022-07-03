import { React, useState, useEffect } from "react";
import {
    Card,
    Container,
    Row,
    Button,
    Col,
    Dropdown,
    DropdownButton,
    Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "Axios";
import "./Detail.css";
function Detail() {
    let { id } = useParams();

    const [book, setBook] = useState([]);
    const [bookReview,setBookReview] = useState({
        reviewTotal: 0,
        reviewAvg:0,
        reviewList:[],
        
    })
    useEffect(() => {
        getBookData();
        getReviewData();
    }, []);

    const getReviewData = async ()  =>{
        const reviewListData = await axios.get(`http://127.0.0.1:8000/api/review/${id}`)
        const reviewTotalData = await axios.get(`http://127.0.0.1:8000/api/review/total/${id}`)
        const reviewAvgData = await axios.get(`http://127.0.0.1:8000/api/review/avgStart/${id}`)
        console.log(reviewListData)
        console.log(reviewTotalData)
        console.log(reviewAvgData)
        setBookReview({
            reviewList: reviewListData.data,
            reviewTotal: reviewTotalData.data,
            reviewAvg: reviewAvgData.data
        })
    }
    const getBookData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((response) => response.data)
            .then(
                (result) => {
                    console.log(result.data);
                    setBook([...result.data]);
                },
                (error) => {
                    console.log("sth wrong");
                }
            );
    };
    return (
        <div className="container">
            {book.length > 0 &&
                book.map((item, idx) => (
                    <div key={idx}>
                        <h1 className="fs-4 fw-bold d-inline">
                            Category {item.category_name}{" "}
                        </h1>
                        <hr className="mt-4 mb-5"></hr>
                        <div className="row">
                            <div className="col-md-8">
                                <Card className="book-detail">
                                   
                                    <div className="col-md-6 pl-1">
                                            <Card.Img
                                                src={
                                                    "http://127.0.0.1:8000/images/bookcover/" +
                                                    item.book_cover_photo +
                                                    ".jpg"
                                                }
                                            />
                                            <Card.Text className="card-author">
                                                By(author) {item.author_name}
                                            </Card.Text>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mt-3">
                                                <Card.Title>
                                                    <strong>{item.book_title}</strong>
                                                </Card.Title>
                                                <Card.Text>
                                                    {item.book_summary}
                                                </Card.Text>
                                            </div>
                                        </div>
                                   
                                </Card>
                            </div>
                            <div className="col-md-4">
                                <Card className="book-price">
                                    <Card.Footer className="card_price"><del><span>${item.book_price}</span></del> <strong>${item.final_price}</strong></Card.Footer>
                                    <Card.Text>Quantity</Card.Text>
                                    <div className="mt-5 px-5">
                                        <Button variant="secondary"  size="sm">
                                            -
                                        </Button>
                                        <Button variant="secondary" size="sm">
                                            +
                                        </Button>
                                    </div>
                                    <div className="d-grid gap-2 ">
                                        <Button variant="secondary" size="lg">
                                           Add to cart 
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}

            <div className="row book-review">
                <div className="col-md-8">

                    <Card>
                        <Card.Title className="fw-bold fs-4 d-inline">
                            <strong>Customer Reviews</strong> (Filtered by 5 start)
                        </Card.Title>
                        <Card.Text>{bookReview.reviewAvg} Start</Card.Text>

                        <div className="d-flex">
                            <div><Card.Text><strong>({bookReview.reviewTotal})</strong></Card.Text></div>
                            <div><Card.Text>(Total rating start)</Card.Text></div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Card.Text>Showing 1-12 of {bookReview.reviewTotal} reviews</Card.Text>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Sort by on sale"
                                className="btn_sort"
                            >
                                <Dropdown.Item href="">
                                    Sort by date newest to oldest
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    Sort by date oldest to newest
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Show 20"
                                className="btn_page"
                            >
                                <Dropdown.Item href="">Show 5</Dropdown.Item>
                                <Dropdown.Item href="">Show 10</Dropdown.Item>
                                <Dropdown.Item href="">Show 15</Dropdown.Item>
                                <Dropdown.Item href="">Show 20</Dropdown.Item>
                            </DropdownButton>
                            
                        </div>
                        <div className="col-md-12 mt-5">
                                {   bookReview.reviewList.length > 0 &&
                                    bookReview.reviewList.map((item,id)=>(
                                        <div key={id}>
                                            <Card.Title><strong>{item.review_title}</strong> | {item.rating_start} stars</Card.Title>
                                            <Card.Text>{item.review_details}</Card.Text>
                                            <Card.Text>{item.review_date}</Card.Text>
                                            <hr className="mt-5"></hr>
                                        </div>
                                    ))
                                }
                        </div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Form className="review-form">
                        <Form.Label>Write a Review</Form.Label>
                        <hr className="mt-4 mb-5"></hr>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add a title</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>
                                Details Please! You review helps other shoppers.
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Select a rating start</Form.Label>
                        </Form.Group>

                        <hr className="mt-4 mb-5"></hr>
                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Detail;
