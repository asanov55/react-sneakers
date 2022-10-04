import React from "react";
import { AppContext } from "../App";

const Inf = ( {title, image, description } ) => {
    
  const {setCartOpened} = React.useContext(AppContext);
  
  return (
    <div className = "cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width="120px"  src={image}/>
        <h2>{title}</h2>
        <p class="opacity-6 pp">{description}</p>
        <button onClick={() => setCartOpened(false)} class="greenButton">
            <img className ="ik" src="/img/arrov.png" />
            Вернуться назад
        </button>
    </div>
  )
}

export default Inf;