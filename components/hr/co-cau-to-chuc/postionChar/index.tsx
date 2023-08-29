"use client"
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import styles from '../organisationalStructureDiagram/tree/tree.module.css'
import EditPositionCharModal from './editPositonCharModal';
import DetailsPositionCharModal from './detailsPositionCharModal';
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer';
import { PostionCharData, HidePosition } from '@/pages/api/api-hr/co_cau_to_chuc';
import dynamic from 'next/dynamic';

const Tree = dynamic(() =>
  import('react-organizational-chart').then((module) => {
    return module.Tree
  }),
  { ssr: false }
);
const TreeNode = dynamic(() =>
  import('react-organizational-chart').then((module) => {
    return module.TreeNode
  }),
  { ssr: false }
);

const StyledNode = styled.div`
`;
const MemberViewBox1 = ({
  idPosition,
  text_part,
  position,
  name,
  employee_number,
  mission,
  setOpenModalDetails,
  handleUpdatePosition,
  iconEdit,
  handleHidePosition,
  nameArray

}: any) => (
  <div className={`${styles.member_view_box} ${styles.member_view_box_top_3}`} style={{ width: 330 }}>
    <div className={`${styles.member_detail}`}>
      <div className={`${styles.member_details_header}`}>
        <span style={{ color: '#474747', fontWeight: 600 }}>{text_part}</span>
        <button onClick={() => handleHidePosition(idPosition)} className={`${styles.hide_div_parent}`} style={{ fontWeight: 500, background: 'unset', fontFamily: 'Roboto', fontSize: 16, display: name ? 'none' : 'inline' }} data-id="1">(Ẩn)</button>
        {iconEdit && (
          <button className={`${styles.edit_dep}`} onClick={() => handleUpdatePosition({
            idPosition: idPosition,
            mission: mission
          })}>
            <img src={`/vn_icon-edit.svg`} />
          </button>
        )}
      </div>
      <div className={`${styles.member_details_body}`}>
        <p>{position ? position : 'Họ và tên'}: {employee_number ? employee_number : (name ? name : 'Chưa cập nhật')}</p>
        {nameArray && nameArray.map((item: any, index: any) => {
          return (
            <p>Họ và tên:{item}</p>
          )
        })}
        <p>Nhiệm vụ: {mission} <button className={`${styles.see_more}`} onClick={() => setOpenModalDetails()}>( Xem thêm )</button> </p>
      </div>
    </div>
  </div>

);

const defaultValue = { label: 'Default Option', value: 'default' };
const PostionCharTree = ({ iconEdit }) => {

  const [openModalEdit, setOpenModalEdit] = useState<any>(null)
  const [isMission, setIsMission] = useState<any>(null)
  const [openModalDetails, setOpenModalDetails] = useState(null)
  const [newData, setNewdata] = useState(false)

  const handleUpdatePosition = ({ idPosition, mission }: any) => {
    setOpenModalEdit(idPosition)
    setIsMission(mission)
  };

  const handleModalClose = () => {
    setNewdata(pre => !pre)
    setOpenModalEdit(null);
    setOpenModalDetails(null)
  };

  const [PostionCharDatas, setPosttionCharData] = useState<any>([])
  const [PostionCharDatasSlice, setPosttionCharDataSlice] = useState<any>([])
  console.log(PostionCharDatasSlice)
  console.log(PostionCharDatas);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostionCharData()
        if (response) {
          setPosttionCharDataSlice(response?.data?.data?.slice(-4))
          setPosttionCharData(response?.data?.data?.slice(0, response?.data?.data?.length - 4))
        }
      } catch (error) {
      }
    }
    fetchData()
  }, [newData])

  const handleHidePosition = async (id_position: any) => {
    try {
      const formData = new FormData()
      formData.append('position_id', id_position)
      const response = await HidePosition(formData)
      if (response) {
        handleModalClose()
      }
    } catch (error) {
      alert("Ẩn chức vụ không thành công")
    }
  }

  const renderTree = (data: any, index: any, positionCharDatasSlice: any) => {
    if (index >= data.length) {
      return null;
    }

    const positionData = data[index];

    if (index === data.length - 1) {
      // Nếu index là vị trí cuối cùng, thêm TreeNode từ PostionCharDatasSlice
      return (
        <TreeNode key={positionData.positionId} label={<StyledNode><MemberViewBox1
          idPosition={positionData.positionId}
          text_part={positionData.positionName}
          nameArray={positionData.users.slice(1)}
          name={positionData.users[0]}
          mission={positionData.mission}
          handleUpdatePosition={handleUpdatePosition}
          setOpenModalDetails={() => setOpenModalDetails(positionData.mission)}
          iconEdit={iconEdit}
          handleHidePosition={handleHidePosition}
        /></StyledNode>}>
          {renderTree(data, index + 1, positionCharDatasSlice)}
          {positionCharDatasSlice && positionCharDatasSlice.map((item: any, sliceIndex: any) => (
            <TreeNode key={sliceIndex} label={<StyledNode><MemberViewBox1
              text_part={item?.positionName}
              position='Tổng số nhân viên'
              name='0'
              employee_number={item?.tong_nv}
              mission={item?.mission}
              idPosition={item?.positionId}
              handleUpdatePosition={handleUpdatePosition}
              setOpenModalDetails={() => setOpenModalDetails(item?.mission)}
              iconEdit={iconEdit}
            /></StyledNode>}>
            </TreeNode>
          ))}
        </TreeNode>
      );
    }
    return (
      <TreeNode key={positionData.positionId} label={<StyledNode><MemberViewBox1
        idPosition={positionData.positionId}
        text_part={positionData.positionName}
        nameArray={positionData.users.slice(1)}
        name={positionData.users[0]}
        mission={positionData.mission}
        handleUpdatePosition={handleUpdatePosition}
        setOpenModalDetails={() => setOpenModalDetails(positionData.mission)}
        iconEdit={iconEdit}
        handleHidePosition={handleHidePosition}
      /></StyledNode>}>
        {renderTree(data, index + 1, positionCharDatasSlice)}
      </TreeNode>
    );
  }

  return (

    <div>
      <div className={`${styles.member_list}`}>
        <div className={`${styles.recruitment2}`}>
          <div className={`${styles.recruitment2_3}`}>
          </div>
        </div>
        <div className={`${styles.genealogy_body} ${styles.genealogy_scroll}`}>
          {typeof window === 'object' && (
            <div className={`${styles.genealogy_tree}`}>
              <Tree
                lineWidth={'2px'}
                lineColor={'#cccccc'}
                lineBorderRadius={'10px'}
                label={<StyledNode><div className={`${styles.member_view_box} ${styles.member_view_box_top}  ${styles.member_view_box_2_top} `} style={{ width: 300, height: 100 }}>
                  <div className={`${styles.member_detail}`}>
                    <div className={`${styles.member_view_box_2_top_header}`}>
                      <p className={`${styles.text_center}`}>SƠ ĐỒ CHỨC VỤ</p>
                    </div>
                  </div>
                </div></StyledNode>}
              >
                {renderTree(PostionCharDatas, 0, PostionCharDatasSlice)}
              </Tree>
            </div>
          )}
        </div>
      </div>
      {openModalEdit && <EditPositionCharModal
        idPosition={openModalEdit} mission={isMission} onCancel={handleModalClose} ></EditPositionCharModal>}
      {openModalDetails && <DetailsPositionCharModal
        mission={openModalDetails} onCancel={handleModalClose} ></DetailsPositionCharModal>}
      <BodyFrameFooter src="https://www.youtube.com/embed/_XzFBHXvNb8" />
    </div>
  )
}
export default PostionCharTree