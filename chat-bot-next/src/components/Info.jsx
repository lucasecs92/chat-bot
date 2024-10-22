import styles from "../styles/Info.module.css";

const Info = ({ chatLog }) => (
  <>
    {chatLog && chatLog.length === 0 && (
      <section className={styles.info}>
        <a href="https://portfolio-devlucas.vercel.app/" target="_blank">
          Coded by Lucas
        </a>
      </section>
    )}
  </>
);

export default Info;
