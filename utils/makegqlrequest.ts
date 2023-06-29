import { BE_DEPLOYMENT_DOMAIN } from "./secrets";

interface GraphqlResponse {
  data: any;
  errors?: any[];
}

export async function fetchGraphql(query: string, variables?: any): Promise<GraphqlResponse> {
  if (!BE_DEPLOYMENT_DOMAIN) {
    throw new Error(`DEPLOYMENT_DOMAIN not defined. Please check your env file.`)
  }
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  };
  try {
    const response = await fetch(BE_DEPLOYMENT_DOMAIN + "/graphql", requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data };
    } else {
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (error: any) {
    throw new Error(`GraphQL request failed: ${error.message}`);
  }
}