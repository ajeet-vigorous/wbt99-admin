import React from "react";
import { Modal, Table } from "antd";
import { useSelector } from "react-redux";


const Info = ({ visible, handleClose }) => {

  const partnerInfoModal = useSelector((state) => state.UserReducer.shareDetails);

  if (!visible || !partnerInfoModal) {
    return null;
  }

  const authUser = JSON.parse(localStorage.getItem('user_id'))


  const userPriority = authUser?.data?.userPriority;
  let columns = null;
  if (userPriority === 9) {
    columns = [
      {
        title: "Owner",
        dataIndex: "owner",
      },

      {
        title: "Subowner",
        dataIndex: "subowner",
      },

      {
        title: "SuperAdmin",
        dataIndex: "superadmin",
      },
      {
        title: "Admin",
        dataIndex: "admin",
      },
      {
        title: "MiniAdmin",
        dataIndex: "miniadmin",
      },
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 8) {
    columns = [
      {
        title: "Subowner",
        dataIndex: "subowner",
      },

      {
        title: "SuperAdmin",
        dataIndex: "superadmin",
      },
      {
        title: "Admin",
        dataIndex: "admin",
      },
      {
        title: "MiniAdmin",
        dataIndex: "miniadmin",
      },
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 7) {
    columns = [
      {
        title: "SuperAdmin",
        dataIndex: "superadmin",
      },
      {
        title: "Admin",
        dataIndex: "admin",
      },
      {
        title: "MiniAdmin",
        dataIndex: "miniadmin",
      },
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 6) {
    columns = [

      {
        title: "Admin",
        dataIndex: "admin",
      },
      {
        title: "MiniAdmin",
        dataIndex: "miniadmin",
      },
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 5) {
    columns = [
      {
        title: "MiniAdmin",
        dataIndex: "miniadmin",
      },
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 4) {
    columns = [
      {
        title: "Master",
        dataIndex: "master",
      },
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 3) {
    columns = [
      {
        title: "SuperAgent",
        dataIndex: "superagent",
      },
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }
  if (userPriority === 2) {
    columns = [
      {
        title: "Agent",
        dataIndex: "agent",
      },
      {
        title: "Client",
        dataIndex: "client",
      },
    ];
  }


  // matchShare
  const matchShare = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerMatchShare,
      subowner: partnerInfoModal.subownerMatchShare,
      superadmin: partnerInfoModal.superadminMatchShare,
      admin: partnerInfoModal.adminMatchShare,
      miniadmin: partnerInfoModal.subadminMatchShare,
      master: partnerInfoModal.masterMatchShare,
      superagent: partnerInfoModal.superagentMatchShare,
      agent: partnerInfoModal.agentMatchShare,
      client: partnerInfoModal.clientMatchShare,
    },
  ];

  //matchCommission
  const matchCommission = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerMatchCommission,
      subowner: partnerInfoModal.subownerMatchCommission,
      superadmin: partnerInfoModal.superadminMatchCommission,
      admin: partnerInfoModal.adminMatchCommission,
      miniadmin: partnerInfoModal.subadminMatchCommission,
      master: partnerInfoModal.masterMatchCommission,
      superagent: partnerInfoModal.superagentMatchCommission,
      agent: partnerInfoModal.agentMatchCommission,
      client: partnerInfoModal.clientMatchCommission,
    },
  ];

  // sessionCommission
  const data3 = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerSessionCommission,
      subowner: partnerInfoModal.subownerSessionCommission,
      superadmin: partnerInfoModal.superadminSessionCommission,
      admin: partnerInfoModal.adminSessionCommission,
      miniadmin: partnerInfoModal.subadminSessionCommission,
      master: partnerInfoModal.masterSessionCommission,
      superagent: partnerInfoModal.superagentSessionCommission,
      agent: partnerInfoModal.agentSessionCommission,
      client: partnerInfoModal.clientSessionCommission,
    },
  ];


  const data4 = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerSessionCommission,
      subowner: partnerInfoModal.subownerSessionCommission,
      superadmin: partnerInfoModal.superadminSessionCommission,
      admin: partnerInfoModal.adminSessionCommission,
      miniadmin: partnerInfoModal.subadminSessionCommission,
      master: partnerInfoModal.masterSessionCommission,
      superagent: partnerInfoModal.superagentSessionCommission,
      agent: partnerInfoModal.agentSessionCommission,
      client: partnerInfoModal.clientSessionCommission,
    },
  ];

  //casinoShare
  const casinoShare = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerCasinoShare,
      subowner: partnerInfoModal.subownerCasinoShare,
      superadmin: partnerInfoModal.superadminCasinoShare,
      admin: partnerInfoModal.adminCasinoShare,
      miniadmin: partnerInfoModal.subadminCasinoShare,
      master: partnerInfoModal.masterCasinoShare,
      superagent: partnerInfoModal.superagentCasinoShare,
      agent: partnerInfoModal.agentCasinoShare,
      client: partnerInfoModal.clientCasinoShare,
    },
  ];

  //casinoCommission
  const casinoCommission = [
    {
      key: partnerInfoModal._id,
      owner: partnerInfoModal.ownerCasinoCommission,
      subowner: partnerInfoModal.subownerCasinoCommission,
      superadmin: partnerInfoModal.superadminCasinoCommission,
      admin: partnerInfoModal.adminCasinoCommission,
      miniadmin: partnerInfoModal.subadminCasinoCommission,
      master: partnerInfoModal.masterCasinoCommission,
      superagent: partnerInfoModal.superagentCasinoCommission,
      agent: partnerInfoModal.agentCasinoCommission,
      client: partnerInfoModal.clientCasinoCommission,
    },
  ];

  const modalFooter = null;

  return (
    <Modal
      title={`PARTNERSHIP DETAILS - ${partnerInfoModal.userName}`}
      onCancel={handleClose}

      open={partnerInfoModal?.userType ? true : false}
      footer={modalFooter}
      width={750}
      className="gx-px-3 "
    >
      <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text divider-text-start" role="separator"><span class="ant-divider-inner-text gx-text-uppercase gx-text-lg">Match Share</span></div>


      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={matchShare}
        bordered
        pagination={false}
        size="small"
      />
            <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text divider-text-start" role="separator"><span class="ant-divider-inner-text gx-text-uppercase gx-text-lg">Match Commission</span></div>

      {/* <p className="gx-py-4 gx-text-uppercase">Match Commission</p> */}
      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={matchCommission}
        bordered
        pagination={false}
        size="small"
      />
                  <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text divider-text-start" role="separator"><span class="ant-divider-inner-text gx-text-uppercase gx-text-lg">Session Commission</span></div>

      {/* <p className="gx-py-4 gx-text-uppercase">Session Commission</p> */}
      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={data3}
        bordered
        pagination={false}
        size="small"
      />
      {/* <p>Mobile Share</p>
      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={data4}
        bordered
        pagination={false}
        size="small"
      /> */}
       <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text divider-text-start" role="separator"><span class="ant-divider-inner-text gx-text-uppercase gx-text-lg">Casino Share</span></div>
      {/* <p className="gx-py-4 gx-text-uppercase">Casino Share</p> */}
      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={casinoShare}
        bordered
        pagination={false}
        size="small"
      />
      <div class="ant-divider css-1v5z42l ant-divider-horizontal ant-divider-with-text divider-text-start" role="separator"><span class="ant-divider-inner-text gx-text-uppercase gx-text-lg">Casino Commission</span></div>
      {/* <p className="gx-py-4 gx-text-uppercase">Casino Commission</p> */}
      <Table
        className="gx-table-responsive  login-table-header"
        columns={columns}
        dataSource={casinoCommission}
        bordered
        pagination={false}
        size="small"
      />
    </Modal>

  );
};

export default Info;
