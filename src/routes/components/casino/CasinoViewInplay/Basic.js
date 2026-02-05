import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { casinoDiamondBetList, casinoRoundWise, getDiamondCasinoByEventId } from "../../../../appRedux/actions/User";
import { useParams } from "react-router-dom";
import Auxiliary from "util/Auxiliary";
import CasinoIframeResult from "components/dashboard/Casino/CasinoIframeResult";
import TablePagination from "../../../../components/TablePagination";




const Basic = () => {
    const { gameName, eventId } = useParams();
    const [matchLedger, setMatchLedger] = useState([]);
    const [totalProfitLoss, setTotalProfitLoss] = useState(0);
    const [userLists, setUserLists] = useState([]);
    // const [finalUserList, setFinalUserList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [infoMenu, setInfoMenu] = useState({ visible: false, data: null, });
    const [showDate, setShowDate] = useState({
        startDate: moment(),
        endDate: moment().subtract(7, 'days'),
    });


    const pageSize = 25;
    const handlePageChange = (page) => {
        setCurrentPage(page);

    };

    const dispatch = useDispatch()

    const { casinoRoundWiseData,  diamondcasinobyeventid, casinoBetList } = useSelector((state) => state.UserReducer);



    useEffect(() => {
        casinoRoundWiseList()
        casinoList()
        const intervalId = setInterval(() => {
            // casinoRoundWiseList();
            casinoList();
          }, 3000); 
          return () => {
            clearInterval(intervalId);
          };

    }, [currentPage])


    const casinoRoundWiseList = async () => {

        let reqData = {
            "eventId": eventId
        }
        dispatch(casinoRoundWise(reqData));
        dispatch(getDiamondCasinoByEventId(reqData));


    };

    const casinoList = async () => {
        let reqData = {
            eventId: eventId,
            toDate: moment(showDate?.startDate).format("YYYY-MM-DD"),
            fromDate: moment(showDate?.endDate).format("YYYY-MM-DD"),
            pageNo: currentPage,
            size: pageSize,
            isDeclare: 0
        };
        dispatch(casinoDiamondBetList(reqData));
    };

    useEffect(() => {
        if (casinoRoundWiseData) {
          
            const filteredData = casinoRoundWiseData?.map((item, index) => ({
                key: `${index + 1}`,
                createdAt: item.createdAt,
                gameId: item._id,
                profitLoss: -1 * item.profitLoss
            }));
            let total = 0;
            casinoRoundWiseData?.forEach(item => {
                total += -1 * item.profitLoss;
            });
            setTotalProfitLoss(total)
            setMatchLedger(filteredData);

        }

    }, [casinoRoundWiseData]);

    useEffect(() => {
        if (casinoBetList) {
            const filteredData = casinoBetList?.casinoBetData?.map((item, index) => ({
                key: `${item._id}-${index}`,
                _id: `${item._id}`,
                createdAt: `${item.createdAt}`,
                client: `${item.userInfo.name}(${item.userInfo.username})`,
                roundId: item.roundId,
                playerName: item.playerName,
                showResult: item.showResult ? item.showResult : "Not Declear",
                isDeclare: item.isDeclare,
                amount: item.amount,
                profit: item.profit,
                loss: item.loss,
                profitLoss: item.profitLoss * -1,
                resultDetails: item.resultDetails,
            }));
            setUserLists(filteredData);
            const uniqueClientName = filteredData
                ? [...new Set(filteredData?.map((item) => item.client))]
                : null;
            // setFinalUserList(uniqueClientName)
        }

    }, [casinoBetList?.casinoBetData]);


    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    // const handleClose = () => {
    //     setInfoMenu({
    //         visible: false,
    //     });
    // };

    const columns = [
        {
            title: 'Game ID',
            dataIndex: 'gameId',
            render: renderContent,
        },
        {
            title: ' Started AT',
            dataIndex: 'date',
            render: (createdAt) => <span className="gx-text-nowrap"> {moment(createdAt).format("DD MMM hh:mm A")}</span>,
        },
        // {
        //     title: 'Winner',
        //     dataIndex: 'action',
        //     render: () => <span onClick={() => alert(1)}>show</span>,

        // },
        {
            title: 'Plus/Minus',
            dataIndex: 'profitLoss',
            render: (value, row) => (
                <span className={`${row.profitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {row.profitLoss}
                </span>
            ),

        },
    ];

    const renderShowResult = (value, row, index) => {
        const obj = renderContent(value, row, index);
        if (row.showResult) {
            obj.props.onClick = (e) => handleInfo(e, row.resultDetails);
            obj.props.style = { ...obj.props.style, cursor: "pointer" }; // Change cursor to pointer to indicate it's clickable
        }
        return obj;
    };

    const handleInfo = (e, showResult) => {
        e.preventDefault();
        setInfoMenu({
            visible: true,
            data: showResult,
        });
    };

    const columns2 = [
        // {
        //     title: "Date",
        //     dataIndex: "createdAt",
        //     // render: renderContent,
        //     render: (date) => (
        //       <span>{moment(date).format('MMMM DD YYYY, h:mm:ss a')}</span>
        //     ),
        // },
        {
            title: "Client",
            dataIndex: "client",
            render: renderContent,
        },

        {
            title: "RoundId",
            dataIndex: "roundId",
            render: renderContent,
        },

        {
            title: "Player",
            dataIndex: "playerName",
            render: renderContent,
        },

        {
            title: "Winner",
            dataIndex: "showResult",
            render: renderShowResult,
        },

        {
            title: "Stake",
            dataIndex: "amount",
            render: renderContent,
        },

        {
            title: "Profit",
            dataIndex: "profit",
            render: renderContent,
        },

        {
            title: "Loss",
            dataIndex: "loss",
            render: renderContent,
        },

        // {
        //     title: "PNL",
        //     dataIndex: "profitLoss",
        //     render: renderContent,
        // },
    ];

    // Define the data source


    

    return (
        <>
            {/* {loader ? <Loader props={loader} /> : */}
                <>
                    <Card className="gx-card gx-p-2">
                        <Row >
                            <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                             <CasinoIframeResult diamondcasinobyeventid={diamondcasinobyeventid} gameName={gameName} eventId={eventId} betLists={casinoBetList?.casinoBetData} />
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Card className="gx-card">
                                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`NonDeclare Bets - [ ${casinoBetList?.totalCasinoCount} ]`}</span>
                                    </div>
                                    <div>
                                        <Table className="gx-table-responsive" columns={columns2} dataSource={userLists} bordered pagination={false} size="small" />
                                        <TablePagination currentPage={currentPage} totalItems={casinoBetList?.totalCasinoCount} pageSize={pageSize} onPageChange={handlePageChange} />

                                    </div>
                                </Card>
                                <Card className="gx-card">
                                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`${gameName}`}</span>
                                        <div className="gx-fs-xxl "><span className="gx-text-white">Total : </span><span className={`${totalProfitLoss > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}> {totalProfitLoss ? totalProfitLoss.toFixed(2) : '0.00'}</span></div>
                                    </div>
                                    <div>
                                        <Table className="gx-table-responsive" columns={columns} dataSource={matchLedger} bordered pagination={false} size="small" />
                                    </div>

                                </Card>
                            </Col>
                        </Row>

                    </Card>

                </>
            {/* } */}

        </>
    );
};

export default Basic;
