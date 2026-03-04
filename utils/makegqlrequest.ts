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

    if (response.ok) {
      return { data: responseData.data, errors: responseData.errors };
    } else {
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (error: any) {
    throw new Error(`GraphQL request failed: ${error.message}`);
  }
}

/**
 * Send a GraphQL mutation that includes a file upload.
 * Follows the GraphQL multipart request spec:
 * https://github.com/jaydenseric/graphql-multipart-request-spec
 *
 * @param query     The mutation string. The file variable must be typed as `Upload!`.
 * @param file      The File (or Blob) to upload.
 * @param fileVarPath  Dot-path to the file variable inside `variables`, e.g. "variables.file".
 * @param variables  Non-file variables. Set the file variable to `null` here – this function
 *                   maps the actual file onto it automatically.
 */
export async function fetchGraphqlUpload(
  query: string,
  file: File,
  fileVarPath: string,
  variables?: Record<string, any>,
): Promise<GraphqlResponse> {
  if (!BE_DEPLOYMENT_DOMAIN) {
    throw new Error(
      `DEPLOYMENT_DOMAIN not defined. Please check your env file.`,
    );
  }

  const operations = JSON.stringify({ query, variables: variables ?? {} });
  // "0" is the arbitrary key we assign to the single uploaded file
  const map = JSON.stringify({ "0": [fileVarPath] });

  const formData = new FormData();
  formData.append("operations", operations);
  formData.append("map", map);
  formData.append("0", file, file.name);

  try {
    // Do NOT set Content-Type manually – the browser fills in the correct
    // multipart boundary automatically when using FormData.
    const response = await fetch(BE_DEPLOYMENT_DOMAIN + "/graphql", {
      method: "POST",
      body: formData,
    });
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData.data, errors: responseData.errors };
    } else {
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (error: any) {
    throw new Error(`GraphQL upload request failed: ${error.message}`);
  }
}
