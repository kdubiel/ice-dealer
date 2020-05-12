import { SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLField,
  GraphQLFieldResolver,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import { Context } from 'graphql/context';
import { UserRole } from 'graphql/utils';
import AuthService from '../../services/AuthService/AuthService';

const addVerificationToField = (
  field: GraphQLField<null, Context>,
  expectedRoles: UserRole[],
  resolve: GraphQLFieldResolver<null, Context>
) => {
  field.resolve = function(result, args, context, info) {
    if (
      (!expectedRoles && AuthService.isAuthenticated(context)) ||
      AuthService.isAuthorized(context, expectedRoles)
    ) {
      return resolve(result, args, context, info);
    }

    throw new Error('AuthDirective error.');
  };
};

export default class AuthDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(_: string, schema: GraphQLSchema) {
    return new GraphQLDirective({
      name: 'role',
      locations: [
        DirectiveLocation.FIELD_DEFINITION,
        DirectiveLocation.OBJECT,
        DirectiveLocation.QUERY,
        DirectiveLocation.MUTATION,
      ],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('UserRole')!),
          defaultValue: null,
        },
      },
    });
  }

  visitFieldDefinition(field: GraphQLField<null, Context>) {
    const expectedRoles = this.args.roles;
    const { resolve = defaultFieldResolver } = field;

    addVerificationToField(field, expectedRoles, resolve);
  }

  visitObject(object: GraphQLObjectType<null, Context>) {
    const expectedRoles = this.args.roles;
    this.ensureFieldsWrapped(object, expectedRoles);
  }

  ensureFieldsWrapped(
    objectType: GraphQLObjectType<null, Context> | GraphQLInterfaceType,
    roles: UserRole[]
  ) {
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      addVerificationToField(field, roles, resolve);
    });
  }
}
