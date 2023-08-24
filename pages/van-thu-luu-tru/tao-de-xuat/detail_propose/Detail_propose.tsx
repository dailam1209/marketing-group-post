"use client";
import { resetSelectedElement } from "@/actions/actions";
import { RootState } from "@/reducers";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "./Detail_propose.module.css";
import Image from "next/image";
import Overtime_propose from "@/components/van-thu-luu-tru/detail_propose/10_Overtime_propose/Overtime_propose";
import Pregnant_propose from "@/components/van-thu-luu-tru/detail_propose/11_Pregnant_propose/Pregnant_propose";
import Meeting_room_propose from "@/components/van-thu-luu-tru/detail_propose/12_Meeting_room_propose/Meeting_room_propose";
import Transportation_propose from "@/components/van-thu-luu-tru/detail_propose/13_Transportation_propose/Transportation_propose";
import Facility_fixing_propose from "@/components/van-thu-luu-tru/detail_propose/14_Facility_fixing_propose/Facility_fixing_propose";
import Payment_propose from "@/components/van-thu-luu-tru/detail_propose/15_Payment_propose/Payment_propose";
import Complaint_propose from "@/components/van-thu-luu-tru/detail_propose/16_Complaint_propose/Complaint_propose";
import Plus_effort_propose from "@/components/van-thu-luu-tru/detail_propose/17_Plus_effort_propose/Plus_effort_propose";
import Bonus_payoff_propose from "@/components/van-thu-luu-tru/detail_propose/18_Bonus_payoff_propose/Bonus_payoff_propose";
import Percentage_propose from "@/components/van-thu-luu-tru/detail_propose/19_Percentage_propose/Percentage_propose";
import Absent_propose from "@/components/van-thu-luu-tru/detail_propose/1_Absent_propose/Absent_propose";
import Switch_shift_propose from "@/components/van-thu-luu-tru/detail_propose/2_Switch_shift_propose/Switch_shift_propose";
import Advance_propose from "@/components/van-thu-luu-tru/detail_propose/3_Advance_propose/Advance_propose";
import Asset_allocation_propose from "@/components/van-thu-luu-tru/detail_propose/4_Asset_allocation_propose/Asset_allocation_propose";
import Quit_propose from "@/components/van-thu-luu-tru/detail_propose/5_Quit_propose/Quit_propose";
import Raise_propose from "@/components/van-thu-luu-tru/detail_propose/6_Raise_propose/Raise_propose";
import Assign_propose from "@/components/van-thu-luu-tru/detail_propose/7_Assign_propose/Assign_propose";
import Working_rotation_propose from "@/components/van-thu-luu-tru/detail_propose/8_Working_rotation_propose/Working_rotation_propose";
import Join_project_propose from "@/components/van-thu-luu-tru/detail_propose/9_Join_project_propose/Join_project_propose";

const Detail_propose = ({List_items_propose}:any) => {
  const idItem = useSelector(
    (state: RootState) => state.propose?.selectedElementId
  );
  
  const propose = List_items_propose?.find((p:any) => p.id === idItem);
  const dispatch = useDispatch();
  const handleResetClick = () => {
    dispatch(resetSelectedElement());
  };

  return (
    <div className={styles.wrapper_propose}>
      <div className={styles.wrapper_header}>
        <div className={styles.wrapper_image} onClick={handleResetClick}>
          <Image
            src={"/icon/create_propose/arrow_left.png"}
            width={50}
            height={50}
            alt="Create đề xuất"
          />
        </div>
        <p className={styles.title_propose}>{propose?.title}</p>
      </div>
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_item}>
          {idItem === 1 && <Absent_propose inuse />}
          {idItem === 2 && <Switch_shift_propose inuse />}
          {idItem === 3 && <Advance_propose inuse />}
          {idItem === 4 && <Asset_allocation_propose inuse />}
          {idItem === 5 && <Quit_propose inuse />}
          {idItem === 6 && <Raise_propose inuse />}
          {idItem === 7 && <Assign_propose inuse />}
          {idItem === 8 && <Working_rotation_propose inuse />}
          {idItem === 9 && <Join_project_propose inuse />}
          {idItem === 10 && <Overtime_propose inuse />}
          {idItem === 11 && <Pregnant_propose inuse />}
          {idItem === 12 && <Meeting_room_propose inuse />}
          {idItem === 13 && <Transportation_propose inuse />}
          {idItem === 14 && <Facility_fixing_propose inuse />}
          {idItem === 15 && <Payment_propose inuse />}
          {idItem === 16 && <Complaint_propose inuse />}
          {idItem === 17 && <Plus_effort_propose inuse />}
          {idItem === 18 && <Bonus_payoff_propose inuse />}
          {idItem === 19 && <Percentage_propose inuse />}
          <p className={styles.title_propose}>{propose?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail_propose;
