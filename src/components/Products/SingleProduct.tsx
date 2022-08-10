import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "react-multi-carousel/lib/styles.css";
import React from "react";

type ProductItemProps = {
  image: string;
  title: string;
  description: string;
  id: number;
  netWeight: number;
  grossWeight: number;
  discPrice: number;
  price: number;
  getItemQuantity: (arg0: number) => number;

  increaseCartQuantity: (arg0: number) => void;
  decreaseCartQuantity: (arg0: number) => void;
  removeFromCart: (arg0: number) => void;
  isLoggedin: boolean;
  setNotLoggedinPopup: () => void;
};

export function SingleProduct({
  id,
  image,
  title,
  description,
  netWeight,
  grossWeight,
  discPrice,
  price,
  isLoggedin,
  getItemQuantity,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  setNotLoggedinPopup,
}: ProductItemProps) {
  const quantity: number = getItemQuantity(id);

  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "INR",
    style: "currency",
  });

  function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
  }

  const checkLoginIncreaseQuantity = (id: number) => {
    if (isLoggedin) {
      increaseCartQuantity(id);
    } else {
      setNotLoggedinPopup();
    }
  };

  return (
    <div
      style={{ height: "28rem" }}
      data-testid={`test_${id}`}
      className="py-4 px-2 align-items-center justify-content-center d-flex  "
    >
      <Card
        key={id}
        data-testid={`test_${id}`}
        className=" lh-1 px-1 pt-4 card m-2 h-100"
        style={{
          minWidth: "10rem",
          height: "26rem",
          maxHeight: "50rem",
          overflow: "hidden",
          boxShadow:
            "1.6px 1.6px 1.2px rgba(0, 0, 0, 0.015),  3.4px 3.4px 2.7px rgba(0, 0, 0, 0.022),  5.8px 5.8px 4.6px rgba(0, 0, 0, 0.027),  8.7px 8.7px 6.9px rgba(0, 0, 0, 0.031),  12.5px 12.5px 10px rgba(0, 0, 0, 0.035),  17.7px 17.7px 14.2px rgba(0, 0, 0, 0.039),  25.1px 25.1px 20.1px rgba(0, 0, 0, 0.043),  36.5px 36.5px 29.2px rgba(0, 0, 0, 0.048),  56.3px 56.3px 45px rgba(0, 0, 0, 0.055),  100px 100px 80px rgba(0, 0, 0, 0.07)",
        }}
      >
        <Card.Img
          variant="top"
          src={image}
          className="m-0 p-0 img-fluid"
          style={{
            objectFit: "cover",
            width: "16rem",
            height: "8rem",
            borderRadius: "8px",
            boxShadow: "3px 3px 10px 3px #cc3300",
          }}
        />

        <Card.Body className="  p-0 m-0">
          <Card.Header
            className="  m-0 d-flex justify-content-between align-items-baseline "
            style={{ borderRadius: "10px" }}
          >
            <Card.Title className="text-center p-0 m-0">
              {title.charAt(0).toUpperCase() + title.substring(1, 40)}
            </Card.Title>
            {title.length < 24 ? <br /> : ""}
          </Card.Header>

          <Card.Text className="text-center mb-0 pb-0  ">
            <p
              className="lh-1 py-1 mb-0 pb-0 fw-light"
              style={{ fontSize: "14px" }}
            >
              {description.charAt(0).toUpperCase() +
                description.substring(1, 60)}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="  p-0 m-0">
          <p className="p-0 m-0" style={{ fontSize: "11px" }}>
            {"Net. Wt.: " + netWeight + "gms"}{" "}
            {"Gross Wt.: " + grossWeight + "gms"}
          </p>
        </Card.Footer>
        <Card.Footer className=" ">
          <p className="mb-0 pb-0" style={{ fontSize: "12px" }}>
            {discPrice - price < 0 ? (
              <span>
                <del>Price : {formatCurrency(price)}</del> <br />
                Disc Price :{formatCurrency(discPrice)}
              </span>
            ) : (
              <span>Price : {formatCurrency(price)}</span>
            )}
          </p>
        </Card.Footer>

        <Card.Footer className="d-flex">
          <div className="mt-auto w-100   ">
            {quantity === 0 || !isLoggedin ? (
              <Button
                className="  "
                onClick={() => checkLoginIncreaseQuantity(id)}
              >
                Add to Cart
              </Button>
            ) : (
              isLoggedin && (
                <>
                  <div
                    className="d-flex align-items-center flex-column"
                    style={{ gap: ".5rem" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ gap: "0.5rem" }}
                    >
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(id)}
                      >
                        x
                      </Button>
                      <Button onClick={() => decreaseCartQuantity(id)}>
                        -
                      </Button>
                      <div>
                        <span className="fs-3">{quantity}</span>
                        in cart
                      </div>
                      <Button onClick={() => increaseCartQuantity(id)}>
                        +
                      </Button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
