import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns'
import styles from './quy-dinh-lam-viec.module.css'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer';
import AddRegulationsModal from './addRegulationsModal';
import AddRegulationsModal2 from './addRegulationsModal/addRegulationsModal2';
import MyPagination from '@/components/hr/pagination/Pagination';
import { SpecifiedGroupList } from '@/pages/api/api-hr/quy_dinh_chinh_sach';
import { RulesByGroupList } from '@/pages/api/api-hr/quy_dinh_chinh_sach';
import GroupDetailModal from './detailReguulationModal/groupDetail';
import RegulationDetailModal from './detailReguulationModal/regulationDetail';
import UpdateRegulationsGroupsModal from './updateRegulationModal';
import DeleteRegulationGroup from './deleteRegulationModal';
import DeleteRegulation from './deleteRegulationModal/deleteRegulation';

export default function RegulationsWork({ iconAdd, iconEdit, iconDelete }) {
  const [click, setClick] = useState(false)
  const [openModal, setOpenModal] = useState(0)
  const [openDetail, setOpentDetail] = useState(0)
  const [openDetailRegulation, setOpentDetailRegulation] = useState(0)
  const [openUpdate, setOpenUpdate] = useState(0)
  const [openDelete, setOpenDelete] = useState(0)
  const [openDeleteRegulation, setOpentDeleteRegulation] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(!null)
  const [dataChild, setDataChild] = useState<any>(!null)
  const [dataChildList, setDataChildList] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [idDetail, setIdDetail] = useState(0);
  const [idDetailRegulation, setIdDetailRegulation] = useState(0);
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [idDeleteRegulation, setIdDeleteRegulation] = useState(0);
  const [keyWords, setKeyWords] = useState('')
  const [newData, setNewData] = useState(false)

  console.log(data);
  console.log(dataChildList);
  console.log(dataChild);

  const fetchData = useCallback(async () => {
    try {
      const response = await SpecifiedGroupList(10, currentPage, keyWords);
      setData(response?.success);
    } catch (error) {
    }
  }, [currentPage, keyWords, newData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const setIdParent = async (itemId: number) => {
    console.log(dataChildList)
    console.log(itemId);
    const dataChildIndex = dataChildList.findIndex((item: any) => item.id === itemId);
    console.log(dataChildIndex);
    if (dataChildIndex !== -1) {
      setDataChild(dataChildList[dataChildIndex].data);
    } else {
      try {
        const response = await RulesByGroupList(itemId);
        const dataResponse = response?.success?.data?.data
        console.log(dataResponse);
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
    setOpentDetail(0)
    setOpenUpdate(0)
    setOpenDelete(0)
    setOpentDetailRegulation(0)
    setOpentDeleteRegulation(0)
  }

  const handleOpendetail = (id: number) => {
    setOpentDetail(id)
    setIdDetail(id)
  }
  const handleOpendetailRegulation = (id: number, event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    setOpentDetailRegulation(id)
    setIdDetailRegulation(id)
  }

  const handleOpenUpdate = (id: number) => {
    setOpenUpdate(id)
    setIdUpdate(id)
  }
  const handleOpenDelete = (id: number) => {
    setOpenDelete(id)
    setIdDelete(id)
  }
  const handleOpenDeleteRegulations = (id: number, event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    setOpentDeleteRegulation(id)
    setIdDeleteRegulation(id)
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
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.tab_pane} ${styles.fade} `}>
          <div className={`${styles.recruitment2}`}>
            <div className={`${styles.recruitment2_3}`}>
              {iconAdd && (
                <button className={`${styles.adds}`} onClick={handleClick}>
                  <picture>
                    <img style={{ verticalAlign: 'middle' }} src={`/add.png`} alt="" />
                    Thêm mới
                  </picture>
                </button>
              )}
              {click === true && (<div className={`${styles.settings} ${styles.lefftset}`} >
                <li onClick={() => setOpenModal(1)}>Thêm nhóm quy định</li>
                <hr style={{ marginTop: 0, marginBottom: 0 }} />
                <li onClick={() => setOpenModal(2)}>Thêm quy định</li>
              </div>)}
              {openModal === 1 && <AddRegulationsModal onCancel={handleCloseModal}></AddRegulationsModal>}
              {openModal === 2 && <AddRegulationsModal2 onCancel={handleCloseModal}></AddRegulationsModal2>}
              {openDetail !== 0 && <GroupDetailModal idGroup={idDetail} onCancel={handleCloseModal} />}
              {openUpdate !== 0 && <UpdateRegulationsGroupsModal idGroup={idUpdate} onCancel={handleCloseModal} />}
              {openDelete !== 0 && <DeleteRegulationGroup idGroup={idDelete} onCancel={handleCloseModal} />}
              {openDetailRegulation !== 0 && <RegulationDetailModal idGroup={idDetailRegulation} onCancel={handleCloseModal} />}
              {openDeleteRegulation !== 0 && <DeleteRegulation idGroup={idDeleteRegulation} onCancel={handleCloseModal} />}
            </div>
            <div className={`${styles.recruitment2_2}`}>
              <form action="" className={`${styles.t_form_search}`}>
                <div className={`${styles.t_div_search}`}>
                  <input style={{ verticalAlign: 'top' }} onChange={(event) => setKeyWords(event.target.value)} id='search' type="text" className={`${styles.keyword_qd}`} placeholder='Tìm kiếm' />
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
            {data?.data?.total != 0 ? (
              data?.data?.data?.map((item: any, index: any) => (
                <div className={`${styles.quydinh_item} `} key={index}>
                  <div className={`${styles.quydinh_item1}`}>
                    <div className={`${styles.quydinh_item2}`} onClick={() => handleSeemore(item?.id)}>
                      <a>NQĐ - {item.name}</a>
                      <img className={`${styles.icondown}`} src="/down.png" />
                    </div>
                    <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpendetail(item.id)} >Chi tiết/</a>
                    {iconEdit && <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpenUpdate(item.id)}>Sửa/</a>}
                    {iconDelete && <a style={{ color: '#337ab7', fontWeight: 600, cursor: "pointer" }} onClick={() => handleOpenDelete(item.id)} >Xóa</a>}
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
                                  <a href="" style={{ color: '#337ab7' }} onClick={(event: any) => handleOpendetailRegulation(childItem.id, event)}>
                                    {childItem.name} (Xem chi tiết)
                                  </a>
                                </td>
                                <td>{format(new Date(childItem.created_at), 'dd/MM/yyyy')}</td>
                                <td>{childItem.created_by}</td>
                                <td>{childItem.apply_for}</td>
                                <td>
                                  <a style={{ cursor: 'pointer' }} onClick={(event: any) => handleOpenDeleteRegulations(childItem.id, event)}>
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
          <div className={`${styles.pagination}`} style={{ display: data?.data?.total != 0 ? 'block' : 'none' }}>
            <MyPagination
              current={currentPage}
              total={data && data?.data?.total}
              pageSize={10}
              onChange={handlePageChange}
            />
          </div>
          <BodyFrameFooter src='https://www.youtube.com/embed/sJfqas5wxEk'></BodyFrameFooter>
        </div>
      </div>
    </>
  )
}