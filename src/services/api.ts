import axios from "axios";
import { CharactersResponse } from "../types";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export default {
  getCharacters(queryParams: URLSearchParams) {
    return apiClient.get<CharactersResponse>(
      `/character/?${queryParams.toString()}`
    );
  },
};
