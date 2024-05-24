import { ref } from "vue";
import api from "../services/api";
import { Character, Info, STATUS } from "../types";
import axios from "axios";

export function useCharacters() {
  const characters = ref<Character[]>([]);
  const info = ref<Info | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const filters = ref({ name: "", status: STATUS.ALL });

  const fetchCharacters = async (
    page: number = 1,
    queryFilters = filters.value
  ) => {
    isLoading.value = true;

    const queryParams = new URLSearchParams({
      ...queryFilters,
      page: String(page),
    });

    try {
      const response = await api.getCharacters(queryParams);
      characters.value = response.data.results;
      info.value = response.data.info;
      error.value = null;
    } catch (err) {
      characters.value = [];

      if (axios.isAxiosError(err) && err.response) {
        error.value = err.response.data.error;
      } else {
        error.value = "An unexpected error occurred.";
      }
      console.error("Failed to fetch characters:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPage = (url: string | null) => {
    if (!url) return;
    const page = new URL(url).searchParams.get("page");

    if (page) {
      currentPage.value = Number(page);
      fetchCharacters(currentPage.value);
    }
  };

  const applyFilters = (newFilters: { name: string; status: STATUS }) => {
    filters.value = newFilters;
    currentPage.value = 1;
    fetchCharacters(currentPage.value, filters.value);
  };

  return {
    characters,
    error,
    isLoading,
    info,
    currentPage,
    filters,
    fetchCharacters,
    fetchPage,
    applyFilters,
  };
}
