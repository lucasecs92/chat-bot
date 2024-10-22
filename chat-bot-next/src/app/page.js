"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Info from "@/components/Info";
import ChatLog from "@/components/ChatLog";
import Input from "@/components/Input";
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
        <Header />
        <Info chatLog={chatLog}/>
        <section className={styles.chatContainer}>
          <ChatLog chatLog={chatLog}/>
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
