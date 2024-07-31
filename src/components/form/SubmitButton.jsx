import styles from "./SubmitButton.module.css";
function SubmitButton({ text, onClick, disabled }) {
  return (
    <div>
      <button disabled={disabled} onClick={onClick} className={styles.btn}>
        {text}
      </button>
    </div>
  );
}
export default SubmitButton;
