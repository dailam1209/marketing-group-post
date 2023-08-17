import { Button, Col, Popover, Row, Table } from 'antd';
import { MyTable } from '../../quan-ly-phong-ban/table/Table';
import { MySeachBar, MySelect } from '../../quan-ly-cong-ty-con/modal';
import styles from './NhanVienChoDuyet.module.css';
import Image from 'next/image';
import { SearchButton } from '@/components/commons/Buttons';
import { useState } from 'react';
import { ConfirmDuyetModal } from './modal/modal';
import { getPosition } from '@/utils/function';
import { POST } from '@/pages/api/BaseApi';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export function NhanVienChoDuyet({ listStaffs, comLabel, listDepLabel }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [openDuyetModal, setOpenDuyetModal] = useState(false);
  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }));
  const router = useRouter()

  const columns = [
    {
      title: <p className="tableHeader">Ảnh</p>,
      render: (record: any) => (
        <Image
          alt="/"
          src={record?.avatarUser || '/avatar.png'}
          width={46}
          height={46}
        />
      ),
    },
    {
      title: <p className="tableHeader">Họ và tên (ID)</p>,
      render: (record: any) => (
        <div>
          <p>{record?.userName}</p>
          <p style={{ textAlign: 'center' }}>({record?.idQLC})</p>
        </div>
      ),
    },
    {
      title: <p className="tableHeader">Phòng ban</p>,
      render: (record: any) => (
        <p>
          {
            listDepLabel?.find(
              (dep) => dep?.value === record?.inForPerson?.employee?.dep_id
            )?.label
          }
        </p>
      ),
    },
    {
      title: <p className="tableHeader">Chức vụ</p>,
      render: (record: any) => (
        <p>
          {
            positionLabel?.find(
              (p) => p?.value === record?.inForPerson?.employee?.position_id
            )?.label
          }
        </p>
      ),
    },
    {
      title: <p className="tableHeader">Email</p>,
      render: (record: any) => <p>{record?.email || record?.emailContact}</p>,
    },
    {
      title: <p className="tableHeader">SĐT</p>,
      render: (record: any) => <p>{record?.phone || record?.phoneTK}</p>,
    },
    Table.SELECTION_COLUMN,
  ];

  const handleSubmit = () => {
    selectedRowKeys?.map(idQLC => {
      const emp = listStaffs?.find(staff => staff.idQLC === idQLC);

      emp &&
      POST('api/qlc/managerUser/edit', {
        com_id: emp?.inForPerson?.employee?.com_id,
        role: '0',
        userName: emp?.userName,
        address: emp?.address,
        position_id: emp?.inForPerson?.employee?.position_id,
        gender: `${emp?.inForPerson?.account?.gender}`,
        birthday: dayjs(emp?.inForPerson?.account?.birthday).format("YYYY-MM-DD HH:mm:ss Z"),
        start_working_time: dayjs().format("YYYY-MM-DD HH:mm:ss Z"),
        // ep_status: "Active",
        _id: emp?._id,
        // password: ""
      })
        .then(res => {

        })
    })
    
    // console.log(selectedRowKeys);
    // setOpenDuyetModal(true);
    alert("Duyệt nhân viên thành công!")
    router.replace(router.asPath)
  };

  return (
    <div>
      <div>
        <Row gutter={[20, 0]}>
          <Col lg={7} sm={12} xs={24}>
            {MySelect(
              '',
              'Công ty cổ phần thanh toán Hưng Hà 2',
              false,
              false,
              'com_id',
              [comLabel]
            )}
          </Col>
          <Col lg={7} sm={12} xs={24}>
            <MySeachBar
              placeholder="Nhập tên phòng ban"
              hasPrefix={false}
              name=""
            />
          </Col>
          <Col lg={7} sm={12} xs={24} className={styles.inputName}>
            <MySeachBar
              placeholder="Nhập tên cần tìm"
              hasPrefix={false}
              name="12"
            />
          </Col>
          <Col lg={3} sm={12} xs={24} className={styles.searchBtn}>
            {SearchButton('Tìm kiếm', () => null, false)}
          </Col>
        </Row>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listStaffs}
          onRowClick={() => null}
          hasRowSelect={true}
          onSelectChange={(newSelectedRowKeys) =>
            setSelectedRowKeys(newSelectedRowKeys)
          }
          selectedRowKeys={selectedRowKeys}
          rowKey="idQLC"
          Footer={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button style={{ backgroundColor: '#4C5BD4' }} size="large">
                <p
                  style={{ color: '#fff', padding: '0px 20px' }}
                  onClick={handleSubmit}
                >
                  Duyệt
                </p>
              </Button>
            </div>
          }
        />
      </div>
      <ConfirmDuyetModal
        open={openDuyetModal}
        setOpen={setOpenDuyetModal}
        data={selectedRowKeys}
      />
    </div>
  );
}
