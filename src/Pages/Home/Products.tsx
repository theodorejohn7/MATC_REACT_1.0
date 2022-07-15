import Card from "react-bootstrap/Card";

import Carousel from "react-multi-carousel";

import React, { useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { mongoInstance } from "../../axios/instance";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "react-multi-carousel/lib/styles.css";

interface IPost {
  image: string;
  userId?: number;
  title: string;
  description: string;
  price: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
}

const defaultPosts: IPost[] = [];

const Products = () => {

const API_URL = process.env.REACT_APP_API_URL;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      paritialVisibilityGutter: 15,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      paritialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      paritialVisibilityGutter: 5,
    },
  };

  const [seafoodPosts, setSeafoodPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [chickenPosts, setChickenPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [muttonPosts, setMuttonPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User cancelled operation");
    }
  }; 

  React.useEffect(() => {
    mongoInstance
      .get<IPost[]>(`${API_URL}api/category/mutton`, {
        timeout: 10000,
      })
      .then((response) => {
        console.log("api response", response.data);
        setMuttonPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log("error", ex);
        let error1 = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setError(error1);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    mongoInstance
      .get<IPost[]>(`${API_URL}api/category/chicken`, {
        timeout: 10000,
      })
      .then((response) => {
        console.log("api response", response.data);
        setChickenPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log("error", ex);
        let error1 = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setError(error1);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    mongoInstance
      .get<IPost[]>(`${API_URL}api/category/seafood`, {
        timeout: 10000,
      })
      .then((response) => {
        console.log("api response", response.data);
        setSeafoodPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log("error", ex);
        let error1 = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setError(error1);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading && <button onClick={handleCancelClick}>Cancel</button>}
      <div>
        <h3 className="display-1">Mutton</h3>

        <Carousel
          ssr
          partialVisbile
          itemClass="image-item"
          responsive={responsive}
        >
          {muttonPosts.map((post, index) => {
            if (index < 13)
              return (
                <div>
                  <Card
                    key={index}
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
                      src={post.image}
                      className="m-0 p-0 img-fluid"
                      style={{
                        width: "16rem",
                        height: "8rem",
                        borderRadius: "8px",
                        boxShadow: "3px 3px 10px 3px #cc3300",
                      }}
                    />

                    <Card.Body className="  p-0 m-0">
                      <Card.Header
                        className="  m-0"
                        style={{ borderRadius: "10px" }}
                      >
                        <h6 className="text-center p-0 m-0">
                          {post.title.charAt(0).toUpperCase() +
                            post.title.substring(1, 40)}
                        </h6>
                        {post.title.length < 23 ? <br /> : ""}
                      </Card.Header>

                      <Card.Text className="text-center  ">
                        <p
                          className="lh-1 py-1 fw-light"
                          style={{ fontSize: "14px" }}
                        >
                          {post.description.charAt(0).toUpperCase() +
                            post.description.substring(1, 60)}
                        </p>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="  p-0 m-0">
                      <p className="p-0 m-0" style={{ fontSize: "11px" }}>
                        {"Net. Wt.: " + post.netWeight + "gms"}{" "}
                        {"Gross Wt.: " + post.grossWeight + "gms"}
                      </p>
                    </Card.Footer>
                    <Card.Footer>
                      <p style={{ fontSize: "12px" }}>
                        {post.discPrice - post.price < 0 ? (
                          <span>
                            <del>Price : ₹{post.price}</del> Disc Price : ₹
                            {post.discPrice}
                          </span>
                        ) : (
                          <span>Price : ₹{post.price}</span>
                        )}
                      </p>
                    </Card.Footer>
                    <Button variant="primary" type="button">
                      Buy{" "}
                    </Button>
                  </Card>
                </div>
              );
          })}
        </Carousel>
      </div>

      {/* CHICKEN */}

      <h3 className="display-1">Chicken</h3>

      <Carousel
        ssr
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {chickenPosts.map((post, index) => {
          if (index < 13)
            return (
              <div>
              <Card
                key={index}
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
                  src={post.image}
                  className="m-0 p-0 img-fluid"
                  style={{
                    width: "16rem",
                    height: "8rem",
                    borderRadius: "8px",
                    boxShadow: "3px 3px 10px 3px #cc3300",
                  }}
                />

                <Card.Body className="  p-0 m-0">
                  <Card.Header
                    className="  m-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <h6 className="text-center p-0 m-0">
                      {post.title.charAt(0).toUpperCase() +
                        post.title.substring(1, 40)}
                    </h6>
                    {post.title.length < 23 ? <br /> : ""}
                  </Card.Header>

                  <Card.Text className="text-center  ">
                    <p
                      className="lh-1 py-1 fw-light"
                      style={{ fontSize: "14px" }}
                    >
                      {post.description.charAt(0).toUpperCase() +
                        post.description.substring(1, 60)}
                    </p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="  p-0 m-0">
                  <p className="p-0 m-0" style={{ fontSize: "11px" }}>
                    {"Net. Wt.: " + post.netWeight + "gms"}{" "}
                    {"Gross Wt.: " + post.grossWeight + "gms"}
                  </p>
                </Card.Footer>
                <Card.Footer>
                  <p style={{ fontSize: "12px" }}>
                    {post.discPrice - post.price < 0 ? (
                      <span>
                        <del>Price : ₹{post.price}</del> Disc Price : ₹
                        {post.discPrice}
                      </span>
                    ) : (
                      <span>Price : ₹{post.price}</span>
                    )}
                  </p>
                </Card.Footer>
                <Button variant="primary" type="button">
                  Buy{" "}
                </Button>
              </Card>
            </div>
            );
        })}
      </Carousel>

      {/* SeaFood */}

      <h3 className="display-1">Sea Foods</h3>
      <Carousel
        ssr
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {seafoodPosts.map((post, index) => {
          if (index < 13)
            return (
              <div>
              <Card
                key={index}
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
                  src={post.image}
                  className="m-0 p-0 img-fluid"
                  style={{
                    width: "16rem",
                    height: "8rem",
                    borderRadius: "8px",
                    boxShadow: "3px 3px 10px 3px #cc3300",
                  }}
                />

                <Card.Body className="  p-0 m-0">
                  <Card.Header
                    className="  m-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <h6 className="text-center p-0 m-0">
                      {post.title.charAt(0).toUpperCase() +
                        post.title.substring(1, 40)}
                    </h6>
                    {post.title.length < 23 ? <br /> : ""}
                  </Card.Header>

                  <Card.Text className="text-center  ">
                    <p
                      className="lh-1 py-1 fw-light"
                      style={{ fontSize: "14px" }}
                    >
                      {post.description.charAt(0).toUpperCase() +
                        post.description.substring(1, 60)}
                    </p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="  p-0 m-0">
                  <p className="p-0 m-0" style={{ fontSize: "11px" }}>
                    {"Net. Wt.: " + post.netWeight + "gms"}{" "}
                    {"Gross Wt.: " + post.grossWeight + "gms"}
                  </p>
                </Card.Footer>
                <Card.Footer>
                  <p style={{ fontSize: "12px" }}>
                    {post.discPrice - post.price < 0 ? (
                      <span>
                        <del>Price : ₹{post.price}</del> Disc Price : ₹
                        {post.discPrice}
                      </span>
                    ) : (
                      <span>Price : ₹{post.price}</span>
                    )}
                  </p>
                </Card.Footer>
                <Button variant="primary" type="button">
                  Buy{" "}
                </Button>
              </Card>
            </div>
            );
        })}
      </Carousel>

      {error && <p className="error">{error}</p>}

      <br />
    </div>
  );
};

export default Products;
