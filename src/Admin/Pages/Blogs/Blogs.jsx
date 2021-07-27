import { Layout, Row, Col, Typography, Image, Pagination, Skeleton, Button, Drawer, Divider, Input} from 'antd';  
import Search from 'antd/lib/input/Search'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Create from './Create';
import EditBlog from './EditBlog';

    
function Blogs() { 
    
    const { Content } = Layout; 
    const { Title,Text } = Typography 
    const [page, setPage] = useState(1)
    const [ data, setData ] = useState() 
    const [refresh, setRefresh] = useState(false)
    const [dataDetails, setDataDetails] = useState()
    const [visible, setVisible] = useState(false);   
    const [visibleAdd, setVisibleAdd] = useState(false); 
    const [edit, setEdit] = useState(false)

    const PaginationChange = (page) =>{
        setPage(page) 
    }
    const token = useSelector(state=> state.login.value.accessToken) || null
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
            setRefresh(false)  
        })  
    },[page,refresh])
    const handleClick = (id) =>{
        axios(
            {
                method:'get',
                url:`https://sendeptraidb.herokuapp.com/api/blog/detail/${id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          .then(res => {
             setDataDetails(res.data.results)
             setVisible(true)
          })
          .catch(function (error) {
           console.log(error)
          }); 
    }
    const onClose = () => {
        setVisible(false);
    };  
    const onCloseAddnew = () => {
        setVisibleAdd(false);
    }; 
    const onSearch = value => {
        console.log(value);
    }
    const handleAddnew = () => {
        setVisibleAdd(true);
    }
    
    const handleDeleteBlog = (id) =>{
        const confirm = window.confirm('Bạn có muốn xóa bài viết này không?')
        if(confirm){
            axios({
                method:'delete',
                url:`https://sendeptraidb.herokuapp.com/api/blog/remove/${id}`,
                headers:{ 
                    'Authorization': `Bearer ${token}`
                }
            }).then(res=>{ 
                alert('Xóa thành công!!!')
                setVisible(false) 
                setRefresh(true)
            }).catch(err=> console.log(err))
        }
        else{
            return
        }

    }

    const handleEdit = (id) =>{
        console.log(id)
        setEdit(true)
    }
    return (
        <Layout className="site-layout" style={{overflow:'hidden' }}> 
                <Content style={{ margin: '0 16px'}}>   
                <br/>
                <Row gutter={10}
                justify='start'
                align='middle'
                >
                    <Col xs={12} md={12}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="middle" 
                            onSearch={onSearch}
                        />
                    </Col> 
                    <Col>
                        <Button onClick={handleAddnew} type='primary'>Thêm Tin</Button>
                    </Col> 
                </Row>
                <Row>
                    {
                    data ? 
                        data?.results.map((item) =>
                            <Col xs={24} md={24} key={item._id}>
                                <Divider dashed style={{margin:'10px 0'}}/>
                                <Row 
                                justify='start'
                                gutter='10'
                                >
                                    <Col>
                                    <Image preview={false}
                                        width={80}
                                        src={ item.thumbnail? item.thumbnail : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                                    />
                                    </Col>
                                    <Col> 
                                        <Title onClick={()=> handleClick(item._id)} style={{cursor:'pointer'}} level={3}>{item.title}</Title>
                                        <Text>{item.description}</Text>
                                    </Col>
                                </Row>
                                
                        </Col>
                        ) :
                        [...Array(10)].map((item,index) =>
                            <Skeleton key={index} active />
                        )}
                    </Row> 
                    <Drawer width="80%"
                        title={dataDetails!==undefined ? dataDetails.title : <Skeleton /> }
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        {
                            dataDetails !== undefined ? 
                                !edit ? <Col xs={24} md={24}>  
                                            <Image preview={false}
                                                width={200}
                                                src={dataDetails.thumbnail}
                                            /> 
                                            <br/>
                                            <Text>Trạng thái: {dataDetails.status ? 'Công bố' : 'Riêng tư'}</Text> 
                                            <br/>
                                            <Input name='title' onChange={(e)=> console.log(e.target.value)} placeholder="Basic usage" />
                                            <br/>
                                            <div dangerouslySetInnerHTML={{__html: dataDetails.content}}/>
                                            <br/>
                                            <Button onClick={()=>handleEdit(dataDetails._id)}>Sửa</Button>
                                            <Button type='primary' danger onClick={() => handleDeleteBlog(dataDetails._id)} > Xóa </Button>
                                        </Col>  :
                                        <EditBlog data = {dataDetails}/>
                                : 
                                [...Array(10)].map((item,index) =>
                                    <Skeleton key={index} active />
                                )
                        }
                    </Drawer>
                </Content>
                {data? <Row gutter={10} justify='center' align='middle'>
                    {
                        data.totalItem >= 10 ? 
                        <Pagination  
                        defaultCurrent={data?.currentPage || 1}
                        total={data?.totalItem}
                        onChange={PaginationChange}
                    />: ''
                    } 
                </Row> :''}
                <Drawer width="80%"
                 title='Thêm mới tin'
                 placement="right"
                 closable={false}
                 onClose={onCloseAddnew}
                 visible={visibleAdd}
                >
                    <Create  
                        changeVisable = { (m, t) => {
                            setVisibleAdd(m)
                            setRefresh(t)
                        } }/>
                </Drawer>
        </Layout>
       
    );
}

export default Blogs;