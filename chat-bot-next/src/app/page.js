"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Info from "@/components/Info";
import Input from "@/components/Input";
import ChatMessage from "@/components/ChatMessage";

import sendMessageToAPI from "../utils/apiConfig";
import styles from "./page.module.css";

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = (message) => {
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
      setLoading(true);
      sendMessageToAPI(message)
        .then((botMessage) => {
          appendMessage("bot", botMessage);
          setLoading(false);
        })
        .catch((error) => {
          appendMessage("bot", error.message);
          setLoading(false);
        });
    }

    setMessage(""); // Limpar campo de entrada após o envio
  };

  const appendMessage = (sender, messageContent) => {
    const newMessage = { sender, content: messageContent };
    setChatLog((prevChatLog) => [...prevChatLog, newMessage]);
  };

  return (
    <>
      <section className={styles.container}>
        <Header />
        <Info chatLog={chatLog} />
        <section className={styles.chatContainer}>
          {chatLog.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </section>
        <Input
          message={message}
          onChange={handleMessageChange}
          onSend={handleSendMessage}
          loading={loading}
        />
      </section>
    </>
  );
}

export default ChatContainer;