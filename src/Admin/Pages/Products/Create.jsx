import { Select,Button,Input, Radio  } from 'antd'; 
import React, { useRef, useState } from 'react';  
 
import axios from 'axios';
import { useSelector } from 'react-redux'; 

function Create(props) { 
    let titleRef = useRef()
    let descriptionRef = useRef()
    let imgRef = useRef();

    const [load, setLoad] = useState(0) 
    const [radio, setRadio] = useState(true);
    const [ name , setName ] = useState()
    const [ description , setDesctription ] = useState() 
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
    console.log(name, description,category)
    const uploadBlog = (imageUrl) =>{   
        axios(
            {
                method:'post',
                url:'https://sendeptraidb.herokuapp.com/api/blog/add',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                alert('Thêm bài viết thành công!!!')
                setLoad(0)
                changeVisableAdd()  
                setImage('')
                setRadio(true) 
                setDesctription('')
                titleRef.current.state.value = ''
                descriptionRef.current.state.value = ''

               
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
            <Input name='title' ref={titleRef} onChange={(e)=> setName(e.target.value) } placeholder="Basic usage" /><br/>
            <Input.TextArea name='description' ref={descriptionRef} rows={4} placeholder='Giới thiệu sơ về bài viết' onChange={(e)=> setDesctription(e.target.value)} /> <br/>  
            <input ref={imgRef}
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
             
            <Button type='primary' loading={load} onClick={handleClickAdd} >Thêm</Button>
        </>
    );
}

export default Create;