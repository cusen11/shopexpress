import { 
    Layout, Row,
    Col, Typography,Avatar,
    Button, Pagination,Modal, Image

} from 'antd';  
import Search from 'antd/lib/input/Search'; 
import axios from 'axios';
import { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';

    
function Users() {   
    const { Content } = Layout; 
    const { Title} = Typography  
    const [ search , setSearch] = useState(false)
    const [ data, setData ] = useState() 
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(false)  
    const [ paginationHide, setPaginationHide ] = useState(false) 
  
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
        const link = `https://sendeptraidb.herokuapp.com/api/listusers`
        const option = {
            method: 'POST',
            headers:{
               "Content-Type": "application/json"
            },
            data:{ 
                "page": page,
                "limit": 30
            }
        }
        axios(link, option).then(res=>{ 
            setData(res.data) 
            setRefresh(false)  
        })  
    },[page,refresh]) 

    const PaginationChange = (page) =>{
        setPage(page)
    }  

    const deleteUser = (id, level) =>{ 
        if(level === "1"){
            alert('Bố mày là admin mày éo có quyền xóa nhé')
            return
        }  
        else{
            const confirm = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')
            if(!confirm)
                return
            axios({
                method:'delete',
                url:`https://sendeptraidb.herokuapp.com/api/users/remove/${id}`,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res=>{
                setRefresh(true)
                alert('Xóa thành công!!!')
            }).catch(err => console.log(err))
        }
    }
    const handleClickUser = (user) =>{ 
        info(user) 
        console.log(user)
    }  
    const fullDay = (time) => {
        const date = new Date('2021-08-05T09:43:36.213Z')
        return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    }
    const info = (user) =>{
        Modal.info({
          title: 'Thông tin người dùng',
          content: (
            <div>
                <Image
                    width={200}
                    src={user.avatar}
                />
                <Typography.Title level={4}>{user.fistname + ' ' + user.lastname}</Typography.Title>
                <Typography.Text><strong>Address : </strong> {user.address}</Typography.Text> <br/>
                <Typography.Text><strong>Phone : </strong>{user.phone}</Typography.Text> <br/>
                <Typography.Text><strong>Email : </strong>{user.mail}</Typography.Text><br/> 
                <Typography.Text><strong>Ngày đăng ký : </strong>{fullDay(user.createAt)}</Typography.Text> 
            </div>
          ),
          onOk() { 
              
          },
        });
      }
    return (
        <Layout className="site-layout"> 
               <Content style={{ margin: '0 16px' }}>
                <Title type='success' level={1}>Users</Title>
                <Search placeholder="Tìm Users" onSearch={onSearch} enterButton style={{ width: 300 }} />   
                <Row gutter={30}> 
                    <Col xs={24} md={24}>   
                        <Row guttet={10} >  
                            {
                                data?.results.map((item) => 
                                    <Col  justify="center" 
                                    align='middle' key={item._id} md={4} xs={4} style={{marginBottom: '10px'}}>
                                        <Avatar style={{cursor:'pointer'}} onClick={()=> handleClickUser(item)} 
                                            size={64}
                                            src={item.avatar}
                                        />  
                                         <Title level={5}>{item.fistname}</Title>
                                         <Button type='primary' danger onClick={()=> deleteUser(item._id, item.level)}>Delete</Button>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col> 
                </Row> 
                
                { data? 
                    <Row gutter={10} justify='center' hidden={paginationHide} align='middle'>
                    {
                        data.totalItem >= 30 ? 
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

export default Users;