import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from '@pinecone-database/pinecone'
import { createPineconeIndex, updatePinecone } from "@/lib/pineconeDB"
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const API_KEY: string = process.env.GENAI || "";

const genAI: any = new GoogleGenerativeAI(API_KEY);


const safetySetting = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview", safetySetting });
const modelEmbedding = genAI.getGenerativeModel({
    model: "gemini-embedding-001"
});
const client = new Pinecone({
    apiKey: process.env.PINECONE || '',
})
const vectorDimensions = 3072;
(async function () {
    try {
        await createPineconeIndex(client, "course", vectorDimensions);
    } catch (err) {
        console.log("already exits");
    }
})();
export { model, modelEmbedding, client };