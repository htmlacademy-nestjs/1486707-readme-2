export enum ApplicationServiceURL {
  Files = 'http://localhost:3001/api/files',
  Articles = 'http://localhost:3000/api/article',
  Comments = 'http://localhost:3000/api/comment',
  Tags = 'http://localhost:3000/api/tags',
  Auth = 'http://localhost:3004/api/auth',
  Users = 'http://localhost:3004/api/author',
  Notifications = 'http://localhost:3002/api/notifications',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
