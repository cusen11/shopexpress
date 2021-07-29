import { Select,Button,Input, Radio  } from 'antd'; 
import React, { useState } from 'react'; 
import 'react-quill/dist/quill.snow.css'; 
 
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuillEditor from '../../Components/Editor/QuillEditor';  

function Create(props) { 
     
    const [load, setLoad] = useState(0) 
    const [radio, setRadio] = useState(true);
    const [ title , setTitle ] = useState()
    const [ description , setDesctription ] = useState()
    const [ content , setContent ] = useState()
    const [ image , setImage ] = useState() 
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
            uploadBlog(res.data.secure_url)
        }) 
        .catch(err => console.log(err)) 
    } 
    const uploadBlog = (imageUrl) =>{ 
        const data = {
            'title': title,
            'description': description, 
            'content': content, 
            'thumbnail': imageUrl,   
            'category': category,
            'status': radio 
        }   
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
                alert('Thêm bài viết thành công!!!')
                setLoad(0)
                changeVisableAdd() 
               
            }).catch((error) => {
                console.log(error)
        });
    }
    const changeVisableAdd = () => {
        props.changeVisable(false, true) 
    }  
    const onChangeRadio = e => { 
      setRadio(e.target.value);
    };
    return (
        <>
            <Radio.Group onChange={onChangeRadio} value={radio}>
                <Radio value={true}>Công bố</Radio>
                <Radio value={false}>Riêng tư</Radio> 
            </Radio.Group>
            <Input name='title' onChange={(e)=> setTitle(e.target.value)} placeholder="Basic usage" /><br/>
            <Input.TextArea name='description' rows={4} placeholder='Giới thiệu sơ về bài viết' onChange={(e)=> setDesctription(e.target.value)} /> <br/>  
            <input 
                onChange={(e) => setImage(e.target.files[0]) } 
                type='file' 
                accept='image/png, image/jpeg, image/svg, image/jpge'/>
            <br/><br/>
            <Select name='category' defaultValue="Khác" style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select><br/>
            <QuillEditor
                    urlAPI = 'https://api.cloudinary.com/v1_1/senclound/image/upload'
                    onChangeEditor = {(data) => {
                        setContent(data) 
                    }}
                />
            <br/> 
            <Button type='primary' loading={load} onClick={handleClickAdd} >Thêm</Button>
        </>
    );
}

export default Create;