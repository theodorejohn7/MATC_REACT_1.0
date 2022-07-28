import Carousel from "react-multi-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

import { ProductCard, ProductCardButton } from "theo-components";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { SingleProduct } from "./SingleProduct";
import { mongoInstance } from "../../axios/instance";
import { getMuttonData } from "../../redux/action/MuttonAction";
import { useUserLoginContext } from "../../context/UserLoginContext";
import { useShoppingCart } from "../../context/ShoppingCartContext";

import "bootstrap/dist/css/bootstrap.css";
import "react-multi-carousel/lib/styles.css";

interface IPost {
  image: string;
  title: string;
  category: string;
  description: string;
  userId?: number;
  price: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
  units?: number;
  id: number;
  test: void;
}

const defaultPosts: IPost[] = [];

const Products = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const { setNotLoggedinPopup, isLoggedin, notLoggedIn } =
    useUserLoginContext();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    margin: 0,
    padding: 0,
    p: 4,
  };

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
    useState(defaultPosts);

  const [chickenPosts, setChickenPosts]: [IPost[], (posts: IPost[]) => void] =
    useState(defaultPosts);

  const [muttonPosts, setMuttonPosts]: [IPost[], (posts: IPost[]) => void] =
    useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);

  const muttonRecordsData = useSelector(
    (state: any) => state.muttonReducer?.getMuttonData
  );

  const fetchMuttonRecordsData = useCallback(async () => {
    try {
      dispatch(getMuttonData());
    } catch (error_1) {
      console.log(error_1);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMuttonRecordsData();
  }, []);

  useEffect(() => {
    if (muttonRecordsData) {
      setMuttonPosts(muttonRecordsData);
    }
  }, [muttonRecordsData]);

  useEffect(() => {
    mongoInstance
      .get<IPost[]>(`${API_URL}api/category/chicken`, {
        timeout: 10000,
      })
      .then((response) => {
        setChickenPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log("error", ex);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    mongoInstance
      .get<IPost[]>(`${API_URL}api/category/seafood`, {
        timeout: 10000,
      })
      .then((response) => {
        setSeafoodPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.log("error", ex);
        setLoading(false);
      });
  }, []);

  const test:(id:number)=>void = (id:number) => {
    console.log("test id",id)
  }

  const handlePopupClose = () => {
    setNotLoggedinPopup();
    navigate(`/login`);
  };

  return (
    <div className="App">
      <div className="">
        {!loading && (
          <h3
            className="display-1"
            style={{ textShadow: "2px 2px 6px #171BCE", fontWeight: 350 }}
          >
            TEST - Mutton
          </h3>
        )}
        <Carousel
          ssr
          partialVisible
          itemClass="image-item"
          responsive={responsive}
        >
          {muttonPosts.map((item) => (
            // let newValue=(...item,isLoggedin);
            // console.log(item,isLoggedin);
            // item.getItemQuantity=getItemQuantity;
            // console.log(item);
            //  <SingleProduct {...item} />

            <>
            {item.test=test(item.id)}
            {console.log(item.test)}
              <ProductCard {...item} />
              <ProductCardButton {...item} />
            </>
          ))}
        </Carousel>
      </div>

      <div className="">
        {!loading && (
          <h3
            className="display-1"
            style={{ textShadow: "2px 2px 6px #171BCE", fontWeight: 350 }}
          >
            Mutton
          </h3>
        )}
        <Carousel
          ssr
          partialVisible
          itemClass="image-item"
          responsive={responsive}
        >
          {muttonPosts.map((item) => (
            <SingleProduct {...item} />
          ))}
        </Carousel>
      </div>
      <div>
        {!loading && (
          <h3
            className="display-1 text-dark"
            style={{ textShadow: " 4px 3px 12px #171BCE", fontWeight: 350 }}
          >
            Chicken
          </h3>
        )}

        <Carousel
          ssr
          partialVisible
          itemClass="image-item"
          responsive={responsive}
        >
          {chickenPosts.map((item) => (
            <SingleProduct {...item} />
          ))}
        </Carousel>
      </div>
      <div>
        {!loading && (
          <h3
            className="display-1 text-dark"
            style={{ textShadow: " 4px 3px 12px #171BCE", fontWeight: 350 }}
          >
            Sea Foods
          </h3>
        )}

        <Carousel
          ssr
          partialVisible
          itemClass="image-item"
          responsive={responsive}
        >
          {seafoodPosts.map((item) => (
            <SingleProduct {...item} />
          ))}
        </Carousel>
      </div>
      {loading && <p>Loading Updated Products .... </p>}

      <br />

      <Modal
        open={notLoggedIn}
        onClose={handlePopupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="border border-secondary p-2 rounded" sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Login to Add Products to cart
          </Typography>
          <div className="  float-end ">
            <Button onClick={handlePopupClose} variant="contained">
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
