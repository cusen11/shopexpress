import { Layout,Row, Col } from 'antd';   
import Title from 'antd/lib/skeleton/Title';
import ChartsPie from '../../Components/Charts/ChartsPie';
import ChartsBar from '../../Components/Charts/ChartsBar';
import ChartsLine from '../../Components/Charts/ChartsLine';
    
function HomePage() { 
    const { Content } = Layout;  
    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Title level={3}>Đây là Charts</Title>
                    
                         <Col xs={24} md={12}>
                            <Row justify='space-between'>
                                <Col xs={24} md={12}>
                                        <ChartsPie />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Row>
                                        <Col xs={24} md={24}>
                                            <ChartsLine />
                                        </Col>
                                        <Col xs={24} md={24}>
                                            <ChartsBar />
                                        </Col>
                                    </Row> 
                                </Col> 
                            </Row> 
                         </Col>
                        
                    
                </Content>
        </Layout>
    );
}

export default HomePage;