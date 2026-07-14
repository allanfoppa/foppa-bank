export type GetMetadataResult = {
  title: string;
  summary: string;
  version: string;
  author: {
    name: string;
    email: string;
    githubProfile: string;
  };
};

export interface GetMetadataUseCase {
  execute(): Promise<GetMetadataResult>;
}
