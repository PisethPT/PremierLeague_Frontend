import { defineStore } from "pinia";
export const useApi = defineStore("useApi", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL = import.meta.env.VITE_API_URL;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const CLUB_DIR = BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/clubs/";
  const PLAYER_DIR =
    BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/players/";
  const NEWS_DIR = BACKEND_URL + import.meta.env.VITE_UPLOAD_DIR + "/news/";

  const SELECT_LIST_ITEMS_ENDPOINTS = {
    SELECT_LIST_ITEM_CLUBS:
      BASE_URL + API_URL + "/selectlistitem/get-selectlistitem-clubs",
  };

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
    GET_MATCHES_INFO_DETAIL_ENDPOINT: BASE_URL + API_URL + "/match/get-matches-info-detail",
    GET_MATCHES_RECAP_ENDPOINT: BASE_URL + API_URL + "/match/get-matches-recap",
    GET_MATCHES_RELATED_CONTENT_ENDPOINT: BASE_URL + API_URL + "/match/get-matches-relatedcontent",
    GET_MATCHES_HIGHLIGHT_ENDPOINT: BASE_URL + API_URL + "/match/get-matches-highlight",
    GET_MATCHES_MATCH_INFO_ENDPOINT: BASE_URL + API_URL + "/match/get-matches-matchinfo",
  };

  const TABLE_ENDPOINTS = {
    GET_TABLES: BASE_URL + API_URL + "/table/get-tables",
  };

  const CLUB_ENDPOINTS = {
    GET_SEASON_CLUBS: BASE_URL + API_URL + "/club/get-season-clubs",
    GET_ALLTIME_PREMIER_LEAGUE_CLUBS:
      BASE_URL + API_URL + "/club/get-alltime-premierleague-clubs",
    GET_CLUB_DETAIL: BASE_URL + API_URL + "/club/get-club-detail",
    GET_CLUB_OVERVIEW_NEXTMATCH_TEAMFORM:
      BASE_URL + API_URL + "/club/get-club-overviews-nextmatch-teamform",
    GET_CLUB_LAST_STARTING11:
      BASE_URL + API_URL + "/club/get-club-overviews-laststarting11",
    GET_CLUB_NEWS_AND_SERVICES:
      BASE_URL + API_URL + "/club/get-club-newsandservices",
    GET_CLUB_TABLE: BASE_URL + API_URL + "/club/get-club-table",
    GET_CLUB_NEWS: BASE_URL + API_URL + "/club/get-club-news",
    GET_CLUB_VIDEOS: BASE_URL + API_URL + "/club/get-club-videos",
    GET_CLUB_MONTH_OF_MATCH: BASE_URL + API_URL + "/club/get-club-monthofmatch",
    GET_CLUB_MATCHES: BASE_URL + API_URL + "/club/get-club-matches",
    GET_CLUB_SQUAD: BASE_URL + API_URL + "/club/get-club-squad",
  };

  const FORMATION_ENDPOINTS = {
    GET_FORMATIONS: BASE_URL + API_URL + "/club/get-formations",
  };

  const PLAYER_ENDPOINTS = {
    GET_PLAYERS: BASE_URL + API_URL + "/player/get-players",
    GET_PLAYER_CLUB: BASE_URL + API_URL + "/player/get-player-club",
    GET_PLAYER_INFO: BASE_URL + API_URL + "/player/get-player-information",
    GET_PLAYER_TEAMMATES: BASE_URL + API_URL + "/player/get-player-teammates",
  };

  const ENDPOINTS = {
    SELECT_LIST_ITEMS_ENDPOINTS,
    HOME_PAGE_ENDPOINTS,
    VIEWER_PAGE_ENDPOINTS,
    MATCH_ENDPOINTS,
    TABLE_ENDPOINTS,
    CLUB_ENDPOINTS,
    PLAYER_ENDPOINTS,
    FORMATION_ENDPOINTS,
  };

  return {
    ENDPOINTS,
    CLUB_DIR,
    PLAYER_DIR,
    NEWS_DIR,
  };
});
