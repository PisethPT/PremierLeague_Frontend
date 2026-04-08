import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useSeasonStore = defineStore("useSeasonStore", {
  state: () => {
    const apiConfig = useApiConfig();

    return {
      apiConfig,
      seasons: [],
    };
  },
  getters: {},
  actions: {
    async getSeasons() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.SEASON_ENDPOINTS.GET_SEASONS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data.content ?? null;
      } catch (error) {
        console.error("Failed to get seasons:", error);
        return null;
      }
    },
    async createSeason(form) {
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append(
          "startDate",
          new Date(form.startDate).toLocaleDateString()
        );
        formData.append("endDate", new Date(form.endDate).toLocaleDateString());
        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.SEASON_ENDPOINTS.POST_SEASON_ENDPOINT,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status;
      } catch (error) {
        console.error("Failed to create season:", error);
        return null;
      }
    },
    async editSeason(form, seasonId) {
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append(
          "startDate",
          new Date(form.startDate).toLocaleDateString()
        );
        formData.append("endDate", new Date(form.endDate).toLocaleDateString());
        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.SEASON_ENDPOINTS.PUT_SEASON_ENDPOINT +
            seasonId,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status;
      } catch (error) {
        console.log("Error fetching: " + error);
        return error;
      }
    },
    async deleteSeason(seasonId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.SEASON_ENDPOINTS.DELETE_SEASON_ENDPOINT +
            seasonId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status;
      } catch (error) {
        console.log("Error delete season: " + error);
        return error;
      }
    },
  },
});
