import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useHomeStore = defineStore("useHomeStore", {
  state: () => {
    const apiConfig = useApi();
    return {
      apiConfig,
    };
  },
  actions: {
    async getClubNews() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_CLUB_NEWS,
        "GET",
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

    async getMatches() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_MATCHES,
        "GET",
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

    async getNews() {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_NEWS,
        "GET",
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

    async getStoriesNews(params, query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_STORIES_NEWS +
          "?pageSize=" +
          query.pageSize,
        "POST",
        params,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getVideos(params) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_VIDEOS,
        "POST",
        params,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getNewsByTags(params, query = { pageSize: 5 }) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_NEWS +
          "?pageSize=" +
          query.pageSize,
        "POST",
        params,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getNewsFromTheClub() {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_NEWS_FROM_THE_CLUB,
        "GET",
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

    async getNewsMultiTopicByTags(params, query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_NEWS_MULTI_TOPICS +
          "?pageSize=" +
          query.pageSize,
        "POST",
        params,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getNewsAsTopicByTags(params, query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_NEWS_AS_TOPICS +
          "?pageSize=" +
          query.pageSize,
        "POST",
        params,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getPremierLeagueNews(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_PREMIER_LEAGUE_NEWS +
          "?pageSize=" +
          query.pageSize,
        "POST",
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

    async getQuizzesNews(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS.GET_QUIZZES_NEWS +
          "?pageSize=" +
          query.pageSize,
        "POST",
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

    async getPremierLeagueGameNews() {
      const { data, error, execute } = useFetch();
      await execute(
        this.apiConfig.ENDPOINTS.HOME_PAGE_ENDPOINTS
          .GET_PREMIER_LEAGUE_GAME_NEWS,
        "GET",
        null,
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
