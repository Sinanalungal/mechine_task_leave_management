import AccessTokenManager from "./interceptor";

export const getAxiosInstance = async () => {
  const authTokens = localStorage.getItem('LeaveTrackTokens');
  // console.log(authTokens,'this is the auth token from axios instance');
  const parsedTokens = authTokens ? JSON.parse(authTokens) : null;
    console.log(parsedTokens,'this is the parsed token from axios instance');
    
  const accessTokenManager = new AccessTokenManager('http://localhost:8000', parsedTokens);
  const axiosInstance = await accessTokenManager.createAxiosInstance();

  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
};
