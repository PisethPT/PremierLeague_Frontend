import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useMatchStore = defineStore("match", {
  state: () => {
    const apiConfig = useApiConfig();
    const api = useApi();
    return {
      apiConfig,
      api,
      matches: [
        {
          value: null,
          label: "",
        },
      ],
      matchTables: [],
      seasonSelectListItem: [],
      matchInfoDetail: null,
      matchDetails: null,
      matchRecap: null,
      matchHighlight: null,
      TEAM_LOGOS_DIR: apiConfig.TEAM_LOGOS_DIR,
      PLAYER_PHOTO_DIR: apiConfig.PLAYER_LOGOS_DIR,
    };
  },
  getters: {},
  actions: {
    async getMatches(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_ENDPOINT +
          `?matchWeek=${query.matchWeek}`,
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

    async getMatchInfoDetail(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_INFO_DETAIL_ENDPOINT,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.matchInfoDetail = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getMatchRecap(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_RECAP_ENDPOINT,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.matchRecap = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getMatchHighlight(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_HIGHLIGHT_ENDPOINT,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.matchHighlight = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    // async getMatches() {
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get(
    //       this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_ENDPOINT,
    //       {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     this.matches = [];
    //     if (response.status === 200) this.matches = await response.data.content;
    //     return this.matches;
    //   } catch (error) {
    //     console.error("Failed to fetch matches:", error);
    //     return null;
    //   }
    // },

    async filteringMatches(query) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_ENDPOINT +
            `?kickoffStatus=${query}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.status === 200) {
          return response.data.content;
        }
        return null;
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async getSeasonSelectListItem() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.SEASON_ENDPOINTS.GET_SEASONS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        const data = response.data.content ?? [];
        console.log("season data " + data);

        if (data) {
          this.seasonSelectListItem.length = 0;
          data.map((item) => {
            this.seasonSelectListItem.push({
              label: item.name,
              value: item.id,
            });
          });
        }
        return this.seasonSelectListItem;
      } catch (error) {
        console.error("Failed to create match:", error);
        return null;
      }
    },
    async getMatchByMatchId(matchId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCH_DETAILS_ENDPOINT}/${matchId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200) {
          this.matchDetails = await response.data.content;
          return this.matchDetails;
        }
      } catch (error) {
        console.error("Failed to fetch match details:", error);
      }
    },
    async createMatch(form) {
      try {
        var formData = new FormData();
        formData.append(
          "matchDate",
          new Date(form.matchDate).toLocaleDateString(),
        );
        formData.append("matchTime", form.matchTime);
        formData.append("homeTeamId", form.homeTeamId);
        formData.append("awayTeamId", form.awayTeamId);
        formData.append("homeTeamScore", form.homeTeamScore);
        formData.append("awayTeamScore", form.awayTeamScore);
        formData.append("kickoffStatus", form.kickoffStatus);
        formData.append("isHomeStadium", form.isHomeStadium);
        formData.append("isGameFinish", form.isGameFinish);

        console.log(
          "Creating match with form data:",
          new Date(form.matchDate).toLocaleDateString(),
        );

        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.POST_MATCH_ENDPOINT,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        return response.status;
      } catch (error) {
        console.error("Failed to create match:", error);
        return null;
      }
    },
    async editMatchById(form, matchId) {
      try {
        const formData = new FormData();
        formData.append(
          "matchDate",
          new Date(form.matchDate).toLocaleDateString(),
        );
        formData.append("matchTime", form.matchTime);
        formData.append("homeTeamId", form.homeTeamId);
        formData.append("awayTeamId", form.awayTeamId);
        formData.append("homeTeamScore", form.homeTeamScore);
        formData.append("awayTeamScore", form.awayTeamScore);
        formData.append("kickoffStatus", form.kickoffStatus);
        formData.append("isHomeStadium", form.isHomeStadium);
        formData.append("isGameFinish", form.isGameFinish);

        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.PUT_MATCH_ENDPOINT + matchId,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        return response.status;
      } catch (error) {
        console.log("Error edit match: " + error);
        return error;
      }
    },
    async deleteByMatch(matchId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.DELETE_MATCH_ENDPOINT +
            matchId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        return response.status;
      } catch (error) {
        console.log("Error delete match: " + error);
        return error;
      }
    },
    async getMatchTables(clubId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.MATCH_ENDPOINTS.GET_MATCHES_TABLES_ENDPOINT +
            clubId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200) {
          let pos = 1;
          this.matchTables = [];
          this.matchTables = await response.data.content.map((element) => ({
            clubId: element.clubId,
            pos: pos++,
            clubName: element.clubName,
            clubCrest: element.clubCrest,
            isLatestWin: element.isLatestWin,
            pl: element.pl,
            w: element.w,
            d: element.d,
            l: element.l,
            gf: element.gf,
            ga: element.ga,
            gd: element.gd,
            pts: element.pts,
            nextMatch: element.nextMatch,
            nextTeam: element.nextTeam,
          }));
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
  },
});
