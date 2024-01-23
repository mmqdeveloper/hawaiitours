
import { Menu } from 'antd';
import React from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { navigattions } from '../../constants/navigations';

const MenuBar = () => {
    return (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={navigattions}
        />
    )
}

export default MenuBar;