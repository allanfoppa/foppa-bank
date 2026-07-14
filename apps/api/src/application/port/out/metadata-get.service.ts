import { GetMetadataResult, GetMetadataUseCase } from '../in/get-metadata.use-case';

export class MetadataService implements GetMetadataUseCase {
  public async execute(): Promise<GetMetadataResult> {
    return {
      "title": "AI Text Summarizer API",
      "summary": "API to summarize text using AI.",
      "version": `${process.env.APP_VERSION}`,
      "author": {
        "name": "Allan Foppa Fagundes",
        "email": "allanfoppa.dev@gmail.com",
        "githubProfile": "https://github.com/allanfoppa",
      },
    }
  }
}