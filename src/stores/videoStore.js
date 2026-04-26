import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useVideoStore = defineStore("useVideoStore", {
  state: () => {
    const apiConfig = useApi();
    const latestVideos = [];
    const seriesVideos = [];
    const theArchive = [];
    const allVideos = [];
    const allVideosCount = 0;

    return {
      apiConfig,
      latestVideos,
      seriesVideos,
      theArchive,
      allVideos,
      allVideosCount,
    };
  },
  actions: {
    async getLatestVideos() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIDEO_ENDPOINTS.GET_VIDEOS_LATEST_VIDEO,
        "GET",
        null,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.latestVideos = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getSeriesVideos() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIDEO_ENDPOINTS.GET_VIDEOS_SERIES,
        "GET",
        null,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.seriesVideos = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getTheArchiveVideos() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIDEO_ENDPOINTS.GET_VIDEOS_THEARCHIVE,
        "GET",
        null,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.theArchive = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getAllVideos(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIDEO_ENDPOINTS.GET_VIDEOS_ALL,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.allVideos = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getAllVideosCount() {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIDEO_ENDPOINTS.GET_VIDEOS_ALL_COUNT,
        "GET",
        null,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.allVideosCount = data.value.contents;
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },
  },
  getters: {},
});
