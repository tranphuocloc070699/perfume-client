interface IHttpFactory {
  method:
    | "GET"
    | "HEAD"
    | "PATCH"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "get"
    | "head"
    | "patch"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace";
  url: string;
  fetchOptions?: RequestInit;
  body?: object;
}

class HttpFactory {
  accessToken: string = "";
  constructor(accessToken?: string) {
    if (accessToken) this.accessToken = accessToken;
  }

  async call<T>({ method, url, fetchOptions, body }: IHttpFactory): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(this.accessToken && {
          Authorization: `Bearer ${this.accessToken}`,
        }),
      },
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions,
    };

    try {
      const response = await fetch(url, options);

      return await response.json();
    } catch (error) {
      throw new Error(`Fetch error: ${(error as Error).message}`);
    }
  }
}

export default HttpFactory;
