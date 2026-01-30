import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";
import { getMatkaBetList } from "../../../../appRedux/actions/User";
import { useParams } from "react-router-dom";


const Basic = () => {
    const [matkaBetList, setMatkaBetList] = useState([]);

    const dispatch = useDispatch()
    const { eventIdMatka } = useParams()

    const { loading, matkaBetListReport } = useSelector((state) => state.UserReducer);

    useEffect(() => {

        let reqData = {
            "matkaEventId": eventIdMatka,
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
        }
        dispatch(getMatkaBetList(reqData));
    }, [dispatch]);

    useEffect(() => {
        if (matkaBetListReport) {
       
            // const sortedSessions = matkaBetListReport.sort((a, b) => a.priority - b.priority);
            const filteredData = matkaBetListReport.map((item, index) => ({
                key: `${index}`,
                isDeclare: item.isDeclare,
                isDeleted: item.isDeleted,
                ip: item.ip,
                matkaName: item.matkaName,
                createdAt: item.createdAt,
                amount: item.amount,
                loss: item.loss,
                profit: item.profit,
                gameType: item.gameType,
                betNumber: item.betNumber,
                // betStatus: item.betStatus ? 'Active' : 'InActive',
                betType: item.betType,
                data: item.date,
                profitLoss: item.profitLoss,
                result: item.result,
                matkaEventId: item.matkaEventId,
                oddEvenResult: item.oddEvenResult,
                userInfo: item.userInfo,
            }));
            setMatkaBetList(filteredData);
        }
    }, [matkaBetListReport]);


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
            render: (row) => <span>{row?.userInfo?.name} ({row?.userInfo?.username})</span> ,
        },
        {
            title: 'Matka Name',
            dataIndex: 'matkaName',
            render: renderContent,
        },

        {
            title: 'Bet Type',
            dataIndex: 'betType',
            render: renderContent,
        },

        {
            title: 'Game Type',
            dataIndex: 'gameType',
            render: renderContent,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: renderContent,
        },

        {
            title: 'Bet Number',
            dataIndex: 'betNumber',
            render: renderContent,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (row) => <span>{moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}</span>,

        }
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: (text, record) => (
        //         <div className="gx-bg-flex gx-justify-content-end">
        //             <Button type="primary">

        //                 <Link to={`/components/casino/casinoinplayview/${record.id}/${record.name}`}>
        //                     View
        //                 </Link>
        //             </Button>

        //         </div>
        //     ),
        // },
    ];





    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">

                 
                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`Matka Bet List`}</span>
                        <BackButton />
                    </div>


                     <div>
                         <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={matkaBetList} bordered pagination={false} size="small" />
                     </div>
                </Card>
            }
        </>
    );
};

export default Basic;
