import React from 'react';
import { Table, Typography, Divider } from 'antd';

const { Text } = Typography;

const TeamDataTable = ({ groupedData }) => {
    if (!groupedData || Object.keys(groupedData).length === 0) return null;

    // Define columns for AntD Table
    const columns = [
        {
            title: 'RUNNER',
            dataIndex: 'teamName',
            key: 'teamName',
            render: text => <Text strong>{text}</Text>,
        },
        {
            title: 'MY BOOK',
            dataIndex: 'myBook',
            key: 'myBook',
            align: 'left',
            render: value => (
                <Text style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : 'inherit', fontWeight: 'bold' }}>
                    {value?.toFixed(2)}
                </Text>
            ),
        },
        {
            title: 'TOTAL BOOK',
            dataIndex: 'totalBook',
            key: 'totalBook',
            align: 'left',
            render: value => (
                <Text style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : 'inherit', fontWeight: 'bold' }}>
                    {value?.toFixed(2)}
                </Text>
            ),
        },
    ];

    return (
        <div className='gx-w-100 gx-px-2'>
            {Object.entries(groupedData).map(([oddsType, items]) => {
                const dataSource = items
                    .sort((a, b) => a.teamName.localeCompare(b.teamName))
                    .map((item, idx) => ({
                        key: idx,
                        teamName: item.teamName,
                        myBook: item?.totalPosition ? -1 * item.totalPosition : 0,
                        totalBook: item?.Position ? -1 * item.Position : 0,
                    }));

                return (
                    <div key={oddsType} style={{ marginBottom: 32 }}>
                        <Divider orientation="left" style={{ fontWeight: 'bold', fontSize: 18, color: '#b58927' }}>
                            {oddsType.toUpperCase()}
                        </Divider>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                            bordered
                            size="small"
                            rowKey="key"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default TeamDataTable;
