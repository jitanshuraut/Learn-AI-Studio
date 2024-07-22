import { NextResponse, NextRequest } from "next/server";
import { client } from "../../../../genAI";
import { queryPineconeVectorStore } from "@/lib/pineconeDB";

interface Metadata {
    name?: string;
}

interface Match {
    id: string;
    score: number;
    values: any[];
    sparseValues?: unknown;
    metadata?: Metadata;
    matches?: Match[];
}

interface QueryResult {
    matches: Match[];
    namespace: string;
    usage: { readUnits: number };
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    try {
        const data_Query = await queryPineconeVectorStore(client, "course", String(data.Query));
        console.log(data_Query)

        const extractedData: { id: string; name: string }[] = [];

        data_Query.matches.forEach((match: Match) => {
            if (match.score && match.score > 0.50) {
              if (match.id && match.metadata && match.metadata.name) {
                extractedData.push({ id: match.id, name: match.metadata.name });
              }
          
              if (match.matches) {
                match.matches.forEach(innerMatch => {
                  if (innerMatch.score && innerMatch.score > 0.75) {
                    if (innerMatch.id && innerMatch.metadata && innerMatch.metadata.name) {
                      extractedData.push({ id: innerMatch.id, name: innerMatch.metadata.name });
                    }
                  }
                });
              }
            }
          });

        console.log(extractedData);

        return NextResponse.json({ data: extractedData });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



