import { ref } from "vue";
import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useAIAgentStore = defineStore("useAIAgentStore", {
  state: () => {
    const api = useApi();
    const aiResponse = null;
    const isPanelVisible = ref(false);
    const activeDashboardPrompt = ref("");

    return {
      api,
      aiResponse,
      isPanelVisible,
      activeDashboardPrompt,
    };
  },
  actions: {
    async askAI(prompt) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.AI_AGENT_ENDPOINTS.ASK_AI,
        "POST",
        prompt,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.aiResponse = JSON.parse(JSON.stringify(data.value));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },
  },
  getters: {},
});
