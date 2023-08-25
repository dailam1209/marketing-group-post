import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from '../../planningAppointment/addPlanningModal/addPlanningModal.module.css'
import Select from 'react-select';
import MyEditorNew from "@/components/hr/myEditor";
import * as Yup from "yup";
import { AddWorkingRotation } from "@/pages/api/api-hr/bien_dong_nhan_su";
import { FetchDataDep, FetchDataOrganizationalStructure, FetchDataEmployee, FetchDataPosition, FetchDataSpecifiedGroup } from "@/components/hr/util/listAll";

interface InputTextareaProps {
  onDescriptionChange: (data: any) => void
}
type SelectOptionType = { label: string, value: string }

function Input_textarea({ onDescriptionChange }: InputTextareaProps) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const extractTextFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const text = doc.querySelector("p")?.textContent || "";
    return text;
  };

  const handleEditorChange = (data: string) => {
    setData(data);
    const extractedText = extractTextFromHTML(data); // Lấy chỉ văn bản từ chuỗi HTML
    onDescriptionChange(extractedText);
  };

  return (
    <div>
      <MyEditorNew
        name="Editor"
        onChange={handleEditorChange}
        editorLoaded={editorLoaded}
        value={data}
      />
    </div>
  );
}

export default function AddWorkingModal({ onCancel }: any) {

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [isEmpList, setEmpList] = useState<any>(null)
  const [isOrganizationalStructureList, setOrganizationalStructureList] = useState<any>(null)
  const [isPositionList, setPositionList] = useState<any>(null)
  const [isSpecifiedList, setSpecifiedList] = useState<any>(null)
  const [isMission, setMission] = useState("");
  const [isNote, setNote] = useState("");
  const [infoList, setInfoList] = useState<any>(null)
  const [isDepList, setDeptList] = useState<any>(null)

  const [isCom_id, setCom_id] = useState<any>(null)
  const [isCom_idNew, setCom_idNew] = useState<any>(null)
  const [isDep_id, setDep_id] = useState<any>(null)
  const [isDep_idNew, setDep_idNew] = useState<any>(null)
  const [isTeam_idNew, setTeam_idNew] = useState<any>(null)
  const [isGroup_idNew, setGroup_idNew] = useState<any>(null)
  const [isEmp_id, setEmp_id] = useState<any>(null)
  const [isPosition_id, setPosition_id] = useState<any>(null)
  const [isPosition_idNew, setPosition_idNew] = useState<any>(null)
  const [isSpecified_id, setSpecified_id] = useState<any>("")
  const [errors, setErrors] = useState<any>({});
  const modalRef = useRef(null);

  console.log(isOrganizationalStructureList);


  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel()
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onCancel]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const organizationStructure = await FetchDataOrganizationalStructure();
      setOrganizationalStructureList(organizationStructure);

      const empData = await FetchDataEmployee();
      setEmpList(empData);

      const dep = await FetchDataDep()
      setDeptList(dep)

      const position = await FetchDataPosition()
      setPositionList(position)

      const specifiedGroup = await FetchDataSpecifiedGroup()
      setSpecifiedList(specifiedGroup?.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (infoList) {
      const valuesArray = infoList?.split(" ");
      if (valuesArray.length >= 4) {
        const depValue = valuesArray?.slice(3).join(" ");
        setEmp_id(Number(valuesArray[0]));
        setDep_id(Number(valuesArray[1]));
        setPosition_id(Number(valuesArray[2]));
      }
    }
  }, [infoList]);

  useEffect(() => {
    const foundItem = isDepList?.items?.find((item: any) => item.dep_id === isDep_id);
    if (foundItem) {
      setCom_id(foundItem.com_id)
    }
  }, [isDep_id])

  const validationSchema = Yup.object().shape({
    chonnhanvien: Yup.string().required("Vui lòng chọn nhân viên"),
    donvicongtacmoi: Yup.string().required("Vui lòng chọn đơn vị công tác mới"),
    phongbanmoi: Yup.string().required("Vui lòng chọn phòng ban mới"),
    chucvuhientai: Yup.string().required("Vui lòng chọn chức vụ hiện tại"),
    chucvumoi: Yup.string().required("Vui lòng chọn chức vụ mới"),
    created_at: Yup.string().required("Vui lòng chọn thời gian luân chuyển công tác"),
    mission: Yup.string().required("Vui lòng nhập nhiệm vụ"),
  });

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const formDatas = {
        chonnhanvien: selectedOption?.value || "",
        donvicongtacmoi: isCom_idNew || "",
        phongbanmoi: isDep_idNew || "",
        chucvuhientai: isPosition_id || "",
        chucvumoi: isPosition_idNew || "",
        created_at: (document.getElementById('created_at') as HTMLInputElement)?.value || "",
        mission: isMission || "",
      };

      await validationSchema.validate(formDatas, {
        abortEarly: false,
      });

      const created_at = (document.getElementById('created_at') as HTMLInputElement)?.value
      const formData = new FormData();
      formData.append('ep_id', isEmp_id)
      formData.append('current_position', isPosition_id)
      formData.append('current_dep_id', isDep_id)
      formData.append('created_at', created_at)
      formData.append('com_id', isCom_id)
      formData.append('new_com_id', isCom_idNew)
      formData.append('decision_id', isSpecified_id)
      formData.append('update_position', isPosition_idNew)
      formData.append('update_dep_id', isDep_idNew)
      formData.append('new_team_id', isTeam_idNew)
      formData.append('new_group_id', isGroup_idNew)
      formData.append('mission', isMission)
      formData.append('note', isNote)

      const response = await AddWorkingRotation(formData)
      if (response) {
        onCancel()
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((yupError: any) => {
          yupErrors[yupError.path] = yupError.message;
        });
        setErrors(yupErrors);
      } else {
        console.error("Lỗi validate form:", error);
      }
    }
  }

  const handleSelectChange = (selectedOption: SelectOptionType | null, setState: any) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setState(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
    }
  };

  const handleInputAreaChange = (data: string, setState: any) => {
    setState(data);
  };

  console.log(isOrganizationalStructureList);


  const companyNames: any = [];
  const companyNamesNew: any = [];
  if (isOrganizationalStructureList?.infoCompany) {
    companyNames.push({ key: isOrganizationalStructureList?.infoCompany?.companyName, value: isOrganizationalStructureList?.infoCompany?.parent_com_id });
    for (const company of isOrganizationalStructureList?.infoCompany?.infoChildCompany) {
      companyNames.push({ key: company.com_name, value: company.com_id });
      companyNamesNew.push({ key: company.com_name, value: company.com_id });
    }
  }

  const depInfoArray: any = [];
  const depInfoArrayNew: any = [];
  const teamInfoArray: any = [];
  function isValidComId(com_id: any) {
    return isOrganizationalStructureList?.infoCompany?.parent_com_id === com_id ||
      isOrganizationalStructureList?.infoChildCompany?.some(company => company.com_id === com_id);
  }

  if (isOrganizationalStructureList?.infoCompany) {
    for (const infoDep of isOrganizationalStructureList?.infoCompany?.infoDep) {
      if (isValidComId(isCom_id)) {
        depInfoArray.push({
          dep_name: infoDep.dep_name,
          dep_id: infoDep.dep_id
        });
      }
    }
  }

  if (isOrganizationalStructureList?.infoCompany) {
    for (const infoDep of isOrganizationalStructureList?.infoCompany?.infoDep) {
      if (isValidComId(isCom_idNew)) {
        depInfoArrayNew.push({
          dep_name: infoDep.dep_name,
          dep_id: infoDep.dep_id
        });
      }
    }
  }

  function getTeamInfoByDepId(dep_id: any) {
    const teamInfoArray: any = [];

    if (isOrganizationalStructureList?.infoCompany) {
      const selectedDep = isOrganizationalStructureList.infoCompany.infoDep.find((infoDep: any) => infoDep.dep_id === dep_id);

      if (selectedDep) {
        for (const infoTeam of selectedDep.infoTeam) {
          teamInfoArray.push({
            gr_id: infoTeam.gr_id,
            gr_name: infoTeam.gr_name
          });
        }
      }
    }
    return teamInfoArray;
  }
  const teamInfo = getTeamInfoByDepId(isDep_idNew);

  function getGroupInfoByTeamId(team_id: any) {
    const groupInfoArray: any = [];

    if (isOrganizationalStructureList?.infoCompany) {
      for (const infoDep of isOrganizationalStructureList?.infoCompany?.infoDep) {
        for (const infoTeam of infoDep?.infoTeam) {
          if (infoTeam.gr_id === team_id) {
            for (const infoGroup of infoTeam.infoGroup) {
              groupInfoArray.push({
                gr_id: infoGroup.gr_id,
                gr_name: infoGroup.gr_name
              });
            }
          }
        }
      }
    }

    return groupInfoArray;
  }

  const groupInfo = getGroupInfoByTeamId(isTeam_idNew);

  const chonchinhanhOptions = useMemo(
    () =>
      companyNames && companyNames?.map((organizational: any) => ({
        value: organizational.value,
        label: organizational.key,
      })),
    [companyNames]
  );

  const chonphongbanOptions = useMemo(
    () =>
      depInfoArray && depInfoArray?.map((dep: any) => ({
        value: dep.dep_id,
        label: dep.dep_name,
      })),
    [depInfoArray]
  );

  const chonphongbanmoiOptions = useMemo(
    () =>
      depInfoArrayNew && depInfoArrayNew?.map((dep: any) => ({
        value: dep.dep_id,
        label: dep.dep_name,
      })),
    [depInfoArrayNew]
  );

  const chontotheophongbanOptions = useMemo(
    () =>
      teamInfo && teamInfo?.map((team: any) => ({
        value: team.gr_id,
        label: team.gr_name,
      })),
    [depInfoArrayNew]
  );

  const chonnhomtheotoOptions = useMemo(
    () =>
      groupInfo && groupInfo?.map((group: any) => ({
        group: group.gr_id,
        label: group.gr_name,
      })),
    [depInfoArrayNew]
  );

  const chonnhanvientheophongOptions = useMemo(
    () =>
      isEmpList &&
      isEmpList?.items
        .filter((emp: any) => emp?.dep_id === isDep_id)
        .map((emp: any) => ({
          value: `${emp.ep_id} ${emp.dep_id} ${emp.position_id} ${emp.dep_name}`,
          label: emp.ep_name
        })),
    [isEmpList, isDep_id]
  );

  console.log(isDep_id);
  console.log(chonnhanvientheophongOptions);


  const chonnhanvienOptions = useMemo(
    () =>
      isEmpList &&
      isEmpList?.items.map((emp: any) => ({
        value: `${emp.ep_id} ${emp.dep_id} ${emp.position_id} ${emp.dep_name}`,
        label: emp.ep_name
      })),
    [isEmpList, isDep_id]
  );

  const PositionList = isPositionList?.data?.flat();
  const PositionInfoArray: any = [];

  if (PositionList) {
    const employee = isEmpList?.items?.find((emp: any) => emp.ep_id === isEmp_id);
    if (employee && Array.isArray(PositionList)) {
      const position_id = employee.position_id;
      const position = PositionList.find((pos: any) => pos.positionId === position_id);
      if (position) {
        PositionInfoArray.push({
          pos_name: position.positionName,
          pos_id: position.positionId
        });
      }
    }
  }

  const chonchucvuOptions = useMemo(
    () =>
      PositionInfoArray &&
      PositionInfoArray?.map((pos: any) => ({
        value: pos.pos_id,
        label: pos.pos_name
      })),
    [PositionInfoArray]
  );

  const chonchucvumoiOptions = useMemo(
    () =>
      PositionList &&
      PositionList?.map((pos: any) => ({
        value: pos.positionId,
        label: pos.positionName
      })),
    [PositionList]
  );

  const chonquydinhOptions = useMemo(
    () =>
      isSpecifiedList &&
      isSpecifiedList?.data?.map((spe: any) => ({
        value: spe.id,
        label: spe.name
      })),
    [isSpecifiedList]
  );

  const options = {
    chonchinhanh: chonchinhanhOptions,
    chonphongban: chonphongbanOptions,
    chonnhanvien: chonnhanvientheophongOptions,
    chucvuhientai: chonchucvuOptions,
    donvicongtacmoi: chonchinhanhOptions,
    phongbanmoi: chonphongbanmoiOptions,
    to: chontotheophongbanOptions,
    nhom: chonnhomtheotoOptions,
    chucvumoi: chonchucvumoiOptions,
    chonquydinh: chonquydinhOptions,
  };

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div className={`${styles.modal} ${styles.fade} ${styles.in}`}>
          <div className={` ${styles.modal_dialog} ${styles.content_process}`}>
            <div className={`${styles.modal_content}`} ref={modalRef}>
              <div className={`${styles.modal_header} ${styles.header_process}`}>
                <h5 className={`${styles.modal_tittle}`}>THÊM MỚI LUÂN PHIÊN CÔNG TÁC</h5>
              </div>
              <div className={`${styles.modal_body}`}>
                <form action="">
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Đơn vị công tác hiện tại</label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setCom_id)}
                        options={options.chonchinhanh}
                        placeholder="Chọn chi nhánh"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            color: state.isFocused ? '#444444' : '#444444',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Phòng ban hiện tại </label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setDep_id)}
                        options={options.chonphongban}
                        placeholder="Chọn phòng ban"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Tên nhân viên <span style={{ color: 'red' }}> *
                      <span> {errors.chonnhanvien && <div className={`${styles.t_require} `}>{errors.chonnhanvien}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setInfoList)}
                        options={options.chonnhanvien}
                        placeholder="Chọn nhân viên"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Chức vụ hiện tại <span style={{ color: 'red' }}> *
                      <span> {errors.chucvuhientai && <div className={`${styles.t_require} `}>{errors.chucvuhientai}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setPosition_id)}
                        options={options.chucvuhientai}
                        placeholder="Chọn chức vụ"
                        value={options.chucvuhientai}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Đơn vị công tác mới <span style={{ color: 'red' }}> *
                      <span> {errors.donvicongtacmoi && <div className={`${styles.t_require} `}>{errors.donvicongtacmoi}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setCom_idNew)}
                        options={options.chonchinhanh}
                        placeholder="Chọn chi nhánh"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Phòng ban mới <span style={{ color: 'red' }}> *
                      <span> {errors.phongbanmoi && <div className={`${styles.t_require} `}>{errors.phongbanmoi}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setDep_idNew)}
                        options={options.phongbanmoi}
                        placeholder="Chọn phòng ban"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Tổ </label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setTeam_idNew)}
                        options={options.to}
                        placeholder="Chọn tổ"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Nhóm </label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setGroup_idNew)}
                        options={options.nhom}
                        placeholder="Chọn nhóm"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                          menu: (baseStyles) => ({
                            ...baseStyles,
                            zIndex: 1000
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Chức vụ mới <span style={{ color: 'red' }}> *
                      <span> {errors.chucvumoi && <div className={`${styles.t_require} `}>{errors.chucvumoi}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setPosition_idNew)}
                        options={options.chucvumoi}
                        placeholder="Chọn chức vụ"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                          menu: (baseStyles) => ({
                            ...baseStyles,
                            zIndex: 1000
                          }),
                        }}
                      />
                    </div>
                  </div>

                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Thời gian luân chuyển công tác <span style={{ color: 'red' }}> *
                      <span> {errors.created_at && <div className={`${styles.t_require} `}>{errors.created_at}</div>}</span>
                    </span></label>
                    <div className={`${styles.input_right}`}>
                      <input type="date" id="created_at" placeholder="dd/mm/yyyy" className={`${styles.input_process}`} />
                    </div>
                  </div>
                  <div className={`${styles.form_groups}`}>
                    <label htmlFor="">Chọn quy định </label>
                    <div className={`${styles.input_right}`}>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(option) => handleSelectChange(option, setSpecified_id)}
                        options={options.chonquydinh}
                        placeholder="Chọn quy định"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: 4,
                            fontSize: state.isFocused ? 14 : 14,
                            minHeight: state.isFocused ? 20 : 20,
                            width: '100%',
                            fontWeight: state.isFocused ? 600 : 600
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: "#444444",
                          }),
                          menu: (baseStyles) => ({
                            ...baseStyles,
                            zIndex: 1000
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className={`${styles.form_groups} ${styles.cke}`}>
                    <label htmlFor="">Nhiệm vụ công việc mới <span style={{ color: 'red' }}> *
                      <span> {errors.mission && <div className={`${styles.t_require} `}>{errors.mission}</div>}</span>
                    </span></label>
                    <div className={`${styles.ckeditor}`}>
                      <Input_textarea onDescriptionChange={(data) => handleInputAreaChange(data, setMission)} />
                    </div>
                  </div>
                  <div className={`${styles.form_groups} ${styles.cke}`}>
                    <label htmlFor="">Ghi chú</label>
                    <div className={`${styles.ckeditor}`}>
                      <Input_textarea onDescriptionChange={(data) => handleInputAreaChange(data, setNote)} />
                    </div>
                  </div>
                  <div className={`${styles.modal_footer} ${styles.footer_process}`}>
                    <button className={`${styles.btn_cancel}`} onClick={onCancel}>Hủy</button>
                    <button className={`${styles.btn_add}`} onClick={handleSubmit}>Thêm</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}