import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useViewerStore = defineStore("useViewerStore", {
  state: () => {
    const apiConfig = useApi();
    return {
      apiConfig,
    };
  },
  actions: {
    async getNewsViewerById(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIEWER_PAGE_ENDPOINTS.GET_NEWS_VIEWER_BY_ID +
          `?newsId=${query.newsId}`,
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

    async getVideoViewerById(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.apiConfig.ENDPOINTS.VIEWER_PAGE_ENDPOINTS.GET_VIDEO_VIEWER_BY_ID +
          "?videoId=" +
          query.videoId,
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
  },
  getters: {},
});
