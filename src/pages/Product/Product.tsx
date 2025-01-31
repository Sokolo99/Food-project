import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {type Product} from "../../interfaces/product.interfaces.ts";

export function Product() {
    const data = useLoaderData() as Product;

    return (
        <>
            <Suspense fallback={'Загружаю...'}>
                <Await
                    resolve={data}
                    errorElement={<div>Не можем отобразить продукт...</div>}
                >
                    {(resolvedData: Product) => (
                        <div>Product Name: {resolvedData.name}</div>
                    )}
                </Await>
            </Suspense>
        </>
    );
}