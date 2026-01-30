import React, { useEffect, useState } from "react";
import { Card, Table} from "antd";
import BackButton from "../../Hoc/BackButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { plusMinusByMarketIdByUserWiseList } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import { UserTypeData } from "../../../../constants/global";

const Basic = () => {
    const { marketId, matchName } = useParams();
    const [userLists, setUserLists] = useState([]);
    const [usertype,setUserType] = useState([])
    const [name,setName] = useState([])
    const dispatch = useDispatch()
    const { plusMinusByMarketIdByUserWiseListdata, loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('user_id'));
        let childDetails = userData.data;
        setUserType(childDetails.userType)
        featchUserList(childDetails);
    }, []);

    const featchUserList = async (data) => {
        let reqData = {
            "marketId": marketId,
            "userId": data.userId,
            "userType": data.userType


        };
        dispatch(plusMinusByMarketIdByUserWiseList(reqData));
    };

    const redirectUserList = (data) => {
        const { id, userType } = data;
        const userId = id;
        const reqData = { userId, userType };
        featchUserList(reqData);
        setUserType(data.userType)

    }
    const agentUser = JSON.parse(localStorage.getItem("user_id"))
    useEffect(() => {
        if (plusMinusByMarketIdByUserWiseListdata && plusMinusByMarketIdByUserWiseListdata?.length > 0) {
            const filteredData = plusMinusByMarketIdByUserWiseListdata?.map((item) => ({
                key: item._id,
                username: item.userData.username,
                name: item.userData.name,
                userData: item.userData,
                userType: item.userData.userType,
                userNetProfitLoss: -1 * item.userNetProfitLoss,
                downlineUserType: item.downlineUserType,
                clientNetAmount: -1 * item.clientNetAmount,
            }));
            setUserLists(filteredData);

        }

    }, [plusMinusByMarketIdByUserWiseListdata]);
    

      const  getDownlineUserDetails = (usertypes) => {
     
  
        let userDetails = UserTypeData[usertypes];

        let downlineUserPriority = userDetails ? (userDetails.priority - 1) : null;
        
        let getDownlineUserType = () => {
            let downlineUserType;
            switch (downlineUserPriority) {
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
                    downlineUserType = "unknown";
                    break;
            }
        
            return downlineUserType;
        };
        
        let downlineUserType = getDownlineUserType();
        setName(downlineUserType)
        return { downlineUserType };
    }


   useEffect(()=>{
    getDownlineUserDetails(usertype);
   },[usertype])


    // const renderContent = (value, row, index) => {
    //     if (value === 'client') {
    //         return null; // Render null if downlineUserType is 'client'
    //     } else {
    //         return {
    //             children: value,
    //             props: {},
    //         };
    //     }
    // };


    const columns = [
        { 
            title: name,
            dataIndex: 'username',
            render: (value, row) => `${row.name} (${row.username})`,
        },
        {
            title: '',
            dataIndex: 'downlineUserType',
            render: (value, row) => {
                // Check if row.downlineUserType exists and render accordingly
                if (row.downlineUserType) {
                    return (
                        <span
                            onClick={() => redirectUserList(row?.userData)}
                            className="gx-px-2 gx-py-1 gx-pointer gx-text-white gx-bg-orange"
                        >
                            {`${row.downlineUserType}`}
                        </span>
                    );
                } else {
                    return null;
                }
            }
            // ...getColumnSearchProps('name')
        },
        {
            title: 'Net Account',
            dataIndex: 'userNetProfitLoss',
            render: (value,record) => (
                <> 
               { agentUser === "client" ? 
                <span className={` ${record?.clientNetAmount >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number.parseFloat(record?.clientNetAmount ? record?.clientNetAmount : 0.00).toFixed(2)}
                </span> :
                <span className={` ${record?.userNetProfitLoss >= 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                    {Number.parseFloat(record?.userNetProfitLoss ? record?.userNetProfitLoss : 0.00).toFixed(2)}
                </span>}
                </>
            ),

        },
    ];

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">
                    <div className="gx-bg-grey gx-px-5 gx-pt-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-2xl gx-font-weight-normal gx-text-white gx-align-items-center gx-text-capitalize">{`Client Report `} <br/> <p className="gx-fs-lg">{matchName}</p></span>
                        <BackButton />
                    </div>
                    <div>
                        <Table className="gx-table-responsive" columns={columns} dataSource={userLists} bordered pagination={false} size="small"
                            rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
                        />
                    </div>
                </Card>
            }
        </>
    );
};

export default Basic;
