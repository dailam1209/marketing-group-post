import { Button, Col, Popover, Row, Table } from 'antd';
import { MyTable } from '../../quan-ly-phong-ban/table/Table';
import { MySeachBar, MySelect } from '../../quan-ly-cong-ty-con/modal';
import styles from './NhanVienChoDuyet.module.css';
import Image from 'next/image';
import { SearchButton } from '@/components/commons/Buttons';
import { useEffect, useState } from 'react';
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
  const [data, setData] = useState(listStaffs);
  // console.log(comLabel)
  
  const [depFilter, setDepFilter]: any = useState<any>(undefined);
  const [epNameFilter, setEpNameFilter]: any = useState<any>(undefined);
  const [listEmpLabel, setListEmpLabel] = useState<any>(
    listStaffs?.map((e) => ({ label: e?.userName, value: e?.idQLC }))
  );
  const [listDataFiltered, setListDataFiltered] = useState([]);

  useEffect(() => {
    setListDataFiltered(data);
  }, [data]);

  useEffect(() => {
    if (depFilter === undefined) {
      setListDataFiltered(data);
    }
    if (depFilter !== undefined) {
      setListDataFiltered(data?.filter((emp) => emp?.dep_id === depFilter));
    }
    if (epNameFilter !== undefined) {
      if (depFilter === undefined) {
        setListDataFiltered(data);
      } else {
        setListDataFiltered(data?.filter((emp) => emp?.idQLC === epNameFilter));
      }
    }
  }, [depFilter, epNameFilter]);

  useEffect(() => {
    setData(listStaffs);
    setListEmpLabel(
      listStaffs?.map((e) => ({ label: e?.userName, value: e?.idQLC }))
    );
  }, [listStaffs]);

  const router = useRouter()

  const columns = [
    {
      title: <p className='tableHeader'>Ảnh</p>,
      render: (record: any) => (
        <Image
          alt='/'
          src={record?.avatarUser ? `/${record?.avatarUser}` : '/avatar.png'}
          width={46}
          height={46}
        />
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Họ và tên (ID)</p>,
      render: (record: any) => (
        <div>
          <p>{record?.userName}</p>
          <p style={{ textAlign: 'center' }}>({record?.idQLC})</p>
        </div>
      ),
      align: 'center',
    },
    {
      title: <p className="tableHeader">Phòng ban</p>,
      render: (record: any) => (
        <p>
          {listDepLabel?.find((dep) => dep?.value === record?.dep_id)?.label ||
            'Chưa cập nhật'}
        </p>
      ),
      align: 'center',
    },
    {
      title: <p className="tableHeader">Chức vụ</p>,
      render: (record: any) => (
        <p>
          {positionLabel?.find((p) => p?.value === record?.position_id)
            ?.label || 'Chưa cập nhật'}
        </p>
      ),
      align: 'center',
    },
    {
      title: <p className="tableHeader">Email</p>,
      render: (record: any) => <p>{record?.email || record?.emailContact || 'Chưa cập nhật'}</p>,
      align: 'center',
    },
    {
      title: <p className="tableHeader">SĐT</p>,
      render: (record: any) => <p>{record?.phone || record?.phoneTK || 'Chưa cập nhật'}</p>,
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ]
  const duyet = async () => {
    if (selectedRowKeys?.length > 0) {
      const res = await POST('api/qlc/managerUser/verifyListUsers', {
        listUsers: selectedRowKeys,
      })
      console.log(res)
      setOpenDuyetModal(true)
    }
  }
  return (
    <div>
      <div>
        <Row gutter={[20, 0]}>
          <Col lg={7} sm={12} xs={24}>
            {MySelect(
              '',
              'Chọn công ty',
              false,
              false,
              'com_id',
              [comLabel]
            )}
          </Col>
          <Col lg={7} sm={12} xs={24}>
          {MySelect(
              'Phòng ban',
              'Chọn phòng ban',
              false,
              false,
              'dep_id',
              listDepLabel,
              undefined,
              setDepFilter
            )}
          </Col>
          <Col lg={7} sm={12} xs={24} className={styles.inputName}>
          {MySelect(
              'Nhân viên',
              'Nhập tên cần tìm',
              false,
              false,
              'ep_id',
              listEmpLabel,
              undefined,
              setEpNameFilter
            )}
          </Col>
          <Col lg={3} sm={12} xs={24} className={styles.searchBtn}>
            {SearchButton('Tìm kiếm', () => null, false)}
          </Col>
        </Row>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listDataFiltered}
          onRowClick={() => null}
          hasRowSelect={true}
          onSelectChange={(newSelectedRowKeys) =>
            setSelectedRowKeys(newSelectedRowKeys)
          }
          selectedRowKeys={selectedRowKeys}
          rowKey='idQLC'
          Footer={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button style={{ backgroundColor: '#4C5BD4' }} size='large'>
                <p
                  style={{ color: '#fff', padding: '0px 20px' }}
                  onClick={duyet}>
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
