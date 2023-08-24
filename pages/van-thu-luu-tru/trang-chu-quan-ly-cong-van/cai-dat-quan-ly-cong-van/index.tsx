import React, { useEffect, useState } from "react";
import styles from "./setting_document.module.css";
import Select from "react-select";
import Checkbox from "./Checkbox";
import { fetch_list_employee } from "@/utils/ShareApi";
import { handleCreate } from "@/utils/BaseApi";
export const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "30px",
    borderRadius: "10px",
  }),
};

const Index = () => {
  const [quyen1Values, setquyen1Values] = useState<any[]>([]);
  const [quyen2Values, setquyen2Values] = useState<any[]>([]);
  const [quyen3Values, setquyen3Values] = useState<any[]>([]);
  const [quyen4Values, setquyen4Values] = useState<any[]>([]);
  const [quyen5Values, setquyen5Values] = useState<any[]>([]);
  const [quyen6Values, setquyen6Values] = useState<any[]>([]);
  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    switch (field) {
      case "quyen1":
        setquyen1Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;
      case "quyen2":
        setquyen2Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;
      case "quyen3":
        setquyen3Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;
      case "quyen4":
        setquyen4Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;
      case "quyen5":
        setquyen5Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;
      case "quyen6":
        setquyen6Values((prevValues) =>
          checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value)
        );
        break;

      default:
        break;
    }
  };
  // Lấy danh sách nhân viên
  const [employee, setemployee] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_employee();
      setemployee(response?.data?.data);
    };
    fetchGetData();
  }, []);
  const ds_empla_options = employee?.map((opt: any) => {
    return { value: opt?._id, label: opt?.userName };
  });
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleMultiSelectChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);
  };
  const [error, setErrors] = useState("");
  const handleSetPerssion = async () => {
    if (selectedOption?.value == null) {
      setErrors("Chưa chọn nhân viên");
      return;
    } else if (
      quyen1Values.length == 0 &&
      quyen2Values.length == 0 &&
      quyen3Values.length == 0 &&
      quyen4Values.length == 0 &&
      quyen5Values.length == 0 &&
      quyen6Values.length == 0
    ) {
      setErrors("Chưa chọn quyền");
    } else {
      setErrors("");
      try {
        const api = "api/vanthu/setting/decentralization";
        await handleCreate(api, {
          emId: selectedOption?.value,
          quyen1: quyen1Values.join(","),
          quyen2: quyen2Values.join(","),
          quyen3: quyen3Values.join(","),
          quyen4: quyen4Values.join(","),
          quyen5: quyen5Values.join(","),
          quyen6: quyen6Values.join(","),
        });
      } catch (error) {
        alert("Đã xảy ra lỗi khi lưu sổ văn bản:");
      }
    }
  };
  return (
    <div className={styles.app}>
      <p>Quản lý phân quyền người dùng</p>
      <Select
        value={selectedOption}
        onChange={handleMultiSelectChange}
        options={ds_empla_options}
        placeholder="Chọn nhân viên được phân quyền"
        styles={select_style}
      />
      <div className={styles.content}>
        <table className={styles.content_table}>
          <thead>
            <tr>
              <th>
                <span>Chức năng </span>
              </th>
              <th>
                <span>Thêm mới </span>
              </th>
              <th>
                <span>Xóa</span>
              </th>
              <th>
                <span>Xem</span>
              </th>
              <th>
                <span>Sửa</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.body_content}>
            <tr>
              <td>
                <span>Danh sách văn bản</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen1Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen1", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen1Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen1", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen1Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen1", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen1Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen1", value, checked)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Danh sách hợp đồng</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen2Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen2", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen2Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen2", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen2Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen2", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen2Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen2", value, checked)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Tra nhanh văn bản</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen3Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen3", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen3Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen3", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen3Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen3", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen3Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen3", value, checked)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Lịch sử cập nhật</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen4Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen4", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen4Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen4", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen4Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen4", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen4Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen4", value, checked)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Cài đặt</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen5Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen5", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen5Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen5", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen5Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen5", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen5Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen5", value, checked)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Dữ liệu đã xóa</span>
              </td>
              <td>
                <Checkbox
                  value="1"
                  isChecked={quyen6Values.includes("1")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen6", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="2"
                  isChecked={quyen6Values.includes("2")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen6", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="3"
                  isChecked={quyen6Values.includes("3")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen6", value, checked)
                  }
                />
              </td>
              <td>
                <Checkbox
                  value="4"
                  isChecked={quyen6Values.includes("4")}
                  onChange={(value, checked) =>
                    handleCheckboxChange("quyen6", value, checked)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {error && (
        <p style={{ color: "red", fontSize: "14px", margin: "20px" }}>
          {error}
        </p>
      )}
      <div className={styles.footer}>
        <div className={styles.content_footer}>
          {/* <button
            style={{
              color: "#4C5BD4",
              backgroundColor: "#fff",
              borderColor: "1px solid #4C5BD4",
            }}
          >
            Hủy
          </button> */}
          <button
            type="button"
            onClick={() => {
              handleSetPerssion();
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
