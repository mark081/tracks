import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://0.0.0.0:8000/graphql/",
});
