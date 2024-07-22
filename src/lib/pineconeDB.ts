import { modelEmbedding } from '../../genAI'
const timeout = 180000

export const queryPineconeVectorStore = async (
    client: any,
    indexName: any,
    question: any
) => {
    const index = client.Index(indexName);
    const queryEmbedding = await modelEmbedding.embedContent(question)
    let queryResponse = await index.query({
        vector: queryEmbedding.embedding.values,
        topK: 10,
        includeValues: true,
        includeMetadata: true,
    });
    return queryResponse;
};


export const createPineconeIndex = async (
    client: any,
    indexName: any,
    vectorDimension: any
) => {

    const existingIndexes = await client.listIndexes();
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
};


export const updatePinecone = async (client: any, indexName: any, docs: any) => {
    const index = client.Index(indexName);
    const queryEmbedding = await modelEmbedding.embedContent(docs.content)
    const vector = {
        id: docs.id,
        values: queryEmbedding.embedding.values,
        metadata: { name: docs.name }
    };

    await index.upsert([vector]);

};
