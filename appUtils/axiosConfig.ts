import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_API_URL}/api/V1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
