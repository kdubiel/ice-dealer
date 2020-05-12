import { gql } from 'apollo-server-express';

export const directivesSchemas = gql`
  directive @auth(
    roles: [UserRole!]
  ) on FIELD_DEFINITION | OBJECT | QUERY | MUTATION
`;

export { default as AuthDirective } from './authDirective';
