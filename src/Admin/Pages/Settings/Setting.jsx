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
    
function Settings() {   
    const { Content } = Layout;  
    const { Title} = Typography   
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
                        <Title level={4}>Công ty TNHH ABC</Title>
                        <Title level={4}>Slogan: Quấn áo cho cháu</Title>
                        <Title level={5}>Địa chỉ : 75A Bùi Minh Trực P6 Q8 TP.HCM</Title>
                        <Title level={5}>Map: map.google.adjdjadsj;adf/3423sadfjaklsfkaf</Title>

                        <Title level={3}>Thông tin doanh nghiệp</Title>   
                        <Title level={4}>Công ty TNHH ABC</Title>
                        <Title level={5}>Địa chỉ : 75A Bùi Minh Trực P6 Q8 TP.HCM</Title>
                        <Title level={5}>Map: map.google.adjdjadsj;adf/3423sadfjaklsfkaf</Title>

                        <Title level={3}>Thông tin liên hệ</Title>   
                        <Title level={5}><PhoneOutlined /> 0838008448</Title>
                        <Title level={5}><MailOutlined /> cusenbonchen@gmail.com</Title>
                        <Title level={5}><FacebookOutlined /> facebook.com/cusenbonchen</Title> 
                        <Title level={5}>Zalo: zalo.me/0838008448</Title>
                        <Title level={5}>Viber: cusenbonchen</Title>
                        <Title level={5}><SkypeOutlined /> cusenbonchen@gmail.com</Title>

                        <Button type='primary'>Edit</Button>
                    </Col> 
                    
                </Row> 
                
            </Content> 
        </Layout>
    );
}

export default Settings;