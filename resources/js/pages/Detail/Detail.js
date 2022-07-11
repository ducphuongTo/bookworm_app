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
import swal from "sweetalert";
import moment from "moment";
import Axios from "axios";

function Detail() {
    let { id } = useParams();
    const [book, setBook] = useState([]);
    const [bookReview, setBookReview] = useState({
        reviewTotal: 0,
        reviewAvg: 0,
        reviewList: [],
        reviewCountStart: [],
        sort: "",
    });
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDetails, setReviewDetails] = useState("");
    const [reviewStar, setReviewStar] = useState({
        reviewStar: 1,
    });
    const handleChangeReviewStar = (e) => {
        setReviewStar((prevStateStar) => ({
            ...prevStateStar,
            reviewStar: e.target.value,
        }));
    };
    const [stateQty, setStateQty] = useState(1);
    const handleIncreaseQuantity = (e) =>{
        setStateQty(stateQty + 1 <= 8 ? stateQty + 1 : 8)
    }
    const handleDecreaseQty = (e)=>{
        setStateQty(stateQty - 1 >=1 ? stateQty -1 : 1)
    }


    const handleAddToCart = (e) => {
        const quantity = stateQty;
        let cart = [];
        let cartItems = {};
        let total_cart = 0;
        let totalCartPrice;
        
        
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            swal(
                "Add to cart successfully",
                "",
                "success"
            );
        }
        if (localStorage.getItem("total_cart")) {
            total_cart = JSON.parse(localStorage.getItem("total_cart"));
        }
        if(localStorage.getItem("totalCartPrice"))
        {
            totalCartPrice = JSON.parse(localStorage.getItem("totalCartPrice"))
        }
        let idBook = id;
        const findIndex = cart.findIndex(
            (e) => e.id.toString() === idBook.toString()
        );
        if (findIndex !== -1) {
            cart[findIndex].quantity += quantity;
            total_cart += quantity;
            totalCartPrice = cart.reduce((acc,item)=>acc + item.final_price * item.quantity,0)
        } else {
            cartItems = {
                id: book[0].id,
                author_id: book[0].author_id,
                book_title: book[0].book_title,
                author_name: book[0].author_name,
                book_price: book[0].book_price,
                book_cover_photo: book[0].book_cover_photo,
                discount_price: book[0].book_price,
                final_price: book[0].final_price,
                average_start: book[0].average_start,
                quantity: quantity,
                
            };
            cart.push(cartItems);
            total_cart+=quantity;
            totalCartPrice = cart.reduce((acc,item)=>acc + item.final_price * item.quantity,0)
            
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total_cart", JSON.stringify(total_cart));
        localStorage.setItem("totalCartPrice", JSON.stringify(totalCartPrice));
    };

    useEffect(() => {
        getBookData();
        getReviewData();
    }, []);

    const initial_url = `http://127.0.0.1:8000/api/review/sort/${id}`;
    const [per_page, setPerPage] = useState(5);
    const [current_sort, setCurrentSort] = useState("sort[review_date]=desc");
    const [current_sort_display, setCurrentSortDisplay] =
        useState("Sort by newest to oldest");
    
        const handleSortData = async ({
            page = undefined,
            perPage = per_page,
            sort = current_sort,
            
        } = {}) => {
            let url = `${initial_url}?${sort}&paginate=${perPage}`;
            if (page > 1) {
                url += `&page=${page}`;
            }
            const response = await Axios.get(url);
            setBook({
                book: response.data.data.data,
            });
        };

    const getReviewData = async () => {
        const reviewListData = await axios.get(
            `http://127.0.0.1:8000/api/review/${id}`
        );
        const reviewTotalData = await axios.get(
            `http://127.0.0.1:8000/api/review/total/${id}`
        );
        const reviewAvgData = await axios.get(
            `http://127.0.0.1:8000/api/review/avgStart/${id}`
        );
        const reviewCountStartData = await axios.get(
            `http://127.0.0.1:8000/api/review/countStart/${id}`
        );
        setBookReview({
            reviewList: reviewListData.data,
            reviewTotal: reviewTotalData.data,
            reviewAvg: reviewAvgData.data,
            reviewCountStart: reviewCountStartData.data,
        });
    };
    const getBookData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((response) => response.data)
            .then(
                (result) => {
                    // console.log(result.data);
                    setBook([...result.data]);
                },
                (error) => {
                    console.log("Can not get book data");
                }
            );
    };
    const handleSubmitPreview = async () => {
        const resData = await axios.post(
            "http://127.0.0.1:8000/api/review/book",
            {
                book_id: id,
                review_title: reviewTitle,
                review_details: reviewDetails,
                rating_start: reviewStar.reviewStar,
            }
        );
        if (resData.data.success) {
            getReviewData();
            swal(
                "Page will reload after 5 seconds",
                resData.data.message,
                "success"
            );
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
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
                                    <div className="col-md-6">
                                        <Card.Img
                                            src={
                                                "http://127.0.0.1:8000/images/bookcover/" +
                                                item.book_cover_photo +
                                                ".jpg"
                                            }
                                            className="img-detail"
                                        />
                                        <Card.Text className="text-detail">
                                            By(author){" "}
                                            <strong>{item.author_name}</strong>
                                        </Card.Text>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mt-3">
                                            <Card.Title>
                                                <strong>
                                                    {item.book_title}
                                                </strong>
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
                                    <Card.Footer className="card_price">
                                        <del>
                                            <span>${item.book_price}</span>
                                        </del>{" "}
                                        <strong>${item.final_price}</strong>
                                    </Card.Footer>

                                    <div className="px-5">
                                        <Card.Text className="qty">
                                            Quantity
                                        </Card.Text>
                                        <div className="bm-flex bg-quantity text-white height-quantity control_qty">

                                                <button
                                                    type="button"
                                                    className="btn  text-white btn_qty"
                                                    onClick={handleDecreaseQty}
                                                >
                                                    -
                                                </button>
                                            <div className="item_qty">
                                                {stateQty}
                                            </div>

                                                <button
                                                    type="button"
                                                    className="btn text-white btn_qty"
                                                    onClick={handleIncreaseQuantity}
                                                >
                                                    +
                                                </button>

                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 addToCart">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="btn-add"
                                            width="15rem"
                                            onClick={handleAddToCart}
                                        >
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
                        <div className="card-head">
                            <Card.Title className="fw-bold fs-4 d-inline">
                                <strong>Customer Reviews</strong> (Filtered by 5
                                start)
                            </Card.Title>
                            <Card.Text>
                                <strong>{bookReview.reviewAvg} Start</strong>
                            </Card.Text>

                            <div className="d-flex">
                                <div>
                                    <Card.Text>
                                        <strong>
                                            ({bookReview.reviewTotal})
                                        </strong>
                                    </Card.Text>
                                </div>
                                {bookReview.reviewCountStart.length > 0 &&
                                    bookReview.reviewCountStart.map(
                                        (item, i) => (
                                            <div key={i}>
                                                <Card.Text
                                                    style={{
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                >
                                                    {" "}
                                                    {item.rating_start} start (
                                                    {item.count}) |{" "}
                                                </Card.Text>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>

                        <div className="d-flex show_review">
                            <Card.Text>
                                Showing ... of {bookReview.reviewTotal} reviews
                            </Card.Text>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Sort by on sale"
                                className="btn_sort"
                                onSelect={handleSortData}
                            >
                                <Dropdown.Item eventKey="sort[review_date]=desc">
                                    Sort by date newest to oldest
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="sort[review_date]=asc">
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
                            {bookReview.reviewList.length > 0 &&
                                bookReview.reviewList.map((item, id) => (
                                    <div key={id}>
                                        <Card.Title>
                                            <strong>{item.review_title}</strong>{" "}
                                            | {item.rating_start} stars
                                        </Card.Title>
                                        <Card.Text>
                                            {item.review_details}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>
                                                {moment(
                                                    item.review_date
                                                ).format("LL")}
                                            </strong>
                                        </Card.Text>
                                        <hr className="mt-5"></hr>
                                    </div>
                                ))}
                        </div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Form className="review-form">
                        <Form.Label className="form-heading">
                            Write a Review
                        </Form.Label>
                        <hr></hr>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add a title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add title here!"
                                onChange={(e) => setReviewTitle(e.target.value)}
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
                                type="text"
                                placeholder="Details go here"
                                onChange={(e) =>
                                    setReviewDetails(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Select a rating start</Form.Label>
                        </Form.Group>
                        <select
                            className="dropdown btn bg-quantity "
                            onChange={handleChangeReviewStar}
                        >
                            <option value={1} className="bg-quantity">
                                1 Star
                            </option>
                            <option value={2} className="bg-quantity">
                                2 Star
                            </option>
                            <option value={3} className="bg-quantity">
                                3 Star
                            </option>
                            <option value={4} className="bg-quantity">
                                4 Star
                            </option>
                            <option value={5} className="bg-quantity">
                                5 Star
                            </option>
                        </select>
                        <hr className="mt-4"></hr>
                        <Button
                            variant="primary"
                            type="button"
                            className="btn-submit"
                            onClick={handleSubmitPreview}
                        >
                            Submit Review
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Detail;
