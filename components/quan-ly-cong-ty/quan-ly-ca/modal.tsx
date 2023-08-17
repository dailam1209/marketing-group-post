import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from 'antd';
import styles from './modal.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ModalWrapper } from '@/components/modal/ModalWrapper';
import { MyInput, MySelect } from '../quan-ly-cong-ty-con/modal';
import { ModalXacNhan } from '@/components/cham-cong/cong-chuan/modal-xac-nhan-cong-chuan';
import { GET, POST } from '@/pages/api/BaseApi';
import { useRouter } from 'next/router';

export const TYPE_ADD = 'add';
export const TYPE_UPDATE = 'update';

const THEO_SO_CA = 'theo so ca';
const THEO_TIEN = 'theo tien';
const THEO_GIO = 'theo gio';

export function AddCaModal(
  open: boolean,
  setOpen: Function,
  type: string,
  data?: any,
  setData?: Function,
  selectedShift?: any
) {
  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState(THEO_SO_CA);
  const [modalXacNhan, setModalXacNhan] = useState(false);
  const router = useRouter();

  // console.log(selectedShift);

  useEffect(() => {
    form.setFieldsValue(selectedShift);
  }, [form, selectedShift]);

  const handleSubmit = () => {
    // update
    if (type === TYPE_UPDATE && selectedShift !== 0) {
      // console.log({...form.getFieldsValue(), shift_id: selectedShift.shift_id})
      POST('api/qlc/shift/edit', {
        ...form.getFieldsValue(),
        shift_id: selectedShift.shift_id,
      })
        .then((res) => {
          if (res?.result === true) {
            // ok
            router.replace(router.asPath);
          }
        })
        .catch((err) => console.error(err));
    }
    if (type === TYPE_ADD) {
      // create
      // console.log({...form.getFieldsValue(), shift_type: 1})
      POST('api/qlc/shift/create', {
        ...form.getFieldsValue(),
        shift_type: 1,
      }).then((res) => {
        if (res?.result === true) {
          router.replace(router.asPath);
        }
      });
    }
  };

  const SelectPaymentMethodBtn = ({
    type,
    title,
  }: {
    type: string;
    title: string;
  }) => {
    return (
      <div
        className={styles.btn}
        style={{
          backgroundColor: selectedPayMethod === type ? '#4C5BD4' : '#fff',
        }}
        onClick={() => setSelectedPayMethod(type)}
      >
        <p
          className={styles.text}
          style={{
            color: selectedPayMethod === type ? '#fff' : '',
          }}
        >
          {title}
        </p>
      </div>
    );
  };
  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={600}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className={styles.header}>
          <div></div>
          <p className={styles.headerText}>
            {type === TYPE_ADD ? 'Thêm ca làm việc' : 'Sửa ca làm việc'}
          </p>
          <Image
            alt="/"
            src={'/cross.png'}
            width={14}
            height={14}
            style={{ marginRight: '20px' }}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={`quan_ly_ca_body ${styles.body}`}>
          <Form
            form={form}
            initialValues={
              selectedShift || {
                shift_name: '',
                start_time: '',
                end_time: '',
                num_to_calculate: 1,
                shift_type: 1,
              }
            }
          >
            {MyInput(
              'Tên ca làm việc',
              'Nhập tên ca làm việc',
              true,
              true,
              'shift_name'
            )}
            <Row gutter={30}>
              <Col sm={12} xs={24}>
                <Form.Item
                  name="start_time"
                  required={true}
                  label={<p>{'Giờ vào ca (check in)'}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{ fontSize: '16px', padding: '6px', width: '100%' }}
                  ></Input>
                </Form.Item>
              </Col>
              <Col sm={12} xs={24}>
                <Form.Item
                  name="end_time"
                  required={true}
                  label={<p>{'Giờ hết ca (check out)'}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{ fontSize: '16px', padding: '6px', width: '100%' }}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>

            <p className={styles.title} onClick={() => setShowMore(!showMore)}>
              Cài đặt giới hạn thời gian
            </p>

            {showMore && (
              <div style={{ marginTop: '10px' }}>
                {/* {MyInput(
                " Ghi nhận check in sớm nhất (không băt buộc)",
                "",
                false,
                true,
                ""
              )} 
              {MyInput(
                " Ghi nhận check out muộn nhất (không băt buộc)",
                "",
                false,
                true,
                ""
              )} */}

                <Form.Item
                  name="start_time_latest"
                  label={<p>{'Ghi nhận check in sớm nhất (không bắt buộc)'}</p>}
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{ fontSize: '16px', padding: '6px', width: '100%' }}
                  ></Input>
                </Form.Item>
                <Form.Item
                  name="end_time_earliest"
                  label={
                    <p>{'Ghi nhận check out muộn nhất (không bắt buộc)'}</p>
                  }
                  labelCol={{ span: 24 }}
                >
                  <Input
                    type="time"
                    style={{ fontSize: '16px', padding: '6px', width: '100%' }}
                  ></Input>
                </Form.Item>
              </div>
            )}

            <p style={{ marginBottom: '10px' }}>
              Chọn ca thuộc loại hình nào để tính công cuối tháng
            </p>
            <Row gutter={30}>
              <Col sm={12} xs={24}>
                <SelectPaymentMethodBtn
                  type={THEO_SO_CA}
                  title="Tính công theo số ca"
                />
                <SelectPaymentMethodBtn
                  type={THEO_GIO}
                  title="Tính công theo số giờ"
                />
              </Col>
              <Col sm={12} xs={24}>
                <SelectPaymentMethodBtn
                  type={THEO_TIEN}
                  title="Tính công theo tiền"
                />
              </Col>
            </Row>

            {selectedPayMethod === THEO_SO_CA ? (
              MySelect(
                'Số công tương ứng',
                'Chọn ca làm việc',
                true,
                true,
                'num_to_calculate',
                [
                  { label: '1 công / 1 ca', value: 1 },
                  { label: '0,5 công / 1 ca', value: 2 },
                ]
              )
            ) : selectedPayMethod === THEO_TIEN ? (
              MyInput(
                'Số tiền tương ứng',
                'Nhập số tiền tương ứng',
                true,
                true,
                'num_to_money'
              )
            ) : (
              <div></div>
            )}

            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                htmlType="submit"
                className={styles.addNewBtn}
                size="large"
                onClick={handleSubmit}
              >
                <p className={styles.btnText}>
                  {type === TYPE_ADD ? 'Thêm ca ' : 'Cập nhật'}
                </p>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {ModalXacNhan(
        modalXacNhan,
        setModalXacNhan,
        type === TYPE_ADD
          ? 'Bạn đã thêm ca làm việc thành công '
          : 'Bạn đã cập nhật ca làm việc thành công'
      )}
    </div>
  );
}

export function ConfirmDeleteShiftModal(
  open: boolean,
  setOpen: Function,
  onConfirm: Function
) {
  const children = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image alt="/" src={'/big-x.png'} width={50} height={50} />
      <p style={{ marginTop: '20px' }}>Bạn chắc chắn muốn xóa ca?</p>
    </div>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    'Xóa ca làm việc',
    'Xóa',
    onConfirm
  );
}
