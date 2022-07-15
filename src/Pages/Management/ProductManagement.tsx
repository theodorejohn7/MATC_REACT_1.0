import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./styles.css";  

import { useSelector, useDispatch } from "react-redux";
import { getMuttonData } from "../../redux/action/testAction";
import { patchProductUpdate } from "../../redux/action/patchProductAction";
import { deleteProductData } from "../../redux/action/deleteProductAction";
import { getProductData } from "../../redux/action/getProductAction";

interface Item {
  id: string;
  _id: string;
  title: string;
  description: string;
  discPrice: number;
  grossWeight: number;
  image: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  _record:string;
  _index:string;
  description: string;
  image: string;
  inputType: "number" | "text" | "lineOfText";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,

  inputType,
  _record,
  _index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "lineOfText" ? (
      <Input.TextArea autoSize showCount />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface IPost {
  id: any;
  image: string;
  userId?: number;
  title: string;
  description: string;
  _id: string;
  discPrice:number;
  grossWeight:number;
}

const defaultPosts: IPost[] = [];

const ProductManagement: React.FC = () => {


const API_URL = process.env.REACT_APP_API_URL;



  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const dispatch = useDispatch();

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");
  const [muttonPosts, setMuttonPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [data, setData] = useState(muttonPosts);

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({
      title: "",
      discPrice: "",
      grossWeight: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const updateProductData = useCallback(
    async (id:string, body:any) => {
      try {
        dispatch(patchProductUpdate(id, body)) ;
      } catch (_error) {
        console.log(_error);
      }
    },
    [dispatch]
  );

  const deleteProductRecords = useCallback(
    async (id:string) => {
      try {
        dispatch(deleteProductData(id) );
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      //    as Item

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      console.log("@$# newData", index);
      console.log("@$# row", row);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("@$# newdataRow", newData[index]);

        updateProductData(newData[index]._id, newData[index]);

        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: "5%",
      editable: true,
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      width: "15%",
      editable: true,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "25%",
      editable: true,
    },
    {
      title: "Price",
      key: "price",

      dataIndex: "price",
      width: "5%",
      editable: true,
    },
    {
      title: "Disc. Price",
      key: "discPrice",
      dataIndex: "discPrice",
      width: "7%",
      editable: true,
    },
    {
      title: "Gross Weight",
      key: "grossWeight",

      dataIndex: "grossWeight",
      width: "8.5%",
      editable: true,
    },
    {
      title: "Nett Weight",
      key: "netWeight",

      dataIndex: "netWeight",

      width: "7.5%",
      editable: true,
    },

    {
      title: "Image ",
      key: "image",

      dataIndex: "image",
      width: "10%",
      editable: true,
      render: (image:string) => <img alt={`${image}+image`} src={`${image}`} style={{ height: "10vh" }} />,
    },
    {
      title: "Rating ",
      dataIndex: "rating",
      key: "rating",

      width: "5%",
      editable: false,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",

      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.id)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                style={{ marginLeft: "20px" }}
              >
                Edit
              </Typography.Link>
            )}
            {
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record._id)}
              >
                <a style={{ marginLeft: "20px" }}>Delete</a>
              </Popconfirm>
            }
          </div>
        );
      },
    },
  ];

  const handleDelete = (key:string) => {
    const newData = data.filter((item) => item._id !== key);
    console.log("Key", key);
    deleteProductRecords(key);
    setData(newData)
    console.log("New Data", newData);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType:
          col.dataIndex === "title" || col.dataIndex === "category"
            ? "text"
            : col.dataIndex === "description" || col.dataIndex === "image"
            ? "lineOfText"
            : "number",

        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const productRecordsData = useSelector(
    (state: any) => state.getProductReducer?.getProductData
  );

  const fetchProductRecordsData = useCallback(
    async (category: string) => {
      try {
        setSpinLoader(true);
        dispatch(getProductData(category));
      } catch (error_2) {
        console.log(error_2);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (productRecordsData) {
      setData(productRecordsData);
      setSpinLoader(false);

      setLoading(false);
      if (productRecordsData.error) {
        setError(productRecordsData !== undefined && productRecordsData?.message);
      }
    }
  }, [productRecordsData]);

  const muttonRecordsData = useSelector(
    (state: any) => state.testReducer?.getMuttonData
  );

  const [spinLoader, setSpinLoader] = useState(false);

  const fetchMuttonRecordsData = useCallback(async () => {
    try {
      setSpinLoader(true);
      dispatch(getMuttonData());
    } catch (error_1) {
      console.log(error_1);
    }
  }, [dispatch]);

  useEffect(() => {
    if (muttonRecordsData) {
      console.log("@$# 292", muttonRecordsData);
      setMuttonPosts(muttonRecordsData);
      setData(muttonRecordsData);
      setSpinLoader(false);
      setLoading(false);
      if (muttonRecordsData.error) {
        setError(muttonRecordsData !== undefined && muttonRecordsData?.message);
      }
    }
  }, [muttonRecordsData]);

  interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
    description: string;
  }
  // const showTitle = true;
  // const defaultTitle = "Wellcome";
  // const tableProps: TableProps<DataType> = {
  //   // loading,
  //   size: "middle",
  //   // "bordered"
  // };
  return (
    <div style={{minHeight:'350px'}}>
      <div >
        <Button
          type="primary"
          className="custom_button"
          onClick={() => fetchMuttonRecordsData()}
        >
          Display Mutton data
        </Button>
        <Button
          type="primary"
          className="custom_button"
          onClick={() => fetchProductRecordsData("chicken")}
        >
          Display Chicken data
        </Button>
        <Button
          type="primary"
          className="custom_button"
          onClick={() => fetchProductRecordsData("seafood")}
        >
          Display SeaFood data
        </Button>
      </div>

      <Form form={form} component={false}>
        <Spin spinning={spinLoader} className="custom_button" tip="Loading...">
          {!loading && (
            <Table
              // {...tableProps}
              className="table_style"
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                position: ["topRight"],
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
                onChange: cancel,
              }}
            />
          )}
        </Spin>
      </Form>
    </div>
  );
};

export default ProductManagement;
 