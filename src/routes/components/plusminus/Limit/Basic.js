import React, { useEffect, useRef, useState } from "react";
import { Card, Table,  Button, Input, Space } from "antd";
import BackButton from "../../Hoc/BackButton";
import { useParams } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { coinUpdate, getUserList, getuserSearchReport } from "../../../../appRedux/actions/User";
import Loader from "../../../../components/loader";
import TablePagination from "../../../../components/TablePagination";


const getDownlineUserType = (param) => {
    const { userPriority } = param
    let userDetails = userPriority;
    let downlineUserPriority = parseInt(userDetails) + 1;
    if (!downlineUserPriority) {
        return "";
    }
    let downlineUserType = "";

    switch (downlineUserPriority) {
        case 9:
            downlineUserType = "owner"
            downlineUserPriority = 9
            break;
        case 8:
            downlineUserType = "subowner"
            downlineUserPriority = 8
            break;
        case 7:
            downlineUserType = "superadmin"
            downlineUserPriority = 7
            break;
        case 6:
            downlineUserType = "admin"
            downlineUserPriority = 6
            break;
        case 5:
            downlineUserType = "subadmin"
            downlineUserPriority = 5
            break;
        case 4:
            downlineUserType = "master"
            downlineUserPriority = 4
            break;
        case 3:
            downlineUserType = "superagent"
            downlineUserPriority = 3
            break;
        case 2:
            downlineUserType = "agent"
            downlineUserPriority = 2
            break;
        case 1:
            downlineUserType = "client"
            downlineUserPriority = 1
            break;
        default:
            break;
    }
    return downlineUserType;

};

const Basic = () => {
    const { userType, userId, userPriority } = useParams();
    const [userLists, setUserLists] = useState([]);
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValues, setInputValues] = useState({}); // State to track input values for each row
    const [searchText, setSearchText] = useState('');
    const [errors, setErrors] = useState({});
    const [active, setActive] = useState("list")
    const searchInput = useRef(null);

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const pageSize = 25;
    const handlePageChange = (page) => {
        setCurrentPage(page);

    };
    const dispatch = useDispatch()
    const { userListItems, loading, userSearchList, userListTotal, userCoinsData } = useSelector((state) => state.UserReducer);


    useEffect(() => {
        const downlineUserType = getDownlineUserType({ userType, userId, userPriority });
        featchUserList(downlineUserType);
    }, [userType, userId, currentPage]);

    const featchUserList = async (downlineUserType) => {
        let reqData = {
            sortData: { createdAt: 1 },
            keyWord: '',
            pageNo: currentPage,
            size: pageSize,
            status: 'both',
            parentUserType: downlineUserType,
            parentId: userId < 10 ? '' : userId,
            downlineUserType: userType,
            specific: {
                "username": 1,
                "name": 1,
                "userId": 1,
                "coins": 1
            }
        };
        dispatch(getUserList(reqData));
    };

    useEffect(() => {
        if (active === "search") {
            const filteredData = userSearchList?.map((item) => ({
                key: item.id,
                username: item.username,
                name: item.name,
                userId: item.userId,
                coins: item.coins,
            }));
            setUserLists(filteredData);
            setTotalItems(userSearchList.length);

        } else if (userListItems && userListItems.length > 0 && active === "list") {
            const filteredData = userListItems?.map((item) => ({
                key: item.id,
                username: item.username,
                name: item.name,
                userId: item.userId,
                coins: item.coins,
            }));
            setUserLists(filteredData);
            setTotalItems(userListTotal);
        }

    }, [userListItems, userSearchList]);



    const validateInput = (value, userId) => {
        if (!value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [userId]: "Plus Minus Can't Blank",
            }));
            return false;
        }
        return true;
    };
    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    const Add = async (value) => {
        const inputValue = inputValues[value];
        if (!validateInput(inputValue, value)) return null;
        let reqData = {
            coins: inputValues[value],
            userId: value
        };
        await dispatch(coinUpdate(reqData));
        resetAllInputs()
    };


    const Minus = async (value) => {
        const inputValue = inputValues[value];
        if (!validateInput(inputValue, value)) return null;
        let reqData = {
            coins: -(inputValues[value]),
            userId: value
        };
        await dispatch(coinUpdate(reqData))
        // await new Promise(resolve => setTimeout(resolve, 700));
        // await featchUserList()
        resetAllInputs()
    };

    useEffect(() => {
        if (userCoinsData?.error === false) {
            featchUserList();
        }
    }, [userCoinsData]);
    const resetAllInputs = () => {
        setInputValues({});
        setErrors({});
    };
    const handleInputChange = (value, userId) => {
        if (isNaN(value)) {

            setErrors(prevErrors => ({
                ...prevErrors,
                [userId]: 'Please enter a number',
            }));
            return false;
        }
        setInputValues(prevValues => ({
            ...prevValues,
            [userId]: value,
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [userId]: null,
        }));

    };
    const handleSearch = (confirm) => {
        let reqData = {
            searchValue: searchText,
            userType: userType // Replace with actual userType if needed
        };
        if (searchText) {
            setActive("search")
            dispatch(getuserSearchReport(reqData));
            setSearchText('');
        } else {
            setActive("list")
            featchUserList()
            setSearchText('');
        }
        confirm();

    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            clearFilters,
            confirm,
        }) => (
            <div

                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        className="gx-bg-primary gx-text-white"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        className="gx-bg-grey gx-text-white"
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text
    });

    const columns = [
        {
            title: 'Code',
            dataIndex: 'username',
            render: renderContent,
            ...getColumnSearchProps('username')
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: renderContent,
            ...getColumnSearchProps('name')
        },
        {
            title: 'C.Chip',
            dataIndex: 'coins',
            render: (value) => (
                Number.parseFloat(Math.abs(value)).toFixed(2)
            ),
        },
        {
            title: 'Add / Minus Limit',
            dataIndex: 'userId',
            render: (userId) => (
                <>

                    <Space direction="vertical">
                        <Input
                            style={{ width: 100 }}
                            className=" gx-border-redius0"
                            // size="medium"
                            // max={100000}
                            onChange={(value) => handleInputChange(value.target.value, userId)}
                            value={inputValues[userId]}
                        />
                    </Space>

                    {errors[userId] && (
                        <div className="gx-text-red">{errors[userId]}</div>
                    )}
                </>
            )
        },
        {
            title: 'Action',
            dataIndex: 'userId',
            render: (value) => (
                <div className="gx-bg-flex gx-justify-content-start">
                    <Button onClick={() => Add(value)} className="gx-bg-primary gx-text-white gx-border-redius0">Add</Button>
                    <Button onClick={() => Minus(value)} className="gx-bg-grey gx-border-red gx-text-white gx-border-redius0">Minus</Button>
                </div>
            ),
        },
    ];



    return (
        <>
            {/* {loading ? <Loader props={loading} /> : */}
                <Card className="gx-card">
                    <div className="gx-bg-grey gx-px-5 gx-py-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-lg gx-font-weight-normal gx-text-white  gx-text-uppercase">{`Update Limit`}</span>
                        <BackButton />
                    </div>


                    <Table className="gx-table-responsive" columns={columns} dataSource={userLists} bordered pagination={false} size="small"
                        rowClassName={(row, index) => index % 2 !== 0 ? 'gx-bg-light-grey' : ''}
                    />
                    <TablePagination currentPage={currentPage} totalItems={totalItems} pageSize={pageSize} onPageChange={handlePageChange} />

                    <NotificationContainer position="top-center" />
                </Card>
                {/* } */}
        </>
    );
};

export default Basic;
