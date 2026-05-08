import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/users/LoginView.vue";
import RegisterView from "@/views/users/RegisterView.vue";
import Empty from "@/components/Empty.vue";
import GuestLayoutView from "@/views/layouts/GuestLayoutView.vue";
import AdminLayoutView from "@/views/layouts/AdminLayoutView.vue";

import HomeView from "@/views/HomeView.vue";
import UserFavoriteView from "@/views/users/UserFavoriteView.vue";
import ClubView from "@/views/clubs/ClubView.vue";
import PlayerView from "@/views/players/PlayersView.vue";
import MatchView from "@/views/matches/MatchesView.vue";
import TableView from "@/views/tables/TableView.vue";
import StatisticView from "@/views/statistics/StatisticView.vue";
import NewView from "@/views/news/NewsView.vue";
import TransferView from "@/views/transfers/TransferView.vue";
import VideoView from "@/views/videos/VideoView.vue";
import VideoSeriesView from "@/views/videos/VideoSeriesView.vue";
import TheArchiveView from "@/views/videos/TheArchiveView.vue";
import AllVideosView from "@/views/videos/AllVideosView.vue";
import VideoViewer from "@/views/videos/VideoViewer.vue";
import NewsViewer from "@/views/news/NewsViewer.vue";
import MatchesDetailView from "@/views/matches/MatchesDetailView.vue";
import RelatedContentView from "@/views/news/RelatedContentView.vue";

// admin pages
import AdminDashboard from "@/views/admins/DashboardView.vue";
import AdminTeamView from "@/views/admins/AdminTeamView.vue";
import AdminPlayerView from "@/views/admins/AdminPlayerView.vue";
import AdminMatchView from "@/views/admins/AdminMatchView.vue";
import AdminSeasonView from "@/views/admins/AdminSeasonView.vue";
import AdminNewsView from "@/views/admins/AdminNewsView.vue";
import AdminCardView from "@/views/admins/AdminCardView.vue";
import AdminGoalView from "@/views/admins/AdminGoalView.vue";
import AdminAssistView from "@/views/admins/AdminAssistView.vue";
import AdminIssuesView from "@/views/admins/IssuesView.vue";

// clubs child
import ClubDetailView from "@/views/clubs/ClubDetailView.vue";
// player detail
import GuestPlayerDetailView from "@/views/players/PlayerDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: GuestLayoutView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayoutView,
      children: [
        {
          path: "/admin/dashboard",
          name: "admin-dashboard",
          component: AdminDashboard,
        },
        {
          path: "/admin/news/index",
          name: "admin-news-index",
          component: AdminNewsView,
        },
        {
          path: "/admin/teams/index",
          name: "admin-teams-index",
          component: AdminTeamView,
        },
        {
          path: "/admin/players/index",
          name: "admin-players-index",
          component: AdminPlayerView,
        },
        {
          path: "/admin/matches/index",
          name: "admin-matches-index",
          component: AdminMatchView,
        },
        {
          path: "/admin/seasons/index",
          name: "admin-seasons-index",
          component: AdminSeasonView,
        },
        {
          path: "/admin/cards/index",
          name: "admin-cards-index",
          component: AdminCardView,
        },
        {
          path: "/admin/goals/index",
          name: "admin-goals-index",
          component: AdminGoalView,
        },
        {
          path: "/admin/assists/index",
          name: "admin-assists-index",
          component: AdminAssistView,
        },
        {
          path: "/admin/issues/index",
          name: "admin-issues-index",
          component: AdminIssuesView,
        },
        {
          path: ":pathMatch(.*)*",
          name: "admin-not-found",
          component: Empty,
        },
      ],
    },
    {
      path: "/index",
      name: "index",
      component: GuestLayoutView,
      children: [
        {
          path: "/en/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/en/clubs/index",
          name: "clubs-index",
          component: ClubView,
        },
        {
          path: "/en/clubs/:clubId/:clubName/overview",
          name: "clubs",
          component: ClubDetailView,
          children: [
            {
              path: "/en/clubs/:clubId/:clubName/overview",
              name: "clubs-overview",
              component: () => import("@/views/clubs/Overview.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/news",
              name: "clubs-news",
              component: () => import("@/views/clubs/News.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/video",
              name: "clubs-video",
              component: () => import("@/views/clubs/Video.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/matches",
              name: "clubs-matches",
              component: () => import("@/views/clubs/Matches.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/squad",
              name: "clubs-squad",
              component: () => import("@/views/clubs/Squad.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/stats",
              name: "clubs-stats",
              component: () => import("@/views/clubs/Stats.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/stadium",
              name: "clubs-stadium",
              component: () => import("@/views/clubs/Stadium.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/tickets",
              name: "clubs-tickets",
              component: () => import("@/views/clubs/Tickets.vue"),
            },
            {
              path: "/en/clubs/:clubId/:clubName/directory",
              name: "clubs-directory",
              component: () => import("@/views/clubs/Directory.vue"),
            },
          ],
        },
        {
          path: "/en/players/index",
          name: "players-index",
          component: PlayerView,
        },
        {
          path: "/players/:playerId/:playerName",
          component: GuestPlayerDetailView,
          children: [
            {
              path: "overview",
              name: "player-overview",
              component: () => import("@/views/players/Overview.vue"),
            },
            {
              path: "video",
              name: "player-video",
              component: () => import("@/views/players/Video.vue"),
            },
            {
              path: "matches",
              name: "player-matches",
              component: () => import("@/views/players/Matches.vue"),
            },
            {
              path: "stats",
              name: "player-stats",
              component: () => import("@/views/players/Stats.vue"),
            },
            {
              path: "career",
              name: "player-career",
              component: () => import("@/views/players/CareerHistory.vue"),
            },
          ],
        },
        {
          path: "/en/matches/index",
          name: "matches-index",
          component: MatchView,
        },
        {
          path: "/en/match/:matchId/:matchTitle",
          name: "matches-detail",
          component: MatchesDetailView,
          children: [
            {
              path: "", // :matchId/:matchTitle?tab=recap // this query = { tab: "recap" }
              name: "match-tab-recap",
              component: () => import("@/views/matches/Recap.vue"),
            },
            {
              path: "",
              name: "match-tab-highlights",
              component: () => import("@/views/matches/Highlights.vue"),
            },
            {
              path: "",
              name: "match-tab-lineups",
              component: () => import("@/views/matches/Lineups.vue"),
            },
            {
              path: "",
              name: "match-tab-stats",
              component: () => import("@/views/matches/Stats.vue"),
            },
            {
              path: "",
              name: "match-tab-table",
              component: () => import("@/views/matches/Table.vue"),
            },
            {
              path: "",
              name: "match-tab-commentary",
              component: () => import("@/views/matches/Commentary.vue"),
            },
            {
              path: "",
              name: "match-tab-match-info",
              component: () => import("@/views/matches/MatchInfo.vue"),
            },
          ],
        },
        {
          path: "/en/tables/index",
          name: "tables-index",
          component: TableView,
        },
        {
          path: "/en/statistics/index",
          name: "statistics-index",
          component: StatisticView,
          children: [
            {
              path: "/en/statistics/stats/dashboard",
              name: "statistics-stats-dashboard",
              component: () => import("@/views/statistics/Dashboard.vue"),
            },
            {
              path: "/en/statistics/stats/players",
              name: "statistics-stats-players",
              component: () => import("@/views/statistics/Players.vue"),
            },
            {
              path: "/en/statistics/stats/clubs",
              name: "statistics-stats-clubs",
              component: () => import("@/views/statistics/Clubs.vue"),
            },
            {
              path: "/en/statistics/stats/all-time-stats",
              name: "statistics-stats-all-time-stats",
              component: () => import("@/views/statistics/AllTimeStats.vue"),
            },
            {
              path: "/en/statistics/stats/records",
              name: "statistics-stats-records",
              component: () => import("@/views/statistics/Records.vue"),
            },
            {
              path: "/en/statistics/stats/players-comparison",
              name: "statistics-stats-players-comparison",
              component: () =>
                import("@/views/statistics/PlayersComparison.vue"),
            },
          ],
        },
        {
          path: "/en/news/index",
          name: "news-index",
          component: NewView,
        },
        {
          path: "/en/news/:newsId/:newsTitle",
          name: "news-viewer",
          component: NewsViewer,
        },
        {
          path: "/en/transfers/index",
          name: "statistics-transfers-index",
          component: TransferView,
        },
        {
          path: "/en/video",
          name: "video",
          component: VideoView,
        },
        {
          path: "/en/video/series",
          name: "video-series",
          component: VideoSeriesView,
        },
        {
          path: "/en/video/the-archive",
          name: "video-the-archive",
          component: TheArchiveView,
          children: [
            {
              path: "/en/video/the-archive/overview",
              name: "video-the-archive-overview",
              component: () => import("@/views/videos/Overview.vue"),
            },
            {
              path: "/en/video/the-archive/8-minute-replays",
              name: "video-the-archive-8-minute-replays",
              component: () => import("@/views/videos/EightMinuteReplays.vue"),
            },
            {
              path: "/en/video/the-archive/20-minute-replays",
              name: "video-the-archive-20-minute-replays",
              component: () => import("@/views/videos/TwentyMinuteReplays.vue"),
            },
          ],
        },
        {
          path: "/en/video/all",
          name: "all-videos",
          component: AllVideosView,
        },
        {
          path: "/en/content-listing",
          name: "content-listing",
          component: RelatedContentView,
        },
        {
          path: "/en/video/:videoId/:videoTitle",
          name: "video-viewer",
          component: VideoViewer,
        },
      ],
    },
    {
      path: "/en",
      name: "user-favorite",
      component: UserFavoriteView,
      children: [
        {
          path: "/en/",
          name: "favorite-clubs",
          component: () => import("@/views/users/FavoriteClubView.vue"),
        },
        {
          path: "/en/",
          name: "favorite-players",
          component: () => import("@/views/users/FavoritePlayerView.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
