import axios from 'axios';
import { cookies } from 'next/headers';
import { refreshTokenAction } from './actions/actions';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const axiosSecureClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});


axiosSecureClient.interceptors.request.use(
    async(config) => {
      const cookie = (await cookies()).get("access_token")?.value;;
      console.log(cookie);

      refreshTokenAction();
      // if (cookie) {
      //   config.headers.Authorization = `Bearer ${cookie}`;
      // }
      return config;
    },
    (error) => Promise.reject(error)
);

export default axiosSecureClient;
