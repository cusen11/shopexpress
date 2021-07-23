import { Select,Button,Input  } from 'antd'; 
import React, { useState } from 'react'; 
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; 

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

Quill.register('modules/imageResize', ImageResize);


function Create(props) { 
    const [ title , setTitle ] = useState()
    const [ description , setDesctription ] = useState()
    const [ content , setContent ] = useState()
    const [ image , setImage ] = useState()
    const [ category , setCategory ] = useState()
    const token = useSelector(state=> state.login.value.accessToken) || null
    const handleClickAdd = async () =>{
        const formData = new FormData() 
        formData.append('title', title)
        formData.append('description', description) 
        formData.append('content', content)  
        formData.append('category', category) 
        formData.append('image', image) 
       
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        axios.post("https://sendeptraidb.herokuapp.com/api/blog/add",formData,config)
            .then((res) => {
                console.log("The file is successfully uploaded", res.data);
            }).catch((error) => {
                console.log(error)
        });

    } 
    
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ] 

    const onChangeContent = (content, delta, source, editor) =>{
        setContent(content)  
    } 
    return (
        <>
            <Input name='title' onChange={(e)=> setTitle(e.target.value)} placeholder="Basic usage" />
            <Input.TextArea name='description' rows={4} placeholder='Giới thiệu sơ về bài viết' onChange={(e)=> setDesctription(e.target.value)} />   
            <input onChange={(e) => setImage(e.target.files[0]) } type='file'/><br/>
            <Select name='image' defaultValue="Làm đẹp" style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select>
            <div className="text-editor">
                <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange = {onChangeContent}
                            >
                            
                </ReactQuill>
                <div dangerouslySetInnerHTML={{__html: content}}/>             
            </div>
            <br/>

            
            <Button type='primary' onClick={handleClickAdd} >Thêm</Button>
        </>
    );
}

export default Create;