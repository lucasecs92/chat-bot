"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { FaPaperPlane, FaRobot, FaSpinner, FaUser } from "react-icons/fa6";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Adiciona a mensagem do usuário ao log
    appendMessage("user", message);

    if (message === "developer") {
      setLoading(true);
      setTimeout(() => {
        appendMessage("bot", "This Source Coded By Lucas");
        setLoading(false);
      }, 2000);
    } else {
      // Simular envio de mensagem para API
      sendMessageToAPI(message);
    }

    setMessage(""); // Limpar campo de entrada após o envio
  };

  const sendMessageToAPI = (userMessage) => {
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "x-rapidapi-host": "chat-gpt26.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    };

    setLoading(true);

    fetch("https://chat-gpt26.p.rapidapi.com/", options)
      .then((response) => response.json())
      .then((data) => {
        appendMessage("bot", data.choices[0].message.content);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name === "TypeError") {
          appendMessage("bot", "Error: Check Your API Key!");
        }
        setLoading(false);
      });
  };

  const appendMessage = (sender, messageContent) => {
    const newMessage = { sender, content: messageContent };
    setChatLog((prevChatLog) => [...prevChatLog, newMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <section className={styles.container}>
        <section className={styles.header}>
          <h3>Basic ChatGPT Bot</h3>
        </section>

        {/* Condicionalmente exibe a .info somente quando o chatLog está vazio */}
        {chatLog.length === 0 && (
          <section className={styles.info}>
            <a href="https://portfolio-devlucas.vercel.app/" target="_blank">
              Coded by Lucas
            </a>
          </section>
        )}

        <section className={styles.chatContainer}>
          <section className={styles.chatLog}>
            {chatLog.map((msg, index) => (
              <section key={index} className={styles.chatBox}>

                <section className={styles.icon}>
                  {msg.sender === "user" ? (
                    <FaUser className={styles.userIcon} />
                  ) : (
                    <FaRobot className={styles.botIcon} />
                  )}
                </section>

                <section className={styles[msg.sender]}>{msg.content}</section>
              </section>
            ))}
          </section>
        </section>

        <section className={styles.inputContainer}>
          <input
            type="text"
            className={styles.userInput}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            placeholder="Send a message."
          />
          <button className={styles.sendButton} onClick={handleSendMessage} disabled={loading}>
            {loading ? (
              <FaSpinner className={styles.spinner}/>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </section>
      </section>
    </>
  );
}
