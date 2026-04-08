import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useAssistStore = defineStore("useAssistStore", {
  state: () => {
    const apiConfig = useApiConfig();
    return {
      assists: [],
      apiConfig,
      PLAYER_LOGOS_DIR: apiConfig.PLAYER_LOGOS_DIR,
      TEAM_LOGOS_DIR: apiConfig.TEAM_LOGOS_DIR,
    };
  },
  getters: {},
  actions: {
    async get() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.ASSIST_ENDPOINTS.GET_ASSISTS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          this.assists = [];
          this.assists = response.data.content;
        }
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async create(form) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("minutes", form.minutes);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.ASSIST_ENDPOINTS.POST_ASSIST_ENDPOINT,
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
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async edit(form, assistId) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("minutes", form.minutes);
        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.ASSIST_ENDPOINTS.PUT_ASSIST_ENDPOINT +
            assistId,
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
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async delete(assistId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.ASSIST_ENDPOINTS.DELETE_ASSIST_ENDPOINT +
            assistId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        return response.status;
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
  },
});
