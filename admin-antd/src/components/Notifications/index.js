import React from 'react';
import { notification } from 'antd';

const NotificationComponent = (type, desc) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: type,
      description: desc,
      type,
    });
  };

  return (
    <div>
      {contextHolder}
    </div>
  );
};

export default NotificationComponent;
