import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    // PromiseLikeOfReactNode,
    Key,
    useContext,
    useState,
    useEffect,
} from "react";
import styles from "../order.module.css";
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";

export default function OrderDropDownDataStep({
    data = [],
    value = " Chọn",
    setValue = () => { },
    setKeyword = () => { },
    keyword = '',
}: any) {
    const { shouldFetchProd } = useContext(QuoteContext)
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(inputValue.trim())
        }, 1000);

        return () => clearTimeout(timer)
    }, [inputValue])

    useEffect(() => {
        if (shouldFetchProd) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [shouldFetchProd])

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
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
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
                            className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
                        >
                            {value}
                        </li>
                        {isLoading ? (
                            <Spin
                                style={{
                                    margin: "auto",
                                    width: "100%",
                                    display: "block",
                                    padding: "5px",
                                    height: "100%",
                                }}
                            />
                        ) : data?.map(
                            (
                                item:
                                    | string
                                    | number
                                    | boolean
                                    | ReactElement<
                                        any,
                                        string | JSXElementConstructor<any>
                                    >
                                    | Iterable<ReactNode>
                                    | ReactPortal
                                    // | PromiseLikeOfReactNode
                                    | null
                                    | undefined,
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
                                    onClick={() => { setValue(item); setInputValue('') }}
                                >
                                    {item}
                                </li>
                            )
                        )}
                    </ul>
                </span>
            </span>
        </span>
    );
}
