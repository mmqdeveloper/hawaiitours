import React from 'react';
import { DownOutlined , UserOutlined, SmileOutlined} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/authAction';
const items = [
  {
    type: 'divider',
  },
  {
    label: 'Logout',
    key: 'logout',
  },
];
const HeaderProfile = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = ({key}) => {
        console.log(key);
        if (key == 'logout') {
            dispatch(logoutUser());
        }
    };

      const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              View Profile
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: 'logout',
          danger: true,
          label: 'Logout',
          onClick: handleLogout
        },
      ];
      
    return (
        <div style={{float: "right", marginRight: "30px"}}>
            <Dropdown menu={{items}} placement="bottomRight" >
                <Button>
                    <Avatar size="small" icon={<UserOutlined />} /> {`${user?.firstName || ''} ${user?.lastName || ''}`}
                </Button>
            </Dropdown>
        </div>
    )
};
export default HeaderProfile;