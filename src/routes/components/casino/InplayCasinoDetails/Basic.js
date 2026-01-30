import React, { useEffect, useState } from "react";
import { Card,  Table,  Tag } from "antd";
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
            title: ' S no.',
            dataIndex: 'key',
            render: renderContent,
        },
        {
            title: 'Game ID',
            dataIndex: 'gameId',
            render: renderContent,
        },
        {
            title: ' Started AT',
            dataIndex: 'date',
            render: (createdAt) =><span className="gx-text-nowrap"> {moment(createdAt).format("DD MMM hh:mm A")}</span>,
        },
        // {
        //     title: 'Winner',
        //     dataIndex: 'action',
        //     render: renderContent,

        // },
        {
            title: 'Plus/Minus',
            dataIndex: 'profitLoss',
            render: (value, row) => (
                <span className={`${row.profitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    { row.profitLoss}
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
                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`${name}`}</span>
                     <BackButton />
                    </div>
                    <div className="gx-bg-flex gx-px-5 gx-py-4 gx-justify-content-center gx-gap-3" >
                        <div className="gx-fs-xxl">Total : <span className={`${totalProfitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}> {totalProfitLoss ? totalProfitLoss.toFixed(2) : '0.00'}</span></div>
                    </div>
                    <div>
                        <Table className="gx-table-responsive" columns={columns} dataSource={matchLedger} bordered pagination={false} size="small" />
                    </div>

                </Card>
            }
        </>
    );
};

export default Basic;
