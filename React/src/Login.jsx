import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.css";
import { useQuestion, useTheme } from "./App";

export default function Login({ setAuthenticate }) {
  const { openNotification, NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } =
    useQuestion();
  const inputStyle = { border: "none" };

  function validateUser() {
    const uname = document.getElementById("username").value,
      pwd = document.getElementById("password").value;
    if (uname === "root" && pwd === "root") {
      openNotification(NOTIFICATION_SUCCESS, "Login Successfull");
      sessionStorage.setItem("authorised", "true");
      setAuthenticate(true);
    } else openNotification(NOTIFICATION_ERROR, "Wrong Credentials");
  }

  return (
    <div className="login">
      <Form
        className="login-from"
        name="basic"
        style={{ maxWidth: 600 }}
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={validateUser}
        autoComplete="off"
      >
        <Form.Item>
          <span className="login-header">Login</span>
        </Form.Item>
        <Form.Item
          className="input-field"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            className="login-input"
            style={inputStyle}
            id="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          className="input-field"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            className="login-input"
            style={inputStyle}
            id="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="primary-btn"
            id="login-submit"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
