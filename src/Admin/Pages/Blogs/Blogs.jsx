import { Layout, Row, Col, Typography, Image, Pagination} from 'antd';   
import axios from 'axios';
import { useEffect, useState } from 'react';

    
function Blogs() { 
    const { Content } = Layout; 
    const { Title,Text } = Typography 
    const [page, setPage] = useState(1)
    const [ data, setData ] = useState()
    const onShowSizeChange = (current, pageSize) =>{
        console.log(current, pageSize);
    }
    const PaginationChange = (page) =>{
        setPage(page)
    }

    useEffect(()=>{
        const link = `https://sendeptraidb.herokuapp.com/api/blogs`
        const option = {
            method: 'POST',
            headers:{
               "Content-Type": "application/json"
            },
            data:{ 
                "page": page,
                "limit": 10
            }
        }
        axios(link, option).then(res=>{ 
            setData(res.data)  
        })  
    },[page])
    return (
        <Layout className="site-layout" style={{overflow:'hidden' }}> 
                <Content style={{ margin: '0 16px'}}>
                    <Title type='success' level={1}>Blogs</Title> 
                    <Row>
                        {
                        data?.results.map((item) =>
                            <Col xs={24} md={24} key={item._id}>
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
                                        <Title style={{cursor:'pointer'}} level={3}>{item.title}</Title>
                                        <Text>{item.description}</Text>
                                    </Col>
                                </Row>
                         </Col>
                        )}
                    </Row> 
                </Content>
                <Row gutter={10} justify='center' align='middle'>
                    <Pagination 
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={data?.currentPage || 1}
                        total={data?.totalItem}
                        onChange={PaginationChange}
                    /> 
                </Row>
        </Layout>
    );
}

export default Blogs;