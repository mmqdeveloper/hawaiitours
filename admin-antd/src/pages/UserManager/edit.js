import { Button, Card, Col, Input, Row, Form, Select, notification, Spin } from "antd";
import { PageTitle } from "../../components/TitlesTypo";
import { validateMessages } from "../../constants/validateMessage";
import { useEffect, useState } from "react";
import axiosInstance from '../../configs/axiosConfig';
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

const UserEdit = () => {
    const [roles, setRoles] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm()
    const { Option } = Select;

    const openNotificationWithIcon = (type, message , desc) => {
        api[type]({
        message: message,
        description: desc,
        type,
        })
    }

    const fetchFilter = async () => {
        try {
     
            const response = await axiosInstance.get('/role');
            const filteredRoles = response.map(role => ({
                value: role._id,
                label: role.name,
            }));
            setRoles(filteredRoles);
        } catch (error) {
            setRoles([]);
        }
    }

    const fetchData = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/users/${id}`);
            if (response.success) {
                setData(response.data)
            }else{
                setData(null)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    } 
    

    useEffect(() => {
        const fetchDataAndSetDefaults = async () => {
            await fetchFilter();
            await fetchData(params.id);
        }

        fetchDataAndSetDefaults();
        return () => {
            setRoles([]);
        };
    }, [params.id]);

    useEffect(() => {
        if (data) {
            const { username, firstName, lastName, email, phone, password ,contactInfo, role } = data;
            form.setFieldsValue({
                username,
                firstName,
                lastName,
                email,
                phone,
                website: contactInfo ? contactInfo.website : '',
                password,
                role: role? role.name : '',
            });
        }
    }, [data]);

    const SubmitForm = async (values) => {
        try {
            setLoading(true);
            const submitValues = { ...values, contactInfo: { website: values.website } };
            delete submitValues.website;
            if (data) {
                submitValues.password = data.password;
            }

            const response = await axiosInstance.put(`/users/${params.id}`, submitValues);
          
            if (response.success) {
                setLoading(false);
                openNotificationWithIcon('success', "Edit Success" ,response.message) 
                navigate('/users');
                form.resetFields();
            }else{
                setLoading(false);
                openNotificationWithIcon('error', "Edit Error", response.message) 
            }
        } catch (error) {
            setLoading(false);
            console.error('Error sending data to API:', error);
            openNotificationWithIcon('error', "Edit Error", error.message)
        }
    }
    return (
        <>
        {contextHolder}
        <PageTitle title={"Edit User"} />
        <div className="site-card-border-less-wrapper">
            <Card
            bordered={true}
            className="card-boxshadow"
            style={{
                width: '100%',
            }}
            title="Edit a brand new user and add them to this site."
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

export default UserEdit;