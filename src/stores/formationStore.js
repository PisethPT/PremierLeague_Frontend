import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useFormation = defineStore("useFormation", {
  state: () => {
    const api = useApi();
    const formations = [];
    return {
      api,
      formations,
    };
  },
  actions: {
    async getFormations(query) {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.FORMATION_ENDPOINTS.GET_FORMATIONS,
        "GET",
        null,
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.formations = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },

  },
  getters: {},
});
