type Server = {
  base: string;
  backup: string;
};

const servers: Server = {
  base: "http://192.168.1.100:8000",
  backup: "http://192.168.1.100:8030",
};

class Resp<T> {
  constructor(
    public result: boolean = false,
    public msg: string = "",
    public content: T
  ) {}
}

async function FetchGet<T>(
  api: string,
  server: keyof Server = "base"
): Promise<Resp<T>> {
  try {
    const response = await fetch(servers[server] + api);
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }
    return (await response.json()) as Resp<T>;
  } catch (err) {
    return new Resp<T>(false, String(err), null as T);
  }
}

async function FetchPost<T>(
  api: string,
  body: unknown,
  server: keyof Server = "base"
): Promise<Resp<T>> {
  try {
    const response = await fetch(servers[server] + api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }
    if (await DownloadFile(response)) {
      return new Resp<T>(true, `download file success`, null as T);
    } else {
      return (await response.json()) as Resp<T>;
    }
  } catch (err) {
    return new Resp<T>(false, String(err), null as T);
  }
}

async function UploadFile<T>(
  api: string,
  body: FormData,
  server: keyof Server = "base"
): Promise<Resp<T>> {
  try {
    const response = await fetch(servers[server] + api, {
      method: "POST",
      body: body,
    });
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }

    if (await DownloadFile(response)) {
      return new Resp<T>(true, `download file success`, null as T);
    } else {
      return (await response.json()) as Resp<T>;
    }
  } catch (error) {
    return new Resp<T>(false, String(error), null as T);
  }
}

async function FetchFile<T>(
  api: string,
  server: keyof Server = "base"
): Promise<Resp<T>> {
  try {
    const response = await fetch(servers[server] + api);
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }

    if (await DownloadFile(response)) {
      return new Resp<T>(true, `download file success`, null as T);
    } else {
      return (await response.json()) as Resp<T>;
    }
  } catch (error) {
    return new Resp<T>(false, String(error), null as T);
  }
}

async function DownloadFile(response: Response): Promise<boolean> {
  const disposition = response.headers.get("Content-Disposition");
  let fileName = "downloaded_file";
  if (disposition && disposition.includes("filename=")) {
    fileName = disposition.split("filename=")[1];
  } else {
    return false;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  return true;
}

export {
  servers,
  FetchGet,
  FetchPost,
  FetchFile,
  UploadFile,
  DownloadFile,
  Resp,
};
