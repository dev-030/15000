import queryString from 'querystring';
import crypto from 'crypto';

function addCountries(url: string, countriesAllowed?: string, countriesBlocked?: string): string {
  let tempUrl = url;
  if (countriesAllowed) {
    const tempUrlOne = new URL(tempUrl);
    tempUrl += ((tempUrlOne.search === "") ? "?" : "&") + "token_countries=" + countriesAllowed;
  }
  if (countriesBlocked) {
    const tempUrlTwo = new URL(tempUrl);
    tempUrl += ((tempUrlTwo.search === "") ? "?" : "&") + "token_countries_blocked=" + countriesBlocked;
  }
  return tempUrl;
}

export function signUrl(
  url: string,
  securityKey: string,
  expirationTime: number = 300, // 5 minutes default
  userIp?: string | null,
  isDirectory: boolean = false,
  pathAllowed: string = "",
  countriesAllowed?: string,
  countriesBlocked?: string
): string {
  let parameterData = "";
  let parameterDataUrl = "";
  let signaturePath = "";
  let hashableBase = "";
  let token = "";
  
  const expires = Math.floor(Date.now() / 1000) + expirationTime;
  url = addCountries(url, countriesAllowed, countriesBlocked);
  
  const parsedUrl = new URL(url);
  const parameters = new URLSearchParams(parsedUrl.search);
  
  if (pathAllowed) {
    signaturePath = pathAllowed;
    parameters.set("token_path", signaturePath);
  } else {
    signaturePath = decodeURIComponent(parsedUrl.pathname);
  }
  
  // Convert parameters to sorted array and process
  const sortedParams: [string, string][] = [];
  parameters.forEach((value, key) => {
    sortedParams.push([key, value]);
  });
  sortedParams.sort((a, b) => a[0].localeCompare(b[0]));
  
  if (sortedParams.length > 0) {
    sortedParams.forEach(([key, value]) => {
      if (!value) return;
      
      if (parameterData.length > 0) {
        parameterData += "&";
      }
      parameterData += key + "=" + value;
      parameterDataUrl += "&" + key + "=" + encodeURIComponent(value);
    });
  }
  
  hashableBase = securityKey + signaturePath + expires + (userIp || "") + parameterData;
  
  // Create token using SHA-256
  const hash = crypto.createHash("sha256").update(hashableBase).digest();
  token = Buffer.from(hash).toString("base64");
  token = token.replace(/\n/g, "").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  
  if (isDirectory) {
    return `${parsedUrl.protocol}//${parsedUrl.host}/bcdn_token=${token}${parameterDataUrl}&expires=${expires}${parsedUrl.pathname}`;
  } else {
    return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}?token=${token}${parameterDataUrl}&expires=${expires}`;
  }
}