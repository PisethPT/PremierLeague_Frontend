import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    const api = useApi();
    const clubs = [];
    const selectedClubs = [];
    const players = [];
    return {
      api,
      clubs,
      selectedClubs,
      players,
    };
  },
  actions: {
    async getFavoriteClubs(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.GET_FAVORITE_CLUBS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.clubs = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getFavoriteSelectedClubs(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.GET_FAVORITE_SELECTED_CLUBS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.selectedClubs = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getFavoritePlayers(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.GET_FAVORITE_PLAYERS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.players = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async saveFavoriteSelectedClubs(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.SAVE_FAVORITE_SELECTED_CLUBS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async saveFavoriteSelectedPlayer(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.SAVE_FAVORITE_SELECTED_PLAYERS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async checkUserFavorite(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.CHECK_USER_FAVORITE,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getmyPLSettings(params) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.USER_ENDPOINTS.GET_myPLSETTINGS,
        "POST",
        params,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },
  },
  getters: {},
});
