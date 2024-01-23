import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import MenuBar from './MenuBar';
import HeaderLayout from './Header';
const { Sider, Content } = Layout;
const LayoutDefault = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 style={{color: 'white', textAlign: "center"}}>Hawaii Tours</h2>
        </div>
        <MenuBar/>
      </Sider>
      <Layout>
        <HeaderLayout colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutDefault;