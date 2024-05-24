<template>
  <div class="container">
    <form @submit.prevent="onApplyFilters">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="filters.name" id="name" name="name" />
      </div>
      <div>
        <label for="status">Status:</label>
        <select v-model="filters.status" id="status" name="status">
          <option :value="STATUS.ALL">All</option>
          <option :value="STATUS.ALIVE">Alive</option>
          <option :value="STATUS.DEAD">Dead</option>
          <option :value="STATUS.UNKNOWN">Unknown</option>
        </select>
      </div>
      <button :disabled="isLoading" type="submit">Apply</button>
    </form>
    <div v-if="isLoading">
      <Preloader />
    </div>
    <div class="error" v-else-if="error">{{ error }}</div>
    <div v-else-if="characters.length">
      <div class="characterCards">
        <Character
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
      </div>
      <div class="pagination" v-if="info">
        <button @click="fetchPage(info.prev)" :disabled="!info.prev">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ info.pages }}</span>
        <button @click="fetchPage(info.next)" :disabled="!info.next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharacters } from "../composables/useCharacters";
import Character from "./Character.vue";
import { STATUS } from "../types";
import Preloader from "../components/Preloader.vue";

const {
  characters,
  error,
  isLoading,
  info,
  currentPage,
  filters,
  fetchCharacters,
  fetchPage,
  applyFilters,
} = useCharacters();

const onApplyFilters = () => {
  applyFilters({ name: filters.value.name, status: filters.value.status });
};

onMounted(() => {
  fetchCharacters();
});
</script>

<style scoped>
.container {
  max-width: 1865px;
  margin: 0 auto;
}

form {
  display: flex;
  justify-content: center;
}

form div:first-child {
  padding-right: 20px;
}

form div:nth-child(2) {
  padding-right: 20px;
}

.characterCards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
}

.error {
  text-align: center;
  margin-top: 0.5rem;
}
</style>
