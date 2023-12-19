import React, { useContext, useEffect, useRef, useState } from "react";
import { InputRef, Select } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { axiosCRM } from "@/utils/api/api_crm";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {}
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

type TableChanceType = {
  setFormData?: any;
  dataTable?: any;
};

const TableChanceProduct: React.FC<TableChanceType> = ({
  setFormData,
  dataTable,
}) => {
  const [listCommodities, setListCommodities] = useState([]);
  const [dataSource, setDataSource] = useState<any[]>(dataTable || []);
  const [count, setCount] = useState(2);

  const handleChangeValueMoney = (e, valKey, restValKey, index) => {
    const rowData = dataSource?.filter((item) => item?.key === index)[0];
    const newRowData = {
      ...rowData,
      [valKey]: Number(e.target?.value),
      money: Number(e.target?.value) * rowData?.[restValKey],
      discount_money:
        (rowData?.discount_rate / 100) *
        (Number(e.target?.value) * rowData?.[restValKey]),
      tax_money:
        (rowData?.tax_rate / 100) *
        (Number(e.target?.value) * rowData?.[restValKey]),
      total: (
        Number(e.target?.value) * rowData?.[restValKey] -
        (rowData?.discount_rate / 100) *
          (Number(e.target?.value) * rowData?.[restValKey]) +
        (rowData?.tax_rate / 100) *
          (Number(e.target?.value) * rowData?.[restValKey])
      )?.toFixed,
    };
    const newDataSource = [...dataSource];
    newDataSource?.splice(index, 1, newRowData);
    setDataSource(newDataSource);
  };

  const handleChangeDisountRate = (e, index) => {
    const rowData = dataSource?.filter((item) => item?.key === index)[0];
    const newRowData = {
      ...rowData,
      discount_rate: Number(e.target?.value),
      discount_money: (
        (Number(e.target?.value) / 100) *
        rowData?.money
      )?.toFixed(2),
      total: (
        rowData?.money +
        rowData?.tax_money -
        (Number(e.target?.value) / 100) * rowData?.money
      ).toFixed(2),
    };
    const newDataSource = [...dataSource];
    newDataSource?.splice(index, 1, newRowData);
    setDataSource(newDataSource);
  };

  const handleChangeTaxRate = (e, index) => {
    const rowData = dataSource?.filter((item) => item?.key === index)[0];
    const newRowData = {
      ...rowData,
      tax_rate: Number(e.target?.value),
      tax_money: (
        Number(e.target?.value) *
        ((rowData?.money - rowData?.discount_money) / 100)
      ).toFixed(2),
      total: (
        rowData?.money -
        rowData?.discount_money +
        Number(e.target?.value) *
          ((rowData?.money - rowData?.discount_money) / 100)
      ).toFixed(2),
    };
    const newDataSource = [...dataSource];
    newDataSource?.splice(index, 1, newRowData);
    setDataSource(newDataSource);
  };

  const columnsDefault: ColumnsType<any> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên hàng hóa",
      width: 350,
      dataIndex: "key",
      key: "0",
      render: (product, record) => (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          placeholder="Chọn"
          style={{ width: "80%" }}
          onChange={(val) => {
            const newProduct = listCommodities?.filter(
              (item) => item?._id === val
            )[0];
            const indexFilter = dataSource.findIndex(
              (item) => item.key === product
            );
            const newData = [...dataSource];
            newData.splice(indexFilter, 1, newProduct);
            setDataSource(
              newData?.map((item, i) => {
                return {
                  ...item,
                  key: i,
                  count: Number(item?.min_amount) || 0,
                  money: item?.price * Number(item?.min_amount) || 0,
                  discount_rate: 0,
                  discount_money: 0,
                  tax_rate: 0,
                  tax_money: 0,
                  total: 0,
                };
              })
            );
          }}
          // defaultValue={record?._id}
          value={record?._id}
          options={listCommodities?.map((item) => {
            return {
              label: item?.prod_name,
              value: item?._id,
            };
          })}
        />
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "dvt",
      key: "1",
      width: 150,
      render: (product, record) => <div>{product?.unit_name}</div>,
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "2",
      width: 150,
      render: (value, record, index) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
          min={Number(record?.min_amount) || 0}
          onChange={(e) => {
            handleChangeValueMoney(e, "count", "price", index);
          }}
          // value={
          //   value < Number(record?.min_amount)
          //     ? Number(record?.min_amount)
          //     : value
          // }
          value={value}
        />
      ),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "price",
      key: "2",
      width: 200,
      render: (value, record, index) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          placeholder="Nhập"
          min={0}
          onChange={(e) => {
            handleChangeValueMoney(e, "price", "count", index);
          }}
          defaultValue={value}
        />
      ),
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "money",
      key: "3",
      width: 200,
      render: (money, record) => {
        return <div>{money}</div>;
      },
    },
    {
      title: "Tỉ lệ chiết khấu (%)",
      dataIndex: "discount_rate",
      key: "3",
      width: 150,
      render: (discount_rate, record, index) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          min={0}
          value={discount_rate}
          onChange={(e) => {
            handleChangeDisountRate(e, index);
          }}
          placeholder="Nhập"
        />
      ),
    },
    {
      title: "Tiền chiết khẩu (VNĐ)",
      dataIndex: "discount_money",
      key: "3",
      width: 250,
      render: (discount_money, record) => {
        return <div>{discount_money}</div>;
      },
    },
    {
      title: "Thuế suất (%)",
      dataIndex: "tax_rate",
      key: "3",
      width: 150,
      render: (tax_rate, _, index) => (
        <input
          className="focus_input_none"
          style={{ border: 0, padding: "5px" }}
          type="number"
          value={tax_rate}
          min={0}
          onChange={(e) => {
            handleChangeTaxRate(e, index);
          }}
          placeholder="Nhập"
        />
      ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tax_money",
      key: "3",
      width: 200,
      render: (tax_money, record) => {
        return <div>{tax_money}</div>;
      },
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "3",
      width: 200,
      render: (total) => {
        return <div>{total}</div>;
      },
    },
    {
      title: "Chức năng",
      dataIndex: "key",
      key: "4",
      width: 120,
      fixed: "right",
      render: (index) => (
        <div
          key={index}
          style={{ color: "#FF3333", fontSize: "15px" }}
          onClick={() => {
            const newData = dataSource.filter((item) => item.key !== index);
            setDataSource(newData);
          }}
        >
          <Image width={16} height={16} alt="del" src="/crm/del_red.svg" />
          Xóa
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    const newData: any = {
      ...listCommodities[0],
    };

    setDataSource(
      [...dataSource, newData]?.map((item, i) => {
        return {
          ...item,
          key: i,
          count: item?.count || Number(item?.min_amount) || 0,
          money:
            item?.money ||
            item?.product_cost ||
            item?.price * Number(item?.min_amount) ||
            0,
          discount_rate: item?.discount_rate || 0,
          discount_money: item?.discount_money || 0,
          tax_rate: item?.tax_rate || 0,
          tax_money: item?.tax_money || 0,
          total: item?.total
            ? item?.total
            : item?.price * Number(item?.min_amount),
        };
      })
    );
    setCount(count + 1);
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    let sumMoney = 0;
    if (dataSource?.length > 0) {
      sumMoney = dataSource?.reduce((a, b) => a?.total + b?.total);
    }
    setFormData((prev) => {
      return {
        ...prev,
        productData: dataSource,
        total_money: sumMoney,
      };
    });
  }, [dataSource]);

  useEffect(() => {
    axiosCRM
      .post("/product/show-product", { page_size: 50 })
      .then((res) => handleConvertCommodity(res.data.data.data))
      .catch((err) => console.log("errrCommodity", err));
  }, []);
  const handleConvertCommodity = (datas) => {
    const convert = datas?.map((item) => ({
      ...item,
      unit_name: item?.dvt?.unit_name,
      unit_id: item?.dvt?._id,
    }));
    setListCommodities(convert);
  };

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        scroll={{ x: 1500, y: 300 }}
        dataSource={dataSource}
        columns={columnsDefault}
        summary={() => {
          let totalBorrow = 0;
          let totalRepayment = 0;

          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });

          return (
            <>
              <Table.Summary fixed="top">
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <div style={{ background: "white" }}></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} colSpan={15}>
                    <div
                      onClick={handleAdd}
                      style={{
                        width: "100px",
                        textAlign: "left",
                        marginLeft: "10px",
                        color: "#4C5BD4",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        alt="img"
                        src={"/crm/plus_icon_field.svg"}
                        width={25}
                        height={25}
                      />
                      Thêm dòng
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={15}></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
      <div style={{ width: "100%", fontSize: "14px" }}>
        Tổng số: <span> {dataSource?.length} Hàng hóa</span>
      </div>
    </div>
  );
};

export default TableChanceProduct;
