import styles from './Search.module.css';
import cn from "classnames";
import {forwardRef} from "react";
import {SearchProps} from "./Search.props.ts";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({className, isValid = true, ...props}, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input ref={ref} className={cn(styles['input'], className, styles['input'], {
                [styles['invalid']]: !isValid
            })} {...props}/>
            <img className={styles['icon']} src='/poisk.svg' alt='Поиск'/>
        </div>
    );
})

export default Search;