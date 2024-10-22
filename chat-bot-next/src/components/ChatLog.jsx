import ChatMessage from "./ChatMessage";
import styles from "../styles/ChatLog.module.css";

const ChatLog = ({ chatLog }) => (
  <section className={styles.chatLog}>
    {chatLog.map((msg, index) => (
      <ChatMessage key={index} message={msg} />
    ))}
  </section>
);

export default ChatLog;
