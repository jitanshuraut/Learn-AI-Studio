import { modelEmbedding } from '../../genAI'
const timeout = 180000

export const queryPineconeVectorStore = async (
    client: any,
    indexName: any,
    question: any
) => {

    console.log('Querying Pinecone vector store...');
    const index = client.Index(indexName);
    console.log('Querying', question)
    const queryEmbedding = await modelEmbedding.embedContent(question)
    console.log(queryEmbedding.embedding.values);
    let queryResponse = await index.query({
        vector: queryEmbedding.embedding.values,
        topK: 10,
        includeValues: true,
        includeMetadata: true,
    });

    console.log(`Found ${queryResponse.matches.length} matches...`);
    console.log(`Asking question: ${question}...`);
    return queryResponse;
};


export const createPineconeIndex = async (
    client: any,
    indexName: any,
    vectorDimension: any
) => {

    console.log(`Checking "${indexName}"...`);
    const existingIndexes = await client.listIndexes();
    console.log(existingIndexes)
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
    console.log('Retrieving Pinecone index...');
    const index = client.Index(indexName);
    const queryEmbedding = await modelEmbedding.embedContent(docs.content)
    console.log(queryEmbedding.embedding.values);

    const vector = {
        id: docs.id,
        values: queryEmbedding.embedding.values,
        metadata: { name: docs.name }
    };

    await index.upsert([vector]);

};
