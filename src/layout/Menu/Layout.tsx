import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button.tsx";
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {AppDispath, RootState} from "../../store/store.ts";
import {getProfile, userActions} from "../../store/user.slice.ts";
import {useEffect} from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const item = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img className={styles['avatar']} src='/public/Intersect.png' alt='Пользователь'/>
                    <div className={styles['name']}>{profile?.name}</div>
                    <div className={styles['email']}>{profile?.email}</div>
                </div>
                <div className={styles['menu']}>
                    <NavLink to='/' className={({isActive}) => cn(styles['link'], {
                        [styles.active]: isActive
                    })}>
                        <img src='/public/menu.svg' alt='Меню'/>
                        Меню</NavLink>
                    <NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
                        [styles.active]: isActive
                    })}>
                        <img src='/public/cart.svg' alt='Корзина'/>Корзина <span className={styles['cart-count']}>{item.reduce((acc, item) => acc += item.count, 0)}</span></NavLink>
                </div>
                <Button className={styles['exit']} onClick={logout}>
                    <img src='/public/exit.svg' alt='Выход'/>
                    Выход
                </Button>
            </div>
            <div className={styles['content']}>
                <Outlet/>
            </div>
        </div>
    )
}