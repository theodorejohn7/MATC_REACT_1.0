import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useUserLoginContext } from "../../context/UserLoginContext";

import "bootstrap/dist/css/bootstrap.css";
import "react-multi-carousel/lib/styles.css";

type ProductItemProps = {
  image: string;
  title: string;
  description: string;
  id: number;
  netWeight: number;
  grossWeight: number;
  discPrice: number;
  price: number;
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
}: ProductItemProps) {


  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity: number = getItemQuantity(id);

  const { isLoggedin, setNotLoggedinPopup } = useUserLoginContext();

  const checkLoginIncreaseQuantity = (id1: number) => {
 

    if (isLoggedin) {
      increaseCartQuantity(id1);
    } else {
      setNotLoggedinPopup();
    }
  };

  return (
    <div
      style={{ height: "28rem" }}
      data-testid={`test_${id}`}
      className="py-4  align-items-center justify-content-center d-flex  "
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
          boxShadow: "3px 3px 10px 3px #000000",
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
              // <Button className="  " onClick={() => increaseCartQuantity(id)}>
              <Button
                className="  "
                onClick={() => checkLoginIncreaseQuantity(id)}
              >
                Add to Cart
              </Button>
            ) : (isLoggedin&&<>
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
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span>
                    in cart
                  </div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
              </div>
            </>

            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
