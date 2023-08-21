import styles from './cai-dat-di-muon-ve-som.module.css';
import { Row, Col, Select, Button, Table, Form } from 'antd';
import Image from 'next/image';
import type { ColumnsType } from 'antd/es/table';
import {
  ModalCaiDatDiMuonVeSom,
  ModalUpDateCaiDatDiMuonVeSom,
  ModalXoaCaiDaiDMVS,
} from './modal/modal';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { GET, POST, POST_SS, POST_TL } from '@/pages/api/BaseApi';

const TableCaiDatDiMuonVeSom = ({
  data,
  setModalChinhSua,
  setModalXoa,
  setSelectedRow,
  listShift
}: {
  data: any[];
  setModalChinhSua: (a: boolean) => void;
  setModalXoa: (a: boolean) => void;
  setSelectedRow: (a: any) => void;
  listShift?: any
}) => {
  const columns: any[] = [
    {
      key: '1',
      title: 'Loại phạt',
      render: (record) => <p>{record?.pm_type_phat}</p>,
      align: 'center',
    },
    {
      key: '2',
      title: 'Ca làm việc áp dụng',
      render: (record) => <p>{listShift?.length > 0 ? listShift?.find(shift => shift?.shift_id === record?.pm_shift)?.shift_name : "Chưa cập nhật"}</p>,
      align: 'center',
    },
    {
      key: '3',
      title: 'Từ tháng',
      render: (record) => (
        <p>
          {record?.pm_time_begin &&
            `Tháng ${moment(record?.pm_time_begin)?.month() + 1} /${moment(
              record?.pm_time_begin
            )?.year()}`}
        </p>
      ),
      align: 'center',
    },
    {
      key: '4',
      title: 'Đến tháng',
      render: (record) => (
        <p>
          {record?.pm_time_end &&
            `Tháng ${moment(record?.pm_time_end)?.month() + 1} /${moment(
              record?.pm_time_end
            )?.year()}`}
        </p>
      ),
      align: 'center',
    },
    {
      key: '5',
      title: 'Thời gian tính phạt',
      render: (record) => (
        <p>{record?.pm_minute && `Đi muộn ${record?.pm_minute} phút`}</p>
      ),
      align: 'center',
    },
    {
      key: '6',
      title: 'Mức phạt',
      align: 'center',
      render: (record: any) => <>{record?.pm_monney}/ca</>,
    },
    {
      key: '7',
      title: 'Tùy chỉnh',
      align: 'center',
      render: (record: any) => (
        <div className={styles.actionGroup}>
          <Image
            alt="/"
            src={'/edit.png'}
            width={24}
            height={24}
            onClick={() => {
              // console.log(record)
              setSelectedRow(record);
              setModalChinhSua(true);
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt="/"
            src={'/delete-icon.png'}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(record);
              setModalXoa(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        className={`green-table-bodyBorder`}
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        pagination={{ position: ['bottomCenter'] }}
      ></Table>
    </div>
  );
};

export function CpmCaiDatDiMuonVeSom({
  lateInfoList,
}: {
  lateInfoList: any[];
}) {
  const [form] = Form.useForm();
  const [modalCaiDatDMVS, setModalCaiDatDMVS] = useState(false);
  const [listData, setListData] = useState(lateInfoList);
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [modalXoa, setModalXoa] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [listCa, setListCa] = useState([]);
  // console.log(listCa)

  useEffect(() => {
    const getListCa = async () => {
      const res = await GET('api/qlc/shift/list');
      // console.log(res)

      if (res?.result) {
        setListCa(res?.list);
      }
    };

    getListCa();
  }, []);

  return (
    <div>
      <Form form={form}>
        <Row>
          <Col sm={3} xs={1}></Col>
          <Col sm={21} xs={24}>
            <Row gutter={20} justify={'end'}>
              <Col
                lg={4}
                md={4}
                sm={5}
                xs={10}
                className={`${styles.button} ${styles.button2}`}
              >
                <Button size="large" onClick={() => setModalCaiDatDMVS(true)}>
                  <Image
                    src="/plus-w.png"
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginRight: '10px' }}
                  ></Image>
                  Thêm mới
                </Button>
              </Col>
              <Col lg={6} md={7} sm={8} xs={24} className={styles.selects}>
                <Form.Item name={'year'}>
                  <Select
                    size="large"
                    placeholder="Chọn năm"
                    suffixIcon={<img src="/search-black.png"></img>}
                  ></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={7} sm={8} xs={24} className={styles.selects}>
                <Form.Item name={'month'}>
                  <Select
                    size="large"
                    placeholder="Chọn tháng"
                    suffixIcon={<img src="/search-black.png"></img>}
                  ></Select>
                </Form.Item>
              </Col>
              <Col
                lg={4}
                md={5}
                sm={6}
                xs={9}
                className={`${styles.button} ${styles.button1}`}
              >
                <Button size="large" onClick={() => setModalCaiDatDMVS(true)}>
                  <Image
                    src="/plus-w.png"
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginRight: '10px' }}
                  ></Image>
                  Thêm mới
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <div className={styles.text}>Danh sách mức phạt đi muộn về sớm</div>
      <div className={styles.table}>
        <TableCaiDatDiMuonVeSom
          data={listData}
          setModalChinhSua={setModalChinhSua}
          setModalXoa={setModalXoa}
          setSelectedRow={setSelectedRow}
          listShift={listCa}
        />
      </div>
      {ModalCaiDatDiMuonVeSom(
        modalCaiDatDMVS,
        setModalCaiDatDMVS,
        listData,
        setListData,
        listCa
      )}
      {ModalUpDateCaiDatDiMuonVeSom(
        modalChinhSua,
        setModalChinhSua,
        selectedRow,
        reload,
        setReload
      )}
      {ModalXoaCaiDaiDMVS(
        modalXoa,
        setModalXoa,
        selectedRow,
        reload,
        setReload
      )}
    </div>
  );
}
