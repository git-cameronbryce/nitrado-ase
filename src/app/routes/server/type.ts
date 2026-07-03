export interface ServerResponse {
  data: {
    services: {
      id: number;

      details: {
        address: string;
        folder_short: string;
      };

      suspending_in: number;
    }[];
  };
}
