import React from 'react'
import style from "./Input.module.scss";
const Input = (props) => {
    return(
        <div className={style.input_wrapper}>
            <input {...props}/>
        </div>
    )
}

export default Input