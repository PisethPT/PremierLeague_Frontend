import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useIssueStore = defineStore("useIssueStore", {
  state: () => {
    const apiConfig = useApiConfig();
    return {
      issues: [],
      apiConfig,
      ISSUE_FILE_DIR: apiConfig.ISSUE_FILE_DIR,
    };
  },
  actions: {
    async fetchIssues() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.ISSUE_ENDPOINTS.GET_ISSUES_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        this.issues = response.data.content;
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
