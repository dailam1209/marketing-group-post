import style from "./home.module.css";
export default function HomeItemBox({
  boxTitle,
  boxDesPrimary,
  boxDesWarning,
  boxDesSucess,
}: any) {
  return (
    <div className={style.item_box} >
      <div className={style.box_title}>{boxTitle}</div>
      <div className={style.box_des}>
        {boxDesPrimary && (
          <div className={`${style.box__des_item} ${style.primary}`}>
            <span>{boxDesPrimary.title}</span>
            <span className={style.box_des_num}>{boxDesPrimary.amount}</span>
          </div>
        )}
        {boxDesSucess && (
          <div className={`${style.box__des_item} ${style.success}`}>
            <span>{boxDesSucess.title}</span>
            <span className={style.box_des_num}>{boxDesSucess.amount}</span>
          </div>
        )}
        {boxDesWarning && (
          <div className={`${style.box__des_item} ${style.warning}`}>
            <span>{boxDesWarning.title}</span>
            <span className={style.box_des_num}>{boxDesWarning.amount}</span>
          </div>
        )}
      </div>
    </div>
  );
}
