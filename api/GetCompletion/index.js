
const { encode } = require("gpt-3-encoder");
const authService = require("../services/authService");

module.exports = async function (context, req) {
    const { authorized, newContext } = authService.isUserAuthorized(req, context);
    if (!authorized) {
        return newContext;
    }

    // read the source and prompt parameters from the body of the request. The body is www-form-urlencoded.
    const { userPrompt, systemPrompt } = req.body;

    // encode the prompts
    const userPromptEncoded = encode(userPrompt);
    const systemPromptEncoded = encode(systemPrompt);

    const availableTokenLength =
        16000 - (userPromptEncoded.length + systemPromptEncoded.length);

    // call the OpenAI API to generate a summary
    let openAIReq = {
        messages: [
            {
                role: "system",
                content: `${systemPrompt} You have ${availableTokenLength} available tokens for your response.`,
            },
            { role: "user", content: userPrompt },
        ],
    };

    const response = await fetch(
        "https://chatterbox.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-05-15",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.AZURE_OPENAI_KEY,
            },
            body: JSON.stringify(openAIReq),
        }
    );

    const json = await response.json();

    if (response.status !== 200) {
        context.res = {
            status: response.status,
            body: { body: json.error.message },
        };
        return;
    }

    context.res = {
        status: response.status,
        body: {
            content: json.choices[0].message.content,
            usedTokens: json.usage.total_tokens,
            availableTokens: 16384,
        },
    };
};
