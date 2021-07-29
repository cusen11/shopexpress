import { 
    Layout, Row,
    Col, Typography,Avatar,
    Image,Button,Drawer

} from 'antd';  
import { useState } from 'react'; 

    
function Users() {   
    const { Content } = Layout; 
    const { Title} = Typography  
    const [item, setItem] = useState() 
    const handleClickUser = (i) =>{
        console.log(i)
        setItem(i)
        setVisible(true);
    }
    const [visible, setVisible] = useState(false);  
    const onClose = () => {
      setVisible(false);
    }; 
    return (
        <Layout className="site-layout"> 
               <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Users</Title>   
                <Row gutter={30}> 
                    <Col xs={24} md={24}>   
                        <Row guttet={10} >  
                            {
                                [...Array(10)].map((e, i) => 
                                    <Col  justify="center" 
                                    align='middle' key={i} md={4} xs={4} style={{marginBottom: '10px'}}>
                                        <Avatar onClick={()=> handleClickUser(i)} 
                                            size={64}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        /> 
                                         <Title level={5}>Nguyễn Văn Chuối</Title>
                                         <Button type='primary' danger>Delete</Button>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col> 
                </Row> 
                 
                <Drawer width="50%"
                        title={`Nguyễn Văn Chuối ${item}` }
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Col xs={24} md={24}>  
                            <Image
                                width={200}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            /> 
                            <Title level={5}>Thương hiệu : Nhật bản</Title>
                            <Title level={5}>Số lượng : 1499</Title>
                            <Title level={5}>Giá : 50000</Title>
                            <Title level={5}>Khuyến mãi : 20%</Title>
                            <Title level={5}>Category : Quần áo</Title>
                             
                        </Col> 
                    </Drawer>  
            </Content> 
        </Layout>
    );
}

export default Users;