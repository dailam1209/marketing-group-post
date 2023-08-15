import { Button, Modal } from "antd"
import Image from "next/image"
import styles from './xoa.module.css'
import { POST_TL } from "@/pages/api/BaseApi"
import { useRouter } from "next/router"

export const XoaThuongPhat = (
    open:boolean,
    setOpen:Function,
    selectedData: any
)=>{

   const router = useRouter()

    const onConFirm = async() => {
        const res = await POST_TL('api/tinhluong/congty/delete_thuong_phat', {pay_id : selectedData?.pay_id})
        // console.log(res)
        if(res?.message === 'success'){
            router.replace(router.asPath)
        }
    }

    return(
        <Modal
            // className={styles.widthModal}
            open={open}
            onCancel={() => setOpen(false)}
            width={450}
            closable={false}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            style={{zIndex:'2'}}
        >
        <div style={{padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',fontSize:'16px',color:'#474747'}}>
            <Image 
                alt='/' 
                width={50}
                height={50} 
                src={"/big-x.png"}
                style={{marginBottom:'20px'}}
            />
            <p style={{textAlign:'center'}}>
                Bạn có chắc chắn muốn xoá thưởng phạt của nhân viên này ?
            </p>
            <div style={{marginTop:'20px'}}>
            <Button style={{padding:'5px 40px 5px 40px',height:'auto',backgroundColor:'white'}}
                onClick={()=>setOpen(false)}
                >
                <p style={{color:'#4C5BD4',fontSize:'18px'}}>
                    Hủy
                </p>    
            </Button>
            <Button style={{marginLeft:'20px',padding:'5px 30px 5px 30px',height:'auto',backgroundColor:'#4C5BD4'}}
                onClick={onConFirm}
            >
                <p style={{color:'white',fontSize:'18px'}}>
                    Đồng ý
                </p>        
            </Button>
            </div>
        </div>
        </Modal>
    )
}