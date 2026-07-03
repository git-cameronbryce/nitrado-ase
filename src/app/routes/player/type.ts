export interface ActionResponse {
  message: string;
  data: {
    message: string;
    data: {
      identifier: string[];
    };
  };
}
