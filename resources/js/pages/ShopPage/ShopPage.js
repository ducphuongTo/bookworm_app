import React, { useState, useEffect } from "react";
import "./ShopPage.css";
import axios from "axios";
import { Card, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";
import Axios from "axios";
import { isSet } from "lodash";

function ShopPage() {
    const [state, setState] = useState({
        book: [],
    });

    const [category, setCategory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [rating, setRating] = useState([]);

    const [stateSort, setStateSort] = useState({
        sort: "",
        descPrice: "",
        ascPrice: "",
        paginate: "",
    });
    const handleClick = async (e) => {
        let url = "http://127.0.0.1:8000/api/book/condition";
        let arr = [];
        
        // let newUrl = url.split("/");
        // console.log(newUrl);
        // const a = arr.split("?")[0];
        arr.push(`${e}`);

        // console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
                url += "?" + arr[i];
            } else {
                url += "&" + arr[i];
            }
        }

        // console.log(url);
        axios.get(url).then((res) => {
            const data = res.data;
            console.log(data);
            setState({ book: data.data.data });
        });
    };

    const allSaleBook = async () => {
        const saleBooks = await Axios.get(
            "http://127.0.0.1:8000/api/books/allSale"
        );
        console.log(saleBooks.data.data.original.data);
        setState({
            book: saleBooks.data.data.original.data,
        });
    };

    const bookByDesc = async () => {
        const priceByDescData = await Axios.get(
            `http://127.0.0.1:8000/api/book/condition?sort[final_price]=${stateSort.descPrice}`
        );
        console.log(priceByDescData.data.data);
        setState({
            bookByDesc: priceByDescData.data.data.data,
        });
    };

    const getCategoryData = () => {
        axios
            .get("http://127.0.0.1:8000/api/categories/shopPage")
            .then((res) => res.data)
            .then((result) => {
                console.log(result);
                setCategory(result);
            });
    };

    const getAuthorData = () => {
        axios
            .get("http://127.0.0.1:8000/api/authors/shopPage")
            .then((res) => res.data)
            .then((result) => {
                console.log(result);
                setAuthor(result);
            });
    };

    const getRatingData = () => {
        axios
            .get("http://127.0.0.1:8000/api/rating-start/shopPage")
            .then((res) => res.data)
            .then((result) => {
                console.log(result);
                setRating(result);
            });
    };

    useEffect(() => {
        getCategoryData();
        getAuthorData();
        getRatingData();
        // getBooksData();
        allSaleBook();

        // bookByDesc();
    }, []);
    return (
        <>
            <div className="container">
                <h1 className="fs-4 fw-bold d-inline">Books </h1>
                <div className="d-inline fw-light">
                    ( Filltered by Category: , Author: , Star: )
                </div>

                <hr className="mt-10 mb-5"></hr>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Filter By</h2>
                        <div className="accordion mt-4">
                            <div className=" accordion-item rounded-3 border border-1 border-dark category">
                                <h2 className="mb-0 accordion-header">
                                    <button
                                        className="btn btn-accordion btn-block text-left"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Category
                                    </button>
                                </h2>
                                <div>
                                    <div>
                                        <ul className="list-group">
                                            {category.length !== null &&
                                                category.map((item, id) => (
                                                    <li role="button" key={id}>
                                                        {item.category_name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className=" accordion-item rounded-3 border border-1 border-dark category">
                                <h2 className="mb-0 accordion-header">
                                    <button
                                        className="btn btn-accordion btn-block text-left"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Author
                                    </button>
                                </h2>
                                <div>
                                    <div>
                                        <ul className="list-group">
                                            {author.length !== null &&
                                                author.map((item, id) => (
                                                    <li role="button" key={id}>
                                                        {item.author_name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className=" accordion-item rounded-3 border border-1 border-dark category">
                                <h2 className="mb-0 accordion-header">
                                    <button
                                        className="btn btn-accordion btn-block text-left"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Rating Review
                                    </button>
                                </h2>
                                <div>
                                    <div>
                                        <ul className="list-group">
                                            {rating.length !== null &&
                                                rating.map((item, id) => (
                                                    <li role="button" key={id}>
                                                        {item.rating_start}{" "}
                                                        Start
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="d-flex justify-content-between">
                            <p className="bookShow">
                                Showing 1-12 of 126 books
                            </p>
                            <div className="d-flex">
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title="Sort by on sale"
                                    className="d-inline mx-4"
                                    onSelect={handleClick}
                                >
                                    <Dropdown.Item eventKey="sort[sub_price]=desc">
                                        Sort by on sale
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="desc">
                                        Sort by on popularity
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="sort[final_price]=asc">
                                        Sort by on price low to high
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="sort[final_price]=desc">
                                        Sort by on price high to low
                                    </Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title="Show 20"
                                    onSelect={handleClick}
                                >
                                    <Dropdown.Item eventKey="paginate=5">
                                        Show 5
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=10">
                                        Show 10
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=15">
                                        Show 15
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=20">
                                        Show 20
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>

                        <Container>
                            <Row>
                                {state.book.length > 0 &&
                                    state.book.map((item) => {
                                        return (
                                            <Col md={3} key={item.id}>
                                                <Card>
                                                    <Card.Img
                                                        src={
                                                            "http://localhost:8000/images/bookcover/" +
                                                            item.book_cover_photo +
                                                            ".jpg"
                                                        }
                                                    />
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
                                                            <span>
                                                                $
                                                                {
                                                                    item.book_price
                                                                }
                                                            </span>
                                                        </del>
                                                        $ {item.discount_price}
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopPage;
