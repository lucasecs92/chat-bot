import { FaPaperPlane, FaSpinner } from "react-icons/fa6";
import styles from "../styles/Input.module.css";

const Input = ({ message, onChange, onSend, loading }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSend(message);
    }
  };

  return (
    <section className={styles.inputContainer}>
      <input
        type="text"
        id="user-message"
        className={styles.userInput}
        value={message}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        placeholder="Send a message."
      />
      <button className={styles.sendButton} onClick={() => onSend(message)} disabled={loading}>
        {loading ? 
            <FaSpinner className={styles.spinner} /> 
            : 
            <FaPaperPlane />
        }
      </button>
    </section>
  );
};

export default Input;
