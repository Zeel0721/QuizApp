import React, { useContext, useRef, useState } from "react";
import Quiz from "./Quiz";
import { useQuestion, useTheme } from "./App";
import UserData from "./UserData";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

export default function Admin() {
  const [adminComp, setAdminComp] = useState("Edit");
  const editOption = useRef(),
    resultOption = useRef();

  const changeAdminComp = (e, action) => {
    e.preventDefault();
    setAdminComp(action);
  };

  return (
    <>
      <aside className="side-bar">
        <a
          href=""
          className="side-bar-menu"
          id="edit"
          onClick={(e) => changeAdminComp(e, "Edit")}
        >
          <span className="side-bar-item">
            <EditOutlined />
          </span>
          <span className="side-bar-item" ref={editOption}>
            Edit
          </span>
        </a>
        <a
          href=""
          className="side-bar-menu"
          id="result-grid"
          onClick={(e) => changeAdminComp(e, "Result")}
        >
          <span className="side-bar-item">
            <UserOutlined />
          </span>
          <span className="side-bar-item" ref={resultOption}>
            Result
          </span>
        </a>
      </aside>
      <div id="admin">
        {adminComp === "Edit" && <Quiz isAdmin={true} />}
        {adminComp === "Result" && <UserData />}
      </div>
    </>
  );
}
