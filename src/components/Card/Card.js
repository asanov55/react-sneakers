import React from 'react';
import styles from './Card.Module.scss';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';


function Card({id, onFavorite, imageUrl, title, price, onPlus, favorited = false, loading = false}) {

    const { isItemAdded } = React.useContext(AppContext);
 ;
    const[isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, imageUrl, price}

    const onClickPlus = () => {
        onPlus( obj );
        
    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {
                loading ? (
                <ContentLoader 
                    speed={2}
                    width={165}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
                    <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
                    <rect x="120" y="230" rx="10" ry="10" width="35" height="35" /> 
                </ContentLoader> 
                ):( 
                <>
                    {onFavorite &&(<div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? "/img/Group 90.png ": "img/Group 90.svg"}/>
                    </div>)}
                    <img width='100%' height={130} src={imageUrl} />
                    <h5>{title}</h5>
                    <div className='d-flex justify-between align-center'>
                        <div className='d-flex flex-column'>
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                        </div>
                        
                        {onPlus && (<img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/Group 95.svg" : "/img/Group 91 (1).svg"} />)}
                        
                    </div>
                </>
                )}

        </div>
    )
};
export default Card;

