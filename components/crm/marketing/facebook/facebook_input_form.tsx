import React, { useState } from 'react';
import styles from './facebook.module.css';
import { Delete, DropDownSearch } from '@/public/img/marketing/facebook';

const FacebookInput = () => {
    const [ valueFillter, setValueFillter ] = useState('Danh sách kịch bản theo tin nhắn');
    const [ numberSelected, setNumberSelected ] = useState(0);
    
  return (
    <div className={styles.facebook__fillter}>
        <div className={styles.facebook__choose_fillter}>
            <p className={styles.facebook_input}>{valueFillter}</p>
            <div className={styles.facebook__input_icon}>
                <DropDownSearch/>
            </div>
            <div className={styles.choose}>
                <div className={styles.choose_item} onClick={() => { setValueFillter('Danh sách kịch bản theo tin nhắn'), setNumberSelected(0)}}>
                    <input checked={numberSelected == 0}  className={styles.choose_input} type='radio'></input>
                    <p className={styles.choose_des}>Danh sách kịch bản theo tin nhắn</p>
                </div>
                <div className={styles.choose_item} onClick={() => { setValueFillter('Danh sách kịch bản theo tin nhắn'), setNumberSelected(1)}}>
                <input checked={numberSelected == 1}   className={styles.choose_input} type='radio'></input>
                    <p className={styles.choose_des}>Danh sách kịch bản theo tin nhắn</p>
                </div>
                <div className={styles.choose_item} onClick={() => { setValueFillter('Danh sách kịch bản theo tin nhắn'), setNumberSelected(2)}}>
                <input checked={numberSelected == 2}   className={styles.choose_input} type='radio'></input>
                <p className={styles.choose_des}>Danh sách kịch bản theo tin nhắn</p>

                </div>
            </div>
        </div>
        <div className={styles.box_delete}>
            <Delete/>
            <span>Xóa</span>
        </div>
            
    </div>
  )
}

export default FacebookInput