import { CircularProgress } from "@material-ui/core";
import { SubmitBtnType } from "../../lib/types/components";
import styles from "../../pages/auth/Login.module.css";

const SubmitButton = ({
  type,
  isLoading,
  isDasabled,
  action,
  text = "Submit",
}: SubmitBtnType) => {
  return (
    <div className={styles.submit}>
      {action ? (
        <button
          type={type ?? "submit"}
          onClick={() => action()}
          disabled={isDasabled}
        >
          {text}
        </button>
      ) : (
        <button className="" type={type ?? "submit"} disabled={isDasabled}>
          {isLoading ? <CircularProgress size={20} /> : text}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
