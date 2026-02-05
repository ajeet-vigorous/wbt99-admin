// import React, { useEffect, useState } from "react";
// import { Card, Table } from "antd";
// import moment from "moment";
// import BackButton from "../../Hoc/BackButton";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../../../components/loader";
// import { getMatkaBetList } from "../../../../appRedux/actions/User";
// import { useParams } from "react-router-dom";


// const Basic = () => {
//     const [matkaBetList, setMatkaBetList] = useState([]);

//     const dispatch = useDispatch()
//     const { eventIdMatka } = useParams()

//     const { loading, matkaBetListReport } = useSelector((state) => state.UserReducer);

//     useEffect(() => {

//         let reqData = {
//             "matkaEventId": eventIdMatka,
//             fromDate: moment().format('YYYY-MM-DD'),
//             toDate: moment().format('YYYY-MM-DD'),
//         }
//         dispatch(getMatkaBetList(reqData));
//     }, [dispatch]);

//     useEffect(() => {
//         if (matkaBetListReport) {
       
//             // const sortedSessions = matkaBetListReport.sort((a, b) => a.priority - b.priority);
//             const filteredData = matkaBetListReport.map((item, index) => ({
//                 key: `${index}`,
//                 isDeclare: item.isDeclare,
//                 isDeleted: item.isDeleted,
//                 ip: item.ip,
//                 matkaName: item.matkaName,
//                 createdAt: item.createdAt,
//                 amount: item.amount,
//                 loss: item.loss,
//                 profit: item.profit,
//                 gameType: item.gameType,
//                 betNumber: item.betNumber,
//                 // betStatus: item.betStatus ? 'Active' : 'InActive',
//                 betType: item.betType,
//                 data: item.date,
//                 profitLoss: item.profitLoss,
//                 result: item.result,
//                 matkaEventId: item.matkaEventId,
//                 oddEvenResult: item.oddEvenResult,
//                 userInfo: item.userInfo,
//             }));
//             setMatkaBetList(filteredData);
//         }
//     }, [matkaBetListReport]);


//     const renderContent = (value, row, index) => {
//         const obj = {
//             children: value,
//             props: {},
//         };

//         return obj;
//     };





//     const columns = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             render: (row) => <span>{row?.userInfo?.name} ({row?.userInfo?.username})</span> ,
//         },
//         {
//             title: 'Matka Name',
//             dataIndex: 'matkaName',
//             render: renderContent,
//         },

//         {
//             title: 'Bet Type',
//             dataIndex: 'betType',
//             render: renderContent,
//         },

//         {
//             title: 'Game Type',
//             dataIndex: 'gameType',
//             render: renderContent,
//         },
//         {
//             title: 'Amount',
//             dataIndex: 'amount',
//             render: renderContent,
//         },

//         {
//             title: 'Bet Number',
//             dataIndex: 'betNumber',
//             render: renderContent,
//         },
//         {
//             title: 'Date',
//             dataIndex: 'createdAt',
//             render: (row) => <span>{moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}</span>,

//         }
//         // {
//         //     title: 'Action',
//         //     dataIndex: 'action',
//         //     render: (text, record) => (
//         //         <div className="gx-bg-flex gx-justify-content-end">
//         //             <Button type="primary">

//         //                 <Link to={`/components/casino/casinoinplayview/${record.id}/${record.name}`}>
//         //                     View
//         //                 </Link>
//         //             </Button>

//         //         </div>
//         //     ),
//         // },
//     ];





//     return (
//         <>
//             {loading ? <Loader props={loading} /> :
//                 <Card className="gx-card">

                 
//                     <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
//                         <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`Matka Bet List`}</span>
//                         <BackButton />
//                     </div>


//                      <div>
//                          <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={matkaBetList} bordered pagination={false} size="small" />
//                      </div>
//                 </Card>
//             }
//         </>
//     );
// };

// export default Basic;


import React, { useEffect, useState } from "react";
import { Card, DatePicker, Table, Button, Row, Col, Select, Tabs } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import { getMatkaBetList, getMatkaList } from "../../../../appRedux/actions/User";
import { useParams } from "react-router-dom";
import { result } from "lodash";
import TabPane from "antd/lib/tabs/TabPane";

const Basic = () => {
    const [matkaBetList, setMatkaBetList] = useState([]);
    const [matkaList, setMatkaList] = useState([]);
    const [isGameType, setIsGameType] = useState(
        {
            singlePatti: false,
            harupAnderBaher: false,
            singal: false,
            jodi: false,
            singalpattis: false,
            doublepatti: false,
            triplepatti: false,
            oddeven: false
        }
    )
    const [isTotalProfitLoss, setIsTotalProfitLoss] = useState({})

    const dispatch = useDispatch()
    const { eventIdMatka, matkaDate } = useParams()
    const { Option } = Select;

    const { loading, matkaBetListReport, getMatkaListData } = useSelector((state) => state.UserReducer);



    useEffect(() => {
        let reqData = {
            "matkaEventId": eventIdMatka,
            isDeleted: false,
            fromDate: matkaDate ? matkaDate : moment().format('YYYY-MM-DD'),
            toDate: matkaDate ? matkaDate : moment().format('YYYY-MM-DD'),
        }
        dispatch(getMatkaBetList(reqData));
        dispatch(getMatkaList());
    }, [dispatch]);

    useEffect(() => {
        if (matkaBetListReport) {
            
            const sortedSessions = matkaBetListReport.sort((a, b) => a.priority - b.priority);
            const totalProfitLoss = {
                singlePatti: 0,
                haroopAndar: 0,
                haroopBahar: 0,
                single: 0,
                singlePattis: 0,
                doublePatti: 0,
                triplePatti: 0,

            };
            sortedSessions.forEach(item => {
                const { gameType, profitLoss } = item;
                if (gameType === "HAROOP_ANDAR") {
                    totalProfitLoss.haroopAndar += item.profitLoss;
                } else if (gameType === "HAROOP_BAHAR") {
                    totalProfitLoss.haroopBahar += item.profitLoss;
                } else if (gameType === "JODI") {
                    totalProfitLoss.singlePatti += item.profitLoss;
                } else if (gameType === "SINGLE") {
                    totalProfitLoss.single += item.profitLoss;
                } else if (gameType === "SINGLE_PATTI") {
                    totalProfitLoss.singlePattis += item.profitLoss;
                }
                else if (gameType === "DOUBLE_PATTI") {
                    totalProfitLoss.doublePatti += item.profitLoss;
                }else if (gameType === "TRIPLE_PATTI") {
                    totalProfitLoss.triplePatti += item.profitLoss;
                }

                
            });

            setIsTotalProfitLoss(totalProfitLoss);

            // sortedSessions.forEach(item => {
            //     console.log(item, "item");

            //     totalProfitLoss += item.profitLoss;
            // });





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
                rate: `${(Math.floor(Number(item?.profit / item?.amount) * 100) / 100).toFixed(2)}`,
                matkaEventId: item.matkaEventId,
                oddEvenResult: item.oddEvenResult,
                result: item.result,
                userInfo: item.userInfo,

            }));
            setMatkaBetList(filteredData);
        }

        if (getMatkaListData) {
            const filteredMatkaList = getMatkaListData.filter(item => item.matkaEventId == eventIdMatka);
            setMatkaList(filteredMatkaList)

        }
    }, [matkaBetListReport, getMatkaListData]);


    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };
        return obj;
    };


    async function onChange(value) {
        if (value === 'singalpatti') {
            setIsGameType({
                singlePatti: true,
                harupAnderBaher: false,
                singal: false,
                jodi: false,
                singalpattis: false,
                doublepatti: false,
                triplepatti: false,
                oddeven: false




            })
        } else if (value === 'harupanderbaher') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: true,
                singal: false,
                jodi: false,
                singalpattis: false,
                doublepatti: false,
                triplepatti: false,
                oddeven: false

            })
        } else if (value === 'singal') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: true,
                jodi: false,
                singalpattis: false,
                doublepatti: false,
                triplepatti: false,
                oddeven: false

            })
        } else if (value === 'jodi') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: false,
                jodi: true,
                singalpattis: false,
                doublepatti: false,
                triplepatti: false,
                oddeven: false

            })
        } else if (value === 'singalpattis') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: false,
                jodi: false,
                singalpattis: true,
                doublepatti: false,
                triplepatti: false,
                oddeven: false

            })
        } else if (value === 'doublepatti') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: false,
                jodi: false,
                singalpattis: false,
                doublepatti: true,
                triplepatti: false,
                oddeven: false

            })
        } else if (value === 'triplepatti') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: false,
                jodi: false,
                singalpattis: false,
                doublepatti: false,
                triplepatti: true,
                oddeven: false

            })
        } else if (value === 'oddeven') {
            setIsGameType({
                singlePatti: false,
                harupAnderBaher: false,
                singal: false,
                jodi: false,
                singalpattis: false,
                doublepatti: false,
                triplepatti: false,
                oddeven: true

            })
        }


    }

    const cards = Array.from({ length: 100 }, (_, index) => index + 1);
    const cardData = Array.from({ length: 10 }, (_, index) => index + 1);
    const imageData = [
        [127, 136, 145, 190, 235, 280, 370, 479, 460, 569, 389, 578],
        [128, 137, 146, 236, 245, 290, 380, 470, 489, 560, 678, 579],
        [129, 138, 147, 156, 237, 246, 345, 390, 480, 570, 679, 589],
        [120, 139, 148, 157, 238, 247, 256, 346, 490, 580, 670, 689],
        [130, 149, 158, 167, 239, 248, 257, 347, 356, 590, 680, 789],
        [140, 159, 168, 230, 249, 258, 267, 348, 357, 456, 690, 780],
        [123, 150, 169, 178, 240, 259, 268, 349, 358, 457, 367, 790],
        [124, 160, 179, 250, 269, 278, 340, 359, 368, 458, 467, 890],
        [125, 134, 170, 189, 260, 279, 350, 369, 378, 459, 567, 468],
        [126, 135, 180, 234, 270, 289, 360, 379, 450, 469, 478, 568],

    ];

    const doublepattiCard = [
        [200, 110, 228, 255, 336, 499, 660, 688, 778],
        [300, 166, 229, 337, 355, 445, 599, 779, 788],
        [400, 112, 220, 266, 338, 446, 455, 699, 770],
        [500, 113, 122, 177, 339, 366, 447, 799, 889],
        [600, 114, 277, 330, 448, 466, 556, 880, 899],
        [700, 115, 133, 188, 223, 377, 449, 557, 566],
        [800, 116, 224, 233, 288, 440, 477, 558, 990],
        [900, 117, 144, 199, 225, 388, 559, 577, 667],
        [550, 668, 244, 299, 226, 488, 677, 118, 334],
        [100, 119, 155, 227, 335, 344, 399, 588, 669],
    ];

    const triplepattiCard = ["000", "111", "222", "333", "444", "555", "666", "777", "888", "999"]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'name1',
            render: (value, row) => <span>{row?.userInfo?.name} ({row?.userInfo?.username})</span>,
        },

        {
            title: 'Matka Name',
            dataIndex: 'matkaName',
            render: renderContent,
        },


        {
            title: 'Game',
            dataIndex: 'gameType',
            render: renderContent,
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            render: renderContent,
        },
        {
            title: 'Bet Num',
            dataIndex: 'betNumber',
            render: renderContent,
        },
        {
            title: 'Stack',
            dataIndex: 'amount',
            render: renderContent,
        },

        {
            title: 'P&L',
            dataIndex: 'profitLoss',
            render: renderContent,
        },


        // {
        //     title: 'Profit',
        //     dataIndex: 'profit',
        //     render: renderContent,
        // },
        // {
        //     title: 'Loss',
        //     dataIndex: 'loss',
        //     render: renderContent,
        // },



        {
            title: 'Winner',
            dataIndex: 'Winner',
            render: (value, row) => <span>{row?.result ? row?.result : 'Non Declare'}</span>,
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (value, row) => <span>{row?.result ? 'Declare' : 'Non Declare'}</span>,
        },

        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            render: (value, row) => <span>{moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}</span>,

        }


        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     render: (value, row) => <span>{row?.userInfo?.name} ({row?.userInfo?.username})</span>,
        // },





        // {
        //     title: 'Amount',
        //     dataIndex: 'amount',
        //     render: renderContent,
        // },

        // {
        //     title: 'Bet Number',
        //     dataIndex: 'betNumber',
        //     render: renderContent,
        // },
        // {
        //     title: 'Date',
        //     dataIndex: 'createdAt',
        //     render: (value, row) => <span>{moment(row?.createdAt).format('DD-MM-YYYY hh:mm A')}</span>,

        // }
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

    // const getMatkaPosition = (cardNumber, gameType) => {
    //     const bets = matkaBetList.filter((betItem) => betItem.betNumber === cardNumber && betItem.gameType === gameType);
    //     if (bets.length > 0) {
    //         const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0);
    //         const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    //         return totalProfit > 0 ? totalProfit : totalAmount;
    //     } else {
    //         const totalAmountForGameType = matkaBetList
    //             .filter((betItem) => betItem.gameType === gameType)
    //             .reduce((sum, bet) => sum + bet.amount, 0);

    //         return -totalAmountForGameType;
    //     }
    // };

    const getMatkaPosition = (cardNumber, gameType, matkaName) => {
        console.log(cardNumber, gameType, matkaName);

        const bets = matkaBetList.filter((betItem) => betItem.betNumber == cardNumber && betItem.gameType == gameType && betItem.matkaName == matkaName[0]);

        if (bets.length > 0) {
            let totalBetAmount = 0;
            matkaBetList.filter((betItem) => betItem.gameType == gameType && betItem.matkaName == matkaName[0]).forEach((bet) => { totalBetAmount += Number(bet.amount) });
            const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0);
            const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
            return totalProfit > 0 ? totalProfit - totalBetAmount : totalAmount;
        } else {
            let totalAmountForGameType = 0;
            matkaBetList.filter((betItem) => betItem.gameType == gameType && betItem.matkaName == matkaName[0]).forEach((bet) => { totalAmountForGameType += Number(bet.amount) });

            return -totalAmountForGameType;
        }
    };




    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card gx-pb-2 ">


                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                        <div className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">

                            {matkaList.map((req, index) => {
                                return (
                                    <div>
                                        <div>
                                            {req?.name}-{moment().format('DD-MM-YYYY')}
                                        </div>
                                        <div className="gx-fs-md gx-py-1">
                                            Start Time : {moment().format('DD-MMM-YYYY')} {req.openTime} | End Time : {moment().format('DD-MMM-YYYY')} {req.closeTime}
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        <BackButton className='backBtn' />
                    </div>

                    <Row justify={"center"}>
                        <Col xs={22} className="gx-p-3">
                            {console.log(matkaList, "matkaListmatkaListmatkaList")}

                            {/* <Select
                                placeholder="Select Game Type"
                                onChange={value => onChange(value)}
                                className="gx-border-redius0 gx-bg-flex"
                            >
                                {matkaList[0]?.isHaroopAndarBahar ? (
                                    <>
                                        <Option key={4} value={'singalpatti'}>Singal Patti</Option>
                                        <Option key={1} value={'harupanderbaher'}>Harup Ander Bahar</Option>
                                    </>
                                ) : (
                                    <>
                                        <Option key={2} value={'singal'}>Singal</Option>
                                        <Option key={3} value={'jodi'}>Jodi</Option>
                                        <Option key={5} value={'singalpattis'}>Singal Patti</Option>
                                        <Option key={6} value={'doublepatti'}>Double Patti</Option>
                                        <Option key={7} value={'triplepatti'}>Triple Patti</Option>
                                        <Option key={8} value={'oddeven'}>Odd Even</Option>
                                    </>
                                )}
                            </Select> */}

                            <Tabs
                                defaultActiveKey=""
                                onChange={(key) => onChange(key)}
                                className="gx-bg-flex"
                                >
                                {matkaList[0]?.isHaroopAndarBahar ? (
                                    <>
                                    <TabPane tab="SINGAL PATTI" key="singalpatti" />
                                    <TabPane tab="HARUP ANDAR BAHAR" key="harupanderbaher" />
                                    </>
                                ) : (
                                    <>
                                    <TabPane tab="Singal" key="singal" />
                                    <TabPane tab="Jodi" key="jodi" />
                                    <TabPane tab="Singal Patti" key="singalpattis" />
                                    <TabPane tab="Double Patti" key="doublepatti" />
                                    <TabPane tab="Triple Patti" key="triplepatti" />
                                    <TabPane tab="Odd Even" key="oddeven" />
                                    </>
                                )}
                            </Tabs>

                        </Col>
                    </Row>



                    <Row justify={"center"} >
                        {isGameType.singlePatti && (
                            <Col xs={22} className="">
                                {/* <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Single Patti {`[${isTotalProfitLoss?.singlePatti}]`}
                                </div> */}

                                <Row className=""  >
                                    {cards.map((card, index) => (
                                        <Col xl={6} lg={6} md={6} xs={6} key={index} className="gx-text-center gx-mb-3">
                                            <div style={{backgroundColor:'rgb(240, 240, 240)', border:'1px solid rgb(217, 217, 217)', borderRadius:'6px', fontWeight:'500'}} className="gx-fs-md gx-w-full gx-py-2 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black">
                                                {card.toString().padStart(2, "0")}
                                            </div>
                                            {/* ${getMatkaPosition(card, "JODI") > 0 ? 'gx-text-green-0' : 'gx-text-red'} */}
                                            <div style={{}} className={`gx-py-1 gx-mt-2 gx-text-green gx-fs-md`}>
                                                {getMatkaPosition(card, "JODI", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))}

                                            </div>
                                        </Col>
                                    ))}
                                </Row>


                            </Col>
                        )}

                        {isGameType.harupAnderBaher && (
                            <>
                                <Col xs={22} className="gx-py-1">
                                    <div className="gx-py-1 gx-px-1 gx-bg-grey gx-text-white gx-mb-3 gx-bg-flex gx-justify-content-start gx-fs-md gx-py-2 gx-px-2" style={{border: '1px dashed grey' }}>
                                        HARUP ANDAR {`[${isTotalProfitLoss?.haroopAndar}]`}
                                    </div>

                                    <Row className="" gutter={20} >
                                        {cardData.map((card, index) => (
                                            <Col xl={6} md={6} xs={6} key={index}  className="gx-text-center gx-px-3 ">
                                                <div style={{backgroundColor:'rgb(240, 240, 240)', border:'1px solid rgb(217, 217, 217)', borderRadius:'6px', fontWeight:'500'}} className="gx-fs-md  gx-w-full gx-py-2  gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black">
                                                    {card.toString().padStart(2, "0")}
                                                </div>


                                                <div style={{ }} className={`gx-py-1 gx-mt-2 gx-text-green gx-fs-md`}>
                                                    {/* {getMatkaPosition(card, "HAROOP_ANDAR")} */}
                                                    {getMatkaPosition(card, "HAROOP_ANDAR", matkaList.map((req, index) => {
                                                        return req?.name
                                                    }))}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                                <Col xs={22} className="gx-py-1">
                                    <div className="gx-py-2 gx-px-2 gx-text-white gx-bg-grey gx-bg-flex gx-mb-3 gx-justify-content-start gx-fs-md" style={{  }}>
                                        HAPUR BAHAR {`[${isTotalProfitLoss?.haroopBahar}]`}
                                    </div>

                                    <Row className="" gutter={20} >
                                        {cardData.map((card, index) => (
                                            <Col xl={6} md={6} xs={6} key={index} className="gx-text-center">
                                                <div style={{backgroundColor:'rgb(240, 240, 240)', border:'1px solid rgb(217, 217, 217)', borderRadius:'6px', fontWeight:'500'}} className="gx-fs-md gx-py-2 gx-bg-flex gx-w-full gx-align-items-center gx-justify-content-center  gx-text-black ">
                                                    {card.toString().padStart(2, "0")}
                                                </div>


                                                <div style={{  }} className={`gx-py-1 gx-mt-2 gx-text-green gx-fs-md`}>
                                                    {/* {getMatkaPosition(card, "HAROOP_BAHAR")} */}

                                                    {getMatkaPosition(card, "HAROOP_BAHAR", matkaList.map((req, index) => {
                                                        return req?.name
                                                    }))}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </>)}

                        {isGameType.jodi && (
                            <Col xs={22} className="">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Jodi {`[${isTotalProfitLoss?.singlePatti}]`}
                                </div>

                                <Row className=""  >
                                    {cards.map((card, index) => (
                                        <Col xl={2} md={2} xs={8} key={index} className="gx-text-center gx-px-3 gx-py-3 ">
                                            <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                                {card.toString().padStart(2, "0")}
                                            </div>
                                            <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                {getMatkaPosition(card, "JODI", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))}

                                            </div>
                                        </Col>
                                    ))}
                                </Row>


                            </Col>
                        )}

                        {/* Postion Print karni hai  */}
                        {isGameType.singal && (
                            <Col xs={22} className="gx-py-1">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Singal {`[${isTotalProfitLoss?.single}]`}
                                </div>

                                <Row className="" gutter={20} >
                                    {cardData.map((card, index) => (
                                        <Col xl={4} md={4} xs={8} key={index} className="gx-text-center gx-px-3 gx-py-3 ">
                                            <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                                {card.toString().padStart(2, "0")}
                                            </div>


                                            <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                {/* {getMatkaPosition(card, "HAROOP_ANDAR")} */}
                                                {getMatkaPosition(card, "SINGLE", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))}
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        )}

                        {isGameType.singalpattis && (
                            <Col xs={22} className="gx-py-1">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Singal Patti {`[${isTotalProfitLoss?.singlePattis}]`}
                                </div>

                                <Row className="" gutter={20} >

                                    {imageData.map((element, index) => (
                                        <>
                                            <div className="gx-px-2 gx-w-100 gx-my-2 gx-mx-2 gx-text-white  gx-py-1 gx-bg-grey gx-fs-xl gx-font-weight-heavy gx-bg-flex gx-justify-content-center">{index} </div>
                                            {element.map((card, index) => (
                                                <Col xl={2} md={2} xs={8} key={index} className="gx-text-center gx-px-3 gx-py-3 ">
                                                    <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                                        {card.toString().padStart(2, "0")}
                                                    </div>


                                                    <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                        {/* {getMatkaPosition(card, "HAROOP_ANDAR")} */}
                                                        {getMatkaPosition(card, "SINGLE_PATTI", matkaList.map((req, index) => {
                                                            return req?.name
                                                        }))}
                                                    </div>
                                                </Col>
                                            ))}
                                        </>

                                    ))}

                                </Row>
                            </Col>
                        )}


                        {isGameType.doublepatti && (
                            <Col xs={22} className="gx-py-1">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Double Patti {`[${isTotalProfitLoss?.doublePatti}]`}
                                </div>

                                <Row className="" gutter={20} >

                                    {doublepattiCard.map((element, index) => (
                                        <>
                                            <div className="gx-px-2 gx-w-100 gx-my-2 gx-mx-2 gx-text-white  gx-py-1 gx-bg-grey gx-fs-xl gx-font-weight-heavy gx-bg-flex gx-justify-content-center">{index} </div>
                                            {element.map((card, index) => (
                                                <Col xl={4} md={4} xs={8} key={index} className="gx-text-center gx-px-3 gx-py-3 ">
                                                    <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                                        {card.toString().padStart(2, "0")}
                                                    </div>


                                                    <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                        {/* {getMatkaPosition(card, "HAROOP_ANDAR")} */}
                                                        {getMatkaPosition(card, "DOUBLE_PATTI", matkaList.map((req, index) => {
                                                            return req?.name
                                                        }))}
                                                    </div>
                                                </Col>
                                            ))}
                                        </>

                                    ))}

                                </Row>
                            </Col>
                        )}

                        {isGameType.triplepatti && (
                            <Col xs={22} className="">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Triple Patti {`[${isTotalProfitLoss?.triplePatti}]`}
                                </div>

                                <Row className=""  >
                                    {triplepattiCard.map((card, index) => (
                                        <Col xl={4} md={4} xs={8} key={index} className="gx-text-center gx-px-3 gx-py-3 ">
                                            <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                                {card.toString().padStart(2, "0")}
                                            </div>
                                            <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                {getMatkaPosition(card, "TRIPLE_PATTI", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))}

                                            </div>
                                        </Col>
                                    ))}
                                </Row>


                            </Col>
                        )}


                        {isGameType.oddeven && (
                            <Col xs={22} className="">
                                <div className="gx-py-1 gx-px-1 gx-text-white gx-bg-flex gx-justify-content-center gx-fs-xl" style={{ background: '#4C1088', border: '1px dashed grey' }}>
                                    Odd Even {`[${isTotalProfitLoss?.singlePatti}]`}
                                </div>

                                <Row className="" justify={'center'} >
                                    
                                        <Col xl={4} md={4} xs={8}  className="gx-text-center gx-px-3 gx-py-3 ">
                                            <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                               Odds
                                            </div>
                                            <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                {/* {getMatkaPosition(card, "TRIPLE_PATTI", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))} */} 0

                                            </div>
                                        </Col>

                                        <Col xl={4} md={4} xs={8}  className="gx-text-center gx-px-3 gx-py-3 ">
                                            <div className="gx-fs-lg gx-rounded-circle gx-py-3 gx-size-60 gx-bg-flex gx-align-items-center gx-justify-content-center  gx-text-black gx-bg-yellow">
                                               Even
                                            </div>
                                            <div style={{ background: '#4C1088', border: '1px dashed grey' }} className={`gx-py-1 gx-mt-2 gx-text-white gx-fs-lg`}>
                                                {/* {getMatkaPosition(card, "TRIPLE_PATTI", matkaList.map((req, index) => {
                                                    return req?.name
                                                }))} */} 0

                                            </div>
                                        </Col>
                                  
                                </Row>


                            </Col>
                        )}

                    </Row>


                </Card>
            }
            <Table className="gx-table-responsive gx-text-uppercase gx-mt-2" columns={columns} dataSource={matkaBetList} bordered pagination={false} size="small" />
        </>
    );
};

export default Basic;
