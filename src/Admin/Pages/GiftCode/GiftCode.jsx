import { 
    Layout, Row, Input,
    Col, Typography,Pagination,
    Button 

} from 'antd';  

    
function GiftCode() {   
    const { Content } = Layout; 
    const { Search } = Input
    const { Text, Title, Paragraph} = Typography  
    const styleItem = {
        width: '95%',
        height: '35px',
        lineHeight: '2',
        background:' #c6fffa7a',
        border: '1px solid #1bff42',
        borderRadius: '5px',
        padding: '0 10px',
    }
    const onSearch = (value) =>{
        console.log(value)
    }

    const onShowSizeChange = (current, pageSize) =>{
        console.log(current, pageSize);
    }
    const PaginationChange = (page) =>{
        console.log(page);
    }
    const createString = () =>{
        let gift = Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7) 
        return gift
    } 
    const addNewGiftCode = () =>{
        console.log(Math.random().toString(36).substring(7))
    }
    return (
        <Layout className="site-layout"> 
               <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Gifr Code</Title>  
                <Search placeholder="Tìm Gift" onSearch={onSearch} enterButton style={{ width: 300 }} />
                <Button onClick={addNewGiftCode}>Add new</Button> 
                <Row gutter={30}> 
                    <Col xs={24} md={24}>   
                        <Row> 
                            <Paragraph italic style={{width:'100%'}}>Tên Gift | Giảm giá | Mã</Paragraph>
                            {
                                [...Array(20)].map((e, i) => 
                                    <Col key={i} md={24} xs={24}>
                                        <Title level={5} style={styleItem}> 
                                            <Text  
                                            ellipsis
                                            style={{width:"70%", cursor:"pointer"}} 
                                            >
                                                Giảm giá mùa hè rực rỡ | 20% | {createString()}
                                            </Text>  
                                        </Title>  
                                    </Col>
                                )
                            }
                        </Row>
                    </Col> 
                </Row>
                <Row gutter={10} justify='center' align='middle'>
                    <Pagination 
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={3}
                        total={500}
                        onChange={PaginationChange}
                    /> 
                </Row>
                
            </Content> 
        </Layout>
    );
}

export default GiftCode;