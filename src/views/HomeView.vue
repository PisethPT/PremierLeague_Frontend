<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useHomeStore, useAIAgentStore } from '@/stores';
import { partners } from '@/stores/partner';
import { ElMessage } from 'element-plus';
import SponsorBar from '@/components/SponsorBar.vue';
import BaseVideosCard from '@/components/BaseVideosCard.vue';
import BaseNewsCard from '@/components/BaseNewsCard.vue';
import BaseStoriesCard from '@/components/BaseStoriesCard.vue';
import BaseNewsMiniCard from '@/components/BaseNewsMiniCard.vue';
import BaseViewMoreNewsCard from '@/components/BaseViewMoreNewsCard.vue';
import BaseViewMoreTopicCard from '@/components/BaseViewMoreTopicCard.vue';
import Copilot from '@/components/Copilot.vue';
import BaseAIAgentPanel from '@/components/BaseAIAgentPanel.vue';
import
{
  ArrowRight,
} from '@element-plus/icons-vue';
import BaseMatchMiniCard from '@/components/BaseMatchMiniCard.vue';

import sponsorImage from '@/assets/sponsors/8942442685205285966.gif';
import sponsorImage1 from '@/assets/sponsors/07710_PremierLeagueDigitalProducts_MYPL_WebPage_1456x180_AWK-V3a.webp';
import sponsorImage2 from '@/assets/sponsors/we_all_feel_it_gif.webp';
import sponsorImage3 from '@/assets/sponsors/PL2526-Adobe-Promos-Desktop-2.webp';
import mainThumbnail from '@/assets/news/Virgil-van-Dijk-Erling-Haaland-both-pictured-unhappy-.webp'
import { useI18n } from 'vue-i18n';

const homeStore = useHomeStore();
const loading = ref(false);
const AIAgentStore = useAIAgentStore();
const isAIPanelOpen = ref(false);
const { t } = useI18n();

const mainNews = ref({
  id: 1,
  title: 'Liverpool and Manchester United face off in a thrilling match',
  summary: 'A detailed report on the exciting match between Liverpool and Manchester United.',
  category: 'Match report',
  thumbnail: mainThumbnail,
});

const matches = ref([]);
const miniNews = ref([]);
const storiesNews = ref([]);
const awards = ref([]);
const latestNews = ref([]);
const latestVideos = ref([]);
const fromTheClubs = ref([]);
const fantasyPremierLeague = ref([]);
const moreThanAGames = ref([]);
const newsAndFeatures = ref([]);
const premierLeagues = ref([]);
const mostViewedVideos = ref([]);
const gamesQuizzesAndPolls = ref([]);
const premierLeaguesGames = ref([]);

const allVideos = () => router.push({ name: 'all-videos' });

function viewMore()
{
  ElMessage.info('View more news clicked!');
}

function viewAllMatches()
{
  router.push({ name: 'matches-index' });
}

onMounted(async () =>
{
  window.scrollTo({ top: 0, behavior: 'auto' });

  try
  {
    loading.value = true;
    matches.value = await homeStore.getMatches();
    miniNews.value = await homeStore.getNews();
    storiesNews.value = await homeStore.getStoriesNews(["3", "13"], { pageSize: 30 });
    latestNews.value = await homeStore.getNewsAsTopicByTags(["4"], { pageSize: 5 });
    latestVideos.value = await homeStore.getVideos(["2"]);
    awards.value = await homeStore.getNewsByTags(["7"]);
    fromTheClubs.value = await homeStore.getNewsFromTheClub();
    fantasyPremierLeague.value = await homeStore.getNewsByTags(["10"], { pageSize: 10 });
    moreThanAGames.value = await homeStore.getNewsAsTopicByTags(["14"], { pageSize: 5 });
    newsAndFeatures.value = await homeStore.getNewsMultiTopicByTags(["3"], { pageSize: 10 });
    premierLeagues.value = await homeStore.getPremierLeagueNews({ pageSize: 5 });
    mostViewedVideos.value = await homeStore.getStoriesNews(["15"], { pageSize: 10 });
    gamesQuizzesAndPolls.value = await homeStore.getQuizzesNews({ pageSize: 6 });
    premierLeaguesGames.value = await homeStore.getPremierLeagueGameNews();
    loading.value = false;
  } catch (error)
  {

  }
});

</script>

<template>
  <main class="px-3 min-h-screen flex flex-col gap-4">
    <SponsorBar :sponsor-image="sponsorImage" :rounded="false" :is-clickable="false" />

    <h1 class="text-white">{{ t('welcome') }}</h1>

    <div
      class="bg-[#37003c] grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 w-full h-fit lg:h-fit rounded-2xl p-4">
      <div class="bg-[#28002b] flex flex-col gap-4 w-full h-full pb-4 lg:pb-0 rounded-2xl">
        <div class="bg-[#28002b] h-fit flex rounded-2xl overflow-hidden">
          <img :src="mainNews.thumbnail" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col gap-2 mx-5">
          <span class="text-white sm:text-md xl:text-3xl font-bold text-wrap">{{ mainNews.title }}</span>
          <span class="text-white text-xs xl:text-sm text-wrap">{{ mainNews.summary }}</span>
          <span class="text-white text-[11px] xl:text-xs mt-2">{{ mainNews.category }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div v-if="miniNews.length > 0" class="bg-[#28002b] flex flex-col gap-10 w-full h-full rounded-2xl p-4">
          <BaseNewsMiniCard v-for="n in miniNews" :key="n.id" :related="n" />
        </div>

        <div
          class="bg-[#28002b] flex flex-col gap-4 w-full h-170 rounded-2xl overflow-hidden overflow-y-scroll p-4 scrollbar-none">
          <div class="flex flex-col">
            <div class="flex justify-between items-center">
              <span class="text-white text-md font-bold">Premier League</span>
              <button @click="viewAllMatches"
                class="bg-[#37003c] px-3 py-2 rounded-2xl text-white text-xs text-center hover:bg-[#410544] cursor-pointer">View
                all matches
                <el-icon class="text-center">
                  <ArrowRight class="text-white text-center" />
                </el-icon>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-14">
            <BaseMatchMiniCard v-for="match in matches" :key="match.matchDate" :match-info="match" />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-[#37003c] via-[#943bff] to-[#943afc] rounded-2xl w-full h-45 mt-8 mb-12 relative">
      <div class="absolute top-3 w-full h-45 z-10 bg-[#28002b] rounded-2xl">
        <div class="w-full h-full py-4 overflow-hidden">
          <div class="flex justify-center items-center px-4 h-full overflow-x-auto scrollbar-none">
            <a v-for="partner in partners" :key="partner.id" :href="partner.officialUrl" target="_blank"
              class="flex flex-col items-center justify-between w-37 h-22 shrink-0">
              <img :src="partner.logo" :alt="partner.name" class="w-25" />
              <span class="text-white text-xs">{{ partner.content }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- best moments of 2025/26 -->
    <BaseStoriesCard v-for="storyNews in storiesNews" :key="storyNews.videoLabel" :videoTag="storyNews.videoLabel"
      :stories="storyNews.videos" />

    <!-- interviews -->
    <!-- <BaseStoriesCard :videoTag="'Interviews'" :stories="interviews" /> -->

    <!-- awards -->
    <BaseViewMoreNewsCard v-for="newsItem in awards" class="my-4" :title="newsItem.newsLabel" :news="newsItem.news"
      :viewMore="viewMore" />

    <!-- latest news -->
    <BaseViewMoreTopicCard class="my-4" :title="'Latest News'" :topics="latestNews" :viewMore="viewMore"
      :viewMoreButtonTitle="'View more'" />

    <!-- from the clubs -->
    <BaseViewMoreNewsCard :title="'From The Clubs'" :news="fromTheClubs" :viewMore="viewMore" />

    <!-- latest videos -->
    <BaseVideosCard v-for="v in latestVideos" :key="v.videoLabel" class="my-4" :title="v.videoLabel" :videos="v.videos"
      :all-videos="allVideos" :isAllVideosButton="true" :allVideosButtonTitle="'View more'"
      :isPreviousAndNextButtons="false" />

    <!--news & features -->
    <BaseViewMoreTopicCard class="my-4" :title="'News & Features'" :topics="newsAndFeatures" :viewMore="viewMore"
      :viewMoreButtonTitle="'View more'" />

    <!-- games, quizzes and polls -->
    <BaseNewsCard class="my-4" :title="'Games, Quizzes & Polls'" :topics="gamesQuizzesAndPolls" :allButtonTitle="'More'"
      :viewMore="viewMore" :is-all-button="true" :is-previous-and-next-buttons="true" />

    <!-- most viewed videos -->
    <BaseStoriesCard v-for="mostViewedVideo in mostViewedVideos" :key="mostViewedVideo.videoLabel"
      :videoTag="mostViewedVideo.videoLabel" :stories="mostViewedVideo.videos" />

    <!-- hall of fame -->
    <!-- <BaseViewMoreVideosCard class="mt-4" :title="'Hall of Fame'" :videos="HallOfFame" :viewMore="viewMore" /> -->

    <!-- copilot ai -->
    <Copilot class="my-4" />

    <BaseAIAgentPanel :visible="isAIPanelOpen || AIAgentStore.isPanelVisible"
      @close="isAIPanelOpen = false; AIAgentStore.isPanelVisible = false;" />

    <SponsorBar class="!mb-3" :sponsor-image="sponsorImage1" :sponsor-width="'60rem'" :rounded="true"
      :is-clickable="false" />

    <!-- premier league -->
    <BaseViewMoreTopicCard class="my-4" :title="'Premier League'" :topics="premierLeagues" :viewMore="viewMore"
      :viewMoreButtonTitle="'View more'" />

    <SponsorBar :sponsor-image="sponsorImage2" :sponsor-width="'60rem'" :rounded="true" :is-clickable="false" />

    <!-- fantasy premier league -->
    <BaseViewMoreNewsCard v-for="newsItem in fantasyPremierLeague" :key="newsItem.newsLabel" class="my-4"
      :title="newsItem.newsLabel" :news="newsItem.news" :viewMore="viewMore" />

    <!-- more than a game -->
    <BaseViewMoreTopicCard class="my-4" :title="'More than a Game'" :topics="moreThanAGames" :viewMore="viewMore"
      :viewMoreButtonTitle="'View more'" />

    <SponsorBar :sponsor-image="sponsorImage3" :sponsor-width="'60rem'" :rounded="true" :is-clickable="false" />

    <!-- premier league games -->
    <BaseNewsCard class="my-4" :title="'Premier League Games'" :topics="premierLeaguesGames" :allButtonTitle="'More'"
      :viewMore="viewMore" :is-all-button="true" :is-previous-and-next-buttons="true" />

  </main>
</template>

<style>
html,
body {
  background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
  display: none !important;
}

.scrollbar-none {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>
