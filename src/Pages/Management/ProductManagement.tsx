import { Button, Form, Input, InputNumber, Popconfirm, Spin, Table, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProductData } from "../../redux/action/getProductAction";
import { deleteProductData } from "../../redux/action/deleteProductAction";
import { patchProductUpdate } from "../../redux/action/patchProductAction";

import AddProduct from "../../components/AddProduct/AddProduct";

import "./styles.css";
import "antd/dist/antd.min.css";

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
  title: string;
  _record: string;
  _index: string;
  description: string;
  image: string;
  inputType: "number" | "text" | "lineOfText";
  record: Item;
  index: number;
  children: React.ReactNode;
}

interface IPost {
  image: string;
  title: string;
  description: string;
  id: string;
  _id: string;
  userId?: number;
  discPrice: number;
  grossWeight: number;
  netWeight: number;
  price: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  isLoggedin: boolean;
  setNotLoggedinPopup: () => void;
}

const defaultPosts: IPost[] = [];
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  let inputNode;
  if (inputType === "number") {
    inputNode = <InputNumber />;
  } else if (inputType === "lineOfText") {
    inputNode = <Input.TextArea autoSize showCount />;
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          className="global-NoMargin"
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const [error, setError]: [string, (error: string) => void] = useState("");
  const [muttonPosts, setMuttonPosts]: [IPost[], (posts: IPost[]) => void] = useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);

  const [data, setData] = useState(muttonPosts);

  const [clickButton, setClickButton] = useState("");

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({
      title: "",
      discPrice: "",
      grossWeight: "",
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const updateProductData = useCallback(
    async (id: string, body: IPost) => {
      try {
        dispatch(patchProductUpdate(id, body));
      } catch (_error) {
        console.log(_error);
      }
    },
    [dispatch]
  );

  const deleteProductRecords = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteProductData(id));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });

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
      editable: true
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      width: "15%",
      editable: true
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "25%",
      editable: true
    },
    {
      title: "Price",
      key: "price",

      dataIndex: "price",
      width: "5%",
      editable: true
    },
    {
      title: "Disc. Price",
      key: "discPrice",
      dataIndex: "discPrice",
      width: "7%",
      editable: true
    },
    {
      title: "Gross Weight",
      key: "grossWeight",

      dataIndex: "grossWeight",
      width: "8.5%",
      editable: true
    },
    {
      title: "Nett Weight",
      key: "netWeight",

      dataIndex: "netWeight",

      width: "7.5%",
      editable: true
    },

    {
      title: "Image ",
      key: "image",

      dataIndex: "image",
      width: "10%",
      editable: true,
      render: (image: string) => (
        <img alt={`${image}+title`} src={`${image}`} className="produtManagement-Image" />
      )
    },
    {
      title: "Rating ",
      dataIndex: "rating",
      key: "rating",

      width: "5%",
      editable: false
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",

      render: (_: IPost, record: Item) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.id)}
                  className="productManagement-Message">
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <Button type="text" className="p-0 m-0">
                    Cancel
                  </Button>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                className="global-MarginLeft">
                Edit
              </Typography.Link>
            )}
            {
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                <Button danger type="text" className="p-0 global-MarginLeft ">
                  Delete
                </Button>
              </Popconfirm>
            }
          </div>
        );
      }
    }
  ];

  const handleDelete = (key: string) => {
    const newData = data.filter((item) => item._id !== key);
    deleteProductRecords(key);
    setData(newData);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    if (col.dataIndex === "category") {
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          inputType: "text"
        })
      };
    } else if (
      col.dataIndex === "title" ||
      col.dataIndex === "description" ||
      col.dataIndex === "image"
    ) {
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          inputType: "lineOfText"
        })
      };
    } else {
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          inputType: "number"
        })
      };
    }
  });

  const productRecordsData = useSelector((state: any) => state.getProductReducer?.getProductData);

  const fetchProductRecordsData = useCallback(
    async (category: string) => {
      try {
        setIsUpload(false);
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

  const muttonRecordsData = useSelector((state: any) => state.muttonDataReducer?.getMuttonData);

  const [spinLoader, setSpinLoader] = useState(false);

  useEffect(() => {
    if (muttonRecordsData) {
      setMuttonPosts(muttonRecordsData);
      setData(muttonRecordsData);
      setSpinLoader(false);
      setLoading(false);
      if (muttonRecordsData.error) {
        setError(muttonRecordsData !== undefined && muttonRecordsData?.message);
      }
    }
  }, [muttonRecordsData]);

  const uploadProducts = () => {
    setClickButton("addProducts");
    setIsUpload(true);
    setLoading(true);
  };

  const getProductsDetails = (category: string) => {
    setClickButton(category);
    fetchProductRecordsData(category);
  };

  if (error) console.log("below error occured ", error);

  return (
    <div className="produtManagement-height">
      <div>
        <Button
          type="primary"
          disabled={clickButton === "mutton" ? true : false}
          data-testid="DataButton"
          className="custom_button"
          onClick={() => getProductsDetails("mutton")}>
          Display Mutton data
        </Button>
        <Button
          type="primary"
          className="custom_button"
          disabled={clickButton === "chicken" ? true : false}
          onClick={() => getProductsDetails("chicken")}>
          Display Chicken data
        </Button>
        <Button
          type="primary"
          className="custom_button"
          disabled={clickButton === "seafood" ? true : false}
          onClick={() => getProductsDetails("seafood")}>
          Display SeaFood data
        </Button>
        <Button
          type="primary"
          data-testid="DataButton"
          className="custom_button"
          disabled={clickButton === "addProducts" ? true : false}
          onClick={() => uploadProducts()}>
          Add Products
        </Button>
      </div>

      <Form data-testid="DataTable" className="data_table" form={form} component={false}>
        <Spin spinning={spinLoader} className="custom_button   table_height" tip="">
          {!loading && (
            <Table
              className="table_style  "
              components={{
                body: {
                  cell: EditableCell
                }
              }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                position: ["topRight"],
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
                onChange: cancel
              }}
            />
          )}
        </Spin>
      </Form>
      <div>{isUpload && <AddProduct />}</div>
    </div>
  );
};

export default ProductManagement;
