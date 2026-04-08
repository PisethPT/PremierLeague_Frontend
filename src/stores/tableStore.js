import { defineStore } from "pinia";
import axios from "axios";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";

export const useTableStore = defineStore("useTableStore", {
  state: () => {
    const api = useApi();
    const tables = [];
    return {
      api,
      tables,
    };
  },
  actions: {
    async getTables() {
      const { data, error, execute } = useFetch();

      await execute(
        this.api.ENDPOINTS.TABLE_ENDPOINTS.GET_TABLES,
        "GET",
        null,
        { "Content-Type": "application/json" },
      );

      if (!error.value && data.value) {
        this.tables = JSON.parse(JSON.stringify(data.value.contents));
      } else {
        console.error("Fetch Error:", error.value);
        return error.value;
      }
    },
  },
  getters: {},
});
