import { ArrowLeftOutlined, InboxOutlined } from "@ant-design/icons";
import { Form, Input, message, Upload, Button, Row, Spin } from "antd";
import React, { useState } from "react";
import ConfirmationModal from "./utils/confirmationModal";
import { openNotificationWithIcon } from "./utils/Notification";
import './App.css'
const App = () => {
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  const [jsonContent, setJsonContent] = useState(null);
  const [modal,setModal] = useState(false)
  const [validatedjson,setValidatedjson] = useState(true)
  const [loader,setLoader ] = useState(false);
  function handleModal(){
    setModal(!modal);
  }
  const props = {
    name: 'file',
    multiple: false, 
    action: '',
    
    beforeUpload: (file) => {
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        setLoader(true),
        reader.onloadend = () => {
          try {
            const parsedJson = JSON.stringify(JSON.parse(reader.result), null, 4);
            setJsonContent(parsedJson);
            setValidatedjson(false);
            resolve();
            setLoader(false);
          } catch (error) {
            openNotificationWithIcon('error',`${file.name} is not a valid JSON file.`)
            reject(); 
          }
        };

        reader.readAsText(file);
      });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="App">
      <Form form={form} onFinish={onFinish}>
        <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
          <ArrowLeftOutlined />
          <h3 style={{ marginLeft: "10px" }}>Submit form</h3>
        </div>
        <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name!' }]}>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Upload Json File">
          <Dragger {...props}>
            {loader?(
              <>
              <Row className="validationdiv">
              <Row className="spinner">
          <Spin size="large" /></Row>
          <Row className="validatingtext">Validating....</Row></Row></>):(
            <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p></>)}
          </Dragger>
        </Form.Item>
        <Form.Item>
        <Row>File Contents</Row>
       <div> {jsonContent}</div>
       <ConfirmationModal handleModal={handleModal} visible={modal} val={true} className='submit-btn-row'/>
       <Row>
          <Button type="primary" htmlType="submit" disabled={validatedjson} onClick={handleModal} className="submit-btn">

            Submit
          </Button>
          </Row>
        </Form.Item>
      </Form>
      
    </div>
  );
};

export default App;

