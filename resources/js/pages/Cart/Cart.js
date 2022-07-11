import { React, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./Cart.css";
import Axios from "axios";
import axios from "axios";
import { reduce } from "lodash";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Cart() {
    const [stateCartTotal, setStateCartTotal] = useState({
        cartTotal: 0,
    });

    const [book, setBook] = useState([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const cart_parse = JSON.parse(cart);
            setBook(cart_parse);
            sumQuantity(cart_parse);
        }
    }, []);

    let totalCartPrice = JSON.parse(localStorage.getItem("totalCartPrice"));
    const getUserData = JSON.parse(localStorage.getItem("auth_data"));
    const user_token = JSON.parse(
        JSON.stringify(localStorage.getItem("auth_token"))
    );
    
    const [stateQty, setStateQty] = useState(1);

    const handleIncreaseQuantity = (id, idx) => {
        if (book[idx].quantity < 8) {
            const newState = book.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, quantity: obj.quantity + 1 };
                }
                return obj;
            });

            setBook(newState);
            localStorage.setItem("cart", JSON.stringify(newState));
            sumQuantity(newState);
        }
    };
    const handleDecreaseQty = (id, idx) => {
        if (book[idx].quantity >= 2) {
            let newState = [];
            newState = book.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, quantity: obj.quantity - 1 };
                }
                return obj;
            });
            setBook(newState);
            sumQuantity(newState);
            localStorage.setItem("cart", JSON.stringify(newState));
        } else {
            let tempBook = [...book];
            tempBook = tempBook.slice(idx, 1);
            setBook(tempBook);
            sumQuantity(tempBook);
            localStorage.setItem("cart", JSON.stringify(tempBook));
        }
    };

    const sumQuantity = (cart) => {
        const initialValue = 0;
        const sum = cart.reduce(
            (previousValue, currentValue) =>
                previousValue + currentValue.quantity,
            initialValue
        );
        setSum(sum);
        localStorage.setItem("total_cart", JSON.stringify(sum));
    };

    const placeOrder = async () => {
        if(getUserData == null)
        {
            swal(
                     "Login before placing order",
                        "Login before placing order",
                        "error"
                );
        }
        else{
            const book_order = [];
            book.forEach((item, index) => {
                book_order.push({
                    book_id: item.id,
                    quantity: item.quantity,
                    price: item.final_price * item.quantity,
                });
            });

            const data = await Axios.post(
                "http://127.0.0.1:8000/api/orders",
                {
                    user_id: getUserData.id,
                    order_amount: totalCartPrice,
                    cart: book_order,
                },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${user_token}`,
                    },
                }
            );
            
            if(data.data.status == 200){
                swal(
                    "Order successfully",
                    data.data.message,
                    "success"
                );
            }
        }
        
       
    };

    return (
        <div className="container cart_container ">
            {book == null ? (
                <>
                    <h1 className="fw-bold d-inline">
                        Your cart: no items in cart
                    </h1>
                    <hr className="mt-10 mb-5"></hr>
                </>
            ) : (
                <>
                    <h1 className="fw-bold d-inline">
                        Your cart: {sum} items in cart
                    </h1>
                    <hr className="mt-10 mb-5"></hr>
                    <div className="row">
                        <div className="col-md-8">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan={1}>
                                            Product
                                        </th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {book.length > 0 &&
                                        book.map((item, idx) => (
                                            <tr key={item.id}>
                                                <td colSpan={3}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <Link
                                                                    target="_blank"
                                                                    to={`books/${item.id}`}
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                        color: "black",
                                                                    }}
                                                                >
                                                                    <img
                                                                        className="img-cart "
                                                                        src={
                                                                            "http://127.0.0.1:8000/images/bookcover/" +
                                                                            item.book_cover_photo +
                                                                            ".jpg"
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <strong className="title-cart">
                                                                    {
                                                                        item.book_title
                                                                    }
                                                                </strong>
                                                                <p>
                                                                    {
                                                                        item.author_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <del
                                                        style={{ color: "red" }}
                                                    >
                                                        ${item.book_price}
                                                    </del>{" "}
                                                    <strong>
                                                        ${item.final_price}{" "}
                                                    </strong>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="bm-flex bg-quantity text-white height-quantity control_qty">
                                                            <button
                                                                type="button"
                                                                className="btn  text-white btn_qty"
                                                                onClick={() =>
                                                                    handleDecreaseQty(
                                                                        item.id,
                                                                        idx
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <div className="item_qty">
                                                                {item.quantity}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn text-white btn_qty"
                                                                onClick={() =>
                                                                    handleIncreaseQuantity(
                                                                        item.id,
                                                                        idx
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>
                                                        $
                                                        {item.final_price *
                                                            item.quantity}
                                                    </strong>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-md-4">
                            <Table striped bordered hover>
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">Cart Totals</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <h2>$ {totalCartPrice}</h2>
                                        <Button
                                            className="btn-order"
                                            onClick={placeOrder}
                                        >
                                            Place Order
                                        </Button>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
