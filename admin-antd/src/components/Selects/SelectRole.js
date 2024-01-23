import { Select } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from '../../configs/axiosConfig';

const SelectRole = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { Option } = Select;
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

    return (
        <Select
            style={{
            width: 70,
            }}
        >
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
      </Select>
    )
}

export default SelectRole;