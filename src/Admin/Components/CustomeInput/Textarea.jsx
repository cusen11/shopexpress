import React from 'react';

function Textarea(props) {
    const {title, type, name, id, disabled, placeholder,width,background,borderColor,padding,rows } = props
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
            <textarea style={style} disabled={disabled}
                rows={rows}
                type={type}
                id={id} 
                placeholder={placeholder}
                name={name}
                 />
        </div>
    );
}

export default Textarea;