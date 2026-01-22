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

  const handleSendMessage = async (msgText) => {
    if (msgText.trim() === "") return;

    // Adiciona a mensagem do usuário ao log
    const userMsg = { id: Date.now(), sender: "user", content: msgText };
    setChatLog((prev) => [...prev, userMsg]);
    setMessage(""); // Limpar campo imediatamente

    if (msgText.toLowerCase() === "developer") {
      setLoading(true);
      setTimeout(() => {
        appendBotMessage("This Source Coded By Lucas");
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
      try {
        const botResponse = await sendMessageToAPI(msgText);
        appendBotMessage(botResponse);
      } catch (error) {
        appendBotMessage("Erro: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const appendBotMessage = (content) => {
    setChatLog((prev) => [
      ...prev,
      { id: Date.now() + 1, sender: "bot", content: content },
    ]);
  };

  return (
    <section className={styles.container}>
      <Header />
      <Info chatLog={chatLog} />
      
      <section className={styles.chatContainer}>
        {chatLog.map((msg) => (
          // Usando msg.id em vez do index do array para melhor performance e evitar bugs
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </section>

      <Input
        message={message}
        onChange={handleMessageChange}
        onSend={() => handleSendMessage(message)}
        loading={loading}
      />
    </section>
  );
}

export default ChatContainer;