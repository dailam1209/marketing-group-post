import React, { useState, useEffect } from 'react';
import styles from './chinh-sach-nhan-vien.module.css'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer';
import AddEmployeePolicyModal from './addEmployeePolicyModal';
import AddEmployeePolicyModal2 from './addEmployeePolicyModal/addEmployeePolicyModal2';
import MyPagination from '@/components/hr/pagination/Pagination';
import { format } from 'date-fns';
import { PolicyList } from '@/pages/hr/api/quy_dinh_chinh_sach';
import { PolicyByGroupList } from '@/pages/hr/api/quy_dinh_chinh_sach';
import PolicyGroupDetailModal from './detailPolicyModal/policyGroupDetail';
import UpdatePolicyGroupsModal from './updatePolicyModal/policyGroupUpdate';
import DeletePolicyGroup from './deletePolicyGroupModal/PolicyGroupDelete';
import PolicyDetailModal from './detailPolicyModal/policyDetail';
import DeletePolicys from './deletePolicyGroupModal/PolicyDelete';

export default function EmployeePolicy({ iconAdd, iconEdit, iconDelete }) {
    const [click, setClick] = useState(false)
    const [openModal, setOpenModal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any>(null)
    const [dataChild, setDataChild] = useState<any>(!null)
    const [dataChildList, setDataChildList] = useState<any>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isOpenDetailGroup, setIsOpenDetailGroup] = useState(0)
    const [isOpenUpdateGroup, setIsOpenUpdateGroup] = useState(0)
    const [isOpenDeleteGroup, setIsOpenDeleteGroup] = useState(0)
    const [isOpenDetail, setIsOpenDetail] = useState(0)
    const [isOpenDeletePolicy, setIsOpenDeletePolicy] = useState(0)
    const [isKey, setIsKey] = useState('')
    const [newData, setNewData] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PolicyList(currentPage, 5, isKey)
                setData(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [currentPage, isKey, newData])


    const setIdParent = async (itemId: number) => {
        const dataChildIndex = dataChildList.findIndex((item: any) => item.id === itemId);
        if (dataChildIndex !== -1) {
            setDataChild(dataChildList[dataChildIndex].data);
        } else {
            try {
                const response = await PolicyByGroupList(itemId);
                const dataResponse = response?.data?.data
                const updatedDataChildList = [...dataChildList, { id: itemId, data: dataResponse }];
                setDataChildList(updatedDataChildList);
                setDataChild(response?.data);
            } catch (error) {
            }
        }
    };


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleClick = () => {
        setClick(prevState => !prevState)
    }
    const handleCloseModal = () => {
        setNewData(pre => !pre)
        setOpenModal(0)
        setIsOpenDetailGroup(0)
        setIsOpenUpdateGroup(0)
        setIsOpenDeleteGroup(0)
        setIsOpenDetail(0)
        setIsOpenDeletePolicy(0)
    }

    const handleOpenPolicyGroupDetail = (idGroup: number) => {
        setIsOpenDetailGroup(idGroup)
    }

    const handleOpentPolicyGroupUpdate = (idGroup: number) => {
        setIsOpenUpdateGroup(idGroup)
    }

    const handleOpentPolicyGroupDelete = (idGroup: number) => {
        setIsOpenDeleteGroup(idGroup)
    }

    const handleOpentPolicyDelete = (idGroup: number) => {
        setIsOpenDeletePolicy(idGroup)
    }

    const handleOpentPolicyDetail = (idGroup: number) => {
        setIsOpenDetail(idGroup)
    }

    const handleSeemore = async (itemId: number) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter((id) => id !== itemId);
            } else {
                return [...prevItems, itemId];
            }
        });
        setIdParent(itemId);
    };

    return (
        <>
            <>
                <div className={`${styles.wrapper}`}>
                    <div className={`${styles.tab_pane} ${styles.fade} `}>
                        <div className={`${styles.recruitment2}`}>
                            <div className={`${styles.recruitment2_3}`}>
                                {iconAdd && (
                                    <button className={`${styles.adds}`} onClick={handleClick}>
                                        <picture>
                                            <img style={{ verticalAlign: 'middle' }} src={`	/add.png`} alt="" />
                                            Thêm mới
                                        </picture>
                                    </button>
                                )}
                                {click === true && (<div className={`${styles.settings} ${styles.lefftset}`} >
                                    <li onClick={() => setOpenModal(1)}>Thêm nhóm chính sách</li>
                                    <hr style={{ marginTop: 0, marginBottom: 0 }} />
                                    <li onClick={() => setOpenModal(2)}>Thêm chính sách</li>
                                </div>)}
                                {openModal === 1 && <AddEmployeePolicyModal onCancel={handleCloseModal}></AddEmployeePolicyModal>}
                                {openModal === 2 && <AddEmployeePolicyModal2 onCancel={handleCloseModal}></AddEmployeePolicyModal2>}
                                {isOpenDetailGroup !== 0 && <PolicyGroupDetailModal idGroup={isOpenDetailGroup} onCancel={handleCloseModal}></PolicyGroupDetailModal>}
                                {isOpenUpdateGroup !== 0 && <UpdatePolicyGroupsModal idGroup={isOpenUpdateGroup} onCancel={handleCloseModal}></UpdatePolicyGroupsModal>}
                                {isOpenDeleteGroup !== 0 && <DeletePolicyGroup idGroup={isOpenDeleteGroup} onCancel={handleCloseModal}></DeletePolicyGroup>}
                                {isOpenDetail !== 0 && <PolicyDetailModal idGroup={isOpenDetail} onCancel={handleCloseModal}></PolicyDetailModal>}
                                {isOpenDeletePolicy !== 0 && <DeletePolicys idGroup={isOpenDeletePolicy} onCancel={handleCloseModal}></DeletePolicys>}
                            </div>
                            <div className={`${styles.recruitment2_2}`}>
                                <form action="" className={`${styles.t_form_search}`}>
                                    <div className={`${styles.t_div_search}`}>
                                        <input style={{ verticalAlign: 'top' }} onChange={(event) => setIsKey(event.target.value)} type="text" className={`${styles.keyword_qd}`} placeholder='Tìm kiếm' />
                                        <a href="">
                                            <picture>
                                                <img src={`/t-icon-search.png`} alt="" />
                                            </picture>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`${styles.member_list} ${styles.regulation_item}`}>
                            {data?.tongSoBanGhi !== 0 ? (
                                data?.data?.map((item: any, index: any) => (
                                    <div className={`${styles.quydinh_item} `} key={index}>
                                        <div className={`${styles.quydinh_item1}`}>
                                            <div className={`${styles.quydinh_item2}`} onClick={() => handleSeemore(item?.id)}>
                                                <a>NCS - {item.name}</a>
                                                <img className={`${styles.icondown}`} src="/down.png" />
                                            </div>
                                            <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpenPolicyGroupDetail(item?.id)} >Chi tiết/</a>
                                            {iconEdit && <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpentPolicyGroupUpdate(item?.id)} >Sửa/</a>}
                                            {iconDelete && <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpentPolicyGroupDelete(item?.id)}>Xóa</a>}
                                        </div>
                                        <div className={`${styles.table_none}`} style={{ display: selectedItems.includes(item?.id) ? 'block' : 'none' }}>
                                            <table className={`${styles.tablelist}  ${styles.tablelist1}`}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">STT</th>
                                                        <th scope="col">Quy định</th>
                                                        <th scope="col">Ngày tạo</th>
                                                        <th scope="col">Người tạo</th>
                                                        <th scope="col">Đối tượng áp dụng</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className={`${styles.fillter}`}>
                                                    {dataChildList?.map((dataChild: any) =>
                                                        dataChild?.id === item.id ? (
                                                            dataChild?.data?.map((childItem: any, childIndex: any) => (
                                                                <tr key={childIndex}>
                                                                    <td>{childIndex + 1}</td>
                                                                    <td>
                                                                        <a style={{ color: '#337ab7', cursor: "pointer" }} onClick={() => handleOpentPolicyDetail(childItem?.id)}>
                                                                            {childItem.name} (Xem chi tiết)
                                                                        </a>
                                                                    </td>
                                                                    <td>{format(new Date(childItem.createdAt), 'dd/MM/yyyy')}</td>
                                                                    <td>{childItem.createdBy}</td>
                                                                    <td>{childItem.applyFor}</td>
                                                                    <td>
                                                                        <a style={{ cursor: 'pointer' }} onClick={() => handleOpentPolicyDelete(childItem?.id)}>
                                                                            <img src="/trash.png" />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : null
                                                    )}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                                )
                            )
                                : (
                                    <p className={`${styles.text_content}`}>Dữ liệu trống</p>
                                )}
                        </div>
                        <div className={`${styles.pagination}`} style={{ display: data?.tongSoBanGhi != 0 ? 'block' : 'none' }}>
                            <MyPagination
                                current={currentPage}
                                total={data?.tongSoBanGhi}
                                pageSize={10}
                                onChange={handlePageChange}
                            />
                        </div>
                        <BodyFrameFooter src='https://www.youtube.com/embed/sJfqas5wxEk'></BodyFrameFooter>
                    </div>
                </div>
            </>
        </>
    )
}