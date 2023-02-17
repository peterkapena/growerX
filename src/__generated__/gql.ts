/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    isValid\n    organisationId\n  }\n}": types.VerifyTokenDocument,
    "\nmutation Signin($input: SigninInput!) {\n  signin(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    message\n  }\n}\n": types.SigninDocument,
    "\nquery GetFlagsByType($input: Float!) {\n    getFlagsByType(input: $input) {\n      description\n      _id\n    }\n  }\n": types.GetFlagsByTypeDocument,
    "\nmutation AddProduct($input: AddProductSchemaInput!) {\n    addProduct(input: $input) {\n      quantity\n      organisationId\n      flgProductType\n      _id\n    }\n  }\n": types.AddProductDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    isValid\n    organisationId\n  }\n}"): (typeof documents)["\nmutation VerifyToken($input: String!) {\n  verifyToken(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    isValid\n    organisationId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Signin($input: SigninInput!) {\n  signin(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    message\n  }\n}\n"): (typeof documents)["\nmutation Signin($input: SigninInput!) {\n  signin(input: $input) {\n    username\n    token\n    email\n    surName\n    givenName\n    message\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetFlagsByType($input: Float!) {\n    getFlagsByType(input: $input) {\n      description\n      _id\n    }\n  }\n"): (typeof documents)["\nquery GetFlagsByType($input: Float!) {\n    getFlagsByType(input: $input) {\n      description\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddProduct($input: AddProductSchemaInput!) {\n    addProduct(input: $input) {\n      quantity\n      organisationId\n      flgProductType\n      _id\n    }\n  }\n"): (typeof documents)["\nmutation AddProduct($input: AddProductSchemaInput!) {\n    addProduct(input: $input) {\n      quantity\n      organisationId\n      flgProductType\n      _id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;