import { 
    Layout, Row, Input,
    Col, Typography, Button, 
    Image, Drawer,Radio 

} from 'antd';   
import { useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

    
function Products() {  
    const { Content } = Layout; 
    const { Search } = Input
    const { Text, Title, Paragraph} = Typography
    const [item, setItem] = useState()
    const [visible, setVisible] = useState(false); 
    const [valueRadio, setValueRadio] = useState(24); 
    const onClose = () => {
      setVisible(false);
    };
    const onChangeRadio = e => {
        console.log('radio checked', e.target.value);
        setValueRadio(e.target.value);
    };
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
    return (
        <Layout className="site-layout"> 
            <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Products</Title>  
                <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: 300 }} /> 
                <Row gutter={30}> 
                    <Col xs={24} md={24}>  
                    <Radio.Group onChange={onChangeRadio} value={valueRadio}> 
                        <Radio selected value={24}>1 Row</Radio>  
                        <Radio value={12}>2 Row</Radio>
                        <Radio value={7}>3 Row</Radio>
                    </Radio.Group> 
                    <Row> 
                        {
                            [...Array(20)].map((e, i) => 
                                <Col key={i} md={valueRadio} xs={24}>
                                    <Title level={5} style={styleItem}> 
                                            <Text  
                                            ellipsis
                                            style={{width:"70%", cursor:"pointer"}}
                                            onClick={()=>{
                                                setItem(i+1) 
                                                setVisible(true)
                                            }}
                                            >
                                                {i+1}. Dầu gội đầu hương cam xả
                                            </Text> 
                                    </Title>  
                                </Col>
                            )
                        }
                    </Row>
                    </Col>
                    <Drawer width="60%"
                        title={`Dầu gội đầu hương cam xả ${item}`}
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
                            <Paragraph>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas laboriosam dicta totam vel. Optio fugiat nulla eum. Iusto est sed rem ad ab quod placeat. Nulla illo doloremque reprehenderit dolorem.</Paragraph> 
                            <Title level={5}>Thương hiệu : Nhật bản</Title>
                            <Title level={5}>Số lượng : 1499</Title>
                            <Title level={5}>Giá : 50000</Title>
                            <Title level={5}>Khuyến mãi : 20%</Title>
                            <Title level={5}>Category : Quần áo</Title>
                            
                            <Row gutter={10} justify='end' align='middle'>
                                <Button size='middle' type="primary">Edit</Button>  
                                <Button size='middle' type="primary" danger>Delete</Button>
                            </Row>
                            <Title level={4}>List Image</Title>
                            <LightgalleryProvider>
                                <Row gutter="10">
                                    {
                                        [...Array(8)].map((e, i) => 
                                        <Col key={i}>
                                            <LightgalleryItem   group="b" src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'> 
                                                <img className="lazyload" width="80px" style={{padding:"5px 0"}}
                                                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' alt=""/>
                                            </LightgalleryItem> 
                                        </Col>
                                        )
                                    } 
                                </Row>
                            </LightgalleryProvider> 
                            <Row gutter={10} justify='end' align='middle'>
                                <Button size='middle' type="primary">Edit</Button>  
                                <Button size='middle' type="primary" danger>Delete</Button>
                            </Row>
                        </Col> 
                    </Drawer>
                    <Col xs={14} md={14}>  
                        
                    </Col>
                    
                </Row>
            </Content> 
        </Layout>
    );
}

export default Products;