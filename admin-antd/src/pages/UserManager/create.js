import { Button, Card, Col, Input, Row, Form, Select, notification, Spin } from "antd";
import { PageTitle } from "../../components/TitlesTypo";
import { validateMessages } from "../../constants/validateMessage";
import SelectRole from "../../components/Selects/SelectRole";
import { useEffect, useState } from "react";
import axiosInstance from '../../configs/axiosConfig';
import NotificationComponent from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

const UserCreate = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, message , desc) => {
    api[type]({
      message: message,
      description: desc,
      type,
    })
  }
    const fetchFilter = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/role');
            const filteredRoles = response.map(role => ({
                value: role._id,
                label: role.name,
            }));
            setRoles(filteredRoles);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFilter();
            return () => {
                setRoles([]);
            };
    }, []);
    const [form] = Form.useForm()
    const { Option } = Select;
    const SubmitForm = async (values) => {
        const submitValues = {...values, contactInfo: {
            website: values.website,
        }}

        const {website, ...data} = submitValues;
        try {
            setLoading(true);
            const response = await axiosInstance.post('/auth/register', data);
        
            if (response.success) {
                openNotificationWithIcon('success', "Create Success" ,response.message) 
                navigate('/users');
                form.resetFields();
            }else{
                openNotificationWithIcon('error', "Create Error", response.message) 
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error sending data to API:', error);
            openNotificationWithIcon('error', "Create Error", error.message)
        }
      }
    return (
        <>
        {contextHolder}
        <PageTitle title={"Add New User"} />
        <div className="site-card-border-less-wrapper">
            <Card
            bordered={true}
            className="card-boxshadow"
            style={{
                width: '100%',
            }}
            title="Create a brand new user and add them to this site."
            >
            <Row>
                <Col span={8}>
                <Form
                    form={form}
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 800 }}
                    validateMessages={validateMessages}
                    onFinish={SubmitForm}
                >
                   
                    <Form.Item
                        label="Username"
                        name={['username']}
                        rules={[
                        {
                            required: true,
                            message: 'Please type Username!',
                        },
                        ]}
                    >
                        <Input placeholder={'Username'} />
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name={['firstName']}
                        rules={[
                        {
                            required: true,
                            message: 'Please type first name!',
                        },
                        ]}
                    >
                        <Input placeholder={'First Name'}/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name={['lastName']}
                        rules={[
                        {
                            required: true,
                            message: 'Please type last name!',
                        },
                        ]}
                    >
                        <Input placeholder={'Last Name'} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name={['email']}
                        rules={[
                            {
                            required: true,
                            type: 'email',
                            },
                        ]}
                        >
                        <Input placeholder={'Email'} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name={['phone']}
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input placeholder={'Phone'} />
                    </Form.Item>
                    <Form.Item
                        label="Website"
                        name={['website']}
                        >
                        <Input placeholder={'Website'}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name={['password']}
                        rules={[
                            {
                            required: true,
                            min: 6
                            },
                        ]}
                        >
                        <Input placeholder={'Password'} type="password"/>
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name={['role']}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                        <Select
                            style={{
                            width: 200,
                            }}
                            placeholder="Select Role"
                        >
                            {roles?.map((item) => (
                            <Option key={item.value} value={item.label}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" disabled={loading}>
                            Submit
                            {loading && 
                                <Spin
                                    indicator={
                                    <LoadingOutlined
                                        style={{
                                        fontSize: 24,
                                        }}
                                        spin
                                    />
                                    }
                                />
                            }
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
            </Card>
        </div>
        </>
    )
}

export default UserCreate;