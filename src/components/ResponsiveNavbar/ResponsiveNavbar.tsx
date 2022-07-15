import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ResponsiveNavbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className=" shadow-lg sticky-top"
    >
      <Container>
        <Navbar.Brand href="/home">Our Meat Store</Navbar.Brand>
        <div className=" ">

        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Navbar.Collapse id="responsive-navbar-nav ">

          <Nav >
            <Nav.Link href="/home">Shop</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/productmgmt">Product Management</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </div>

      </Container>
    </Navbar>
  );
}

export default ResponsiveNavbar;
