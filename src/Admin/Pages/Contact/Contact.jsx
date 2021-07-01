import { Layout, Breadcrumb } from 'antd';  


    
function Contact() {  
    const { Content } = Layout;  
    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}> 
                    <Breadcrumb.Item>Contact</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    Contact
                    </div>
                </Content> 
        </Layout>
    );
}

export default Contact;