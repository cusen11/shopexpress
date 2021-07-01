import { Layout, Breadcrumb, Row, Col, Typography,Avatar, Button } from 'antd';  
import { useState } from 'react';


    
function Products() {  
    const { Content } = Layout; 
    const { Text, Title} = Typography
    const [item, setItem] = useState()

    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}> 
                        <Breadcrumb.Item><Title type="secondary" level={1}>Products</Title></Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={30}> 
                        <Col xs={10} md={10}> 
                        <Title level={3}>List Product</Title>
                            <Row>
                           
                            {
                                [...Array(20)].map((e, i) => 
                                    <Col key={i} md={24} xs={24}>
                                        <Title level={4} >
                                            
                                                <Text 
                                                ellipsis
                                                style={{width:"70%", cursor:"pointer"}}
                                                onClick={()=> setItem(i+1)}
                                                >
                                                    {i+1}. Dầu gội đầu hương cam xả
                                                </Text> 
                                        </Title> 
                                        <hr style={{width:'100%', display:'block'}}/> 
                                    </Col>
                                )
                            }
                            </Row>
                        </Col>
                        <Col xs={14} md={14}> 
                            <Title level={3}>Info Product</Title>
                            <Title level={3}>{item}</Title>
                            <Button size="small" type="primary">Edit</Button>  
                            <Button size="small" type="primary" danger>Delete</Button> 
                        </Col>
                        
                    </Row>
                </Content> 
        </Layout>
    );
}

export default Products;