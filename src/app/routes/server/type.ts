export interface GameserverResponse {
  data: {
    gameserver: {
      status: string;
      service_id: number;
      game_specific: {
        path: string;
        logfiles: string[];
      };

      query: {
        server_name: string;
        player_current: number;
        player_max: number;
      };
    };
  };
}

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

export interface ActionResponse {
  status: string;
  message: string;
}
