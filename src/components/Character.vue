<template>
  <div class="characterCard">
    <div class="characterCard__ImgWrapper">
      <img :src="character.image" :alt="character.name" />
    </div>
    <div class="characterCard__ContentWrapper">
      <div class="section">
        <div>{{ character.name }}</div>
        <span class="status">
          <span class="status__icon"></span>
          {{ status }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location:</span>
        <div>{{ character.location.name }}</div>
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        <div>{{ character.origin.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Character } from "../types";

const props = defineProps<{ character: Character }>();

const status = computed(() => {
  return props.character.status + " - " + props.character.species;
});
</script>

<style scoped>
.characterCard {
  width: 600px;
  height: 220px;
  display: flex;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.characterCard__ImgWrapper {
  flex: 2 1 0%;
  width: 100%;
}

.characterCard__ImgWrapper img {
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}

.characterCard__ContentWrapper {
  flex: 3 1 0%;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}

.characterCard__ContentWrapper .section {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status {
  display: flex;
  align-items: center;
  text-transform: capitalize;
}

.status__icon {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(85, 204, 68);
  border-radius: 50%;
}

.text-gray {
  color: rgb(158, 158, 158);
}

.section .span {
  font-size: 16px;
  font-weight: 500;
}
</style>
