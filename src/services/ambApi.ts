import axios, { AxiosInstance } from 'axios';

export interface AMBGame {
  productId: string;
  gameCode: string;
  gameName: string;
  gameType: string;
  provider: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
}

export interface AMBGameLaunchResponse {
  success: boolean;
  message?: string;
  data: {
    gameUrl: string;
    sessionToken: string;
  };
}

export interface AMBGamesResponse {
  success: boolean;
  message?: string;
  data: AMBGame[];
}

class AMBSuperAPIClient {
  private client: AxiosInstance;
  private agentUsername: string;
  private apiKey: string;

  constructor() {
    this.agentUsername = process.env.REACT_APP_AMB_AGENT_USERNAME || '';
    this.apiKey = process.env.REACT_APP_AMB_API_KEY || '';
    
    // Create Basic Auth header
    const basicAuth = btoa(`${this.agentUsername}:${this.apiKey}`);
    
    this.client = axios.create({
      baseURL: 'https://api.ambsuperapi.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        console.log(`AMB API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`AMB API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`AMB API Error:`, error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async getGames(): Promise<AMBGamesResponse> {
    try {
      const response = await this.client.get('/seamless/games');
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to fetch games',
        data: []
      };
    }
  }

  async loginToGame(params: {
    username: string;
    productId: string;
    gameCode: string;
    isMobileLogin: boolean;
    sessionToken: string;
    language?: string;
    callbackUrl?: string;
  }): Promise<AMBGameLaunchResponse> {
    try {
      const response = await this.client.post('/seamless/logIn', {
        username: params.username,
        productId: params.productId,
        gameCode: params.gameCode,
        isMobileLogin: params.isMobileLogin,
        sessionToken: params.sessionToken,
        language: params.language || 'en',
        callbackUrl: params.callbackUrl || window.location.origin
      });

      return {
        success: true,
        data: {
          gameUrl: response.data.gameUrl,
          sessionToken: params.sessionToken
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to launch game',
        data: {
          gameUrl: '',
          sessionToken: ''
        }
      };
    }
  }

  generateSessionToken(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  isConfigured(): boolean {
    return !!(this.agentUsername && this.apiKey);
  }
}

export const ambApiClient = new AMBSuperAPIClient();
export default ambApiClient;