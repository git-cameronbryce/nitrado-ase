export interface PlayerResponse {
  message: string;
  data: {
    message: string;
    data: {
      identifier: string[];
    };
  };
}
