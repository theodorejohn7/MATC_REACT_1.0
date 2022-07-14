import React from "react";
import Carousel from "react-bootstrap/Carousel";
 
import axios, { CancelTokenSource } from "axios";


import "bootstrap/dist/css/bootstrap.css";
type Props = {};

const CarouselComp = (props: Props) => {
  interface IPost {
    id?: number;
    image: string;
  }

  const defaultPosts: IPost[] = [];


  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
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
    axios
      .get<IPost[]>(
        "https://62bae56f573ca8f8328e3c55.mockapi.io/theo/coverImage",
        {
          cancelToken: cancelTokenSource.token,
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      )
      .then((response) => {
    
        setPosts(response.data);
        
      })
      .catch((ex) => {
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
    <div
      style={{
        display: "block",
        maxHeight: 400,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Carousel>

       { posts.map((data)=>(
        
          <Carousel.Item>
 
          <img
            className="d-block   w-100"
            src={data.image}
             
          />
          
        </Carousel.Item>
       
        ))}
       
         
        
      </Carousel>
    </div>
  );
};

export default CarouselComp;
