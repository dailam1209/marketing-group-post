import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  // PromiseLikeOfReactNode,
  Key,
} from "react";
import styles from "../potential.module.css";
type ItemType = { value: number; label: string };
export default function PotentialDropDownDataStep({
  data = [],
  value = " Chọn người dùng",
  selectData,
  placeholder,
}: any) {
  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{ width: "100%", display: "block" }}
      >
        <span
          className={`${styles.select2_search} ${styles.select2_search__dropdown}`}
        >
          <input
            className={styles.select2_search__field}
            type="search"
            tabIndex={0}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            role="textbox"
            style={{ height: "34px" }}
          />
        </span>
        <span className={styles.select2_results}>
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
          >
            <li
              //   onClick={() => selectData(placeholder)}
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
            >
              {placeholder}
            </li>
            {data?.map(
              (
                item: ItemType,
                //   | string
                //   | number
                //   | boolean
                //   | ReactElement<any, string | JSXElementConstructor<any>>
                //   | Iterable<ReactNode>
                //   | ReactPortal
                //   // | PromiseLikeOfReactNode
                //   | null
                //   | undefined,
                i: Key | null | undefined
              ) => (
                <li
                  key={i}
                  className={`${styles.select2_results__option}}`}
                  style={{
                    marginTop: "10px",
                    padding: "5px 0",
                    paddingLeft: "18px",
                  }}
                  onClick={() => selectData(item.value)}
                >
                  {item.label}
                </li>
              )
            )}
          </ul>
        </span>
      </span>
    </span>
  );
}
