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
import EditSetting from './EditSetting';
    
function Settings() {   
    const { Content } = Layout
    const { Title} = Typography 
    const [ edit , setEdit ] = useState(false)
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
    },[token,edit])  
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
                                <EditSetting data={data} successEdit={(m)=> setEdit(m)} />
                            </Row>
                        </Content> :'' 
               }
        </Layout>
    );
}

export default Settings;