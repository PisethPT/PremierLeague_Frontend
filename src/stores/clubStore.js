import { defineStore } from "pinia";
import axios from "axios";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useClubStore = defineStore("useClubStore", {
  state: () => {
    const api = useApi();
    const seasonClubs = [];
    const allTimePremierLeagueClubs = [];
    const club = null;
    const overview = null;
    const lastStarting11 = null;
    const clubNewsAndServices = null;
    const clubTable = [];
    const clubNews = [];
    const clubVideos = [];
    return {
      api,
      seasonClubs,
      allTimePremierLeagueClubs,
      club,
      overview,
      lastStarting11,
      clubNewsAndServices,
      clubTable,
      clubNews,
      clubVideos,
    };
  },
  actions: {
    async getSeasonClubs(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_SEASON_CLUBS +
          `?season=${query.season}`,
        "GET",
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.seasonClubs = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getAllTimePremierLeagueClubs() {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_ALLTIME_PREMIER_LEAGUE_CLUBS,
        "GET",
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.allTimePremierLeagueClubs = JSON.parse(
          JSON.stringify(data.value.contents),
        );
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubDetail(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_DETAIL,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.club = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubOverviewNextMatchAndTeamForm(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_OVERVIEW_NEXTMATCH_TEAMFORM,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.overview = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubLastStarting11(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_LAST_STARTING11,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.lastStarting11 = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubNewsAndServices(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_NEWS_AND_SERVICES,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.clubNewsAndServices = JSON.parse(
          JSON.stringify(data.value.contents),
        );
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubTable(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_TABLE,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.clubTable = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubNews(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_NEWS,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.clubNews = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubVideos(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_VIDEOS,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.clubVideos = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubSquad(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_SQUAD,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubMonthOfMatch(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_MONTH_OF_MATCH,
        "GET",
        null,
        query,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        return JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

    async getClubMatches(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.CLUB_ENDPOINTS.GET_CLUB_MATCHES,
        "GET",
        null,
        query,
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
