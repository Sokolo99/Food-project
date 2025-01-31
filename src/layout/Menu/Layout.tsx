import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button.tsx";
import cn from "classnames";
import {useDispatch} from "react-redux";
import {AppDispath} from "../../store/store.ts";
import {userActions} from "../../store/user.slice.ts";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    
    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img className={styles['avatar']} src='/public/Intersect.png' alt='Пользователь'/>
                    <div className={styles['name']}>Ivan Sokolov</div>
                    <div className={styles['email']}>ivan.so9@mail.ru</div>
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
                        <img src='/public/cart.svg' alt='Корзина'/>
                        Корзина</NavLink>
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