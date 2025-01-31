import styles from './Menu.module.css'
import Headling from "../../components/Headling/Headling.tsx";
import Search from "../../components/Search/Search.tsx";
import {PREFIX} from "../../Helpers/API.ts";
import {Product} from "../../interfaces/product.interfaces.ts";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList.tsx";

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const getMenu = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            if(e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        getMenu();
    }, [])

    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search placeholder='Введите блюдо или состав'/>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && <MenuList products={products}/>}
                {isLoading && <>Загружает продукты...</>}
            </div>
        </>
    )
}

export default Menu;