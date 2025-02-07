import styles from './ProductCard.module.css'
import {ProductCardProps} from "./ProductCard.props.ts";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispath} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";
import React from "react";

function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispath>();

    const add = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id))
    }

    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{backgroundImage: `url(${props.image})`}}>
                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>
                    <button className={styles['add-to-card']} onClick={add}>
                        <img src='/shops.svg' alt='Добавить в корзину'/>
                    </button>
                    <div className={styles['rating']}>
                        {props.rating}&nbsp;
                        <img src='/zvezda.svg' alt='Звезда'/>
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.name}</div>
                    <div className={styles['description']}>{props.description}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;