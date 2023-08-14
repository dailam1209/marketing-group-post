import React from 'react'
import styles from './candidateListDetail.module.css'
import ItemCandidate1 from '@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/item/item1';
import ItemCandidate2 from '@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/item/index2';
import ItemCandidate3 from '@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/item/item3';
import { useDrop } from "react-dnd"
import { ItemTypes } from '@/components/hr/quan-ly-tuyen-dung/danh-sach-ung-vien/item/ItemType';
export default function DropableColumn({
    item, isProcessList, handleUpdateProcess, setDeleteProcess, setModalOpen, setDragItem, setDropCol, setProcess_id, iconEdit, iconDelete
}: any) {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.INTERVIEW, ItemTypes.RECEIVE_APPLICATION, ItemTypes.RESULT],
        drop: () => item,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    }))

    return (
        <>
            <div className={`${styles.hs_t}`} ref={drop}>
                <div className={`${styles.hs_header} 
                                            ${item?.id === 1 ? styles.hs_status_job_1 : ''} 
                                            ${item?.id === 2 ? styles.hs_status_job_2 : ''} 
                                            ${item?.id === 3 ? styles.hs_status_job_3 : ''} 
                                            ${item?.id === 4 ? styles.hs_status_job_4 : ''} 
                                            `}>
                    {(item?.id !== 0 && item?.id !== 1 && item?.id !== 2 && item?.id !== 3 && item?.id !== 4) ? <p>
                        {item.name} (
                        {iconEdit && (
                            <a onClick={() =>
                                handleUpdateProcess({
                                    name: item.name,
                                    processBefore: item.processBefore,
                                    processInterviewId: item.id,
                                })}
                                style={{ cursor: "pointer" }}>Sửa
                            </a>
                        )}
                        /
                        {iconDelete && (
                            <a onClick={() => setDeleteProcess(item.id)}
                                style={{ cursor: "pointer" }}>Xóa
                            </a>
                        )}
                        )
                    </p> : <>{item.name}</>}
                    <p>
                        {item?.id === 0 && <> (<span style={{ color: "#337ab7" }}>
                            {isProcessList?.listCandidate?.length}
                        </span> ứng viên)</>}
                        {item?.id !== 0 && item?.id !== 1 && item?.id !== 2 && item?.id !== 3 && item?.id !== 4 &&
                            <> (<span style={{ color: "#337ab7" }}>
                                {item.totalCandidate}
                            </span> ứng viên)</>}
                        {item?.id === 1 && <> (<span style={{ color: "#33ab7" }}>
                            {isProcessList?.listCandidateGetJob?.length}
                        </span> ứng viên)</>}
                        {item?.id === 2 && <> (<span style={{ color: "#33ab7" }}>
                            {isProcessList?.listCandidateFailJob?.length}
                        </span> ứng viên)</>}
                        {item?.id === 3 && <> (<span style={{ color: "#33ab7" }}>
                            {isProcessList?.listCandidateCancelJob?.length}
                        </span> ứng viên)</>}
                        {item?.id === 4 && <> (<span style={{ color: "#33ab7" }}>
                            {isProcessList?.listCandidateContactJob?.length}
                        </span>ứng viên)</>}
                    </p>
                </div>
                <div className={`${styles.hs_body}`} >
                    {item?.id === 0 && isProcessList?.listCandidate?.map((data: any,
                        index: any) => {
                        return (
                            <ItemCandidate1
                                key={index}
                                listCandidate={isProcessList?.listCandidate}
                                data={data}
                                process_id={item?.id}
                                setProcess_id={setProcess_id}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                iconDelete={iconDelete}
                            />
                        )
                    })}
                    {item?.id !== 0 && item?.id !== 1 && item?.id !== 2 && item?.id !== 3 && item?.id !== 4 && item?.listCandidate?.map((data: any, index: any) => {
                        return (
                            <ItemCandidate2
                                key={index}
                                process_id={item?.id}
                                listCandidate={data?.listCandidate}
                                data={data}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                setProcess_id={setProcess_id}
                                iconDelete={iconDelete}
                            />
                        )
                    })
                    }
                    {item?.id === 1 && isProcessList?.listCandidateGetJob?.map((data: any, index: any) => {
                        return (
                            <ItemCandidate3
                                key={index}
                                type="g"
                                listCandidate={isProcessList?.listCandidateGetJob}
                                data={data}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                iconDelete={iconDelete}
                                process_id={item?.id}
                                setProcess_id={setProcess_id}
                            />
                        )
                    })}
                    {item?.id === 2 && isProcessList?.listCandidateFailJob?.map((data: any, index: any) => {
                        return (
                            <ItemCandidate3
                                key={index}
                                type="f"
                                listCandidate={isProcessList?.listCandidateFailJob}
                                data={data}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                iconDelete={iconDelete}
                                process_id={item?.id}
                                setProcess_id={setProcess_id}
                            />
                        )
                    })}
                    {item?.id === 3 && isProcessList?.listCandidateCancelJob?.map((data: any, index: any) => {
                        return (
                            <ItemCandidate3
                                key={index}
                                type="c"
                                listCandidate={isProcessList?.listCandidateCancelJob}
                                data={data}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                iconDelete={iconDelete} process_id={item?.id}
                                setProcess_id={setProcess_id}
                            />
                        )
                    })}
                    {item?.id === 4 && isProcessList?.listCandidateContactJob?.map((data: any, index: any) => {
                        return (
                            <ItemCandidate3
                                key={index}
                                type="s"
                                listCandidate={isProcessList?.listCandidateContactJob}
                                data={data}
                                setModalOpen={setModalOpen}
                                setDragItem={setDragItem}
                                setDropCol={setDropCol}
                                iconDelete={iconDelete}
                                process_id={item?.id}
                                setProcess_id={setProcess_id}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}