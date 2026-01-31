import React, { useEffect, useState } from "react";
import { Card, DatePicker, Table } from "antd";
import { useParams } from "react-router-dom";

import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { getuserActivity } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";


const Basic = () => {
    const dispatch = useDispatch();
    const [userLists, setUserLists] = useState([]);
    const { userId } = useParams();
    const { userActivity, loading } = useSelector(state => state.UserReducer)
    useEffect(() => {
        userActivityFun()
    }, [userId]);

    useEffect(() => {
        if (userActivity) {
            const filteredData = userActivity?.map((item, index) => ({
                key: `${index}`,
                createdAt: item.createdAt,
                activityType: item.activityType,
                username: item.username,
                newAmount: item.newAmount,
                remark: item.remark,
                operatorName: item.operatorName

            }));
            setUserLists(filteredData);
        }
    }, [userActivity])



    const userActivityFun = async () => {
        let loginData = {
            "userId": userId
        }
        dispatch(getuserActivity(loginData))
    }

    // const renderContent = (value) => {
    //     // , row, index
    //     const obj = {
    //         children: value,
    //         props: {},
    //     };

    //     return obj;
    // };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (createdAt) => <span className="gx-text-nowrap gx-px-2"> {moment(createdAt).utcOffset("+05:30").format("DD MMM hh:mm A")}</span>,

        },
        {
            title: 'Operation',
            dataIndex: 'activityType',
            render: (value, row) => <span class="ant-tag ant-tag-red ">{` ${row.activityType}`}</span>,
        },
        // {
        //     title: 'Done By',
        //     dataIndex: 'username',
        //     render: (value, row) => <span className="gx-text-nowrap gx-px-2">{`(${row.username}) ${row.operatorName}`}</span>,
        // },
        {
            title: 'Description',
            dataIndex: 'remark',
            render: (value, row) => <span className="gx-text-nowrap gx-px-2">{` ${row.remark}`}</span>,
        },

    ];
    const RangePicker = DatePicker.RangePicker;

    function onChange(dates, dateStrings) {
    }

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card ">
                    <div className="gx-bg-grey gx-px-5 gx-py-3 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-lg gx-w-75 gx-font-weight-bold gx-text-white   gx-text-uppercase">
                            Account Operation
                        </span>
                        <BackButton />
                    </div>

                    <div className="gx-p-4 gx-mb-5">
                        <Table
                            className="gx-table-responsive gx-text-uppercase gx-fs-md gx-font-weight-bold"
                            columns={columns}
                            dataSource={userLists}
                            bordered
                            pagination={false}
                            size="small"
                        />
                    </div>
                </Card>
            }</>


    );
};

export default Basic;