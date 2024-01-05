import React, { useRef } from 'react'
import styleHome from "../../home/home.module.css";
import FacebookNav from './facebook_nav';
import styles from './facebook.module.css';
import TableDataFacebook from '../../table/table_marketing_facebook_detail';
import FacebookInput from './facebook_input_form';


const facebook = () => {
  return (
        <div className={styles.facebook_detail}>
            <FacebookNav/>
            <div className={styles.facebook__content}>
              <FacebookInput/>
              <TableDataFacebook changeNumberPage={function (e: number) {
            throw new Error('Function not implemented.');
          } }/>
            </div>
        </div>
  )
}

export default facebook