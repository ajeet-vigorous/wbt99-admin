import React, { useEffect, useState } from "react";
import { Card, Table, Button, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { httpGet, httpPost } from "../../../../http/http";
import BackButton from "../../Hoc/BackButton";
import { Link } from "react-router-dom";
import { getUserList } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";

const getDownlineUserType = () => {
    let userInfo = JSON.parse(localStorage.getItem('user_id'));
    let userDetails = userInfo.data;
    let downlineUserPriority = userDetails.userPriority - 1;
    if (!downlineUserPriority) {
        return "";
    }
    let downlineUserType = "";

    switch (downlineUserPriority) {
        case 9:
            downlineUserType = "owner";
            break;
        case 8:
            downlineUserType = "subowner";
            break;
        case 7:
            downlineUserType = "superadmin";
            break;
        case 6:
            downlineUserType = "admin";
            break;
        case 5:
            downlineUserType = "subadmin";
            break;
        case 4:
            downlineUserType = "master";
            break;
        case 3:
            downlineUserType = "superagent";
            break;
        case 2:
            downlineUserType = "agent";
            break;
        case 1:
            downlineUserType = "client";
            break;
        default:
            break;
    }
    return downlineUserType;
};

const Basic = () => {
    const dispatch = useDispatch();
    const [sessionList, setSessionList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [sessionListDataFinal, setSessionListDataFinal] = useState([]);
    const [selectedSessionKeys, setSelectedSessionKeys] = useState([]);
    const [selectedClientKeys, setSelectedClientKeys] = useState([]);
    const [selectedClientKeys1, setSelectedClientKeys1] = useState([]);
    const { marketId, matchName } = useParams();
    const selectionType = "checkbox";
    const { userListItems, userListTotal, loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        const downlineUserType = getDownlineUserType();

        const getSessionList = async () => {
            let data = { marketId: marketId }
            let response = await httpPost(`sports/getSessionList`, data);
            // let response = await httpGet(`sports/getSessionList?marketId=${marketId}`);
            if (response) {
                setSessionList(response?.data);
            }
        }
        getSessionList();
        getUserListFun(downlineUserType);
    }, [marketId]);

    const oddsData = [
        { type: "odds", key: "1" }
    ];

    useEffect(() => {
        const allKeys = clientList?.map(item => item.key);
        setSelectedClientKeys(allKeys);
  
        const allKeys1 = sessionListDataFinal?.map(item => item.key);
        setSelectedSessionKeys(allKeys1);

        const allKeys2 = oddsData?.map(item => item.key);
        setSelectedClientKeys1(allKeys2);
      }, [clientList, sessionListDataFinal]);
  

    useEffect(() => {
        if (userListItems) {
            const filteredData = userListItems?.map(
                (item, index) => ({
                    key: `${item.userId}-${index}`,
                    id: item.id,
                    username: item.username,
                    name: item.name,
                })
            );
            setClientList(filteredData);
        }
    }, [userListItems]);

    const getUserListFun = async (downlineUserType) => {
        let reqData = {
            "specific": {
                "username": 1,
                "userId": 1,
                "name": 1
            },
            "sortData": {
                "createdAt": 1
            },
            "status": "both",
            "downlineUserType": downlineUserType
        };
        dispatch(getUserList(reqData));
    };

    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    const columns = [
        {
            title: "Match",
            dataIndex: "type",
            render: (text, record) => (
                <span>
                    {record.type}
                </span>
            ),
        },
    ];

  
    const columns1 = [
        {
            title: 'Session',
            dataIndex: 'session',
            render: renderContent,
        },
        {
            title: 'Declare',
            dataIndex: 'declare',
            render: renderContent,
        },
    ];

    const columns2 = [
        {
            title: 'Client',
            dataIndex: 'name',
            render: (value, row) => `${row.username} (${row.name})`,
            
        },
    ];


    const rowSelection1 = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedSessionKeys(selectedRowKeys);
            const selectedSessionIds = selectedRows?.map(row => row.key);
        },
        selectedRowKeys: selectedSessionKeys,
    };


    const rowSelection2 = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedClientKeys1(selectedRowKeys);
            const selectedClientIds = selectedRows?.map(row => row.key);
        },
        selectedRowKeys: selectedClientKeys1,
    };

    const rowSelection3 = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedClientKeys(selectedRowKeys);
            const selectedClientIds = selectedRows?.map(row => row.key);
        },
        selectedRowKeys: selectedClientKeys,
    };

    useEffect(() => {
        if (sessionList) {
            const updatedData = [];
            sessionList.forEach((el, index) => {
                const declare = el.decisionRun;
                el.sessionNames.forEach((item, i) => {
                    updatedData.push({ session: item, declare, key: `${index}-${i}` });
                });
            });
            setSessionListDataFinal(updatedData);
        }
    }, [sessionList]);

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">
                    <div className="gx-bg-grey gx-px-5 gx-pt-3 gx-bg-flex">
                        <span className="gx-fs-xl gx-font-weight-normal gx-text-white gx-align-items-center gx-pt-1 gx-text-capitalize">{`${matchName}`}</span>
                        <div className="gx-bg-flex  ">
                            <Link to={`/components/showplusminusreport/show-plus-minus-report/${marketId}/${matchName}`} className='gx-px-1'>
                                <Button type='primary' className=""> Show</Button>
                            </Link>
                            <BackButton />
                        </div>
                    </div>
                    <div className="gx-bg-flex gx-py-2 gx-px-2 gx-justify-content-start"> </div>
                    <Table
                        className="gx-table-responsive gx-pb-5"
                        columns={columns}
                        dataSource={oddsData}
                        bordered
                        pagination={false}
                        size="large"
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection2,
                        }}
                    />
                    <Row>
                        <Col md={12} sm={12} xs={24}>
                            <Table
                                className="gx-table-responsive gx-pb-5"
                                dataSource={sessionListDataFinal}
                                columns={columns1}
                                bordered
                         
                                pagination={false}
                                size="large"
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection1,
                                }}
                            />
                        </Col>
                        <Col md={12} sm={12} xs={24}>
                            <Table
                                className="gx-table-responsive gx-pb-5"
                                columns={columns2}
                                dataSource={clientList}
                                bordered
                                pagination={false}
                                size="large"
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection3,
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
            }
        </>
    );
};

export default Basic;