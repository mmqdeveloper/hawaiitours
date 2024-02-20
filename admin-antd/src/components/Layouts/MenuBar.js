
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { navigattions } from '../../constants/navigations';
import { useLocation } from 'react-router-dom';

const MenuBar = () => {
  const [activeKey, setActiveKey] = useState('dashboard'); 
  const location = useLocation();
  
  
  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = navigattions.find((item) =>
      currentPath.includes(item.key)
    );
console.log('currentPath:', currentPath);
  console.log('matchingItem:', matchingItem);
    if (matchingItem) {
      setActiveKey(matchingItem.key);
    }
  }, [location]);
    return (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[activeKey]}
          items={navigattions}
        />
    )
}

export default MenuBar;