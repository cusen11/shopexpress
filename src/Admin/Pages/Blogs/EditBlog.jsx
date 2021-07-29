import { Select,Button,Input, Radio  } from 'antd'; 
import React, { useState } from 'react'; 
import 'react-quill/dist/quill.snow.css'; 
 
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuillEditor from '../../Components/Editor/QuillEditor'; 


function EditBlog(props) { 
    const { data } = props   
    const [load, setLoad] = useState(0)
    const [ imageChange, setImageChange] = useState(false)
    const [ radio, setRadio ] = useState(data.status);
    const [ title , setTitle ] = useState(data.title)
    const [ description , setDesctription ] = useState(data.description)
    const [ content , setContent ] = useState(data.content)
    const [ image , setImage ] = useState(data.thumbnail) 
    const [ category , setCategory ] = useState(data.category)
    const token = useSelector(state=> state.login.value.accessToken) || null
    const handleClickEdit = async () =>{
        setLoad(2000)
        const formUpload = new FormData()
        formUpload.append('file', image)
        formUpload.append('upload_preset', 'iiyoqzoi')
        formUpload.append('cloud_name', 'senclound') 

        if(imageChange){ 
            axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
            .then(async res=>{  
                uploadBlog(res.data.secure_url)
                changeVisableEdit()
            }) 
            .catch(err => console.log(err)) 
        }
        else{
            uploadBlog(image) 
            changeVisableEdit()
        }
    } 
    const uploadBlog = (imageUrl) =>{ 
        const dataEdit = {
            'title': title,
            'description': description, 
            'content': content, 
            'thumbnail': imageUrl,   
            'category': category,
            'status': radio 
        }    
        axios(
            {
                method:'put',
                url:`https://sendeptraidb.herokuapp.com/api/blog/edit/${data._id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: dataEdit
            }).then((res) => {
                alert('Sửa bài viết thành công!!!')
                setLoad(0)   
               
            }).catch((error) => {
                console.log(error)
        });
    } 

    const changeVisableEdit = () => {
        props.changeVisableEdit(false, true, false) 

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
                onChange={(e) => 
                    {
                        setImageChange(true)
                        setImage(e.target.files[0])
                    }
                 } 
                type='file' 
                accept='image/png, image/jpeg, image/svg, image/jpge'/>
            <br/><br/>
            <Select name='category' defaultValue={data.category} style={{ width: 120 }} onChange={(value)=> setCategory(value)}>
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
            <Button type='primary' loading={load} onClick={handleClickEdit} >Cập nhật</Button>
        </>
    );
}

export default EditBlog;