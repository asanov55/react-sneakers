import React from 'react';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Header from './components/Header';
import axios from 'axios';
import { Route } from "react-router-dom";
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


// const arr = [
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 12999,
//     "imageUrl": "./img/sneakers/1.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Air Max 270", 
//     "price": 12999, 
//     "imageUrl": "./img/sneakers/2.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede", 
//     "price": 8499, 
//     "imageUrl": "./img/sneakers/3.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider", 
//     "price": 8999, 
//     "imageUrl": "./img/sneakers/4.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider", 
//     "price": 8999, 
//     "imageUrl": "./img/sneakers/3.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider", 
//     "price": 8999, 
//     "imageUrl": "./img/sneakers/2.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider", 
//     "price": 8999, 
//     "imageUrl": "./img/sneakers/1.jpg"
//   }
// ];



export const AppContext = React.createContext({  });


function App() {

  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  

  React.useEffect(() => {
    async function fetchData(){

      try {
        const itemsResponse = await axios.get('https://632161ac82f8687273b0a8ca.mockapi.io/items');
        const cartResponse = await axios.get('https://632161ac82f8687273b0a8ca.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://632161ac82f8687273b0a8ca.mockapi.io/favorites');

        setIsLoading(false);
      
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(')
        console.error(error)
      }
      
    }

    fetchData();
  }, []);



  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id))
      if(findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://632161ac82f8687273b0a8ca.mockapi.io/cart/${findItem.id}`);
        
      }else{
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://632161ac82f8687273b0a8ca.mockapi.io/cart', obj);
        setCartItems((prev) => [prev.map(item => {
          if(item.parentId == data.parentId){
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        })]);
        
        
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.error(error)
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://632161ac82f8687273b0a8ca.mockapi.io/cart/${id}`);
    
    } catch (error) {
      alert('Ошибуи при удалении из корзины')
      console.error(error)
    }
  };

  const onAddToFavorite = async (obj) => {
    try{
      if(favorites.find((favObj) => Number(favObj.id) == Number(obj.id))) {
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        axios.delete(`https://632161ac82f8687273b0a8ca.mockapi.io/favorites/${obj.id}`);
      }else{
        const { data } = await axios.post('https://632161ac82f8687273b0a8ca.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      };
    }catch (error){
      alert('Не удалось добавить в фавориты')
    }
    
  };
  
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }


  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) == Number(id));
  }




  return ( 
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">

        {cartOpened &&  <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
          
          <Route path='/' exact>
            <Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading} 
            />
          </Route>

          <Route path='/favorites' exact>
            <Favorites />
          </Route>

          <Route path='/orders' exact>
            <Orders isLoading={isLoading} />
          </Route>
              
            


        </div>
    </AppContext.Provider>
  );
};

export default App;
