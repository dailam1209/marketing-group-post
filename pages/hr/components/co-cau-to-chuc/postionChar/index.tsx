"use client"
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import styles from '../organisationalStructureDiagram/tree/tree.module.css'
import EditPositionCharModal from './editPositonCharModal';
import DetailsPositionCharModal from './detailsPositionCharModal';
import BodyFrameFooter from '@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer';
import { PostionCharData } from '@/pages/api/co_cau_to_chuc';

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
    name1,
    name2,
    name3,
    employee_number,
    mission,
    setOpenModalDetails,
    handleUpdatePosition,
    iconEdit

}: any) => (
    <div className={`${styles.member_view_box} ${styles.member_view_box_top_3}`} style={{ width: 330 }}>
        <div className={`${styles.member_detail}`}>
            <div className={`${styles.member_details_header}`}>
                <span style={{ color: '#474747', fontWeight: 600 }}>{text_part}</span>
                <button className={`${styles.hide_div_parent}`} style={{ fontWeight: 500, background: 'unset', fontFamily: 'Roboto', fontSize: 16, display: name || name1 || name2 || name3 ? 'none' : 'inline' }} data-id="1">(Ẩn)</button>
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
                {name1 && <p>Họ và tên: {name1}</p>}
                {name2 && <p>Họ và tên: {name2}</p>}
                {name3 && <p>Họ và tên: {name3}</p>}
                <p>Nhiệm vụ: {mission} <button className={`${styles.see_more}`} onClick={() => setOpenModalDetails()}>( Xem thêm )</button> </p>
            </div>
        </div>
    </div>

);

const defaultValue = { label: 'Default Option', value: 'default' };
const PostionCharTree = ({ iconEdit }) => {

    const [openModalEdit, setOpenModalEdit] = useState<any>(null)
    const [isMission, setIsMission] = useState<any>(null)
    const [openModalDetails, setOpenModalDetails] = useState('')

    const handleUpdatePosition = ({ idPosition, mission }: any) => {
        setOpenModalEdit(idPosition)
        setIsMission(mission)
    };

    const handleModalClose = () => {
        setOpenModalEdit(0);
        setOpenModalDetails('')
    };

    const [PostionCharDatas, setPosttionCharData] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PostionCharData()
                setPosttionCharData(response?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

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
                                {PostionCharDatas?.data[0] &&
                                    <TreeNode label={<StyledNode><MemberViewBox1
                                        idPosition={PostionCharDatas?.data[0]?.positionId}
                                        text_part={PostionCharDatas?.data[0]?.positionName}
                                        name={PostionCharDatas?.data[0]?.users[0]}
                                        name1={PostionCharDatas?.data[0]?.users[1]}
                                        name2={PostionCharDatas?.data[0]?.users[2]}
                                        name3={PostionCharDatas?.data[0]?.users[3]}
                                        mission={PostionCharDatas?.data[0]?.mission}
                                        handleUpdatePosition={handleUpdatePosition}
                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[0]?.mission)}
                                        iconEdit={iconEdit}
                                    /></StyledNode>}>
                                        {PostionCharDatas?.data[1] &&
                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                idPosition={PostionCharDatas?.data[1]?.positionId}
                                                text_part={PostionCharDatas?.data[1]?.positionName}
                                                name={PostionCharDatas?.data[1]?.users[0]}
                                                name1={PostionCharDatas?.data[1]?.users[1]}
                                                name2={PostionCharDatas?.data[1]?.users[2]}
                                                name3={PostionCharDatas?.data[1]?.users[3]}
                                                mission={PostionCharDatas?.data[1]?.mission}
                                                handleUpdatePosition={handleUpdatePosition}
                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[1]?.mission)}
                                                iconEdit={iconEdit}

                                            /></StyledNode>}>
                                                {PostionCharDatas?.data[2] &&
                                                    <TreeNode label={<StyledNode><MemberViewBox1

                                                        text_part={PostionCharDatas?.data[2]?.positionName}
                                                        position='Trưởng phòng'
                                                        name={PostionCharDatas?.data[2]?.users[0]}
                                                        name1={PostionCharDatas?.data[2]?.users[1]}
                                                        name2={PostionCharDatas?.data[2]?.users[2]}
                                                        name3={PostionCharDatas?.data[2]?.users[3]}
                                                        idPosition={PostionCharDatas?.data[2]?.positionId}
                                                        mission={PostionCharDatas?.data[2]?.mission}
                                                        handleUpdatePosition={handleUpdatePosition}
                                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[2]?.mission)}
                                                        iconEdit={iconEdit}

                                                    /></StyledNode>}>
                                                        {PostionCharDatas?.data[3] &&
                                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                                text_part={PostionCharDatas?.data[3]?.positionName}
                                                                name={PostionCharDatas?.data[3]?.users[0]}
                                                                name1={PostionCharDatas?.data[3]?.users[1]}
                                                                name2={PostionCharDatas?.data[3]?.users[2]}
                                                                name3={PostionCharDatas?.data[3]?.users[3]}
                                                                idPosition={PostionCharDatas?.data[3]?.positionId}
                                                                mission={PostionCharDatas?.data[3]?.mission}
                                                                handleUpdatePosition={handleUpdatePosition}
                                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[3]?.mission)}
                                                                iconEdit={iconEdit}

                                                            /></StyledNode>}>
                                                                {PostionCharDatas?.data[4] &&
                                                                    <TreeNode label={<StyledNode><MemberViewBox1
                                                                        text_part={PostionCharDatas?.data[4]?.positionName}
                                                                        name={PostionCharDatas?.data[4]?.users[0]}
                                                                        name1={PostionCharDatas?.data[4]?.users[1]}
                                                                        name2={PostionCharDatas?.data[4]?.users[2]}
                                                                        name3={PostionCharDatas?.data[4]?.users[3]}
                                                                        idPosition={PostionCharDatas?.data[4]?.positionId}
                                                                        mission={PostionCharDatas?.data[4]?.mission}
                                                                        handleUpdatePosition={handleUpdatePosition}
                                                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[4]?.mission)}
                                                                        iconEdit={iconEdit}

                                                                    /></StyledNode>}>
                                                                        {PostionCharDatas?.data[5] &&
                                                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                                                text_part={PostionCharDatas?.data[5]?.positionName}
                                                                                name={PostionCharDatas?.data[5]?.users[0]}
                                                                                name1={PostionCharDatas?.data[5]?.users[1]}
                                                                                name2={PostionCharDatas?.data[5]?.users[2]}
                                                                                name3={PostionCharDatas?.data[5]?.users[3]}
                                                                                idPosition={PostionCharDatas?.data[5]?.positionId}
                                                                                mission={PostionCharDatas?.data[5]?.mission}
                                                                                handleUpdatePosition={handleUpdatePosition}
                                                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[5]?.mission)}
                                                                                iconEdit={iconEdit}

                                                                            /></StyledNode>}>
                                                                                {PostionCharDatas?.data[6] &&
                                                                                    <TreeNode label={<StyledNode><MemberViewBox1
                                                                                        text_part={PostionCharDatas?.data[6]?.positionName}
                                                                                        name={PostionCharDatas?.data[6]?.users[0]}
                                                                                        name1={PostionCharDatas?.data[6]?.users[1]}
                                                                                        name2={PostionCharDatas?.data[6]?.users[2]}
                                                                                        name3={PostionCharDatas?.data[6]?.users[3]}
                                                                                        idPosition={PostionCharDatas?.data[6]?.positionId}
                                                                                        mission={PostionCharDatas?.data[6]?.mission}
                                                                                        handleUpdatePosition={handleUpdatePosition}
                                                                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[6]?.mission)}
                                                                                        iconEdit={iconEdit}

                                                                                    /></StyledNode>}>
                                                                                        {PostionCharDatas?.data[7] &&
                                                                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                                                                text_part={PostionCharDatas?.data[7]?.positionName}
                                                                                                name={PostionCharDatas?.data[7]?.users[0]}
                                                                                                name1={PostionCharDatas?.data[7]?.users[1]}
                                                                                                name2={PostionCharDatas?.data[7]?.users[2]}
                                                                                                name3={PostionCharDatas?.data[7]?.users[3]}
                                                                                                idPosition={PostionCharDatas?.data[7]?.positionId}
                                                                                                mission={PostionCharDatas?.data[7]?.mission}
                                                                                                handleUpdatePosition={handleUpdatePosition}
                                                                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[7]?.mission)}
                                                                                                iconEdit={iconEdit}

                                                                                            /></StyledNode>}>
                                                                                                {PostionCharDatas?.data[8] &&
                                                                                                    <TreeNode label={<StyledNode><MemberViewBox1
                                                                                                        text_part={PostionCharDatas?.data[8]?.positionName}
                                                                                                        name={PostionCharDatas?.data[8]?.users[0]}
                                                                                                        name1={PostionCharDatas?.data[8]?.users[1]}
                                                                                                        name2={PostionCharDatas?.data[8]?.users[2]}
                                                                                                        name3={PostionCharDatas?.data[8]?.users[3]}
                                                                                                        idPosition={PostionCharDatas?.data[8]?.positionId}
                                                                                                        mission={PostionCharDatas?.data[8]?.mission}
                                                                                                        handleUpdatePosition={handleUpdatePosition}
                                                                                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[8]?.mission)}
                                                                                                        iconEdit={iconEdit}

                                                                                                    /></StyledNode>}>
                                                                                                        {PostionCharDatas?.data[9] &&
                                                                                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                                                                                text_part={PostionCharDatas?.data[9]?.positionName}
                                                                                                                name={PostionCharDatas?.data[9]?.users[0]}
                                                                                                                name1={PostionCharDatas?.data[9]?.users[1]}
                                                                                                                name2={PostionCharDatas?.data[9]?.users[2]}
                                                                                                                name3={PostionCharDatas?.data[9]?.users[3]}
                                                                                                                idPosition={PostionCharDatas?.data[9]?.positionId}
                                                                                                                mission={PostionCharDatas?.data[9]?.mission}
                                                                                                                handleUpdatePosition={handleUpdatePosition}
                                                                                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[9]?.mission)}
                                                                                                                iconEdit={iconEdit}

                                                                                                            /></StyledNode>}>
                                                                                                                {PostionCharDatas?.data[10] &&
                                                                                                                    <TreeNode label={<StyledNode><MemberViewBox1
                                                                                                                        text_part={PostionCharDatas?.data[10]?.positionName}
                                                                                                                        name={PostionCharDatas?.data[10]?.users[0]}
                                                                                                                        name1={PostionCharDatas?.data[10]?.users[1]}
                                                                                                                        name2={PostionCharDatas?.data[10]?.users[2]}
                                                                                                                        name3={PostionCharDatas?.data[10]?.users[3]}
                                                                                                                        idPosition={PostionCharDatas?.data[10]?.positionId}
                                                                                                                        mission={PostionCharDatas?.data[10]?.mission}
                                                                                                                        handleUpdatePosition={handleUpdatePosition}
                                                                                                                        setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[10]?.mission)}
                                                                                                                        iconEdit={iconEdit}

                                                                                                                    /></StyledNode>}>
                                                                                                                        {PostionCharDatas?.data[11] &&
                                                                                                                            <TreeNode label={<StyledNode><MemberViewBox1
                                                                                                                                text_part={PostionCharDatas?.data[11]?.positionName}
                                                                                                                                name={PostionCharDatas?.data[11]?.users[0]}
                                                                                                                                name1={PostionCharDatas?.data[11]?.users[1]}
                                                                                                                                name2={PostionCharDatas?.data[11]?.users[2]}
                                                                                                                                name3={PostionCharDatas?.data[11]?.users[3]}
                                                                                                                                idPosition={PostionCharDatas?.data[11]?.positionId}
                                                                                                                                mission={PostionCharDatas?.data[11]?.mission}
                                                                                                                                handleUpdatePosition={handleUpdatePosition}
                                                                                                                                setOpenModalDetails={() => setOpenModalDetails(PostionCharDatas?.data[11]?.mission)}
                                                                                                                                iconEdit={iconEdit}

                                                                                                                            /></StyledNode>}>
                                                                                                                                {PostionCharDatas?.data[PostionCharDatas?.data?.length - 1]?.map((item: any, index: any) => {
                                                                                                                                    return (
                                                                                                                                        <TreeNode key={index} label={<StyledNode><MemberViewBox1
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
                                                                                                                                    )
                                                                                                                                })}
                                                                                                                            </TreeNode>
                                                                                                                        }
                                                                                                                    </TreeNode>
                                                                                                                }
                                                                                                            </TreeNode>
                                                                                                        }
                                                                                                    </TreeNode>
                                                                                                }

                                                                                            </TreeNode>
                                                                                        }

                                                                                    </TreeNode>
                                                                                }

                                                                            </TreeNode>
                                                                        }

                                                                    </TreeNode>
                                                                }

                                                            </TreeNode>
                                                        }

                                                    </TreeNode>
                                                }

                                            </TreeNode>
                                        }

                                    </TreeNode>
                                }
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