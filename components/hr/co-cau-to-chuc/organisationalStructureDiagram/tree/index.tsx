import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import styles from './tree.module.css'
import EditRoomModal from './room/editRoomModal'
import EditNestModal from './nest/editNestModal'
import EditGroupModal from './group/editGroupModal'
import DetailsRoomModal from './room/detailRoomModal/detailRoomModal'
import DetailsNestModal from './nest/detailNestModal'
import DetailsGroupModal from './group/detailGroupModal'
import { OrganizationalStructureData } from '@/pages/api/api-hr/co_cau_to_chuc'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import GetComId from '@/components/hr/getComID'

const Tree = dynamic(
  () =>
    import('react-organizational-chart').then((module) => {
      return module.Tree
    }),
  { ssr: false }
)
const TreeNode = dynamic(
  () =>
    import('react-organizational-chart').then((module) => {
      return module.TreeNode
    }),
  { ssr: false }
)

const StyledNode = styled.div``
const MemberViewBoxRoom = ({
  idRoom,
  text_part,
  describe,
  manager,
  deputy,
  employeeLink,
  checkInLink,
  absenceLink,
  employeeNumber,
  registered,
  noAttendance,
  setOpenModalEdit,
  handleDataUpdateRoom,
  setOpenModalDetails,
  iconEdit,
  handleClickDetail,
}: any) => (
  <div
    className={`${styles.member_view_box} ${styles.member_view_box_top_3}`}
    style={{ display: 'flex', width: 'inherit' }}>
    <div className={`${styles.member_detail}`} style={{ width: '100%' }}>
      <div className={`${styles.member_details_header}`}>
        <span style={{ color: '#474747', fontWeight: 600 }}>{text_part}</span>
        {iconEdit && (
          <button
            className={`${styles.edit_dep}`}
            onClick={() =>
              handleDataUpdateRoom({
                dep_id: idRoom,
                dep_name: text_part,
                manager,
                deputy,
                total_emp: employeeNumber,
                description: describe,
              })
            }>
            <img src={`/vn_icon-edit.svg`} />
          </button>
        )}
      </div>
      <div className={`${styles.member_details_body}`}>
        <p>
          Mô tả: {describe}{' '}
          <button
            className={`${styles.see_more}`}
            onClick={() => setOpenModalDetails()}>
            ( Chi tiết )
          </button>
        </p>
        <p>Trưởng phòng: {manager}</p>
        <p>Phó phòng: {deputy}</p>
        <a
          href=''
          onClick={(event) => handleClickDetail(employeeLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên: {employeeNumber}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(checkInLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên đã điểm danh: {registered}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(absenceLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên chưa điểm danh: {noAttendance}
        </a>
      </div>
    </div>
  </div>
)
const MemberViewBoxNest = ({
  gr_id,
  text_part,
  dep_name,
  describe,
  leader,
  deputy_leader,
  employeeLink,
  checkInLink,
  absenceLink,
  employeeNumber,
  registered,
  noAttendance,
  setOpenModalEditNest,
  setOpenModalDetailsNest,
  handleDataUpdateNest,
  iconEdit,
  handleClickDetail,
}: any) => (
  <div
    className={`${styles.member_view_box} ${styles.member_view_box_top_3}`}
    style={{ display: 'flex', width: 'inherit' }}>
    <div className={`${styles.member_detail}`} style={{ width: '100%' }}>
      <div className={`${styles.member_details_header}`}>
        <span style={{ color: '#474747', fontWeight: 600 }}>{text_part}</span>
        {iconEdit && (
          <button
            className={`${styles.edit_dep}`}
            onClick={() =>
              handleDataUpdateNest({
                dep_name: dep_name,
                gr_id: gr_id,
                gr_name: text_part,
                description: describe,
              })
            }>
            <img src={`/vn_icon-edit.svg`} />
          </button>
        )}
      </div>
      <div className={`${styles.member_details_body}`}>
        <p>
          Mô tả: {describe}{' '}
          <button
            className={`${styles.see_more}`}
            onClick={() => setOpenModalDetailsNest()}>
            ( Chi tiết )
          </button>
        </p>
        <p>Tổ trưởng: {leader}</p>
        <p>Phó tổ trưởng: {deputy_leader}</p>
        <a
          href=''
          onClick={(event) => handleClickDetail(employeeLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên: {employeeNumber}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(checkInLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên đã điểm danh: {registered}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(absenceLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên chưa điểm danh: {noAttendance}
        </a>
      </div>
    </div>
  </div>
)

const MemberViewBoxGroup = ({
  dep_name,
  nest_name,
  gr_id,
  text_part,
  describe,
  group_captain,
  deputy_group_captain,
  employeeLink,
  checkInLink,
  absenceLink,
  employeeNumber,
  registered,
  noAttendance,
  setOpenModalEditGroup,
  setOpenModalDetailsGroup,
  handleDataUpdateGroup,
  iconEdit,
  handleClickDetail,
}: any) => (
  <div
    className={`${styles.member_view_box} ${styles.member_view_box_top_3}`}
    style={{ display: 'flex', width: 'inherit' }}>
    <div className={`${styles.member_detail}`} style={{ width: '100%' }}>
      <div className={`${styles.member_details_header}`}>
        <span style={{ color: '#474747', fontWeight: 600 }}>{text_part}</span>
        {iconEdit && (
          <button
            className={`${styles.edit_dep}`}
            onClick={() =>
              handleDataUpdateGroup({
                dep_name: dep_name,
                gr_id: gr_id,
                nest_name: nest_name,
                gr_name: text_part,
                description: describe,
              })
            }>
            <img src={`/vn_icon-edit.svg`} />
          </button>
        )}
      </div>
      <div className={`${styles.member_details_body}`}>
        <p>
          Mô tả: {describe}{' '}
          <button
            className={`${styles.see_more}`}
            onClick={() => setOpenModalDetailsGroup()}>
            ( Chi tiết )
          </button>
        </p>
        <p>Trưởng nhóm: {group_captain}</p>
        <p>Phó nhóm: {deputy_group_captain}</p>
        <a
          href=''
          onClick={(event) => handleClickDetail(employeeLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên: {employeeNumber}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(checkInLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên đã điểm danh: {registered}
        </a>
        <a
          href=''
          onClick={(event) => handleClickDetail(absenceLink, event)}
          target='_blank'
          rel='noreferrer'
          className={`${styles.link_a_2}`}>
          Số nhân viên chưa điểm danh: {noAttendance}
        </a>
      </div>
    </div>
  </div>
)
const MemberViewBoxCompany = ({
  text_part,
  describe,
  CEO,
  deputy_CEO,
  employeeLink,
  checkInLink,
  absenceLink,
  employeeNumber,
  registered,
  noAttendance,
  handleClickDetail,
}: any) => (
  <div
    className={`${styles.member_view_box} ${styles.member_view_box_top_2}`}
    style={{ display: 'flex', width: 'inherit' }}>
    <div className={`${styles.member_detail}`} style={{ width: '100%' }}>
      <p>{text_part}</p>
      <span className={`${styles.text_ita}`}>({describe})</span>
      <p>Giám đốc: {CEO ? CEO : "Chưa cập nhật"}</p>
      <p>Phó giám đốc: {deputy_CEO ? deputy_CEO : "Chưa cập nhật"}</p>
      <a
        href=''
        onClick={(event) => handleClickDetail(employeeLink, event)}
        target='_blank'
        rel='noreferrer'
        className={`${styles.link_a_2}`}>
        Số nhân viên: {employeeNumber}
      </a>
      <a
        href=''
        onClick={(event) => handleClickDetail(checkInLink, event)}
        target='_blank'
        rel='noreferrer'
        className={`${styles.link_a_2}`}>
        Số nhân viên đã điểm danh: {registered}
      </a>
      <a
        href=''
        onClick={(event) => handleClickDetail(absenceLink, event)}
        target='_blank'
        rel='noreferrer'
        className={`${styles.link_a_2}`}>
        Số nhân viên chưa điểm danh: {noAttendance}
      </a>
    </div>
  </div>
)
const defaultValue = { label: 'Default Option', value: 'default' }
const StyledTreeExample = ({ iconEdit }) => {
  const [openModalEdit, setOpenModalEdit] = useState(0)
  const [openModalDetails, setOpenModalDetails] = useState(0)
  const [newData, setNewData] = useState(false)

  const handleCloseModal = () => {
    setNewData((pre) => !pre)
    setOpenModalEdit(0)
    setOpenModalDetails(0)
  }

  const [openModalEditNest, setOpenModalEditNest] = useState(0)
  const [openModalDetailsNest, setOpenModalDetailsNest] = useState(0)
  const handleCloseModalNest = () => {
    setNewData((pre) => !pre)
    setOpenModalEditNest(0)
    setOpenModalDetailsNest(0)
  }

  const [openModalEditGroup, setOpenModalEditGroup] = useState(0)
  const [openModalDetailsGroup, setOpenModalDetailsGroup] = useState(0)
  const handleCloseModalGroup = () => {
    setNewData((pre) => !pre)
    setOpenModalEditGroup(0)
    setOpenModalDetailsGroup(0)
  }

  const [chonPhongBan, setChonPhongBan] = useState<any>('')
  const [truongPhong, setTruongPhong] = useState<any>('')
  const [tenTo, setTenTo] = useState<any>('')
  const [tenNhom, setTenNhom] = useState<any>('')
  const [phoTruongPhong, setPhoTruongPhong] = useState<any>('')
  const [soluongnhanvien, setSoLuongNhanVien] = useState<any>('')
  const [mota, setMota] = useState<any>('')

  const handleDataUpdateRoom = ({
    dep_id,
    dep_name,
    manager,
    deputy,
    total_emp,
    description,
  }: any) => {
    setChonPhongBan(dep_name)
    setTruongPhong(manager)
    setPhoTruongPhong(deputy)
    setSoLuongNhanVien(total_emp)
    setMota(description)
    setOpenModalEdit(dep_id)
  }

  const handleDataUpdateNest = ({
    dep_name,
    gr_id,
    gr_name,
    description,
  }: any) => {
    setChonPhongBan(dep_name)
    setTenTo(gr_name)
    setMota(description)
    setOpenModalEditNest(gr_id)
  }

  const handleDataUpdateGroup = ({
    dep_name,
    nest_name,
    gr_id,
    gr_name,
    description,
  }: any) => {
    setChonPhongBan(dep_name)
    setTenTo(nest_name)
    setTenNhom(gr_name)
    setMota(description)
    setOpenModalEditGroup(gr_id)
  }

  const comid = GetComId()
  const router = useRouter()
  const handleClickDetail = (link: any, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (typeof link === "string") {
      router.push(
        `/phan-mem-nhan-su/${link}`
      );
    }
  }

  const options = {
    chonphongban: [{ value: chonPhongBan, label: chonPhongBan }],
    truongphong: [{ value: truongPhong, label: truongPhong }],
    photruongphong: [{ value: phoTruongPhong, label: phoTruongPhong }],
    tento: [{ value: tenTo, label: tenTo }],
    tennhom: [{ value: tenNhom, label: tenNhom }],
  }

  const [data, setData] = useState<any>(null)

  console.log(data);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrganizationalStructureData()
        setData(response?.data)
      } catch (error) { }
    }
    fetchData()
  }, [newData])

  console.log(data)
  console.log(data?.infoCompany?.infoDep)

  return (
    <>
      {typeof window !== 'undefined' && (
        <div>
          <Tree
            lineWidth={'2px'}
            lineColor={'#cccccc'}
            lineBorderRadius={'10px'}
            label={
              <StyledNode>
                <div
                  className={`${styles.member_view_box} ${styles.member_view_box_top}`}>
                  <div className={`${styles.member_detail}`}>
                    <p className={`${styles.text_center}`}>
                      {data?.infoCompany?.companyName}
                    </p>
                    {data?.infoCompany?.parent_manager ? data?.infoCompany?.parent_manager?.map(
                      (item: any, index: any) => {
                        return <p>Giám đốc: {item?.userName ? item?.userName : "Chưa cập nhật"}</p>
                      }
                    ) : (<p>Giám đốc: "Chưa cập nhật"</p>)}
                    {data?.infoCompany?.parent_deputy ? data?.infoCompany?.parent_deputy?.map(
                      (item: any, index: any) => {
                        return <p>Phó giám đốc: {item?.userName ? item.userName : "Chưa cập nhật"}</p>
                      }
                    ) : (<p>Phó giám đốc: "Chưa cập nhật"</p>)}

                    <a
                      href=''
                      onClick={(event) =>
                        handleClickDetail(
                          `danh-sach-nhan-vien-cua-tong-cong-ty-c${comid}-t0`,
                          event
                        )
                      }
                      target='_blank'
                      className={`${styles.link_a}`}>
                      Tổng nhân viên: {data?.infoCompany?.tong_nv}
                    </a>
                    <a
                      href=''
                      onClick={(event) =>
                        handleClickDetail(
                          `danh-sach-nhan-vien-cham-cong-tong-cong-ty-c${comid}-t1`,
                          event
                        )
                      }
                      target='_blank'
                      className={`${styles.link_a}`}>
                      Tổng nhân viên đã điểm danh:{' '}
                      {data?.infoCompany?.tong_nv_da_diem_danh}
                    </a>
                    <a
                      href=''
                      onClick={(event) =>
                        handleClickDetail(
                          `danh-sach-nhan-vien-chua-cham-cong-tong-cong-ty-c${comid}-t2`,
                          event
                        )
                      }
                      target='_blank'
                      className={`${styles.link_a}`}>
                      Tổng nhân viên chưa điểm danh:{' '}
                      {data?.infoCompany?.tong_nv -
                        data?.infoCompany?.tong_nv_da_diem_danh}
                    </a>
                  </div>
                </div>
              </StyledNode>
            }>
            {data?.infoCompany?.infoDep?.map((dep: any) => {
              return (
                <TreeNode
                  key={dep?.dep_id}
                  label={
                    <StyledNode>
                      <MemberViewBoxRoom
                        handleClickDetail={handleClickDetail}
                        idRoom={dep?.dep_id}
                        text_part={dep?.dep_name}
                        describe={dep?.description}
                        manager={dep?.manager}
                        deputy={dep?.deputy}
                        employeeLink={`danh-sach-nhan-vien-theo-phong-ban-c${comid}-t0-d${dep?.dep_id}`}
                        checkInLink={`danh-sach-nhan-vien-cham-cong-phong-ban-c${comid}-t1-d${dep?.dep_id}`}
                        absenceLink={`danh-sach-nhan-vien-chua-cham-cong-phong-ban-c${comid}-t2-d${dep?.dep_id}`}
                        employeeNumber={dep?.total_emp}
                        registered={dep?.tong_nv_da_diem_danh}
                        noAttendance={
                          dep?.total_emp - dep?.tong_nv_da_diem_danh
                        }
                        setOpenModalEdit={() => setOpenModalEdit(dep?.dep_id)}
                        handleDataUpdateRoom={handleDataUpdateRoom}
                        setOpenModalDetails={() =>
                          setOpenModalDetails(dep?.dep_id)
                        }
                        iconEdit={iconEdit}
                      />
                    </StyledNode>
                  }>
                  {dep?.infoTeam?.map((team: any) => {
                    return (
                      <TreeNode
                        key={team?.gr_id}
                        label={
                          <StyledNode>
                            <MemberViewBoxNest
                              handleClickDetail={handleClickDetail}
                              gr_id={team?.gr_id}
                              dep_name={dep?.dep_name}
                              text_part={team?.gr_name}
                              describe={team?.description}
                              leader={team?.to_truong}
                              deputy_leader={team?.pho_to_truong}
                              employeeLink={`danh-sach-nhan-vien-theo-to-c${comid}-t0-d${dep?.dep_id}-n${team?.gr_id}`}
                              checkInLink={`danh-sach-nhan-vien-cham-cong-theo-to-c${comid}-t1-d${dep?.dep_id}-n${team?.gr_id}`}
                              absenceLink={`danh-sach-nhan-vien-chua-cham-cong-theo-to-c${comid}-t2-d${dep?.dep_id}-n${team?.gr_id}`}
                              employeeNumber={team?.tong_nv}
                              registered={team?.tong_nv_da_diem_danh}
                              noAttendance={
                                team?.tong_nv - team?.tong_nv_da_diem_danh
                              }
                              setOpenModalEditNest={() =>
                                setOpenModalEditNest(team?.gr_id)
                              }
                              handleDataUpdateNest={handleDataUpdateNest}
                              setOpenModalDetailsNest={() =>
                                setOpenModalDetailsNest(team?.gr_id)
                              }
                              iconEdit={iconEdit}
                            />
                          </StyledNode>
                        }>
                        {team?.infoGroup
                          ?.filter(
                            (group: any, index: number, self: any[]) =>
                              self.findIndex(
                                (g: any) => g.gr_id === group.gr_id
                              ) === index
                          )
                          .map((group: any) => {
                            return (
                              <TreeNode
                                key={group?.gr_id}
                                label={
                                  <StyledNode>
                                    <MemberViewBoxGroup
                                      handleClickDetail={handleClickDetail}
                                      dep_name={dep?.dep_name}
                                      nest_name={team?.gr_name}
                                      gr_id={group?.gr_id}
                                      text_part={group?.gr_name}
                                      describe={group?.description}
                                      group_captain={group?.truong_nhom}
                                      deputy_group_captain={
                                        group?.pho_truong_nhom
                                      }
                                      employeeLink={`danh-sach-nhan-vien-theo-nhom-c${comid}-t0-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                      checkInLink={`danh-sach-nhan-vien-cham-cong-theo-nhom-c${comid}-t1-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                      absenceLink={`danh-sach-nhan-vien-chua-cham-cong-theo-nhom-c${comid}-t2-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                      employeeNumber={group?.group_tong_nv}
                                      registered={group?.tong_nv_da_diem_danh}
                                      noAttendance={
                                        group?.group_tong_nv -
                                        group?.tong_nv_da_diem_danh
                                      }
                                      setOpenModalEditGroup={() =>
                                        setOpenModalEditGroup(group?.gr_id)
                                      }
                                      handleDataUpdateGroup={
                                        handleDataUpdateGroup
                                      }
                                      setOpenModalDetailsGroup={() =>
                                        setOpenModalDetailsGroup(group?.gr_id)
                                      }
                                      iconEdit={iconEdit}
                                    />
                                  </StyledNode>
                                }
                              />
                            )
                          })}
                      </TreeNode>
                    )
                  })}
                </TreeNode>
              )
            })}
            {data?.infoCompany?.infoChildCompany?.map((com: any) => {
              return (
                <TreeNode
                  key={com?.com_id}
                  label={
                    <StyledNode>
                      <MemberViewBoxCompany
                        handleClickDetail={handleClickDetail}
                        text_part={com?.com_name}
                        describe='Công ty con'
                        CEO={com?.manager}
                        deputy_CEO={com?.deputy}
                        employeeLink={`danh-sach-nhan-vien-cua-tong-cong-ty-c${com?.com_id}-t0`}
                        checkInLink={`danh-sach-nhan-vien-cham-cong-tong-cong-ty-c${com?.com_id}-t1`}
                        absenceLink={`danh-sach-nhan-vien-chua-cham-cong-tong-cong-ty-c${com?.com_id}-t2`}
                        employeeNumber={com?.tong_nv}
                        registered={com?.tong_nv_da_diem_danh}
                        noAttendance={com?.tong_nv - com?.tong_nv_da_diem_danh}
                        iconEdit={iconEdit}
                      // setOpenModalEdit={() => setOpenModalEdit(true)}
                      />
                    </StyledNode>
                  }>
                  {com?.infoDep?.map((dep: any) => {
                    return (
                      <TreeNode
                        key={dep?.dep_id}
                        label={
                          <StyledNode>
                            <MemberViewBoxRoom
                              handleClickDetail={handleClickDetail}
                              text_part={dep?.dep_name}
                              describe={dep?.description}
                              manager={dep?.manager}
                              deputy={dep?.deputy}
                              employeeLink={`danh-sach-nhan-vien-theo-phong-ban-c${com?.com_id}-t0-d${dep?.dep_id}`}
                              checkInLink={`danh-sach-nhan-vien-cham-cong-phong-ban-c${com?.com_id}-t1-d${dep?.dep_id}`}
                              absenceLink={`danh-sach-nhan-vien-chua-cham-cong-phong-ban-c${com?.com_id}-t2-d${dep?.dep_id}`}
                              employeeNumber={dep?.total_emp}
                              registered={dep?.tong_nv_da_diem_danh}
                              noAttendance={
                                dep?.total_emp - dep?.tong_nv_da_diem_danh
                              }
                              setOpenModalEdit={() =>
                                setOpenModalEdit(dep?.dep_id)
                              }
                              setOpenModalDetails={() =>
                                setOpenModalDetails(dep?.dep_id)
                              }
                              iconEdit={iconEdit}
                            />
                          </StyledNode>
                        }>
                        {dep?.infoTeam?.map((team: any) => {
                          return (
                            <TreeNode
                              key={team?.gr_id}
                              label={
                                <StyledNode>
                                  <MemberViewBoxNest
                                    handleClickDetail={handleClickDetail}
                                    text_part={team?.gr_name}
                                    describe={team?.description}
                                    leader={team?.to_truong}
                                    deputy_leader={team?.pho_to_truong}
                                    employeeLink={`danh-sach-nhan-vien-theo-to-c${com?.com_id}-t0-d${dep?.dep_id}-n${team?.gr_id}`}
                                    checkInLink={`danh-sach-nhan-vien-cham-cong-theo-to-c${com?.com_id}-t1-d${dep?.dep_id}-n${team?.gr_id}`}
                                    absenceLink={`danh-sach-nhan-vien-chua-cham-cong-theo-to-c${com?.com_id}-t2-d${dep?.dep_id}-n${team?.gr_id}`}
                                    employeeNumber={team?.tong_nv}
                                    registered={team?.tong_nv_da_diem_danh}
                                    noAttendance={
                                      team?.tong_nv - team?.tong_nv_da_diem_danh
                                    }
                                    setOpenModalEditNest={() =>
                                      setOpenModalEditNest(team?.gr_id)
                                    }
                                    setOpenModalDetailsNest={() =>
                                      setOpenModalDetailsNest(team?.gr_id)
                                    }
                                    iconEdit={iconEdit}
                                  />
                                </StyledNode>
                              }>
                              {team?.infoGroup?.map((group: any) => {
                                return (
                                  <TreeNode
                                    key={group?.gr_id}
                                    label={
                                      <StyledNode>
                                        <MemberViewBoxGroup
                                          handleClickDetail={handleClickDetail}
                                          text_part={group?.gr_name}
                                          describe={group?.description}
                                          group_captain={group?.truong_nhom}
                                          deputy_group_captain={
                                            group?.pho_truong_nhom
                                          }
                                          employeeLink={`danh-sach-nhan-vien-theo-nhom-c${com?.com_id}-t0-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                          checkInLink={`danh-sach-nhan-vien-cham-cong-theo-nhom-c${com?.com_id}-t1-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                          absenceLink={`danh-sach-nhan-vien-chua-cham-cong-theo-nhom-c${com?.com_id}-t2-d${dep?.dep_id}-n${team?.gr_id}-g${group?.gr_id}`}
                                          employeeNumber={group?.group_tong_nv}
                                          registered={
                                            group?.tong_nv_da_diem_danh
                                          }
                                          noAttendance={
                                            group?.group_tong_nv -
                                            group?.tong_nv_da_diem_danh
                                          }
                                          setOpenModalEditGroup={() =>
                                            setOpenModalEditGroup(group?.gr_id)
                                          }
                                          setOpenModalDetailsGroup={() =>
                                            setOpenModalDetailsGroup(
                                              group?.gr_id
                                            )
                                          }
                                          iconEdit={iconEdit}
                                        />
                                      </StyledNode>
                                    }
                                  />
                                )
                              })}
                            </TreeNode>
                          )
                        })}
                      </TreeNode>
                    )
                  })}
                </TreeNode>
              )
            })}
          </Tree>
          {openModalEdit !== 0 && (
            <EditRoomModal
              defaultValue={defaultValue}
              idRoom={openModalEdit}
              options={options}
              soluongnhanvien={soluongnhanvien}
              mota={mota}
              onCancel={handleCloseModal}></EditRoomModal>
          )}
          {openModalDetails !== 0 && (
            <DetailsRoomModal
              depId={openModalDetails}
              onCancel={handleCloseModal}
            />
          )}

          {openModalEditNest !== 0 && (
            <EditNestModal
              gr_id={openModalEditNest}
              defaultValue={defaultValue}
              options={options}
              mota={mota}
              onCancel={handleCloseModalNest}
            />
          )}
          {openModalDetailsNest !== 0 && (
            <DetailsNestModal
              teamId={openModalDetailsNest}
              onCancel={handleCloseModalNest}
            />
          )}

          {openModalEditGroup !== 0 && (
            <EditGroupModal
              gr_id={openModalEditGroup}
              defaultValue={defaultValue}
              options={options}
              mota={mota}
              onCancel={handleCloseModalGroup}
            />
          )}
          {openModalDetailsGroup !== 0 && (
            <DetailsGroupModal
              groupId={openModalDetailsGroup}
              onCancel={handleCloseModalGroup}
            />
          )}
        </div>
      )}
    </>
  )
}

export default StyledTreeExample
