import { defineStore } from "pinia";

export const useApiConfig = defineStore("apiConfig", () => {
  //const BASE_URL = "https://localhost:7067";
  // const BASE_URL = "https://pl-api.local:441";
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const API_URL = "/api/premierleague/home";
  const BACKEND_URL = "http://localhost:5245";
  const CLUB_DIR = BACKEND_URL + "/upload/clubs/";

  const TEAM_LOGOS_DIR = BASE_URL + "/TeamLogos/";
  const PLAYER_LOGOS_DIR = BASE_URL + "/Players/";
  const NEWS_IMAGE_DIR = BASE_URL + "/News/";
  const ISSUE_FILE_DIR = BASE_URL + "/IssueFiles/";

  const USER_ENDPOINTS = {
    LOGIN_ENDPOINT: BASE_URL + "/login",
    REGISTER_ENDPOINT: BASE_URL + "/register",
  };
  const TEAM_ENDPOINTS = {
    GET_TEAMS_ENDPOINT: BASE_URL + "/teams",
    GET_TEAM_BY_ID_ENDPOINT: BASE_URL + "/teams/",
    POST_NEW_TEAM_ENDPOINT: BASE_URL + "/teams/create",
    PUT_TEAM_ENDPOINT: BASE_URL + "/teams/edit/",
    DELETE_TEAM_ENDPOINT: BASE_URL + "/teams/delete/",
  };
  const PLAYER_ENDPOINTS = {
    GET_PLAYERS_ENDPOINT: BASE_URL + "/players/by-team",
    GET_PLAYER_BY_ID_ENDPOINT: BASE_URL + "/players/",
    POST_NEW_PLAYER_ENDPOINT: BASE_URL + "/players/create",
    PUT_PLAYER_ENDPOINT: BASE_URL + "/players/edit/",
    DELETE_PLAYER_ENDPOINT: BASE_URL + "/players/delete/",
    GET_TEAMMATES_BY_PLAYER_ID_AND_CLUB_ID:
      BASE_URL + "/players/teammates/playerId/",
  };
  const MATCH_ENDPOINTS = {
    GET_MATCHES_ENDPOINT: BASE_URL + "/matches",
    GET_MATCHES_TABLES_ENDPOINT: BASE_URL + "/matches/tables/",
    GET_MATCH_BY_ID_ENDPOINT: BASE_URL + "/matches/",
    POST_MATCH_ENDPOINT: BASE_URL + "/matches/create",
    PUT_MATCH_ENDPOINT: BASE_URL + "/matches/edit/",
    DELETE_MATCH_ENDPOINT: BASE_URL + "/matches/delete/",
  };
  const NEWS_ENDPOINTS = {
    GET_NEWS_ENDPOINT: BASE_URL + "/news",
    GET_NEWS_BY_ID_ENDPOINT: BASE_URL + "/news/",
    GET_NEWS_DAILY_ENDPOINT: BASE_URL + "/news/daily",
    POST_NEWS_ENDPOINT: BASE_URL + "/news/create",
    PUT_NEWS_ENDPOINT: BASE_URL + "/news/edit/",
    DELETE_NEWS_ENDPOINT: BASE_URL + "/news/delete/",
  };
  const SEASON_ENDPOINTS = {
    GET_SEASONS_ENDPOINT: BASE_URL + "/seasons",
    GET_SEASON_BY_ID_ENDPOINT: BASE_URL + "/seasons/",
    POST_SEASON_ENDPOINT: BASE_URL + "/seasons/create",
    PUT_SEASON_ENDPOINT: BASE_URL + "/seasons/edit/",
    DELETE_SEASON_ENDPOINT: BASE_URL + "/seasons/delete/",
  };
  const CARD_ENDPOINTS = {
    GET_CARDS_ENDPOINT: BASE_URL + "/cards",
    GET_CARD_BY_ID_ENDPOINT: BASE_URL + "/cards/",
    POST_CARD_ENDPOINT: BASE_URL + "/cards/create",
    PUT_CARD_ENDPOINT: BASE_URL + "/cards/edit/",
    DELETE_CARD_ENDPOINT: BASE_URL + "/cards/delete/",
  };
  const GOAL_ENDPOINTS = {
    GET_GOALS_ENDPOINT: BASE_URL + "/goals",
    GET_GOAL_BY_ID_ENDPOINT: BASE_URL + "/goals/",
    POST_GOAL_ENDPOINT: BASE_URL + "/goals/create",
    PUT_GOAL_ENDPOINT: BASE_URL + "/goals/edit/",
    DELETE_GOAL_ENDPOINT: BASE_URL + "/goals/delete/",
  };
  const ASSIST_ENDPOINTS = {
    GET_ASSISTS_ENDPOINT: BASE_URL + "/assists",
    GET_ASSIST_BY_ID_ENDPOINT: BASE_URL + "/assists/",
    POST_ASSIST_ENDPOINT: BASE_URL + "/assists/create",
    PUT_ASSIST_ENDPOINT: BASE_URL + "/assists/edit/",
    DELETE_ASSIST_ENDPOINT: BASE_URL + "/assists/delete/",
  };
  const ISSUE_ENDPOINTS = {
    GET_ISSUES_ENDPOINT: BASE_URL + "/issues",
  };
  const HOME_PAGE_ENDPOINTS = {
    GET_CLUB_NEWS: BASE_URL + API_URL + "/get-home-club-news",
    GET_MATCHES: BASE_URL + API_URL + "/get-home-matches",
  };

  const ENDPOINTS = {
    USER_ENDPOINTS,
    TEAM_ENDPOINTS,
    PLAYER_ENDPOINTS,
    MATCH_ENDPOINTS,
    SEASON_ENDPOINTS,
    NEWS_ENDPOINTS,
    CARD_ENDPOINTS,
    GOAL_ENDPOINTS,
    ASSIST_ENDPOINTS,
    ISSUE_ENDPOINTS,
    HOME_PAGE_ENDPOINTS,
  };

  return {
    BASE_URL,
    CLUB_DIR,
    TEAM_LOGOS_DIR,
    PLAYER_LOGOS_DIR,
    NEWS_IMAGE_DIR,
    ISSUE_FILE_DIR,
    ENDPOINTS,
  };
});
