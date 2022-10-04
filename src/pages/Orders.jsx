import axios  from "axios";
import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";


function Orders() {

    const [orders, setOrders] = React.useState([]);
    const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://632161ac82f8687273b0a8ca.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов!')
                console.error(error)
            }
        })();
    }, []);

    return(
        <div className='content p-40'>
            <div className="d-flex align-center mb-40 justify-between">
            <h1>Мои заказы</h1>
          
            </div>


        <div className='d-flex flex-wrap'>
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                <Card
                key={index}
                

                loading={isLoading}
                {...item} 
                />
            ))}
        </div>
      </div>
    );
}

export default Orders;