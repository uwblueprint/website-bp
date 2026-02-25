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
    throw new Error(
      `NEXT_PUBLIC_BE_DEPLOYMENT_DOMAIN not defined. Please check your env file.`,
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

    // Many GraphQL servers return HTTP 200 even when resolvers error.
    if (responseData?.errors?.length) {
      throw new Error(JSON.stringify(responseData.errors));
    }

    if (!response.ok) {
      throw new Error(
        JSON.stringify(
          responseData?.errors ?? [{ message: response.statusText }],
        ),
      );
    }

    if (
      !responseData ||
      typeof responseData !== "object" ||
      !("data" in responseData)
    ) {
      throw new Error("Invalid GraphQL response");
    }

    return { data: responseData.data };
  } catch (error: any) {
    throw new Error(`GraphQL request failed: ${error.message}`);
  }
}
