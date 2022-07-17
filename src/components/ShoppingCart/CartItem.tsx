import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../../utilities/formatCurrency"
import {getAllProductData} from "../../redux/action/getProductAction"

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type CartItemsProps = {
    id: number
    quantity: number
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
  

export function CartItem({ id, quantity }: CartItemsProps) {

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

    const { removeFromCart } = useShoppingCart()
    const item = allRecordsData.find(item => item.id === id)
    if (item == null) return null


    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.image} className="rounded " style={{ maxWidth: "125px", height: "75px", objectFit: "cover" }} />
            <div className="me-auto" >
                <div className="text-uppercase">
                    {item.title}
                    {(quantity > 1) && <span className="text-primary font-weight-bold text-lowercase " style={{ fontSize: '0.8rem' }}> x {quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>{formatCurrency(item.price)}

                </div>

            </div>
            <div>
                {formatCurrency(item.price * quantity)}

            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                &times;
            </Button>

        </ Stack>

    )

}