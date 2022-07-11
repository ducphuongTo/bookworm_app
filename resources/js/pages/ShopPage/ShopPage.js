import React, { useState, useEffect } from "react";
import "./ShopPage.css";
import axios from "axios";
import { Card, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const initial_url = "http://127.0.0.1:8000/api/book/condition";

function ShopPage() {
    const [state, setState] = useState({
        book: [],
    });
    const [category, setCategory] = useState([]);
    const [author, setAuthor] = useState([]);
    const [rating, setRating] = useState([]);
    const getCategoryData = () => {
        axios
            .get("http://127.0.0.1:8000/api/categories/shopPage")
            .then((res) => res.data)
            .then((result) => {
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
                setRating(result);
            });
    };

    useEffect(() => {
        getCategoryData();
        getAuthorData();
        getRatingData();
        getBooks();
    }, []);

    const [per_page, setPerPage] = useState(5);
    const [total_page, setTotalPage] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [total_items, setTotalItems] = useState(0);
    const [current_page, setCurrentPage] = useState(1);
    const [current_sort, setCurrentSort] = useState("onSale");
    const [current_sort_display, setCurrentSortDisplay] =
        useState("Sort by on sale");
    const [current_category, setCurrentCategory] = useState("");
    const [current_author, setCurrentAuthor] = useState("");
    const [current_rating_star, setCurrentRatingStar] = useState("");

    const getBooks = async ({
        page = undefined,
        perPage = per_page,
        sort = current_sort,
        category = "",
        author = "",
        rating_star = "",
    } = {}) => {
        let url = `${initial_url}?${sort}&paginate=${perPage}`;

        if (page > 1) {
            url += `&page=${page}`;
        }

        if (category !== "") {
            url += `&filter[category_name]=${category}`;
        }

        if (author !== "") {
            url += `&filter[author_name]=${author}`;
        }

        if (rating_star !== "") {
            url += `&filter[rating_start]=${rating_star}`;
        }

        const response = await Axios.get(url);

        setState({
            book: response.data.data.data,
        });
        setDataShop(response.data.data);
    };

    const setDataShop = (data) => {
        setTotalPage(data.last_page);
        setFrom(data.from);
        setTo(data.to);
        setTotalItems(data.total);
    };

    const handleCategory = (category) => {
        if (category === current_category) setCurrentCategory("");
        if (category !== current_category) setCurrentCategory(category);
        setCurrentPage(1);
        getBooks({
            perPage: per_page,
            sort: current_sort,
            category,
            author: current_author,
            rating_star: current_rating_star,
        });
    };

    const handleAuthor = (author) => {
        if (author === current_author) setCurrentAuthor("");
        if (author !== current_category) setCurrentAuthor(author);
        setCurrentPage(1);
        getBooks({
            perPage: per_page,
            sort: current_sort,
            category: current_category,
            author,
            rating_star: current_rating_star,
        });
    };

    const handleRatingStar = (rating_star) => {
        if (rating_star === current_rating_star) setCurrentRatingStar("");
        if (rating_star !== current_rating_star)
            setCurrentRatingStar(rating_star);
        setCurrentPage(1);
        getBooks({
            perPage: per_page,
            sort: current_sort,
            category: current_category,
            author: current_author,
            rating_star,
        });
    };

    const handlePageClick = async (pageNumber) => {
        setCurrentPage(pageNumber);
        getBooks({
            page: pageNumber,
            perPage: per_page,
            sort: current_sort,
            category: current_category,
            author: current_author,
            rating_star: current_rating_star,
        });
    };

    const handleClickPerPage = async (per_page) => {
        const get_per_page = parseInt(per_page.split("=")[1]);
        setCurrentPage(1);
        setPerPage(get_per_page);
        getBooks({
            perPage: get_per_page,
            sort: current_sort,
            category: current_category,
            author: current_author,
            rating_star: current_rating_star,
        });
    };

    const handleClickSort = async (sort) => {
        setCurrentPage(1);
        setCurrentSort(sort);
        if (sort === "onSale") setCurrentSortDisplay("Sort by on sale");
        if (sort === "popularity")
            setCurrentSortDisplay("Sort by on popularity");
        if (sort === "finalPriceByAsc")
            setCurrentSortDisplay("Sort by on price low to high");
        if (sort === "finalPriceByDesc")
            setCurrentSortDisplay("Sort by on price high to low");
        getBooks({
            perPage: per_page,
            sort: sort,
            category: current_category,
            author: current_author,
            rating_star: current_rating_star,
        });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-4 fw-bold d-inline">Books </h1>
                <div className="d-inline fw-light">
                    ( Filtered by Category: {current_category} , Author:{" "}
                    {current_author} , Star: {current_rating_star} )
                </div>

                <hr className="mt-10 mb-5"></hr>
                <div className="row">
                    <div className="col-md-2">
                        
                        <h2>Filter By</h2>
                        <div className="accordion mt-4" id="accordionExample">
                            <div className=" accordion-item rounded-3 border border-1 border-dark category">
                                <h2
                                    className="mb-0 accordion-header"
                                    id="headingOne"
                                >
                                    <button
                                        className="btn btn-accordion accordion-button btn-block text-left"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Category
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group">
                                            {category.length !== null &&
                                                category.map((item, id) => (
                                                    <li
                                                        role="button"
                                                        key={id}
                                                        onClick={() =>
                                                            handleCategory(
                                                                item.category_name
                                                            )
                                                        }
                                                        className={`${
                                                            current_category ===
                                                            item.category_name
                                                                ? "active_filter"
                                                                : ""
                                                        }`}
                                                    >
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
                                                    <li
                                                        role="button"
                                                        key={id}
                                                        onClick={() =>
                                                            handleAuthor(
                                                                item.author_name
                                                            )
                                                        }
                                                        className={`${
                                                            current_author ===
                                                            item.author_name
                                                                ? "active_filter"
                                                                : ""
                                                        }`}
                                                    >
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
                                                    <li
                                                        role="button"
                                                        key={`${item.rating_start}-${id}`}
                                                        onClick={() =>
                                                            handleRatingStar(
                                                                item.rating_start
                                                            )
                                                        }
                                                        className={`${
                                                            current_rating_star ===
                                                            item.rating_start
                                                                ? "active_filter"
                                                                : ""
                                                        }`}
                                                    >
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
                                Showing {from}-{to} of{" "}
                                {total_items > 1
                                    ? `${total_items} books`
                                    : `${total_items} book`}
                            </p>
                            <div className="d-flex">
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={current_sort_display}
                                    className="d-inline mx-4"
                                    onSelect={handleClickSort}
                                >
                                    <Dropdown.Item eventKey="onSale">
                                        Sort by on sale
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="popularity">
                                        Sort by on popularity
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="finalPriceByAsc">
                                        Sort by on price low to high
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="finalPriceByDesc">
                                        Sort by on price high to low
                                    </Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={`Show ${per_page}`}
                                    onSelect={handleClickPerPage}
                                >
                                    <Dropdown.Item eventKey="paginate=5">
                                        Show 5
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=15">
                                        Show 15
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=20">
                                        Show 20
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="paginate=25">
                                        Show 25
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>

                        <Container>
                            <Row>
                                {state.book.length > 0 &&
                                    state.book.map((item, idx) => {
                                        return (
                                            <div key={idx} className="col-md-3">
                                                <Link
                                                    to={`books/${item.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        
                                                    }}
                                                >
                                                    <Col>
                                                        <Card className="card-shop">
                                                            <Card.Img
                                                                src={
                                                                    "http://localhost:8000/images/bookcover/" +
                                                                    item.book_cover_photo +
                                                                    ".jpg"
                                                                }
                                                            />
                                                            <Card.Body>
                                                                <Card.Title>
                                                                    {
                                                                        item.book_title
                                                                    }
                                                                </Card.Title>
                                                                <Card.Text className="card-author">
                                                                    {
                                                                        item.author_name
                                                                    }
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
                                                                <strong>
                                                                    {" "}
                                                                    $
                                                                    {
                                                                        item.discount_price
                                                                    }
                                                                </strong>
                                                            </Card.Footer>
                                                        </Card>
                                                    </Col>
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </Row>
                            {total_page > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={current_page}
                                itemsCountPerPage={per_page}
                                totalItemsCount={total_items}
                                pageRangeDisplayed={3}
                                onChange={handlePageClick}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                        </Container>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopPage;
