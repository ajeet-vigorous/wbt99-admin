import React, { useEffect, useState } from "react";
import {
    Card,
    Table,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { casinoDiamondBetList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import BackButton from "../../Hoc/BackButton";
import DemoResult from "../../navigation/Demo/DemoResult";


const Basic = () => {
    const { gameId } = useParams();

    const [userLists, setUserLists] = useState([]);
    const [ShowUserLists, setShowUserLists] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [infoMenu, setInfoMenu] = useState({ visible: false, data: null, });
    const dispatch = useDispatch()


    const { casinoBetList, loading } = useSelector((state) => state.UserReducer);




    useEffect(() => {
        casinoList();
    }, []);

    const casinoList = async () => {
        let reqData = {
            roundId: gameId
        };
        dispatch(casinoDiamondBetList(reqData));
    };

    useEffect(() => {
        if (casinoBetList) {
            const filteredData = casinoBetList?.casinoBetData?.map((item, index) => ({
                key: `${item._id}-${index}`,
                _id: `${item._id}`,
                createdAt: moment(parseInt(item.createdAt)).utcOffset("+05:30").format("DD MMM hh:mm A"),
                client: `${item.userInfo.username}`,
                roundId: item.roundId,
                playerName: item.playerName,
                showResult: item.showResult ? item.showResult : "Not Declear",
                isDeclare: item.isDeclare,
                amount: item.amount,
                profit: item.profit,
                loss: item.loss,
                profitLoss: item.profitLoss,
                resultDetails: item.resultDetails,
                odds: item.odds,
                betType: item.betType
            }));
            setUserLists(filteredData);
            // const uniqueClientName = filteredData
            //     ? [...new Set(filteredData.map((item) => item.client))]
            //     : null;
            // setFinalUserList(uniqueClientName)
        }

    }, [casinoBetList?.casinoBetData]);

    useEffect(() => {
        const finalUserData = selectUser ? ShowUserLists : userLists;
        setShowUserLists(finalUserData);
    }, [selectUser, ShowUserLists, userLists]);

    const renderContent = (value, row) => {
        const obj = {
            children: value,
            props: {},
        };
        const profitLoss = row.profitLoss;
        if (profitLoss > 0) {
            obj.props.style = { backgroundColor: "#10BF35", color: "black" };
        } else if (profitLoss < 0) {
            obj.props.style = { backgroundColor: "#DE4D4D", color: "black" };
        }
        return obj;
    };

    const renderShowResult = (value, row, index) => {
        const obj = renderContent(value, row, index);
        if (row.showResult) {
            obj.props.onClick = (e) => handleInfo(e, row.resultDetails);
            obj.props.style = { ...obj.props.style, cursor: "pointer" }; // Change cursor to pointer to indicate it's clickable
        }
        return obj;
    };

    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",
            render: renderContent,

        },
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
            title: "Bet Type",
            dataIndex: "betType",
            render: renderContent,
        },


        {
            title: "Odds",
            dataIndex: "odds",
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

        // {
        //     title: "Profit",
        //     dataIndex: "profit",
        //     render: renderContent,
        // },

        // {
        //     title: "Loss",
        //     dataIndex: "loss",
        //     render: renderContent,
        // },

        {
            title: "PNL",
            dataIndex: "profitLoss",
            render: renderContent,
        },
    ];


    const handleInfo = (e, showResult) => {
        e.preventDefault();
        setInfoMenu({
            visible: true,
            data: showResult,
        });
    };

    const handleClose = () => {
        setInfoMenu({
            visible: false,
        });
    };


    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">
                    <div className="gx-bg-grey gx-px-3 gx-py-2 gx-bg-flex">
                        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-pt-2 gx-text-uppercase">{`All Bets: ${gameId}`}</span>
                        <BackButton />
                    </div>
                    <div className="">
                        <Table
                            className="gx-table-responsive gx-text-uppercase"
                            columns={columns}
                            dataSource={ShowUserLists}
                            bordered
                            pagination={false}
                            size="small"
                        />
                    </div>
                    <DemoResult
                        data={infoMenu.data}
                        visible={infoMenu.visible}
                        handleClose={handleClose}
                    />

                </Card>}
        </>
    );
};

export default Basic;

