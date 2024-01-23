import {Link} from "react-router-dom"
import { UserOutlined, AlignLeftOutlined, HomeOutlined, InsertRowLeftOutlined, ProjectOutlined, BarsOutlined } from '@ant-design/icons'

export const navigattions = [
    {
        key: 'dashboard',
        icon: <HomeOutlined />,
        label: <Link to={"dashboard"} >Dashboard</Link>,
    },
    {
        key: 'user',
        icon: <UserOutlined/>,
        label: 'Users',
        children: [
            {
                key: 'user-manager',
                label: <Link to="users" >User Manager</Link>
            },
            {
                key: 'role',
                label: <Link to="roles" >Role Manager</Link>
            },
            {
                key: 'permissons',
                label: <Link to="permission" >Permission</Link>
            },
            {
                key: 'permissons-category',
                label: <Link to="permission-category" >Permission Category</Link>
            }
        ]
    },
    {
        key: 'hotels',
        icon: <InsertRowLeftOutlined/>,
        label: 'Hotels',
        children: [
            {
                key: 'hotel-manager',
                label: <Link to="hotels" >Hotels Manager</Link>
            },
            {
                key: 'room-manager',
                label: <Link to="rooms" >Room Manager</Link>
            }
        ]
    },
    {
        key: 'products',
        icon: <ProjectOutlined />,
        label: 'Products',
        children: [
            {
                key: 'products-manager',
                label: <Link to="products" >Product Manager</Link>
            },
            {
                key: 'category-manager',
                label: <Link to="categories" >Category Manager</Link>
            }
        ]
    },
    ,
    {
        key: 'booking',
        icon: <BarsOutlined />,
        label: 'Booking',
        children: [
            {
                key: 'booking-manager',
                label: <Link to="booking" >Booking Manager</Link>
            },
            {
                key: 'resource-manager',
                label: <Link to="categories" >Resource Manager</Link>
            }
        ]
    },
]