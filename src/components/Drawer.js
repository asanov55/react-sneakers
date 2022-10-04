import React from "react";
import Inf from "./Inf";
import { useCart } from "../hooks/useCart";
import axios from "axios";

const delay = (ms) => new Promise((resolfe) => setTimeout(resolfe, ms));

function Drawer({onClose, onRemove, items = []}) {

    const { cartItems, setCartItems, totalPrice } = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    
    

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://632161ac82f8687273b0a8ca.mockapi.io/orders', {items: cartItems});
            
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://632161ac82f8687273b0a8ca.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
            
        } catch (error) {
            alert('Не удалось создать заказ :(');
        }
        setIsLoading(false);
    }

    return (
    <div className="overLay over">
      
    
        <div className="drawer">
            <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={onClose} className="cu-p" src="/img/Group 91.svg"/></h2>


            {
                items.length > 0 ?  
                (
                <div className="d-flex flex-column flex">
                    <div className="items">
            
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                <img className="mr-20" width={70} height={70} src={obj.imageUrl} />
                                <div className="mr-20">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="remoweBtn" src="/img/Group 91.svg"/>
                            </div>

                        ))}
                    
                        </div>
                        <div className="cartTotalBlock">
                        <ul>
                            <li>
                            <span>Итого: </span>
                            <div></div>
                            <b>{totalPrice} руб. </b>
                            </li>
                            <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>{(totalPrice / 100) *5} руб. </b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/Group (1).svg"/></button>
                        </div>
                </div>
                )
                : 
                (
                    <Inf 
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` :"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                    image={isOrderComplete ? "/img/image 8.jpg" : "/img/image 8.png"}
                    />
                )
            }

           

           

            
            
        </div>
    </div>
    );
};
export default Drawer;