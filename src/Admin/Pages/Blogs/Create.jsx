import { Select } from 'antd'; 
import React from 'react';
import Input from '../../Components/CustomeInput/Input';
import Textarea from '../../Components/CustomeInput/Textarea';

function Create(props) {
    const handleChangeSelect = (value) =>{
        console.log( value )
    }
    return (
        <>
            <Input 
                width="50%"
                name='title'
                type='text'
                placeholder='Nhập tiêu đề bài viết'
                id='_title'
                title="Tiêu đề bài viết"
                background='white'
                borderColor='#afaeae'
                padding='5px'
            />
             <Textarea  
                rows='5'
                width="50%"
                name='title'
                type='text'
                placeholder='Nhập tiêu đề bài viết'
                id='_title'
                title="Tiêu đề bài viết"
                background='white'
                borderColor='#afaeae'
                padding='5px'
            />
                    
            <Input type='file' /> 
            <Select defaultValue="Làm đẹp" style={{ width: 120 }} onChange={handleChangeSelect}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select>
        </>
    );
}

export default Create;