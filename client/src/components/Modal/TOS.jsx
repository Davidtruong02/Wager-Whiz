import React, { useState } from "react";
import TOSForm from "../Forms/TOSForm";
import Modal from "react-bootstrap/Modal";

function TOS({ show, onHide, setTosModalShow, setTosChecked }) {
  //   const [setTosChecked, setTosChecked] = useState(false);

  return (
    <Modal className="tosModal" show={show} onHide={onHide}>
      <TOSForm
        setTosModalShow={setTosModalShow}
        setTosChecked={setTosChecked}
      />
    </Modal>
  );
}

export default TOS;
