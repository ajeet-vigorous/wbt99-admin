import React, { useState } from "react";
import { Card, DatePicker, Table, Button, Row, Col } from "antd";
import moment from "moment";
import BackButton from "../../Hoc/BackButton";
import { useSelector } from "react-redux";

import Loader from "../../../../components/loader";
import { Link } from "react-router-dom";
import { BarChartOutlined, EyeOutlined } from "@ant-design/icons";

const Basic = () => {


    const [dates, setDates] = useState('')


    const { loading } = useSelector((state) => state.UserReducer);




    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

        return obj;
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'code',
            render: renderContent,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (value, row) => (
                // <Link to={`/components/casino/casinoinplayview/${row.id}/${row.name}`}>

                    <span className="gx-text-black gx-text-uppercase">{row.name}</span>
                // </Link>
            ),
        },
        {
            title: 'Details',
            dataIndex: 'action',
            render: (text, record) => (
                <div className="gx-bg-flex gx-justify-content-start gx-align-items-center">
                    <Button type="primary" className="">

                        <Link to={`/components/casino/casinoinplayview/${record.id}/${record.name}`}>
                            View
                        </Link>
                    </Button>
                    <Button type="primary" className=""><Link to={`/components/casino/inplaycasinodetails/${record.name}/${record.id}/`}> <EyeOutlined /> Display Games</Link></Button>
                </div>
            ),
        },
    ];

    // Define the data source
    const dataSource = [
        {
            key: '1',
            name: 'AmarAkbarAnthony',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 1,
            id: 3056
        },
        {
            key: '2',
            name: 'Live Teen Patti One Day',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 2,
            id: 3031
        },
        {
            key: '3',
            name: 'DragonTiger',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 3,
            id: 3035
        },
        {
            key: '4',
            name: 'DragonTiger T20',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 4,
            id: 3059
        },
        {
            key: '5',
            name: 'luck7b',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 5,
            id: 3032
        },
        {
            key: '6',
            name: 'TeenpattiT20',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 6,
            id: 3030
        },
        {
            key: '7',
            name: 'Warli Matka',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 7,
            id: 3054
        },
        {
            key: '8',
            name: 'Ander Bahar2',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 8,
            id: 3043
        },
        {
            key: '9',
            name: 'Card A',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 9,
            id: 3055
        },
        {
            key: '10',
            name: 'Card B',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 10,
            id: 3034
        },

        {
            key: '11',
            name: 'Teen Patti Test',
            date: <span className="gx-text-nowrap">{moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss A")}</span>,
            action: '',
            code: 11,
            id: 3048
        },
    ];

    const RangePicker = DatePicker.RangePicker;
    const onChange = (dateStrings) => {
        setDates(dateStrings)
    }



    // function handleChange(value) {
    // }
    // const { Option } = Select;

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Card className="gx-card">

                    <div className="gx-bg-grey gx-px-3 gx-py-2 gx-bg-flex gx-align-items-center">
                        <span className="gx-fs-lg gx-font-weight-bold gx-text-white gx-align-items-center gx-text-uppercase">{`Active Games`}</span>
                        <BackButton />
                    </div>
                    <div className="gx-p-4">
                        <Table className="gx-table-responsive gx-text-uppercase" columns={columns} dataSource={dataSource} bordered pagination={false} size="small" />
                    </div>
                </Card>
            }
        </>
    );
};

export default Basic;
