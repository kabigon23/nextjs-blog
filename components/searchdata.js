import utilStyles from "../styles/utils.module.css";

export default function SearchData({ type, placeholder, value, onchange }) {
    return (<input className={`${utilStyles.input} ${utilStyles.margin10pxd}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
    />)
}