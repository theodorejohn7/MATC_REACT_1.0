import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas, Stack } from "react-bootstrap";

import { CartItem } from "./CartItem";
import { formatCurrency } from "../../utilities/formatCurrency";
import {useUserLoginContext} from "../../context/UserLoginContext"
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { getAllProductData } from "../../redux/action/getProductAction";

type ShoppingCartProps = {
  isOpen: boolean;
};

interface AllRecords {
  _id: string;
  __v: string;
  image: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  userId?: number;
  price: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
  units?: number;
  id: number;
}

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
const {currentUser}= useUserLoginContext();

  const dispatch = useDispatch();

  const allRecordsData: AllRecords[] = useSelector(
    (state: any) => state.getProductReducer?.getAllProductData
  );

  const fetchAllRecordsData = useCallback(async () => {

    try {
      dispatch(getAllProductData());
    } catch (error_1) {
      console.log(error_1);
    }
  }, [dispatch]);

 
    fetchAllRecordsData();
 

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{currentUser? `${currentUser}'s Cart`  : "Cart" } </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems?.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total
            {formatCurrency(
              cartItems?.reduce((total, cartItem) => {
                const item = allRecordsData?.find(
                  (item1) => item1.id === cartItem.id
                );
                return total + ( (item?.discPrice ? item?.discPrice :   item?.price) || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
