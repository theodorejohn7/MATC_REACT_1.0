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
  const item = allRecordsData.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        alt={`${item.title}-product`}
        className="rounded "
        style={{ maxWidth: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className="text-uppercase">
          {item.title}
          {quantity > 1 && (
            <span
              className="text-primary font-weight-bold text-lowercase "
              style={{ fontSize: "0.8rem" }}
            >
              {" "}
              x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
