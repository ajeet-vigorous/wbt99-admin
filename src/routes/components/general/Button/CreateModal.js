import React, { useState } from "react";
import { Modal,  Button } from "antd";
import { Form, Input, Row, Col, DatePicker } from 'antd';
import moment from "moment";


const CreateModal = ({ visible,setCreateModal}) => {

  const [name, setName] = useState('');
  const [registrationDate, setRegistrationDate] = useState(moment("2024-08-28"));
  const [userId, setUserId] = useState('SM386079');
  const [password, setPassword] = useState('');
  const [partnership, setPartnership] = useState('0');
  const [matchCommission, setMatchCommission] = useState('0');
  const [sessionCommission, setSessionCommission] = useState('0');
  const [partnershipCasino, setPartnershipCasino] = useState('0');
  const [partnershipVirtCasino, setPartnershipVirtCasino] = useState('0');
  if (!visible) {
    return null;
  }
  // Handlers for each input
  const onNameChange = (values) => {
    setName(values.name);
   
  };

  const onDateChange = (date) => {
    setRegistrationDate(date);

  };

  const onUserIdChange = (values) => {
    setUserId(values.userId);

  };

  const onPasswordChange = (values) => {
    setPassword(values.password);

  };

  const onPartnershipChange = (values) => {
    setPartnership(values.partnership);

  };

  const onMatchCommissionChange = (values) => {
    setMatchCommission(values.matchCommission);

  };

  const onSessionCommissionChange = (values) => {
    setSessionCommission(values.sessionCommission);

  };

  const onPartnershipCasinoChange = (values) => {
    setPartnershipCasino(values.partnershipCasino);

  };

  const onPartnershipVirtCasinoChange = (values) => {
    setPartnershipVirtCasino(values.partnershipVirtCasino);

  };

  const handleClose =()=>{
    setCreateModal(false)
  }
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  return (
    <Modal
      onCancel={() => handleClose()}
      open={true}
      className="gx-px-3"
      footer={false}

    >

<>
      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onNameChange} 
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the Name!' }]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onDateChange} 
          >
            <Form.Item
              label="Registration Date"
              name="registrationDate"
            >
              <DatePicker
                style={{ width: '100%' }}
                value={registrationDate}
                onChange={(date) => onDateChange(date)}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onUserIdChange}
          >
            <Form.Item
              label="User ID"
              name="userId"
            >
              <Input value={userId} onChange={(e) => setUserId(e.target.value)} disabled />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onPasswordChange}
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input the Password!' }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onPartnershipChange}
          >
            <Form.Item
              label="Partnership [90]"
              name="partnership"
            >
              <Input value={partnership} onChange={(e) => setPartnership(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onMatchCommissionChange}
          >
            <Form.Item
              label="Match Commission [3]"
              name="matchCommission"
            >
              <Input value={matchCommission} onChange={(e) => setMatchCommission(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onSessionCommissionChange}
          >
            <Form.Item
              label="Session Commission [3]"
              name="sessionCommission"
            >
              <Input value={sessionCommission} onChange={(e) => setSessionCommission(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onPartnershipCasinoChange}
          >
            <Form.Item
              label="Partnership Casino [3]"
              name="partnershipCasino"
            >
              <Input value={partnershipCasino} onChange={(e) => setPartnershipCasino(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={onPartnershipVirtCasinoChange}
          >
            <Form.Item
              label="Partnership Virt Casino [90]"
              name="partnershipVirtCasino"
            >
              <Input value={partnershipVirtCasino} onChange={(e) => setPartnershipVirtCasino(e.target.value)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={16} justify="start">
        <Col>
          <Button style={{ backgroundColor: 'green', borderColor: 'green' }} className="gx-text-white">
            Add
          </Button>
        </Col>
        <Col>
          <Button type="danger" onClick={() => console.log('Cancel Clicked')}>
            Cancel
          </Button>
        </Col>
      </Row>
    </>
    </Modal>

  );
};

export default CreateModal;














// import React, { useState } from "react";
// import { Modal,  Button } from "antd";
// import { Form, Input, Row, Col, DatePicker } from 'antd';
// import moment from "moment";


// const CreateModal = ({ visible,setCreateModal}) => {



  

//   return (
   
//   );
// };

// export default CreateModal;