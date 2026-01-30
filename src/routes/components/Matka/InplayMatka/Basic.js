import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import { getMatkaList } from "../../../../appRedux/actions/User";

const Basic = () => {
    const [matkaList, setMatkaList] = useState([]);

    const dispatch = useDispatch()

    const { loading, getMatkaListData } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        dispatch(getMatkaList());
    }, [dispatch]);

    useEffect(() => {
        if (getMatkaListData) {
            const sortedSessions = getMatkaListData.sort((a, b) => a.priority - b.priority);
            const filteredData = sortedSessions.map((item, index) => ({
                key: `${item._id}-${index}`,
                isDeclare: item.isDeclare,
                isDeleted: item.isDeleted,
                _id: item._id,
                name: item.name,
                shortName: item.shortName,
                sportsId: item.sportsId,
                matkaEventId: item.matkaEventId,
                maxStake: item.maxStake,
                minStake: item.minStake,
                betStatus: item.betStatus ? 'Active' : 'InActive',
                matkaStatus: item.matkaStatus,
                openTime: item.openTime,
                closeTime: item.closeTime,
                resultTime: item.resultTime,
                priority: item.priority,
                createdAt: item.createdAt,
            }));
            setMatkaList(filteredData);
        }
    }, [getMatkaListData]);


    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: renderContent,
        },

        {
            title: 'Bet Status',
            dataIndex: 'betStatus',
            render: renderContent,
        },

        {
            title: 'Result Time',
            dataIndex: 'resultTime',
            render: renderContent,
        },
        {
            title: 'Open Time',
            dataIndex: 'openTime',
            render: renderContent,
        },

        {
            title: 'Close Time',
            dataIndex: 'closeTime',
            render: renderContent,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="gx-bg-flex gx-justify-content-end">
                    <Button type="primary">

                        <Link to={`/components/matka/view-matka/${record?.matkaEventId}`}>
                            View
                        </Link>
                    </Button>

                </div>
            ),
        },
    ];

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">

                    <div className="gx-bg-grey gx-px-3 gx-py-3 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`Matka Inplay`}</span>
                        <BackButton />
                    </div>


                    <div>
                        <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={matkaList} bordered pagination={false} size="small" />
                    </div>
                </Card>
            }
        </>
    );
};

export default Basic;
