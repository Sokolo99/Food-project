import styles from './Input.module.css';
import cn from "classnames";
import {forwardRef} from "react";
import {InputProps} from "./Input.props.ts";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, isValid = true, ...props}, ref) {
    return (
        <input ref={ref} className={cn(styles['input'], className, styles['input'], {
            [styles['invalid']]: !isValid
        })} {...props}/>
    );
})

export default Input;