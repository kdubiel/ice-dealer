import { ApolloError } from 'apollo-boost';
import i18n from 'i18next';

export const mapApolloErrorMessages = (
  error: ApolloError | undefined
): string[] | undefined => {
  if (!error) return undefined;

  const { graphQLErrors, networkError } = error;
  if (networkError) return [i18n.t('errorMessages:network')];

  return graphQLErrors.map(({ message }) => message);
};
