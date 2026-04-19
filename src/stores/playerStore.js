import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";
import axios from "axios";

export const usePlayerStore = defineStore("PlayerStore", {
  state: () => {
    const apiConfig = useApiConfig();
    const api = useApi();
    return {
      api,
      apiConfig,
      players: [],
      fileList: [],
      teamItemSelect: [],
      playerItemSelect: [],
      playerClub: null,
      playerInformation: null,
      teammates: [],
      PLAYER_PHOTO_DIR: apiConfig.PLAYER_LOGOS_DIR,
      TEAM_LOGOS_DIR: apiConfig.TEAM_LOGOS_DIR,
    };
  },
  getters: {},
  actions: {
    async getPlayers(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.api.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYERS,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.players = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getPlayerClub(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.api.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYER_CLUB,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.playerClub = JSON.parse(
          JSON.stringify(data.value.contents),
        );
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getPlayerInfo(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.api.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYER_INFO,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.playerInformation = JSON.parse(
          JSON.stringify(data.value.contents),
        );
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getPlayerTeammates(query) {
      const { data, error, execute } = useFetch();
      await execute(
        this.api.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYER_TEAMMATES,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.teammates = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    // BEFORE
    async getTeamSelectListItem() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.TEAM_ENDPOINTS.GET_TEAMS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        this.teamItemSelect = [];
        if (response.status == 200) {
          this.teamItemSelect = await response.data.map((team) => ({
            id: team.id,
            name: team.name,
            logo: this.TEAM_LOGOS_DIR + team.clubCrest,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    },
    async getPlayerSelectListItemByTeamId(teamId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYERS_ENDPOINT +
            `?teamId=${teamId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        this.playerItemSelect = [];
        if (response.status === 200) {
          this.playerItemSelect = await response.data.content.map((player) => ({
            id: player.id,
            name:
              player.firstName +
              " " +
              player.lastName +
              " (" +
              player.playerNumber +
              ")",
            logo: this.PLAYER_PHOTO_DIR + player.photo,
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
    getPlayerById(playerId) {
      if (playerId === null || playerId === undefined) return null;
      return this.players.find((player) => player.id === playerId);
    },
    async createPlayer(form, fileList) {
      try {
        const formData = new FormData();
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append(
          "dateOfBirth",
          new Date(form.dateOfBirth).toLocaleDateString(),
        );
        formData.append("nationality", form.nationality);
        formData.append("preferredFoot", form.preferredFoot);
        formData.append("socialMedia", form.socialMedia);
        formData.append("position", form.position);
        formData.append("playerNumber", form.playerNumber);
        formData.append("placeOfBirth", form.placeOfBirth);
        formData.append("joinedClub", form.joinedClub);
        formData.append("height", form.height);
        formData.append("teamId", form.teamId);
        fileList.value.forEach((file) => {
          //console.log("file: " + file.raw);

          formData.append("photo", file.raw);
        });

        // console.log("form data: " + formData);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS.POST_NEW_PLAYER_ENDPOINT,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(JSON.stringify(response.data), " ", response.status);
        return response.status;
      } catch (error) {
        console.log("error: " + error);
        return "error: " + error;
      }
    },
    async editPlayerById(playerId, form, fileList) {
      try {
        const formData = new FormData();
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append(
          "dateOfBirth",
          new Date(form.dateOfBirth).toLocaleDateString(),
        );
        formData.append("nationality", form.nationality);
        formData.append("preferredFoot", form.preferredFoot);
        formData.append("socialMedia", form.socialMedia);
        formData.append("position", form.position);
        formData.append("playerNumber", form.playerNumber);
        formData.append("placeOfBirth", form.placeOfBirth);
        formData.append("joinedClub", form.joinedClub);
        formData.append("height", form.height);
        formData.append("teamId", form.teamId);
        fileList.value.forEach((file) => {
          formData.append("photo", file.raw);
        });

        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS.PUT_PLAYER_ENDPOINT +
            playerId,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(JSON.stringify(response.data), " ", response.status);
        return response.status;
      } catch (error) {
        console.log("error: " + error);
        return "error: " + error;
      }
    },
    async deletePlayerById(playerId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS.DELETE_PLAYER_ENDPOINT +
            playerId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(response.data.message, " ,", response.status);
        return response.status;
      } catch (error) {
        console.log("error: " + error);
        return "error: " + error;
      }
    },
    async getPlayerInfoById(playerId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS.GET_PLAYER_BY_ID_ENDPOINT +
            playerId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200) return await response.data.content; // return player, club
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
    async getTeammatesByPlayerIdAndClubId(playerId, clubId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.PLAYER_ENDPOINTS
            .GET_TEAMMATES_BY_PLAYER_ID_AND_CLUB_ID +
            playerId +
            "/clubId/" +
            clubId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200) return await response.data.content;
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
  },
});
