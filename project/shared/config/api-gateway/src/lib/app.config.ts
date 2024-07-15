export enum ApplicationServiceURL {
  Files = 'http://localhost:3001/api/files',
  Articles = 'http://localhost:3003/api/article',
  Comments = 'http://localhost:3003/api/comment',
  Tags = 'http://localhost:3003/api/tags',
  Auth = 'http://localhost:3004/api/auth',
  Users = 'http://localhost:3004/api/author',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
