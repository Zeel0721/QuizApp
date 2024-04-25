import React, { useEffect, useState } from "react";
import Question from "./Question";
import { Form, Button } from "antd";
import { useQuestion } from "./App";
import EditForm from "./EditForm";
import axios from "axios";

export default function Quiz({ setResult, setCompleted, isAdmin }) {
  let counter = 0;
  const {
    questions,
    setQuestions,
    answer,
    setAnswer,
    openNotification,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR,
  } = useQuestion();
  const [order, setOrder] = useState({ minOrder: 0, maxOrder: 3 });
  const [idModal, setModal] = useState();
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/admin/getquestions")
        .then((values) => setQuestions(values.data))
        .catch((error) => openNotification(NOTIFICATION_ERROR, error.message));
    })();
  }, []);
  useEffect(() => {
    if (isAdmin) return;
    answer.length = Object.keys(answer).length;
    Array.prototype.forEach.call(answer, (element, id) =>
      element === questions[id].answer ? counter++ : null
    );
    setResult({ result: counter, max: questions.length });
    if (answer.length === questions.length + 1) return Result();
  }, [answer]);

  const Prev = () => {
    setOrder((prev) => {
      return { minOrder: prev.minOrder - 4, maxOrder: prev.maxOrder - 4 };
    });
  };
  const Next = () => {
    setOrder((prev) => {
      return { minOrder: prev.minOrder + 4, maxOrder: prev.maxOrder + 4 };
    });
  };
  const Validate = async (values) => {
    setAnswer((prev) => ({ ...prev, ...values }));
    if (order.maxOrder < questions.length - 1) return Next();
  };
  const Result = () => {
    setCompleted(true);
    setAnswer({});
    openNotification(NOTIFICATION_SUCCESS, "Test Completed");
    return;
  };

  return (
    <>
      <Form
        name="User"
        id="quiz-form"
        labelCol={{ span: 1 }}
        autoComplete="off"
        onFinish={Validate}
      >
        {questions?.map((question, id) => {
          if (id >= order.minOrder && id <= order.maxOrder)
            return (
              <Question
                key={id}
                id={id}
                isAdmin={isAdmin}
                setOrder={setOrder}
                order={order}
              />
            );
        })}
        <div className="quiz-control">
          <Button
            id="prev"
            className="primary-btn left-btn"
            onClick={Prev}
            style={{ visibility: order.maxOrder > 4 ? false : "hidden" }}
          >
            Prev
          </Button>
          {order.maxOrder < questions.length - 1 && (
            <Button
              id="next"
              className="primary-btn right-btn"
              htmlType={isAdmin ? "button" : "submit"}
              onClick={isAdmin ? Next : null}
            >
              Next
            </Button>
          )}
          {order.minOrder >= questions.length - 4 &&
            (isAdmin ? (
              <Button
                id="add-btn"
                className="primary-btn right-btn"
                onClick={() => setModal(true)}
              >
                Add Question
              </Button>
            ) : (
              <Button
                id="done"
                className="primary-btn right-btn"
                htmlType="submit"
              >
                Done
              </Button>
            ))}
        </div>
        <EditForm action={"add"} idModal={idModal} setModal={setModal} />
      </Form>
    </>
  );
}
