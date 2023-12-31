import React from "react";
import { CartContext } from "../../context/Context";
import {
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from "react-bootstrap";

let id = localStorage.getItem("id");

const CartPro = () => {
  const {
    state: { cart, totalValue },
    dispatch,
  } = CartContext();

  const deleteFechfunction = (itemId) => {
    fetch(
      `https://auth-app-ff8fe-default-rtdb.firebaseio.com/${id}/${itemId}.json`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <div>
      <ListGroup>
        <Row style={{ fontSize: "25px", margin: "6px 0px 0px 22px" }}>
          <Col>Item</Col>
          <Col>Price</Col>
          <Col>Quantity</Col>
        </Row>
        <br></br>
        {cart.map((item) => (
          <ListGroupItem key={item.id}>
            <Row>
              <Col md={2}>
                <Image src={item.image} fluid roundedCircle></Image>
              </Col>
              <Col md={2}>
                <span>{item.title.slice(0, 10)}..</span>
              </Col>
              <Col md={3}>Rs.{item.price}</Col>
              <Col md={2}>
                <FormControl
                  onChange={(e) => {
                    dispatch({
                      type: "CHANGING_ITEM_QTY",
                      payload: { item: item, qty: e.target.value },
                    });
                  }}
                ></FormControl>
              </Col>
              <Col md={2}>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch({ type: "REMOVE_FROM_CART", payload: item });
                    deleteFechfunction(item.cryticid);
                  }}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
        <Row style={{ fontSize: "20px", margin: "21px 0px 30px 14rem" }}>
          <Col
            style={{
              fontSize: "30px",
              fontWeight: 700,
              margin: "-10px 0px 0px 0rem",
            }}
          >
            Total
          </Col>
          <Col>Rs.{totalValue.toFixed(2)}</Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="success">Purchase</Button>
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
};

export default CartPro;
