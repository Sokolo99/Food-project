import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Cart} from "./pages/Cart/Cart.tsx";
import {Error as ErrorPage} from "./pages/Error/Error.tsx";
import {Layout} from "./layout/Menu/Layout.tsx";
import {Product} from "./pages/Product/Product.tsx";
import axios from "axios";
import {PREFIX} from "./Helpers/API.ts";
import {AuthLayout} from "./layout/Auth/AuthLayout.tsx";
import {Login} from "./pages/Login/Login.tsx";
import {Register} from "./pages/Register/Register.tsx";
import {RequireAuth} from "./Helpers/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const Menu = lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><Layout/></RequireAuth>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/product/:id',
                element: <Product/>,
                errorElement: <>Ошибка...</>,
                loader: async ({params}) => {
                    return axios
                        .get(`${PREFIX}/products/${params.id}`)
                        .then((res) => res.data);
                },
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>
);
