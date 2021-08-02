import { 
    Layout, Row, Input,
    Col, Typography, Button, 
    Image, Drawer,Pagination,

} from 'antd';   
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery"; 
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

    
function Products() {  
    const history = useHistory()

    const { Content } = Layout; 
    const [page, setPage] = useState(1)
    const [ data, setData ] = useState()
    const [ search , setSearch] = useState(false)
    const [ dataSearch, setDataSearch ] = useState()
    const [refresh, setRefresh] = useState(false)
    const { Search } = Input
    const { Text, Title, Paragraph} = Typography 
    const [visible, setVisible] = useState(false);
    const [ dataProduct, setDataProduct ] = useState()  
    
    const [ paginationHide, setPaginationHide ] = useState(false)
    const token = useSelector(state=> state.login.value.accessToken) || null
    const onClose = () => {
      setVisible(false);
    }; 
 
    useEffect(()=>{
        const link = `https://sendeptraidb.herokuapp.com/api/product `
        const option = {
            method: 'GET',
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
            setRefresh(false)  
        })  
    },[page,refresh])
    const styleItem = {
        width: '95%',
        height: '35px',
        lineHeight: '2',
        background:' #c6fffa7a',
        border: '1px solid #1bff42',
        borderRadius: '5px',
        padding: '0 10px',
    }
    const onSearch = value => { 
        if(value === ''){
            setSearch(false) 
            setPaginationHide(false)
        }
        else{
            setSearch(true)
            axios({
                method:'post',
                url: 'https://sendeptraidb.herokuapp.com/api/search-products', 
                data:{
                    query: value
                }
            }).then(res => {
                setDataSearch(res.data) 
                setPaginationHide(true) 
            })
            .catch(err => console.log(err))
        }
        
    } 
    const PaginationChange = (page) =>{
        setPage(page) 
    }
    const deleteProduct = (id) =>{
        try {
            axios({
                method:'delete',
                url:`https://sendeptraidb.herokuapp.com/api/product/delete/${id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => 
                {
                
                    setVisible(false)
                    setRefresh(!refresh)
                    alert('Xóa thành công')
                }  
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout className="site-layout"> 
            <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Products</Title>  
                <Col xs={12} md={12}>
                        <Search
                            placeholder="Tìm sản phẩm"
                            allowClear
                            enterButton="Search"
                            size="middle" 
                            onSearch={onSearch}
                        /> 
                        <Button type='primary' onClick={()=>history.push('/create-product')} >Tạo mới</Button>
                    </Col> 
                {
                    data? 
                    <Row gutter={30}> 
                    <Col xs={24} md={24}>   
                        <Row>  
                            {
                                !search?
                                <Col md={24} sm={24}>
                                    {
                                        data?.map((product) => 
                                        <Col key={product._id} md={24} xs={24}>
                                            <Title level={5} style={styleItem}> 
                                                    <Text  
                                                    ellipsis
                                                    style={{width:"70%", cursor:"pointer"}}
                                                    onClick={()=>{ 
                                                        setVisible(true)
                                                        setDataProduct(product) 
                                                    }}
                                                    >
                                                        {product.name}
                                                    </Text>  
                                            </Title>  
                                        </Col>
                                    )
                                    }
                                </Col>
                                :
                                <Col md={24} sm={24}>
                                    {
                                        dataSearch?.results.map((product) => 
                                        <Col key={product._id} md={24} xs={24}>
                                            <Title level={5} style={styleItem}> 
                                                    <Text  
                                                    ellipsis
                                                    style={{width:"70%", cursor:"pointer"}}
                                                    onClick={()=>{ 
                                                        setVisible(true)
                                                        setDataProduct(product) 
                                                    }}
                                                    >
                                                        {product.name}
                                                    </Text>  
                                            </Title>  
                                        </Col>
                                    )
                                    }
                                </Col>
                            }
                        </Row>
                    </Col>
                    <Drawer width="60%"
                        title={dataProduct?.name}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Col xs={24} md={24}>  
                            <Image preview={false}
                                width={200}
                                src={dataProduct?.images}
                            /> 
                            <Paragraph>{dataProduct?.description}</Paragraph> 
                            <Title level={5}>Thương hiệu : Nhật bản</Title> 
                            <Title level={5}>Size : Cập nhật</Title>
                            <Title level={5}>Giá : {dataProduct?.price}</Title>
                            <Title level={5}>Khuyến mãi : Cập nhật..</Title>
                            <Title level={5}>Category :{dataProduct?.category}</Title>
                            
                            <Button size='middle' type="primary" onClick={()=> history.push('/edit-product',{data: dataProduct} )}>Edit Product</Button>  
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
                            <Button size='middle' type="primary">Edit List Image</Button> 
                            <Row gutter={10} justify='end' align='middle'>
                            <Button size='middle' type="primary" danger onClick={()=> deleteProduct(dataProduct._id)}>Delete</Button> 
                            </Row> 
                        </Col> 
                    </Drawer>  
                </Row>:'Loading...'
                }
                {data? <Row gutter={10} justify='center' hidden={paginationHide} align='middle'>
                    {
                        data.totalItem >= 10 ? 
                        <Pagination  
                        defaultCurrent={data?.currentPage || 1}
                        total={data?.totalItem}
                        onChange={PaginationChange}
                    />: ''
                    } 
                </Row> :''}
                
            </Content> 
        </Layout>
    );
}

export default Products;