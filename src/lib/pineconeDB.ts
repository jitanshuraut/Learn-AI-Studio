import { modelEmbedding } from '../../genAI'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
const timeout = 180000

export const queryPineconeVectorStoreAndQueryLLM = async (
    client: any,
    indexName: any,
    question: any
) => {

    console.log('Querying Pinecone vector store...');
    const index = client.Index(indexName);
    const queryEmbedding = await modelEmbedding.embedContent(question)
    console.log(queryEmbedding.embedding.values);
    let queryResponse = await index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
        },
    });

    console.log(`Found ${queryResponse.matches.length} matches...`);
    console.log(`Asking question: ${question}...`);

};
export const createPineconeIndex = async (
    client: any,
    indexName: any,
    vectorDimension: any
) => {

    console.log(`Checking "${indexName}"...`);
    const existingIndexes = await client.listIndexes();
    console.log(existingIndexes)

    // if (!existingIndexes.includes(indexName)) {

    await client.createIndex({
        name: indexName,
        dimension: vectorDimension,
        metric: 'cosine',
        spec: {
            serverless: {
                cloud: 'aws',
                region: 'us-east-1'
            }
        }
    });
    // }


};


export const updatePinecone = async (client: any, indexName: any, docs: any) => {
    console.log('Retrieving Pinecone index...');
    const index = client.Index(indexName);
    const queryEmbedding = await modelEmbedding.embedContent(docs.content)
    console.log(queryEmbedding.embedding.values);

    const vector = {
        id: docs.id,
        values: queryEmbedding.embedding.values,
    };

    await index.upsert([vector]);

};
