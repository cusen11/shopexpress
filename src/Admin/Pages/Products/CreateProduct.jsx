import { Select,Button,Input, Typography  } from 'antd'; 
import React, { useState } from 'react';  
 
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom';


function CreateProduct(props) {  
    const history = useHistory() 
    const [load, setLoad] = useState(0)
    const [ imageChange, setImageChange] = useState(false) 
    const [ name , setName ] = useState() 
    const [ price , setPrice ] = useState()
    const [ size , setSize ] = useState()
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

        if(imageChange){ 
            axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
            .then(async res=>{  
                uploadProduct(res.data.secure_url, res.data.public_id) 
                console.log(res.data)
            }) 
            .catch(err => console.log(err)) 
        }
        else{
            uploadProduct(image)  
        }
    } 
    const uploadProduct = (imageUrl, idImage) =>{  
        const dataCreate = {
            'name': name,
            'description': description,
            'price': price,
            'url': imageUrl, 
            'idImage': idImage,
            'category': category,
            'size': size
        }
        
        axios(
            {
                method:'post',
                url:`https://sendeptraidb.herokuapp.com/api/product`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                data:dataCreate
            }).then((res) => {
                alert('Th??m b??i vi???t th??nh c??ng!!!')
                setLoad(0)   
                history.push('/products')
               
            }).catch((error) => {
                console.log(error)
        });
    } 

    
    return (
        <> 
            <Typography.Title>Th??m Product</Typography.Title>
            <Input name='title' onChange={(e)=> setName(e.target.value)} placeholder="name" /><br/>
            <Input name='size' onChange={(e)=> setSize(e.target.value)} placeholder="size" /><br/>
            <Input name='price' onChange={(e)=> setPrice(e.target.value)} placeholder="price" /><br/>
            <Input.TextArea name='description' rows={4} onChange={(e)=> setDesctription(e.target.value)} /> <br/>   
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
            <Select name='category' style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
                <Select.Option value="L??m ?????p">L??m ?????p</Select.Option>
                <Select.Option value="Th???i trang">Th???i trang</Select.Option> 
                <Select.Option value="Model">Model</Select.Option> 
                <Select.Option value="Kh??c">Kh??c</Select.Option>
            </Select><br/>
            <Button type='primary' loading={load} onClick={handleClickAdd} >Th??m m???i</Button>
        </>
    );
}

export default CreateProduct;