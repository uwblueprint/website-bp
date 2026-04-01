import { BE_DEPLOYMENT_DOMAIN } from "./secrets";

interface GraphqlResponse {
  data: any;
  errors?: any[];
}

export async function fetchGraphql(
  query: string,
  variables?: any,
): Promise<GraphqlResponse> {
  if (!BE_DEPLOYMENT_DOMAIN) {
    throw new Error("NEXT_PUBLIC_BE_DEPLOYMENT_DOMAIN not defined.");
  }
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };
  try {
    const response = await fetch(
      BE_DEPLOYMENT_DOMAIN + "/graphql",
      requestOptions,
    );
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data };
    }

    throw new Error(
      responseData?.errors?.[0]?.message ?? response.statusText ?? "GraphQL request failed",
    );
  } catch (error: any) {
    throw new Error(`GraphQL request failed: ${error.message}`);
  }
}
