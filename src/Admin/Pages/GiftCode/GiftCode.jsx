import { Layout, Breadcrumb } from 'antd';  


    
function GiftCode() {  
    const { Content } = Layout;  
    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}> 
                    <Breadcrumb.Item>GiftCode</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    GiftCode
                    </div>
                </Content> 
        </Layout>
    );
}

export default GiftCode;