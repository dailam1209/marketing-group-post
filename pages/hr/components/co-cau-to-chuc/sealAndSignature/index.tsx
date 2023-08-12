import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Select from 'react-select'
import styles from './sealAndSignature.module.css'
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import AddSealModal from "./addSealModal";
import { SealAndSignatureData } from "@/pages/api/co_cau_to_chuc";
import { SignatureList } from "@/pages/api/co_cau_to_chuc";
import { UploadSignature } from "@/pages/api/co_cau_to_chuc";
import { DepartmentList } from "@/pages/api/listPhongBan";
import DeleteSealUseList from "./deleteSealModal/useSealListDelete";
import DeleteSignatures from "./deleteSealModal/signatureListDelete";
import MyPagination from '@/components/pagination/Pagination';
import Head from "next/head";
import { getToken } from "@/pages/api/token";
import jwt_decode from "jwt-decode";
import GetComId from "@/components/getComID";


type SelectOptionType = { label: string, value: string }

export default function SealAndSignature({ iconAdd, iconEdit, iconDelete }: any) {

    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
    const [openModal, setOpenModal] = useState(0)
    const [currentPageSeal, setCurrentPageSeal] = useState<any>(1);
    const [currentPageSignature, setCurrentPageSignature] = useState<any>(1);
    const [useSealList, setUseSealList] = useState<any>(null)
    const [signaturelList, setSignatureList] = useState<any>(null)
    const [departmentList, setDepartmentList] = useState<any>(null)
    const [openDeleteSealList, setOpenDeleteSealList] = useState(0)
    const [openDeleteSignature, setOpenDeleteSignature] = useState(0)
    const [isEmpId, setIsEmpId] = useState<any>(null)
    const [isDep_idSeal, setIsDep_idSeal] = useState<any>("")
    const [isDep_idSignature, setIsDep_idSignature] = useState<any>("")
    const [isKeySeal, setKeySeal] = useState<any>("")
    const [isKeySignature, setKeySignature] = useState<any>("")
    const [isSeachSeal, setSearchSeal] = useState<any>(null)
    const [isSeachSignature, setSearchSignature] = useState<any>(null)

    const com_id: any = GetComId()

    // Fetch data for seal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pagesize: any = 5
                const formData = new FormData();
                formData.append('dep_id', isDep_idSeal)
                formData.append('key', isKeySeal)
                formData.append('page', currentPageSeal)
                formData.append('pageSize', pagesize)
                const response = await SealAndSignatureData(formData)
                setUseSealList(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [isSeachSeal, currentPageSeal])


    // Fetch data for signatures
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pagesize: any = 5
                const formData = new FormData();
                formData.append('dep_id', isDep_idSignature)
                formData.append('key', isKeySignature)
                formData.append('page', currentPageSignature)
                formData.append('pageSize', pagesize)
                const response = await SignatureList(formData)
                setSignatureList(response?.data)
                setIsEmpId(null)
            } catch (error) {
            }
        }
        fetchData()
    }, [isSeachSignature, currentPageSignature])


    // Fetch data for department
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData()
                formData.append('com_id', com_id)
                const response = await DepartmentList(formData)
                setDepartmentList(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    // Handle search for seals
    const handleSearchSeal = useCallback(() => {
        setSearchSeal({ isKeySeal, isDep_idSeal });
    }, [isKeySeal, isDep_idSeal]);

    // Handle search for signatures
    const handleSearchSignature = useCallback(() => {
        setSearchSignature({ isKeySignature, isDep_idSignature });
    }, [isKeySignature, isDep_idSignature]);

    // Handle file upload for signatures
    const handleUploadSignature = async (file: File) => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('empId', isEmpId);
                formData.append('signature', file);
                const response = await UploadSignature(formData);

            }
        } catch (error) {
        }
    }

    // Handle file input change
    const handleProvisionFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            handleUploadSignature(file);
        }
    };

    function handleUploadClick(event: React.MouseEvent<HTMLAnchorElement>, empId: any) {
        event.preventDefault();
        setIsEmpId(empId)
        const uploadInput = document.getElementById('upload_file') as HTMLInputElement;
        if (uploadInput) {
            uploadInput.click();
        }
    }

    function handleEditClick(event: React.MouseEvent<HTMLAnchorElement>, empId: any) {
        event.preventDefault();
        setIsEmpId(empId)
        const uploadInput = document.getElementById('edit_file') as HTMLInputElement;
        if (uploadInput) {
            uploadInput.click();
        }
    }

    const handleSelectChangeSeal = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
        if (selectedOption) {
            setIsDep_idSeal(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const handleSelectChangeSignature = (selectedOption: SelectOptionType | null) => {
        setSelectedOption(selectedOption); // Lưu giá trị đã chọn vào state selectedOption
        if (selectedOption) {
            setIsDep_idSignature(selectedOption.value); // Set giá trị đã chọn vào state setIsDep_id
        }
    };

    const handleCloseModal = () => {
        setOpenModal(0)
        setOpenDeleteSealList(0)
        setOpenDeleteSignature(0)
    }

    const handleSealPageChange = (page: number) => {
        setCurrentPageSeal(page);
    };

    const handleSignaturePageChange = (page: number) => {
        setCurrentPageSignature(page);
    };

    const chonphongbanOptions = useMemo(
        () =>
            departmentList?.data?.map((department: any) => ({
                value: department.dep_id,
                label: department.dep_name,
            })),
        [departmentList?.data]
    );


    const options = {
        chonphongban: chonphongbanOptions
    };

    const tableContentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Head>
                <title>Quyền sử dụng con dấu và mẫu chữ ký - Quản lý nhân sự - Timviec365.vn</title>
            </Head>
            <div className={`${styles.tab_content}`}>
                <div className={`${styles.tab_pane}`}>
                    <div className={`${styles.body} ${styles.body_planning}`}>
                        <div className={`${styles.recruitment}`}>
                            <div className={`${styles.body_header_left}`}>
                                <p style={{ color: '#4C5BD4', fontWeight: 600, fontSize: 14 }}>Danh sách thành viên được sử dụng con dấu công ty</p></div>
                            <div className={`${styles.body_header_left}`}>
                                {iconAdd && (
                                    <button className={`${styles.add} ${styles.add_planning}`} onClick={() => setOpenModal(1)}>
                                        <img style={{ verticalAlign: 'middle' }} src={`/add.png`} alt="" />Thêm mới
                                    </button>
                                )}
                            </div>
                        </div>
                        {openModal === 1 && <AddSealModal onCancel={handleCloseModal}></AddSealModal>}
                        {openDeleteSealList !== 0 && <DeleteSealUseList empId={openDeleteSealList} onCancel={handleCloseModal} />}
                        {openDeleteSignature !== 0 && <DeleteSignatures empId={openDeleteSignature} onCancel={handleCloseModal} />}
                        <div className={`${styles.bg_search}`}>
                            <div className={`${styles.search_new_t}`}>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <input id="emp_id" type="text" onChange={(event) => setKeySeal(event.target.value)} className={`${styles.search_date} ${styles.form_control}`} placeholder='Nhập ID nhân viên' />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeSeal}
                                        options={options.chonphongban}
                                        placeholder="Chọn phòng ban"
                                        styles={{
                                            container: (baseStyles) => ({
                                                ...baseStyles,
                                                paddingRight: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                borderColor: "#4747477a",
                                                height: "auto",
                                                fontSize: state.isFocused ? 14 : 14,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600,
                                                minHeight: 20
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                width: '87%'
                                            }),
                                            valueContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            indicatorsContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad_search}   `}>
                                    <a className={`${styles.icon_search_top} ${styles.div_search_salary} `} onClick={handleSearchSeal}>
                                        <img style={{ verticalAlign: '-webkit-baseline-middle' }} src={`/t-icon-search-n.svg`} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.member_list} ${styles.member_list_salary}`}>
                            <div className={`${styles.table_content}`} ref={tableContentRef}>
                                <table className={`${styles.table} ${styles.table_list}`} >
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>ID</th>
                                            <th>Họ và tên</th>
                                            <th>Chức vụ</th>
                                            <th>Phòng ban</th>
                                            {iconDelete && <th></th>}
                                        </tr>
                                    </thead>
                                    <tbody className={`${styles.filter_body}`}>
                                        {useSealList?.listEmpUseSignature?.length ? (
                                            useSealList?.listEmpUseSignature.map((item: any, index: any) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?._id}</td>
                                                    <td>{item?.userName}</td>
                                                    <td>{item?.namePosition}</td>
                                                    <td>{item.dep_name}</td>
                                                    {iconDelete && (
                                                        <td>
                                                            <a
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => setOpenDeleteSealList(item?._id)}
                                                                className={`${styles.btn_delete}`}
                                                            >
                                                                <img src={`/icon_delete.svg`} alt="" />
                                                            </a>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (

                                            <tr>
                                                <td colSpan={6} >Danh sách trống</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.paginations}`} style={{ display: 'block' }}>
                        <MyPagination
                            current={currentPageSeal}
                            total={useSealList?.total}
                            pageSize={5}
                            onChange={handleSealPageChange}
                        />
                    </div>
                    <div className={`${styles.body} ${styles.body_planning}`}>
                        <div className={`${styles.recruitment}`}>
                            <div className={`${styles.body_header_left}`}>
                                <p style={{ color: '#4C5BD4', fontWeight: 600, fontSize: 14 }}>Danh sách mẫu chữ kí</p></div>
                        </div>
                        <div className={`${styles.bg_search}`}>
                            <div className={`${styles.search_new_t}`}>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <input type="text" onChange={(event) => setKeySignature(event.target.value)} className={`${styles.search_date} ${styles.form_control}`} placeholder='Nhập ID nhân viên' />
                                </div>
                                <div className={`${styles.div_no_pad} ${styles.div_no_pad_planning} `}>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeSignature}
                                        options={options.chonphongban}
                                        placeholder="Chọn phòng ban"
                                        styles={{
                                            container: (baseStyles) => ({
                                                ...baseStyles,
                                                paddingRight: 50
                                            }),
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: 4,
                                                borderColor: "#4747477a",
                                                height: "auto",
                                                fontSize: state.isFocused ? 14 : 14,
                                                width: '100%',
                                                fontWeight: state.isFocused ? 600 : 600,
                                                minHeight: 20
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                width: '87%'
                                            }),
                                            valueContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            indicatorsContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                height: 33.6,
                                            }),
                                            placeholder: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#444444",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className={`${styles.div_no_pad_search}   `}>
                                    <a className={`${styles.icon_search_top} ${styles.div_search_salary} `} onClick={handleSearchSignature}>
                                        <img style={{ verticalAlign: '-webkit-baseline-middle' }} src={`/t-icon-search-n.svg`} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.member_list} ${styles.member_list_salary}`}>
                            <div className={`${styles.table_content}`} ref={tableContentRef}>
                                <table className={`${styles.table} ${styles.table_list} ${styles.table_list2} `} >
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>ID</th>
                                            <th>Họ và tên</th>
                                            <th>Chức vụ</th>
                                            <th>Phòng ban</th>
                                            <th>Mẫu chữ kí</th>
                                            {iconEdit || iconDelete ? (
                                                <th></th>
                                            ) : null}
                                        </tr>
                                    </thead>
                                    <tbody className={`${styles.filter_body}`}>
                                        {signaturelList?.infoLeaderAfter?.length ? (
                                            signaturelList?.infoLeaderAfter?.map((item: any, index: any) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?._id}</td>
                                                    <td>{item?.userName}</td>
                                                    <td>{item?.namePosition}</td>
                                                    <td>{item?.dep_name}</td>
                                                    <td>
                                                        <label className={`${styles.custom_file_upload}`}><a href="" onClick={(event) => handleUploadClick(event, item?._id)}>
                                                            {item?.linkSignature === 'Chưa cập nhật' ? (
                                                                <p>Tải lên chữ kí</p>
                                                            ) : (
                                                                <img src={item?.linkSignature} alt="" />
                                                            )}
                                                        </a></label>
                                                        <input id="upload_file" data-id="284670" accept="image/*" className={`${styles.upload_file}`} type="file" onChange={(event) => handleProvisionFileChange(event)}></input>
                                                    </td>
                                                    {iconDelete || iconEdit ? (
                                                        <td>
                                                            {iconEdit && (
                                                                <label htmlFor="" className={`${styles.edit_stamp}`} >
                                                                    <a href="" onClick={(event) => handleEditClick(event, item?._id)} style={{ paddingRight: 10 }}>
                                                                        <img src={`/icon_edit.svg`} alt="" />
                                                                    </a>
                                                                </label>
                                                            )}
                                                            <input type="file" className={`${styles.upload_file}`} id="edit_file" accept="application/pdf, image/*" onChange={(event) => handleProvisionFileChange(event)} />
                                                            {iconDelete && (
                                                                <a style={{ cursor: 'pointer' }} className={`${styles.btn_delete}`} onClick={() => setOpenDeleteSignature(item?._id)} >
                                                                    <img src={`/icon_delete.svg`} alt="" />
                                                                </a>
                                                            )}
                                                        </td>
                                                    ) : null}
                                                </tr>
                                            ))
                                        ) : (

                                            <tr>
                                                <td colSpan={6} >Danh sách trống</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.paginations}`} style={{ display: 'block' }}>
                        <MyPagination
                            current={currentPageSignature}
                            total={signaturelList?.total}
                            pageSize={5}
                            onChange={handleSignaturePageChange}
                        />
                    </div>
                    <BodyFrameFooter src="https://www.youtube.com/embed/GWoAGsEzXWg"></BodyFrameFooter>
                </div>
            </div>
        </>
    )
}