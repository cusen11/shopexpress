import { 
    Layout, Row, Input,
    Col, Typography,Pagination,
    Button

} from 'antd';  
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

    
function GiftCode() {  
    const nameCode = useRef()
    const discountCode = useRef()

    const [page, setPage] = useState(1)
    const [ data, setData ] = useState() 
    const [refresh, setRefresh] = useState(false)
    const [ search , setSearch] = useState(false)
    const [ newCode , setNewCode ] = useState()
    const [ discount , setDiscount ] = useState()
    const [ paginationHide, setPaginationHide ] = useState(false)
    const { Content } = Layout; 
    const { Search } = Input
    const { Text, Title} = Typography  
    const styleItem = {
        width: '100%', 
        background:' #c6fffa7a',
        border: '1px solid #1bff42',
        borderRadius: '5px',
        padding: '0 0 0 10px',
        justifyContent:'space-between',
        display:'flex',
        alignItems:'center'
    }
    const onSearch = (value) =>{
        if(value === ''){
            setSearch(false) 
            setPaginationHide(false)
        }
        else{
            console.log(search)
        }
    }
    const token = useSelector(state=> state.login.value.accessToken) || null
    useEffect(()=>{
        const link = `https://sendeptraidb.herokuapp.com/api/gridcode`
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
            setRefresh(false)
            
            nameCode.current.state.value = ''
            discountCode.current.state.value = ''
        })  
    },[page,refresh]) 
    const PaginationChange = (page) =>{
        setPage(page)
    } 
    const addNewGiftCode = () =>{

        const grid = Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7) 
        + Math.random().toString(36).substring(7)
        + Math.random().toString(36).substring(7) 
        const newGridCode = {
            name: newCode,
            code: grid,
            discount: discount
        }
        axios({
            method:'post',
            url:'https://sendeptraidb.herokuapp.com/api/grid/create',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data:newGridCode
        }).then(res => {
            alert('Thêm thành công!!!')
            setRefresh(true)   
        }).catch(err => console.log(err))
    }
    const deleteGrid = (id) =>{
        const confirm = window.confirm('Bạn có muốn xóa mã này?')
        if(confirm){
            axios({
                method:'delete',
                url:`https://sendeptraidb.herokuapp.com/api/grid/delete/${id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                alert('Xóa thành công!!!')
                setRefresh(true)  
                 
            }).catch(err => console.log(err))
        }
        else{
            return
        }
    }
    return (
        <Layout className="site-layout"> 
               <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Gifr Code</Title>  
                <Row gutter={10}
                justify='start'
                align='middle'
                >
                    <Col>
                        <Search placeholder="Tìm Gift" onSearch={onSearch} enterButton style={{ width: 300 }} />
                    </Col>
                    <Col>
                    <Input type="text" ref={nameCode} placeholder="Nhập gridcode" onChange={(e)=> setNewCode(e.target.value)} />
                     </Col>
                    <Col>
                      <Input type="number" ref={discountCode} placeholder="Giảm giá ( % )" onChange={(e)=> setDiscount(e.target.value)} />
                     </Col>
                    <Col>
                      <Button onClick={addNewGiftCode}>Add new</Button> 
                    </Col>
                    
                </Row>
                <hr/>
                <Row gutter={30}> 
                    <Col xs={24} md={24}>   
                        <Row>  
                            {
                                data?.results.map((item) => 
                                    <Col key={item._id} md={24} xs={24}>
                                        <Title level={5} style={styleItem}> 
                                            <Text  
                                            ellipsis
                                            style={{cursor:"pointer", textDecorationLine: item.status ? '' : 'line-through'}} 
                                            >
                                                {item.name} | {item.discount}% | {item.code}
                                            </Text> 
                                            <Button
                                            type='primary'
                                            danger
                                            onClick={()=>deleteGrid(item._id)}
                                            > Xóa </Button> 
                                        </Title>  
                                    </Col>
                                )
                            }
                        </Row>
                    </Col> 
                </Row>
                { data? 
                    <Row gutter={10} justify='center' hidden={paginationHide} align='middle'>
                    {
                        data.totalItem >= 10 ? 
                        <Pagination  
                        defaultCurrent={data?.currentPage || 1}
                        total={data?.totalItem}
                        onChange={PaginationChange}
                    />: ''
                    } 
                    </Row> :'Loading...'
                }
                
            </Content> 
        </Layout>
    );
}

export default GiftCode;