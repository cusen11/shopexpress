import { Layout, Breadcrumb } from 'antd';  

    
function Settings() {  
    const { Content } = Layout;  
    return (
        <Layout className="site-layout"> 
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}> 
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    Settings
                    </div>
                </Content> 
        </Layout>
    );
}

export default Settings;