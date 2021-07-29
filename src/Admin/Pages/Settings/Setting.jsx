import { 
    Layout, Row,
    Col, Typography,
    Button, Image

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
    
function Settings() {   
    const { Content } = Layout
    const { Title} = Typography 
    
    const [ data , setData ] = useState()
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
    return (
        <Layout className="site-layout"> 
               <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Settings</Title>    
                <Row gutter={30}> 
                    <Col xs={24} md={24}>
                        <Image
                                width={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />   
                        <Title level={4}>{data?.info.companyName}</Title>
                        <Title level={4}>{data?.info.slogan}</Title> 
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.534129326069!2d106.62418231526037!3d10.770342262249908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c203461f629%3A0x7e742abed5b42821!2zNzVhIFTDtCBIaeG7h3UsIEhp4buHcCBUw6JuLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1627551106595!5m2!1svi!2s" width="600" title='maps' height="450" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
    
                        <Title level={5}>Địa chỉ : {data?.contact.address}</Title> 

                        <Title level={3}>Thông tin liên hệ</Title>   
                        <Title level={5}><PhoneOutlined /> {data?.contact.phone}</Title>
                        <Title level={5}><MailOutlined /> {data?.contact.mail}</Title>
                        <Title level={5}><FacebookOutlined /> {data?.social.facebook}</Title> 
                        <Title level={5}>Zalo: zalo.me/{data?.social.zalo}</Title>
                        <Title level={5}>Viber: {data?.social.viber}</Title>
                        <Title level={5}><SkypeOutlined /> {data?.social.skype}</Title> 
                        <Title level={5}>Instargram {data?.social.instargram}</Title>

                        <Button type='primary'>Edit</Button>
                    </Col> 
                    
                </Row> 
                
            </Content> 
        </Layout>
    );
}

export default Settings;