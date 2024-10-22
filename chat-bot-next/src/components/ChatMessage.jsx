import { FaUser, FaRobot } from "react-icons/fa6";
import styles from "../styles/ChatMessage.module.css";

const ChatMessage = ({ message }) => (
    <section className={styles.chatBox}>
        <section className={styles.icon}>
            {message.sender === "user" ? (
                <FaUser className={styles.userIcon} />
            ) : (
                <FaRobot className={styles.botIcon} />
            )}
        </section>

        <section className={styles[message.sender]}>{message.content}</section>
    </section>
);

export default ChatMessage;
