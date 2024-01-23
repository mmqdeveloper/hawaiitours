import { Button, Card, Col, Input, Row, Form, Select } from "antd";
import { PageTitle } from "../../components/TitlesTypo";
import { validateMessages } from "../../constants/validateMessage";
import SelectRole from "../../components/Selects/SelectRole";
import { useEffect, useState } from "react";
import axiosInstance from '../../configs/axiosConfig';

const UserCreate = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
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
        try {
          const response = await axiosInstance.post('/auth/register', values);
      
          
          console.log('Response from API:', response.data);
      
          form.resetFields();
        } catch (error) {
          console.error('Error sending data to API:', error);
        }
      }
    return (
        <>
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
                            type: 'number',
                            },
                        ]}
                        >
                        <Input placeholder={'Email'} />
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
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Submit
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