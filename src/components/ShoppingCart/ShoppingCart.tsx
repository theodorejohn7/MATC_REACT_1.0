import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItem } from "./CartItem";
 
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 
import {getAllProductData} from "../../redux/action/getProductAction"

type ShoppingCartProps = {
    isOpen: boolean
}


interface AllRecords {
    _id:string;
    rating:number;
    __v:string;
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
  

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()
    const dispatch = useDispatch();


    const fetchAllRecordsData = useCallback(async () => {
        console.log("inside fetch mutton");
        try {
          dispatch(getAllProductData());
        } catch (error_1) {
          console.log(error_1);
        }
      }, [dispatch]);


      useEffect(() => {
        fetchAllRecordsData();
      }, []);
    
      const allRecordsData:AllRecords[] = useSelector(
        (state: any) => state.getProductReducer?.getAllProductData
      ); 
console.log("@!@ all records data",allRecordsData);

    return <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            <Stack gap={3} >
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total{formatCurrency(cartItems.reduce((total, cartItem) => {

                        const item = allRecordsData?.find(item => item.id === cartItem.id)
                        return total+(item?.price || 0)*cartItem.quantity
                    },0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}