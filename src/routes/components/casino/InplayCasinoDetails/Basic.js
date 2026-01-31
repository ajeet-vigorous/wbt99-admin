import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { casinoRoundWise } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { Link, useParams } from "react-router-dom";



const Basic = () => {

    const { name, id, payloadDate } = useParams();
    const [matchLedger, setMatchLedger] = useState([]);
    const [totalProfitLoss, setTotalProfitLoss] = useState(0);

    const dispatch = useDispatch()

    const { casinoRoundWiseData, loader } = useSelector((state) => state.UserReducer);


    useEffect(() => {
        casinoRoundWiseList()
    }, [])


    const casinoRoundWiseList = async () => {

        let reqData = {
            "eventId": id,
            fromDate: payloadDate,
            toDate: payloadDate
        }
        dispatch(casinoRoundWise(reqData));
    };

    useEffect(() => {
        if (casinoRoundWiseData) {
            const filteredData = casinoRoundWiseData?.map((item, index) => ({
                key: `${index + 1}`,
                createdAt: item.createdAt,
                gameId: item._id,
                profitLoss: -1 * item.profitLoss,
                // gameName: item?.gameName
            }));
            let total = 0;
            casinoRoundWiseData?.forEach(item => {
                total += -1 * item.profitLoss;
            });
            setTotalProfitLoss(total)
            setMatchLedger(filteredData);

        }

    }, [casinoRoundWiseData]);


    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    const columns = [
        {
            title: '',
            dataIndex: 'key',
            render: renderContent,
        },
        {
            title: 'Event ID',
            dataIndex: 'gameId',
            render: renderContent,
        },
        {
            title: 'Open Date',
            dataIndex: 'date',
            render: (createdAt) => <span className="gx-text-nowrap"> {moment(createdAt).format("DD MMM hh:mm A")}</span>,
        },
        {
            title: 'Winner',
            dataIndex: 'action',
            render: renderContent,

        },
        {
            title: 'P/L',
            dataIndex: 'profitLoss',
            render: (value, row) => (
                <span className={`${row.profitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {row.profitLoss}
                </span>
            ),

        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, row) => (
                <Link
                    to={`/components/casino/casinobets/${row.gameId}`}
                    className="link-button"
                >
                    <Tag style={{ borderRadius: '0' }} color="#108ee9">Show Bets</Tag>
                </Link>
            ),

        },
    ];

    // Define the data source


    return (
        <>
            {loader ? <Loader props={loader} /> :
                <Card className="gx-card">
                    <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-lg gx-font-weight-bold gx-text-white  gx-text-uppercase">{`${name}`}</span>
                        <BackButton />
                    </div>

                    <div className="gx-p-4">
                        <div style={{ marginBottom: '8px', backgroundColor: '#f0f2f5', padding: '14px', borderRadius: '8px' }}>
                            <div className="ant-row css-1v5z42l" style={{ marginLeft: '-8px', marginRight: '-8px' }}>
                                <div className="ant-col ant-col-8 css-1v5z42l" style={{ paddingLeft: '8px', paddingRight: '8px' }}>
                                    <div className="ant-statistic css-1v5z42l">
                                        <div className="ant-statistic-title gx-text-dark">Total</div>
                                        <div className="ant-statistic-content" style={{ color: '#f5222d' }}>
                                            <span className="ant-statistic-content-value">
                                                <span className={`${totalProfitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}> {totalProfitLoss ? totalProfitLoss.toFixed(2) : '0.00'}</span>
                                            </span>

                                        </div></div></div></div></div>
                        <div>
                            <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={matchLedger} bordered pagination={false} size="small" />
                        </div>
                    </div>
                </Card>
            }
        </>
    );
};

export default Basic;
