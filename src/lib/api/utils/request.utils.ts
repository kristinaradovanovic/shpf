function stringifyJSON(data: Record<string, unknown>): string | null {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return null;
  }
}

function buildEndpointUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, unknown>,
): string {
  if (!baseUrl) {
    throw new Error('Base URL is not defined. Please check your environment variables.');
  }
  if (!endpoint) {
    throw new Error('Endpoint is not defined');
  }
  if (baseUrl.endsWith('/')) {
    throw new Error(
      'Base URL must NOT end with a slash (/). Please check your environment variables.',
    );
  }
  if (!endpoint.startsWith('/')) {
    throw new Error('Endpoint must start with a slash (/)');
  }

  const completeURL = [];
  // Build the endpoint string
  completeURL.push(`${baseUrl}${endpoint}`);

  // Build parameters string
  if (params) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    completeURL.push(`?${queryParams.toString()}`);
  }
  return completeURL.join('');
}

type CommonRequestConfig = {
  baseUrl: string;
  endpoint: string;
  additionalHeaders?: Record<string, string>;
  params?: Record<string, unknown>;
};

type GetRequestConfig = CommonRequestConfig & {
  method: 'GET';
};

type PostRequestConfig = CommonRequestConfig & {
  method: 'POST';
  body?: Record<string, unknown>;
};

type PutRequestConfig = CommonRequestConfig & {
  method: 'PUT';
  body?: Record<string, unknown>;
};

export type RequestConfig = GetRequestConfig | PostRequestConfig | PutRequestConfig;

export type RequestWrapperResponse<TData> = {
  status: number;
  headers: Headers;
  raw: Response;
  data: TData;
};

export type RequestHandlerResponse<TData> = {
  success: boolean;
  returnCode: number;
  dataReceived?: TData | null;
};
function requestWrapper<TData>(config: RequestConfig): Promise<RequestWrapperResponse<TData>> {
  // Define default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!config?.baseUrl) {
    throw new Error('Base URL is required in the request configuration');
  }

  // Construct the complete endpoint URL
  const completeEndpointURL = buildEndpointUrl(
    config?.baseUrl || '',
    config.endpoint,
    config.params,
  );

  return fetch(completeEndpointURL, {
    method: config.method,
    headers: {
      ...defaultHeaders,
      ...config.additionalHeaders,
    },
    // Handle POST requests
    ...(config.method !== 'GET' && config?.body
      ? {
          body: stringifyJSON(config.body),
        }
      : {}),
  })
    .then(async (res) => {
      let body: TData;
      try {
        body = (await res.json()) as TData;
      } catch (err) {
        console.error(`Failed to parse JSON from ${completeEndpointURL}`, err);
        throw new Error(`Invalid JSON response from ${config.endpoint}`);
      }

      if (!res.ok) {
        console.error(`Non-2xx response from ${completeEndpointURL}`, {
          status: res.status,
          body,
        });
      }

      return {
        data: body,
        status: res.status,
        headers: res.headers,
        raw: res,
      };
    })

    .catch((error) => {
      console.error(`Failed to fetch from ${config.endpoint}`, error);
      throw error;
    });
}

export async function requestHandler<TData>(
  config: RequestConfig & {
    errorConfig: {
      notOkMessage?: string;
      errorMessage?: string;
      disableLogging?: boolean;
    };
  },
): Promise<RequestHandlerResponse<TData>> {
  try {
    // requestWrapper handles the actual request
    const res = await requestWrapper<TData>({
      baseUrl: config.baseUrl,
      endpoint: config.endpoint,
      method: config.method,
      ...(config.method !== 'GET' && config?.body ? { body: config.body } : {}),
      ...(config.params ? { params: config.params } : {}),
      ...(config.additionalHeaders ? { additionalHeaders: config.additionalHeaders } : {}),
    });
    // Check if the response status is not OK (not 200)
    if (!res.raw.ok) {
      // Optional logging
      if (!config.errorConfig.disableLogging) {
        console.error(config.errorConfig.notOkMessage || 'Request failed', res.status, res.data);
      }
      // Return an error response
      return {
        success: false,
        returnCode: res.status,
        dataReceived: null,
      };
    }

    // If the request was successful, return the data
    return {
      success: true,
      returnCode: res.status,
      dataReceived: res.data as TData,
    };
  } catch (error) {
    if (!config.errorConfig.disableLogging) {
      console.error(config.errorConfig.errorMessage || 'Request handler failed', error);
    }
    return {
      success: false,
      returnCode: 500,
    };
  }
}
