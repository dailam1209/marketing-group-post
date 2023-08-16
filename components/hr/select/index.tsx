import React from "react";
type SelectOptionType = { label: string, value: any }
import Select from 'react-select';
import styles from "@/pages/quan-ly-tuyen-dung/danh-sach-ung-vien/candidateListDetail/candidateListDetail.module.css"

const Selects = ({ selectedOption, onChange, setState, option, placeholder, padding, width_control, width_menu, height }: any) => (
    <Select
        defaultValue={selectedOption}
        onChange={(option) => onChange(option, setState)}
        options={option}
        placeholder={placeholder}
        styles={{
            container: (baseStyles) => ({
                ...baseStyles,
                paddingRight: padding
            }),
            menu: (baseStyles, state) => ({
                ...baseStyles,
                width: `${width_menu}%`,
                color: "black",
                zIndex: 1000
            }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: 4,
                borderColor: "#4747477a",
                height: "auto",
                fontSize: state.isFocused ? 14 : 14,
                width: `${width_control}%`,
                fontWeight: state.isFocused ? 600 : 600,
                minHeight: 20
            }),
            indicatorsContainer: (baseStyles) => ({
                ...baseStyles,
                height: height,
            }),
            placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "#444444",
            }),
        }}
    />
)

export default Selects