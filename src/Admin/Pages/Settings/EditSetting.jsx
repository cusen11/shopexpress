import { Button, Input } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import React, { useState } from 'react';  
import { useSelector } from 'react-redux';

function EditSetting(props) { 
    const [ image ,setImage ] = useState(props.data?.info.logo)
    const [ companyname, setCompanyName ] = useState(props.data?.info.companyName)
    const [ slogan, setSlogan ] = useState(props.data?.info.slogan)
    const [ address, setAddress ] = useState(props.data?.contact.address)
    const [ map, setMap ] = useState(props.data?.contact.map)
    const [ phone, setPhone ] = useState(props.data?.contact.phone)
    const [ mail, setMail ] = useState(props.data?.social.mail)
    const [ facebook, setFacebook ] = useState(props.data?.social.facebook)
    const [ zalo, setZalo ] = useState(props.data?.social.zalo)
    const [ viber, setViber ] = useState(props.data?.social.viber)
    const [ skype, setSkype ] = useState(props.data?.social.skype)
    const [ instargram, setInstargram ] = useState(props.data?.social.instargram)
    const [ load, setLoad ] = useState(0)
    const token = useSelector(state=> state.login.value.accessToken) || null


    const [change, setChange] = useState(false) 
    const handleUpdateSettings = () => {
        setLoad(2000)
        if(change) {
            const formUpload = new FormData()
            formUpload.append('file', image)
            formUpload.append('upload_preset', 'iiyoqzoi')
            formUpload.append('cloud_name', 'senclound') 

            axios.post('https://api.cloudinary.com/v1_1/senclound/image/upload',formUpload)
            .then(async res=>{  
                updateSettings(res.data.secure_url)
                console.log(res.data.secure_url)
            }) 
            .catch(err => console.log(err))  
        }
        else{
            updateSettings(image) 
        }
    }
    const updateSettings = (imageUrl) =>{
       
        const dataUpdate = {
            logo:imageUrl,
            companyname,
            slogan,
            facebook,
            zalo,
            skype,
            viber,
            instargram,
            mail,
            address,
            phone,
            map
        } 
        axios({
            method:'put',
            url:`https://sendeptraidb.herokuapp.com/api/updatesettings/${props.data._id}`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: dataUpdate
        }).then(res => { 
            setLoad(0)
            props.successEdit(false)
            alert('Cập nhật thành công')
        }).catch(err => console.log(err))
    }
    return (
        <>
            <Text><img width='300px' src={props.data?.info.logo} alt="" /></Text>
            
            <input type="file" onChange={(e)=> {
                setImage(e.target.files[0])
                setChange(true)
            }}  accept='image/*' />
            <Text>Company</Text> 
            <Input type='text' defaultValue={props.data?.info.companyName} onChange={(e)=> setCompanyName(e.target.value)} /> 
            <Text>Slogan</Text>
            <Input type='text' defaultValue={props.data?.info.slogan} onChange={(e)=> setSlogan(e.target.value)} /> 
            <Text>Address</Text>
            <Input type='text' defaultValue={props.data?.contact.address} onChange={(e)=> setAddress(e.target.value)} /> 
            <Text>Google Map</Text>
            <Input type='text' defaultValue={props.data?.contact.map} onChange={(e)=> setMap(e.target.value)} /> 
            <Text>Phone</Text>
            <Input type='text' defaultValue={props.data?.contact.phone} onChange={(e)=> setPhone(e.target.value)} /> 
            <Text>Facebook</Text>
            <Input type='text' defaultValue={props.data?.social.facebook} onChange={(e)=> setFacebook(e.target.value)} /> 
            <Text>Mail</Text>
            <Input type='text' defaultValue={props.data?.contact.mail} onChange={(e)=> setMail(e.target.value)} /> 
            <Text>Zalo</Text>
            <Input type='text' defaultValue={props.data?.social.zalo} onChange={(e)=> setZalo(e.target.value)} /> 
            <Text>Viber</Text>
            <Input type='text' defaultValue={props.data?.social.viber} onChange={(e)=> setViber(e.target.value)} /> 
            <Text>Skype</Text>
            <Input type='text' defaultValue={props.data?.social.skype} onChange={(e)=> setSkype(e.target.value)} /> 
            <Text>Instargram</Text>
            <Input type='text' defaultValue={props.data?.social.instargram} onChange={(e)=> setInstargram(e.target.value)} /> 
            <Button type='default' onClick={()=>props.successEdit(false)}>Quay về</Button>
            <Button type='primary' onClick={handleUpdateSettings} loading={load} >Cập nhật</Button>
        </>
    );
}

export default EditSetting;