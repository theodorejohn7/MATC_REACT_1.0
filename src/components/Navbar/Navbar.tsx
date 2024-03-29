import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useUserLoginContext } from "../../context/UserLoginContext";

export default function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const { isLoggedin, isAdmin, logout, currentUser } = useUserLoginContext();

  return (
    <NavbarBs
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="bg-white shadow mb-3 ">
      <Container>
        <NavbarBs.Brand className="navbar-LogoText">
          <Nav.Link to="/home" as={NavLink}>
            Our Meat Store
          </Nav.Link>
        </NavbarBs.Brand>
        {isLoggedin && <div className="  d-none d-lg-block  "> Welcome {currentUser}</div>}

        <div className="d-flex">
          <NavbarBs.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto navbar-Text">
              <Nav.Link to="/home" as={NavLink}>
                Store
              </Nav.Link>
              {!isLoggedin && (
                <Nav.Link to="/login" as={NavLink}>
                  Login
                </Nav.Link>
              )}
              {!isLoggedin && (
                <Nav.Link to="/register" as={NavLink}>
                  Register
                </Nav.Link>
              )}
              {isAdmin && (
                <Nav.Link to="/productmgmt" as={NavLink}>
                  Product Management
                </Nav.Link>
              )}
              {isLoggedin && (
                <Nav.Link to="/home" onClick={() => logout()} as={NavLink}>
                  Log Out
                </Nav.Link>
              )}
            </Nav>
          </NavbarBs.Collapse>
          <NavbarBs.Toggle aria-controls="responsive-navbar-nav " />
          {cartQuantity > 0 && isLoggedin && (
            <Button
              onClick={openCart}
              className="rounded mx-2 h-75 navbar-Cart"
              variant="outline-dark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>

              <span className=" navbar-CartQuantity  rounded-circle bg-danger d-flex justify-content-center align-items-center">
                {cartQuantity}
              </span>
            </Button>
          )}
        </div>
      </Container>
    </NavbarBs>
  );
}
