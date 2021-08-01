import { Select,Button,Input, Typography  } from 'antd'; 
import React, { useState } from 'react';  
 
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import { useHistory, useLocation } from 'react-router-dom';


function EditProduct(props) { 
    const location = useLocation() 
    const history = useHistory()
    const { data } = location.state  
    const [load, setLoad] = useState(0)
    const [ imageChange, setImageChange] = useState(false) 
    const [ name , setName ] = useState(data.name) 
    const [ price , setPrice ] = useState(data.price)
    const [ size , setSize ] = useState(data.size)
    const [ description , setDesctription ] = useState(data.description) 
    const [ image , setImage ] = useState(data.images) 
    const [ category , setCategory ] = useState(data.category)
    const token = useSelector(state=> state.login.value.accessToken) || null
    console.log(data._id)
    const handleClickEdit = async () =>{
        setLoad(2000)
        const formUpload = new FormData()
        formUpload.append('file', image)
        formUpload.append('upload_preset', 'iiyoqzoi')
        formUpload.append('cloud_name', 'senclound') 

        if(imageChange){ 
            axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
            .then(async res=>{  
                uploadProduct(res.data.secure_url) 
            }) 
            .catch(err => console.log(err)) 
        }
        else{
            uploadProduct(image)  
        }
    } 
    const uploadProduct = (imageUrl) =>{  
        const dataEdit = {
            'name': name,
            'description': description,
            'price': price,
            'images': imageUrl, 
            'category': category,
            'size': size
        }
        
        axios(
            {
                method:'put',
                url:`https://sendeptraidb.herokuapp.com/api/product/${data._id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                data:dataEdit
            }).then((res) => {
                alert('Sửa bài viết thành công!!!')
                setLoad(0)   
                history.push('/products')
               
            }).catch((error) => {
                console.log(error)
        });
    } 

    
    return (
        <> 
            <Typography.Title>Edit Product</Typography.Title>
            <Input name='title' defaultValue={data.name} onChange={(e)=> setName(e.target.value)} /><br/>
            <Input name='size' defaultValue={data.size} onChange={(e)=> setSize(e.target.value)} /><br/>
            <Input name='price' defaultValue={data.price} onChange={(e)=> setPrice(e.target.value)} /><br/>
            <Input.TextArea name='description' defaultValue={data.description} rows={4} onChange={(e)=> setDesctription(e.target.value)} /> <br/>  
            <img src={data.images} alt="" />
            <input 
                onChange={(e) => 
                    {
                        setImageChange(true)
                        setImage(e.target.files[0])
                    }
                 } 
                type='file' 
                accept='image/png, image/jpeg, image/svg, image/jpge'/>
            <br/> 
            <Select name='category' defaultValue={data.category} style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="Làm đẹp">Làm đẹp</Select.Option>
                <Select.Option value="Thời trang">Thời trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Khác">Khác</Select.Option>
            </Select><br/>
            <Button type='primary' loading={load} onClick={handleClickEdit} >Cập nhật</Button>
        </>
    );
}

export default EditProduct;