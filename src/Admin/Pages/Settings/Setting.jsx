import { 
    Layout, Row,
    Col, Typography,
    Button, Image, Input

} from 'antd';  
import {
    PhoneOutlined,
    MailOutlined,
    FacebookOutlined,
    SkypeOutlined, 
  } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Text from 'antd/lib/typography/Text';
    
function Settings() {   
    const { Content } = Layout
    const { Title} = Typography 
    const [ edit , setEdit ] = useState(false)
    const [ data , setData ] = useState()

    const [ image ,setImage ] = useState(data?.contact.logo)
    const [ companyname, setCompanyName ] = useState(data?.info.companyName)
    const [ slogan, setSlogan ] = useState(data?.info.slogan)
    const [ address, setAddress ] = useState(data?.contact.address)
    const [ map, setMap ] = useState(data?.contact.map)
    const [ phone, setPhone ] = useState(data?.contact.phone)
    const [ mail, setMail ] = useState(data?.social.mail)
    const [ facebook, setFacebook ] = useState(data?.social.facebook)
    const [ zalo, setZalo ] = useState(data?.social.zalo)
    const [ viber, setViber ] = useState(data?.social.viber)
    const [ skype, setSkype ] = useState(data?.social.skype)
    const [ instargram, setInstargram ] = useState(data?.social.instargram)
    const [ load, setLoad ] = useState(0)
    const token = useSelector(state=> state.login.value.accessToken) || null
    useEffect(()=>{
        axios({
            method: 'get',
            url:'https://sendeptraidb.herokuapp.com/api/setting',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => setData(res.data.results[0]))
        .catch(err => console.log(err))
    },[token])  
    console.log(data)
    const handleUpdateSettings = () => {
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
    const updateSettings = (imageUrl) =>{
        setLoad(2000)
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
            url:`https://sendeptraidb.herokuapp.com/api/updatesettings/${data._id}`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: dataUpdate
        }).then(res => {
            console.log(res.data)
            setLoad(0)
            setEdit(false)
            alert('Cập nhật thành công')
        }).catch(err => console.log(err))
    }
    return (
        <Layout className="site-layout"> 
               { 
                data ? <Content style={{ margin: '0 16px' }}>
                            <Title type='success' level={1}>Settings</Title>    
                            <Row gutter={30} hidden={edit}> 
                                <Col xs={24} md={24}>
                                    <Image
                                            width={150}
                                            src={data.info.logo}
                                    />   
                                    <Title level={4}>{data.info.companyName}</Title>
                                    <Title level={4}>{data.info.slogan}</Title> 
                                    <iframe src={data.contact.map} width="600" title='maps' height="450" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
                                    <Title level={5}>Địa chỉ : {data.contact.address}</Title>  
                                    <Title level={3}>Thông tin liên hệ</Title>   
                                    <Title level={5}><PhoneOutlined /> {data.contact.phone}</Title>
                                    <Title level={5}><MailOutlined /> {data.contact.mail}</Title>
                                    <Title level={5}><FacebookOutlined /> {data.social.facebook}</Title> 
                                    <Title level={5}>Zalo: zalo.me/{data.social.zalo}</Title>
                                    <Title level={5}>Viber: {data.social.viber}</Title>
                                    <Title level={5}><SkypeOutlined /> {data.social.skype}</Title> 
                                    <Title level={5}>Instargram {data.social.instargram}</Title>

                                    <Button type='primary' onClick={() => setEdit(true)}>Edit</Button>
                                </Col>  
                            </Row>  
                            <Row hidden={!edit}>
                                <Text>Company</Text>
                                <img src={data.info.logo} alt="" />
                                <input type="file" onChange={(e)=> setImage(e.target.files[0])}  accept='image/*' />
                                <Input type='text' defaultValue={data.info.companyName} onChange={(e)=> setCompanyName(e.target.value)} /> 
                                <Text>Slogan</Text>
                                <Input type='text' defaultValue={data.info.slogan} onChange={(e)=> setSlogan(e.target.value)} /> 
                                <Text>Address</Text>
                                <Input type='text' defaultValue={data.contact.address} onChange={(e)=> setAddress(e.target.value)} /> 
                                <Text>Google Map</Text>
                                <Input type='text' defaultValue={data.contact.map} onChange={(e)=> setMap(e.target.value)} /> 
                                <Text>Phone</Text>
                                <Input type='text' defaultValue={data.contact.phone} onChange={(e)=> setPhone(e.target.value)} /> 
                                <Text>Facebook</Text>
                                <Input type='text' defaultValue={data.social.facebook} onChange={(e)=> setFacebook(e.target.value)} /> 
                                <Text>Mail</Text>
                                <Input type='text' defaultValue={data.contact.mail} onChange={(e)=> setMail(e.target.value)} /> 
                                <Text>Zalo</Text>
                                <Input type='text' defaultValue={data.social.zalo} onChange={(e)=> setZalo(e.target.value)} /> 
                                <Text>Viber</Text>
                                <Input type='text' defaultValue={data.social.viber} onChange={(e)=> setViber(e.target.value)} /> 
                                <Text>Skype</Text>
                                <Input type='text' defaultValue={data.social.skype} onChange={(e)=> setSkype(e.target.value)} /> 
                                <Text>Instargram</Text>
                                <Input type='text' defaultValue={data.social.instargram} onChange={(e)=> setInstargram(e.target.value)} /> 
                                <Button type='primary' onClick={handleUpdateSettings} loading={load} >Cập nhật</Button>
                            </Row>
                        </Content> :'' 
               }
        </Layout>
    );
}

export default Settings;