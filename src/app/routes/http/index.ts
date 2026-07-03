import ky from "ky";

export const http = ky.create({
  prefix: "https://api.nitrado.net",
});
