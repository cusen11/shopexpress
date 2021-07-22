 import React from 'react';

function Input(props) {
    const {title, type, name, id, disabled, placeholder,width,background,borderColor,padding } = props
    const style = { 
        outline:'none',
        borderRadius: borderColor ? '5px' : '0',
        border:`1px solid ${borderColor}`,
        background: background,
        padding:padding,
        width:width,
        marginBottom:'10px'
    }
    return (
        <div> 
            <label htmlFor={id}>{title}</label>
            <br/>
            <input style={style} disabled={disabled}
                type={type}
                id={id} 
                placeholder={placeholder}
                name={name}
                 />
        </div>
    );
}

export default Input;