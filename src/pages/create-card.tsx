import { Button, Form, message, Upload, UploadFile, UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DefaultState, Item } from "../store";

const { TextArea } = Input;

const CreateCard = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = (values: any) => {
    const payload = {
      description: values.description,
      owner: {
        avatar_url: fileList[0].url,
      },
      id: new Date().getSeconds(),
    };

    dispatch({ type: "CREATED_CARDS", payload });
    form.resetFields();
    setFileList([]);
    navigate(-1);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    setFileList(
      info.fileList.map((p) => ({
        ...p,
        url: URL.createObjectURL(p.originFileObj!),
      }))
    );
  };

  return (
    <Form
      style={{ marginTop: "5rem", width: "400px" }}
      form={form}
      name="upload_form"
      initialValues={{
        description: "",
      }}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Upload Photo"
        name="upload"
        rules={[{ required: true, message: "Please upload a photo!" }]}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          showUploadList={false}
        >
          {fileList[0] ? (
            <img style={{ width: 90 }} src={fileList[0].url} />
          ) : (
            <PlusOutlined style={{ fontSize: 50 }} />
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input a description!" }]}
      >
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Link to="/">
        <div>Вернуться на главную страницу</div>
      </Link>
    </Form>
  );
};
export default CreateCard;
