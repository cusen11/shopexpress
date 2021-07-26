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
    
    
    const [load, setLoad] = useState(0)

    const [ title , setTitle ] = useState()
    const [ description , setDesctription ] = useState()
    const [ content , setContent ] = useState()
    const [ image , setImage ] = useState()
    const [  imageUrl, setImageUrl ] = useState()
    const [ category , setCategory ] = useState()
    const token = useSelector(state=> state.login.value.accessToken) || null
    const handleClickAdd = async () =>{
        setLoad(2000)
        const formUpload = new FormData()
        formUpload.append('file', image)
        formUpload.append('upload_preset', 'iiyoqzoi')
        formUpload.append('cloud_name', 'senclound') 

        axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
        .then(async res=>{
            await setImageUrl(res.data.secure_url)  
            console.log(imageUrl)  
            uploadBlog()
        })
        .catch(err => console.log(err))

       

    } 
    const uploadBlog = () =>{ 
        const data = {
            'title': title,
            'description': description, 
            'content': content, 
            'thumbnail': imageUrl,   
            'category': category, 
        }   
        console.log(data)
        axios(
            {
                method:'post',
                url:'https://sendeptraidb.herokuapp.com/api/blog/add',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data
            }).then((res) => {
                console.log("The file is successfully uploaded", res.data);
                setLoad(0)
                changeVisableAdd()
            }).catch((error) => {
                console.log(error)
        });
    }
    const changeVisableAdd = () => {
        props.changeVisable(false)
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

            <Input name='title' onChange={(e)=> setTitle(e.target.value)} placeholder="Basic usage" /><br/>
            <Input.TextArea name='description' rows={4} placeholder='Giới thiệu sơ về bài viết' onChange={(e)=> setDesctription(e.target.value)} /> <br/>  
            <input onChange={(e) => setImage(e.target.files[0]) } type='file'/><br/><br/>
            <Select name='category' defaultValue="Khác" style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select><br/>
            <div className="text-editor">
                <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange = {onChangeContent}
                            >
                            
                </ReactQuill>            
            </div>
            <br/>

            
            <Button type='primary' loading={load} onClick={handleClickAdd} >Thêm</Button>
        </>
    );
}

export default Create;