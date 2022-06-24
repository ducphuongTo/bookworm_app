import React from "react";
import { Card } from "react-bootstrap";

function CardProductList({ ...props }) {
    return (
        <div>
            <Card>
                <Card.Img src={props.img} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardProductList;
