import Groq from "groq-sdk";

const groq = new Groq({ 
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
});

const sendMessageToAPI = async (userMessage) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false, // Desativado o stream para simplificar o retorno no seu chat atual
        });

        return chatCompletion.choices[0]?.message?.content || "Sem resposta do bot.";
    } catch (error) {
        console.error("Erro na API:", error);
        if (error.status === 401) throw new Error("Chave de API inválida!");
        throw new Error("Erro ao consultar o Groq. Tente novamente.");
    }
};

export default sendMessageToAPI;