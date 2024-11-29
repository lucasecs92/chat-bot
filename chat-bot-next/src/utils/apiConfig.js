
const sendMessageToAPI = (userMessage) => {
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": 'ef2122feebmsh38336795674fe3cp13c5ebjsnddb427cd2a70',
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