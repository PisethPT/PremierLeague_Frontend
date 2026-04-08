import { defineStore } from "pinia";
export const useApi = defineStore("useApi", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL = import.meta.env.VITE_API_URL;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const CLUB_DIR = BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/clubs/";
  const PLAYER_DIR =
    BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/players/";
  const NEWS_DIR = BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/news/";

  const HOME_PAGE_ENDPOINTS = {
    GET_CLUB_NEWS: BASE_URL + API_URL + "/home/get-home-club-news",
    GET_MATCHES: BASE_URL + API_URL + "/home/get-home-matches",
    GET_NEWS: BASE_URL + API_URL + "/home/get-home-news",
    GET_STORIES_NEWS: BASE_URL + API_URL + "/home/get-home-stories-news",
    GET_VIDEOS: BASE_URL + API_URL + "/home/get-home-videos",
    GET_NEWS_FROM_THE_CLUB:
      BASE_URL + API_URL + "/home/get-home-news-from-the-clubs",
    GET_NEWS_MULTI_TOPICS:
      BASE_URL + API_URL + "/home/get-home-news-multi-topics",
    GET_NEWS_AS_TOPICS: BASE_URL + API_URL + "/home/get-home-news-as-topics",
    GET_PREMIER_LEAGUE_NEWS:
      BASE_URL + API_URL + "/home/get-home-premierleague-news",
    GET_QUIZZES_NEWS: BASE_URL + API_URL + "/home/get-home-quizzes-news",
  };

  const VIEWER_PAGE_ENDPOINTS = {
    GET_NEWS_VIEWER_BY_ID: BASE_URL + API_URL + "/home/get-news-viewer",
    GET_VIDEO_VIEWER_BY_ID: BASE_URL + API_URL + "/home/get-video-viewer",
    GET_STORY_BY_ID: BASE_URL + API_URL + "/home/get-story-by-id",
  };

  const MATCH_ENDPOINTS = {
    GET_MATCHES_ENDPOINT: BASE_URL + API_URL + "/match/get-matches",
  };

  const TABLE_ENDPOINTS = {
    GET_TABLES: BASE_URL + API_URL + "/table/get-tables",
  };

  const ENDPOINTS = {
    HOME_PAGE_ENDPOINTS,
    VIEWER_PAGE_ENDPOINTS,
    MATCH_ENDPOINTS,
    TABLE_ENDPOINTS,
  };

  return {
    ENDPOINTS,
    CLUB_DIR,
    PLAYER_DIR,
    NEWS_DIR,
  };
});
