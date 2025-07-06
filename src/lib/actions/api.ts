import { cookies } from "next/headers";



interface ApiOptions extends RequestInit {
  params?: Record<string, string | number>;
  requiresAuth?: boolean;
  next?: NextFetchRequestConfig; 
}

class RestApi {

    private baseUrl: string;

    constructor () {
        this.baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? '';
        if (!this.baseUrl) {
            throw new Error('NEXT_PUBLIC_SERVER_URL is not defined');
        }
    }


    private buildURL(endpoint: string, params?: Record<string, string | number>) {

        const url = new URL(`${this.baseUrl}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }
        
        return url.toString();
    }


    private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T|{status:number}> {

        const { params, requiresAuth = false, ...fetchOptions } = options;
        
        const url = this.buildURL(endpoint, params);
        
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(fetchOptions.headers as Record<string, string> || {}),
        };

        if (requiresAuth) {
            const accessToken = (await cookies()).get("access_token")?.value; 
            if (!accessToken) {
                throw new Error('Access token is not found. Please login first.');
            }
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            ...fetchOptions,
            headers,
        });

        if (!response.ok) {
            console.log(response);
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        if (response.status === 204) {
            return {status: response.status};
        }

        return response.json();
    }


    async get<T>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, options?: Omit<ApiOptions, 'method'>): Promise<T|{status:number}> {
        return this.request<T>(endpoint, { ...options, method: 'POST' });
    }

    async put<T>(endpoint: string, data?: any, options?: Omit<ApiOptions, 'method'>) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(endpoint: string, data?: any, options?: Omit<ApiOptions, 'method'>): Promise<T|{status:number}> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>): Promise<T|{status:number}> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

  
}

export const apiService = new RestApi();

