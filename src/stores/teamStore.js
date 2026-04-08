import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useTeamStore = defineStore("teamStore", {
  state: () => {
    const apiConfigStore = useApiConfig();
    return {
      teams: [],
      fileList: [],
      apiConfigStore,
      TEAM_LOGOS_DIR: apiConfigStore.TEAM_LOGOS_DIR,
    };
  },
  getters: {
    totalTeam() {
      return this.teams.length;
    },
  },
  actions: {
    async getTeams() {
      try {
        const response = await axios.get(
          this.apiConfigStore.ENDPOINTS.TEAM_ENDPOINTS.GET_TEAMS_ENDPOINT
        );
        this.teams = [];
        this.teams = response.data;
        return this.teams;
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        return null;
      }
    },
    searchTeams(query) {
      console.log(query);
      if (!query) return this.teams;
      const q = query.toString().toLowerCase();
      return this.teams.filter((team) => {
        return (
          team.name.toString().toLowerCase().includes(q) ||
          team.city.toString().toLowerCase().includes(q) ||
          team.founded.toString().toLowerCase().includes(q) ||
          team.homeStadium.toString().toLowerCase().includes(q) ||
          team.headCoach.toString().toLowerCase().includes(q)
        );
      });
    },
    async createTeam(form, fileList) {
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("city", form.city);
        formData.append("founded", form.founded);
        formData.append("homeStadium", form.homeStadium);
        formData.append("headCoach", form.headCoach);
        formData.append("websiteUrl", form.websiteUrl);
        formData.append("teamThemeColor", form.teamThemeColor);
        fileList.value.forEach((file) => {
          formData.append("clubCrest", file.raw);
        });

        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfigStore.ENDPOINTS.TEAM_ENDPOINTS.POST_NEW_TEAM_ENDPOINT,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(JSON.stringify(response.data), " ", response.status);

        return response.status;
      } catch (error) {
        console.log("error: " + error);
        return "error: " + error;
      }
    },
    async getTeamById(id) {
      if (id !== 0) {
        return this.teams.find((team) => team.id == id);
      }
      return null;
    },
    async editTeamById(form, fileList, id) {
      if (id !== 0) {
        try {
          const formData = new FormData();
          formData.append("name", form.name);
          formData.append("city", form.city);
          formData.append("founded", form.founded);
          formData.append("homeStadium", form.homeStadium);
          formData.append("headCoach", form.headCoach);
          formData.append("websiteUrl", form.websiteUrl);
          formData.append("teamThemeColor", form.teamThemeColor);

          if (fileList.value.length > 0 || fileList.value != null) {
            fileList.value.forEach((file) => {
              formData.append("clubCrest", file.raw);
            });
          }

          console.log("form data: " + JSON.stringify(form));

          const token = localStorage.getItem("token");
          const response = await axios.put(
            this.apiConfigStore.ENDPOINTS.TEAM_ENDPOINTS.PUT_TEAM_ENDPOINT + id,
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
          return "error: " + error;
        }
      }
      return null;
    },
    async deleteTeamById(id) {
      if (id !== 0) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.delete(
            this.apiConfigStore.ENDPOINTS.TEAM_ENDPOINTS.DELETE_TEAM_ENDPOINT +
              id,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.status;
        } catch (error) {
          return "error: " + error;
        }
      } else return null;
    },
  },
});
