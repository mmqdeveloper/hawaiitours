import { useEffect, useState } from "react";
import axiosInstance from '../../configs/axiosConfig';
import { Button, Select, Space, Spin, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import {PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined} from '@ant-design/icons';
import Title from "antd/es/skeleton/Title";
import { getFullname } from "../../hooks/texthooks";
import { PageTitle } from "../../components/TitlesTypo";

const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text,record) => 
        <Link to={`details/${record._id}`}>
            {text}
        </Link>

    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (text, record) => getFullname(record.firstName, record.lastName)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (record.role?.name)
    },
    {
      title: 'Action',
      dataIndex: '_id',
      width: '200px',
      
      render: (record) => (
        <div className="table-action">
          <Link to={`details/${record}`}>
            <Button className="btn-mr15" icon={<EyeOutlined />}></Button>
          </Link>
          <Link to={`edit/${record}`}>
            <Button className="btn-mr15" icon={<EditOutlined />} type="primary"></Button>
          </Link>
          <Button
            danger
            icon={<DeleteOutlined />}
            type="primary"
            // onClick={() => {
            //   setDel(record), showModal()
            // }}
          ></Button>
        </div>
      ),
    },
  ];

const UserManager = () => {
    const [data, setData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/users');
            console.log(response);
            setData(response);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const fetchFilter = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/role');
            console.log(response);
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
        fetchData();
        fetchFilter();
        return () => {
            setData([]);
        };
    }, []);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const start = () => {
      setLoading(true);
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    return (
        <>
            <PageTitle title={"Users"} />
            <Spin spinning={loading} tip="Loading...">
                <Table 
                    bordered 
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={data ? data : []}  
                    rowKey="_id"
                    title={() => (
                        <>
                        <div className="custom-table-title">
                            <div>
                                <span>List of Members</span>
                            </div>
                            <div className="custom-table-title-items">
                            <Select
                                showSearch
                                style={{
                                width: 200,
                                }}
                                placeholder="Select Role"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={roles}
                            />
                                <Link to="create">
                                    <Button className="btn-create" icon={<PlusOutlined />}>
                                    Create
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        </>
                      )}
                    />
            </Spin>
        </>
    )

}

export default UserManager;