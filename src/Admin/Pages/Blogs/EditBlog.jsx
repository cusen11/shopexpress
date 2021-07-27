import { Select,Button,Input, Radio  } from 'antd'; 
import React, { useState } from 'react'; 
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; 

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

Quill.register('modules/imageResize', ImageResize);


function EditBlog(props) { 
    const { data } = props    
    console.log(data)
    const [load, setLoad] = useState(0)
    const [ radio, setRadio ] = useState(true);
    const [ title , setTitle ] = useState()
    const [ description , setDesctription ] = useState()
    const [ content , setContent ] = useState()
    const [ image , setImage ] = useState() 
    const [ category , setCategory ] = useState()
    const token = useSelector(state=> state.login.value.accessToken) || null
    const handleClickEdit = async () =>{
        setLoad(2000)
        const formUpload = new FormData()
        formUpload.append('file', image)
        formUpload.append('upload_preset', 'iiyoqzoi')
        formUpload.append('cloud_name', 'senclound') 

        axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
        .then(async res=>{  
            uploadBlog(res.data.secure_url)
        }) 
        .catch(err => console.log(err)) 
    } 
    const uploadBlog = (imageUrl) =>{ 
        console.log('thao tác sửa')
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
    const onChangeRadio = e => { 
        setRadio(e.target.value);
      };
    return (
        <>
            <Radio.Group onChange={onChangeRadio} defaultValue={data.status}>
                <Radio value={true}>Công bố</Radio>
                <Radio value={false}>Riêng tư</Radio> 
            </Radio.Group> 
            <Input name='title' defaultValue={data.title} onChange={(e)=> setTitle(e.target.value)} placeholder="Basic usage" /><br/>
            <Input.TextArea name='description' defaultValue={data.description} rows={4} placeholder='Giới thiệu sơ về bài viết' onChange={(e)=> setDesctription(e.target.value)} /> <br/>  
            <img src={data.thumbnail} alt="" />
            <input 
                onChange={(e) => setImage(e.target.files[0]) } 
                type='file' 
                accept='image/png, image/jpeg, image/svg, image/jpge'/>
            <br/><br/>
            <Select name='category' defaultValue={data.category} style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select><br/>
            <div className="text-editor">
                <ReactQuill theme="snow"
                            defaultValue={data.content}
                            modules={modules}
                            formats={formats}
                            onChange = {onChangeContent}
                            >
                            
                </ReactQuill>            
            </div>
            <br/> 
            <Button type='primary' loading={load} onClick={handleClickEdit} >Cập nhật</Button>
        </>
    );
}

export default EditBlog;