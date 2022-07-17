import Card from "react-bootstrap/Card";

import Carousel from "react-multi-carousel";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";

import React, { useState, useCallback } from "react";
import axios, { CancelTokenSource } from "axios";
import { mongoInstance } from "../../axios/instance";
import { Button } from "react-bootstrap";
import { getMuttonData, editMuttonData } from "../../redux/action/testAction";

import { SingleProduct } from "./SingleProduct";

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
  units?: number;
  category: string;
  id: number;
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
      breakpoint: { max: 1024, min: 750 },
      items: 3,
      paritialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
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

  const [tempPosts, setTempPosts]: [IPost[], (posts: IPost[]) => void] =
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

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User cancelled operation");
    }
  };


  const fetchMuttonRecordsData = useCallback(async () => {
    console.log("inside fetch mutton");
    try {
      dispatch(getMuttonData());
    } catch (error_1) {
      console.log(error_1);
    }
  }, [dispatch]);

  const editMuttonRecordsData = useCallback(
    async (data: any) => {
      try {
        dispatch(editMuttonData(data));
      } catch (error_1) {
        console.log(error_1);
      }
    },
    [dispatch]
  );

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
      // .catch((ex) => {
      //   console.log("error", ex);
      //   let error1 = axios.isCancel(ex)
      //     ? "Request Cancelled"
      //     : ex.code === "ECONNABORTED"
      //     ? "A timeout has occurred"
      //     : ex.response.status === 404
      //     ? "Resource Not Found"
      //     : "An unexpected error has occurred";
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
    fetchMuttonRecordsData();
  }, []);

  const muttonRecordsData = useSelector(
    (state: any) => state.testReducer?.getMuttonData
  );

  React.useEffect(() => {
    if (muttonRecordsData) {
      console.log("@$# 292", muttonRecordsData);
      setMuttonPosts(muttonRecordsData);
    }
  }, [muttonRecordsData]);

  //   setMuttonPosts(muttonRecordsData);
  // console.log("mutton redux data",muttonRecordsData)

   

  // React.useEffect(() => {
  //   mongoInstance
  //     .get<IPost[]>(`${API_URL}api/category/mutton`, {
  //       timeout: 10000,
  //     })
  //     .then((response) => {
  //       console.log("api response", response.data);
  //       setMuttonPosts(response.data);
  //       setLoading(false);
  //     })
  //     .catch((ex) => {
  //       console.log("error", ex);
  //       let error1 = axios.isCancel(ex)
  //         ? "Request Cancelled"
  //         : ex.code === "ECONNABORTED"
  //         ? "A timeout has occurred"
  //         : ex.response.status === 404
  //         ? "Resource Not Found"
  //         : "An unexpected error has occurred";

  //       setError(error1);
  //       setLoading(false);
  //     });
  // }, );
  // conso
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

      <div className="">
        <h3 className="display-1">Mutton</h3>
        <Carousel
          ssr
          partialVisbile
          itemClass="image-item"
          responsive={responsive}
        >
           { muttonPosts.map((item) => <SingleProduct {...item} />)}
        </Carousel>
      </div>
      <div>
        <h3 className="display-1">Chicken</h3>
        <Carousel
          ssr
          partialVisbile
          itemClass="image-item"
          responsive={responsive}
        >
           { chickenPosts.map((item) => <SingleProduct {...item} />)}
        </Carousel>
      </div>
      <div>
        <h3 className="display-1">Sea Foods</h3>
        <Carousel
          ssr
          partialVisbile
          itemClass="image-item"
          responsive={responsive}
        >
           { seafoodPosts.map((item) => <SingleProduct {...item} />)}
        </Carousel>
      </div>

      {loading && <button onClick={handleCancelClick}>Cancel</button>}
       
  

      {error && <p className="error">{error}</p>}

      <br />
    </div>
  );
};

export default Products;
