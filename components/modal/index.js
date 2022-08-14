import React from "react";
import Modal from "react-modal";

const ModalWrapper = ({isOpen ,toggle,...props}) => {
  return <Modal isOpen={isOpen}>
    <div style={{position:"relative"}}>
        <div style={{position:"absolute" ,top:"0",right:"0",cursor:"pointer"}}onClick={toggle}>X</div>
       <div style={{paddingTop:"30px"}}> {props.children}</div>
    </div>
  </Modal>;
};

export default ModalWrapper;
