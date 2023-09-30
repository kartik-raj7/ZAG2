import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Row } from 'antd'
import React from 'react'
import style from './style.module.css'
const ConfirmationModal = (props) => {
    console.log(props)
const modalData=()=>{
    
    if(props.val){
        return(
            <>
            <div className={style.confirmModal}>  
           <Row>
            <CheckCircleOutlined className={style.confirmIcon}/>

           </Row>
           <Row className={style.confirmationText}>Success !</Row>
           <Row className={style.confirmText}>524 entries uploaded successfully</Row>
           <Row>
            <Col span={24} className={style.confirmationbtnDiv}>
            <Button type="primary" className={style.primarybtn} size="large" onClick={props.handleModal}>
                Go to my enteries</Button>
                </Col>
                <Col span={24} className={style.confirmationbtnDiv}>
                <Button className={style.secondarybtn} size="large" onClick={props.handleModal}>
                Cancel</Button></Col>
           </Row>
           </div>
           </>
        )
    }
    else{
        return(
          <></>
        )
    }
}

  return (
    <div>
        <Modal footer={null} open={props.visible} onCancel={props.handleModal} className={style.modalStyle}>
            {modalData()}
        </Modal>
    </div>
  )
}

export default ConfirmationModal