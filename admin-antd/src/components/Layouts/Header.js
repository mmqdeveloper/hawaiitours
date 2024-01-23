import { Header } from "antd/es/layout/layout"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button } from "antd";
import HeaderProfile from "../HeaderProfile";
import NavBarUser from "./NavbarUser";

const HeaderLayout = ({colorBgContainer, setCollapsed, collapsed}) => {
    return (
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <HeaderProfile/>
          {/* <NavBarUser/> */}
        </Header>
    )
}

export default HeaderLayout;