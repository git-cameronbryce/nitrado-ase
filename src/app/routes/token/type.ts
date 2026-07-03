export interface TokenResponse {
  data: {
    token: {
      scopes: string[];
    };
  };
}
