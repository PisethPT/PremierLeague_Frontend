import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useCardStore = defineStore("useCardStore", {
  state: () => {
    const apiConfig = useApiConfig();

    return {
      cards: [],
      apiConfig,
      PLAYER_LOGOS_DIR: apiConfig.PLAYER_LOGOS_DIR,
      TEAM_LOGOS_DIR: apiConfig.TEAM_LOGOS_DIR,
    };
  },
  getters: {},
  actions: {
    async getCards() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.CARD_ENDPOINTS.GET_CARDS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          this.cards.length = [];
          this.cards = response.data.content;
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
    async createCard(form) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("type", form.type);
        formData.append("minutes", form.minutes);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.CARD_ENDPOINTS.POST_CARD_ENDPOINT,
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
    async editCardByCardId(form, cardId) {
      try {
        const formData = new FormData();
        formData.append("matchId", form.matchId);
        formData.append("teamId", form.teamId);
        formData.append("playerId", form.playerId);
        formData.append("type", form.type);
        formData.append("minutes", form.minutes);

        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.CARD_ENDPOINTS.PUT_CARD_ENDPOINT + cardId,
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
    async deleteCardByCardId(cardId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.CARD_ENDPOINTS.DELETE_CARD_ENDPOINT + cardId,
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
  },
});
