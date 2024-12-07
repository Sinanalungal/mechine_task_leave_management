import axios from 'axios';

class AccessTokenManager {
  constructor(baseUrl, user) {
    this.baseUrl = baseUrl;
    this.user = user;
  }

  async getAccessToken() {
    try {
      console.log('getting token...');
      return this.user.access;
    } catch {
      console.log('log is working');
      window.location.reload();
    }
  }

  async refreshToken() {
    console.log('refreshing token...');
    const refreshToken = this.user.refresh;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user_authentication/token/refresh/`, { refresh: refreshToken });
      console.log(response, 'refreshtoken response');
      console.log(response.data, 'new token gets ');

      const { access, refresh } = response.data;
      const tokens = { access, refresh };
      localStorage.setItem('LeaveTrackTokens', JSON.stringify(tokens));
      this.user.access = access;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      localStorage.removeItem('LeaveTrackTokens');
      window.location.reload();
    }
  }

  isAccessTokenExpired() {
    console.log('token checking...');
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000;
    return Date.now() >= exp;
  }

  async createAxiosInstance() {
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });

    axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await this.getAccessToken();
        console.log(accessToken);
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        if (this.isAccessTokenExpired() || Date.now() + 20000 >= this.getExpirationTime()) {
          try {
            await this.refreshToken();
          } catch (error) {
            console.log('catch block is working');
            localStorage.removeItem('LeaveTrackTokens');
            window.location.reload();
          }
        }

        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${this.user.access}`;
        console.log('axios is ok');
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }

  getExpirationTime() {
    console.log('expiration time checking...');
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000;
    console.log(exp);
    return exp;
  }
}

export default AccessTokenManager;
