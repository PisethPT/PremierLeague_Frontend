import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useGoalStore = defineStore("useGoalStore", {
  state: () => {
    const apiConfig = useApiConfig();
    return {
      goals: [],
      apiConfig,
      PLAYER_LOGOS_DIR: apiConfig.PLAYER_LOGOS_DIR,
      TEAM_LOGOS_DIR: apiConfig.TEAM_LOGOS_DIR,
    };
  },
  getters: {},
  actions: {
    async getGoals() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.GOAL_ENDPOINTS.GET_GOALS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.goals = [];
        if (response.status === 200) {
          this.goals = await response.data.content;
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
    async getGoalsByPlayerId(playerId) {
      try {
        //
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async createGoal(form) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("minutes", form.minutes);
        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.GOAL_ENDPOINTS.POST_GOAL_ENDPOINT,
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
    async editGoalById(form, goalId) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("minutes", form.minutes);
        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.GOAL_ENDPOINTS.PUT_GOAL_ENDPOINT + goalId,
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
    async deleteGoalById(goalId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.GOAL_ENDPOINTS.DELETE_GOAL_ENDPOINT + goalId,
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
