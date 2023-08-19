import styles from "./Section.module.css";

export default function Section({
  label,
  input,
  style,
  validation
}: {
  label?: any;
  input: any;
  style: string;
  validation?:any
}) {
  return (
    <div className={styles[style]}>
      {label}
      {input}
      {validation}
    </div>
  );
}
