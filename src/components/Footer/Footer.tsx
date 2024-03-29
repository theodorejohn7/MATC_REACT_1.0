import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <hr />
      <Container>
        <Row>
          <Col>
            <h5 className="footerTitle">COMPANY</h5>
            <hr />
            <p>Privacy Policy</p>
            <p>Terms and Condition</p>
            <p>Help & Support</p>
          </Col>
          <Col>
            {" "}
            <h5 className="footerTitle">STAY CONNECTED</h5>
            <hr />
            <p>customercare@shop.in</p>
            <p>Chennai - 9789123619</p>
            <p>Bangalore - 9748648012</p>
          </Col>
          <Col>
            {" "}
            <h5 className="footerTitle"> OPTIMISED FOR MOBILE</h5>
            <hr />
            <div className="mb-4">
              <img src="./img/app-store.svg" alt="app-store" />
            </div>
            <div>
              <img src="./img/play-store.png" alt="play-store" />
            </div>
          </Col>
        </Row>
      </Container>

      <hr />
      <p className="footer-Courtesy">Image Courtesy : https://www.licious.in/</p>
    </div>
  );
};

export default Footer;
