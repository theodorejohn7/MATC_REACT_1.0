import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "react-bootstrap";

import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { getAllProductData } from "../../redux/action/getProductAction";

type CartItemsProps = {
  id: number;
  quantity: number;
};

interface AllRecords {
  _id: string;
  __v: string;
  image: string;
  title: string;
  description: string;
  category: string;
  userId?: number;
  rating: number;
  price: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
  units?: number;
  id: number;
}

export function CartItem({ id, quantity }: CartItemsProps) {
  const dispatch = useDispatch();

  const fetchAllRecordsData = useCallback(async () => {
    try {
      dispatch(getAllProductData());
    } catch (error_1) {
      console.log(error_1);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllRecordsData();
  }, []);

  const allRecordsData: AllRecords[] = useSelector(
    (state: any) => state.getProductReducer?.getAllProductData
  );

  const { removeFromCart } = useShoppingCart();
  const item = allRecordsData.find((item1) => item1.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.image} alt={`${item.title}-product`} className="rounded cartItem-image" />
      <div className="me-auto">
        <div className="text-uppercase">
          {item.title}
          {quantity > 1 && (
            <span className="text-primary cartItem-Text font-weight-bold text-lowercase ">
              {" "}
              <br />x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted cartItem-Text">
          {formatCurrency(item.discPrice ? item.discPrice : item.price)}
        </div>
      </div>
      <div>{formatCurrency((item.discPrice ? item.discPrice : item.price) * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  );
}
