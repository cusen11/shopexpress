import { Layout,Row, Col } from 'antd';   
import Title from 'antd/lib/skeleton/Title';
import Charts from '../../Components/Charts/Charts';
    
function HomePage() { 
    const { Content } = Layout;  
    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Title level={3}>Đây là Charts</Title>
                     <Row justify='space-between'>
                         <Col xs={24} md={7}>
                             <Charts serieType='bar' />
                         </Col>
                         <Col xs={24} md={7}>
                             <Charts serieType='line' />
                         </Col>
                         <Col xs={24} md={7}>
                             <Charts serieType='area' />
                         </Col>
                     </Row> 
                </Content>
        </Layout>
    );
}

export default HomePage;