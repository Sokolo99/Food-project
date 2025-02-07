import styles from './Menu.module.css'
import Headling from "../../components/Headling/Headling.tsx";
import Search from "../../components/Search/Search.tsx";
import {PREFIX} from "../../Helpers/API.ts";
import {Product} from "../../interfaces/product.interfaces.ts";
import {ChangeEvent, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList.tsx";

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e)
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const upDateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search placeholder='Введите блюдо или состав' onChange={upDateFilter}/>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && <MenuList products={products}/>}
                {isLoading && <>Загружает продукты...</>}
                {!isLoading && products.length === 0 && <>Не найдено блюдо по запросу!!!</>}
            </div>
        </>
    )
}

export default Menu;