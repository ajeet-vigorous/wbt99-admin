import React from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
 
 
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
   
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',

  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',

  },
];

const UserList = () => {
    return(
        <>
        <Table columns={columns} dataSource={data} size='small'/>
        </>
    )
}

export default UserList;