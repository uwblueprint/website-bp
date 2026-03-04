import { BE_DEPLOYMENT_DOMAIN } from "./secrets";

interface GraphqlResponse {
  data: any | null;
  errors?: any[];
}

export async function fetchGraphql(
  query: string,
  variables?: any,
): Promise<GraphqlResponse> {
  if (!BE_DEPLOYMENT_DOMAIN) {
    throw new Error(
      `DEPLOYMENT_DOMAIN not defined. Please check your env file.`,
    );
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

    if (!response.ok) {
      throw new Error(JSON.stringify(responseData.errors));
    }

    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
      throw new Error(JSON.stringify(responseData.errors));
    }

    if (!responseData || typeof responseData !== "object") {
      throw new Error("Invalid GraphQL response payload");
    }

    return {
      data: "data" in responseData ? responseData.data : null,
      errors: responseData.errors,
    };
  } catch (error: any) {
    throw new Error(`GraphQL request failed: ${error.message}`);
  }
}
