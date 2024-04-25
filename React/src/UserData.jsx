import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Pagination, Table } from "antd";
import "./data.css";
import { useQuestion } from "./App";

export default function UserData() {
  const { openNotification, NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } =
    useQuestion();
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Action",
      key: "delete",
      render: (_, record) => (
        <a id="delete" onClick={() => deleteUser(record._id)}>
          Delete
        </a>
      ),
    },
  ];

  const [userData, setUserData] = useState([]);
  const [userEntry, setUserEntry] = useState(0);
  useEffect(() => {
    (async () => {
      await callUser();
      await axios
        .get("http://localhost:3000/user/getusercount")
        .then((value) => setUserEntry(value.data))
        .catch(() => openNotification(NOTIFICATION_ERROR, "No User found"));
    })();
  }, []);

  const callUser = async (currentPage) => {
    await axios
      .get(`http://localhost:3000/user/getuser/${currentPage}`)
      .then((values) => setUserData(values.data))
      .catch((error) => openNotification(NOTIFICATION_ERROR, error.message));
  };

  const deleteUser = (record) => {
    (async () => {
      await axios
        .delete(`http://localhost:3000/user/deleteuser/${record}`)
        .then((values) => {
          setUserData(values.data);
          openNotification(NOTIFICATION_SUCCESS, "User Deleted");
        })
        .catch((error) => openNotification(NOTIFICATION_ERROR, "Not Found"));
    })();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowHoverBg: "none",
            colorBgContainer: "none",
            fontSize: "1.1rem",
          },
        },
      }}
    >
      <div id="result-container">
        <Table
          id="result-item"
          rowKey="_id"
          columns={columns}
          dataSource={userData}
          pagination={{
            className: "page",
            position: ["bottomCenter"],
            pageSize: 4,
            total: userEntry,
            onChange: (page) => callUser(page),
          }}
          footer={() => (
            <span className="footer">Total Records: {userEntry}</span>
          )}
        />
      </div>
    </ConfigProvider>
  );
}
