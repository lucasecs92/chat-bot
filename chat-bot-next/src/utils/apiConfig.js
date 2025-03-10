const sendMessageToAPI = async (userMessage) => {
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY,
            "x-rapidapi-host": 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: userMessage }],
        }),
    };

    return fetch("https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions", options)
        .then((response) => response.json())
        .then((data) => data.choices[0].message.content)
        .catch((error) => {
            if (error.name === "TypeError") {
                throw new Error("Check Your API Key!");
            }
            throw error;
        });
};

export default sendMessageToAPI;