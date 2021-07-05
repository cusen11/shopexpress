import { Layout, Row, Col, Typography, Image, Pagination} from 'antd';   

    
function Blogs() { 
    const { Content } = Layout; 
    const { Title,Text } = Typography 
    const onShowSizeChange = (current, pageSize) =>{
        console.log(current, pageSize);
      }
    const PaginationChange = (page) =>{
        console.log(page);
    }
    return (
        <Layout className="site-layout" style={{overflow:'hidden' }}> 
                <Content style={{ margin: '0 16px'}}>
                    <Title type='success' level={1}>Blogs</Title> 
                    <Row>
                        {
                            [...Array(20)].map((item, index) =>
                            <Col xs={24} md={24} key={index}>
                                <Row 
                                justify='start'
                                gutter='10'
                                >
                                    <Col>
                                    <Image preview={false}
                                        width={80}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                    </Col>
                                    <Col> 
                                        <Title style={{cursor:'pointer'}} level={3}> Đây là title {index + 1} </Title>
                                        <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut enim commodi atque delectus velit incidunt. Cupiditate ducimus dolorem aliquam officia! </Text>
                                    </Col>
                                </Row>
                         </Col>
                            )
                            
                        }
                    </Row> 
                </Content>
                <Row gutter={10} justify='center' align='middle'>
                    <Pagination 
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={3}
                        total={500}
                        onChange={PaginationChange}
                    /> 
                </Row>
        </Layout>
    );
}

export default Blogs;