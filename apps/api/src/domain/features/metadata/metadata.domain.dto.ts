export type MetadataDto = {
  title: string;
  summary: string;
  version: string;
  author: MetadataAuthorDto
};

type MetadataAuthorDto = {
  name: string;
  email: string;
  githubProfile: string;
};