import { defineStore } from "pinia";
import { useApi } from "./api";
import { useFetch } from "@/composables/useFetch";
import axios from "axios";

export const useSelectListItemStore = defineStore("useSelectListItemStore", {
  state: () => {
    const api = useApi();
    return {
      api,
    };
  },
  actions: {
    async selectListItems(url) {
      const { data, error, execute } = useFetch();
      await execute(url, "GET", null, null, {
        "Content-Type": "application/json",
      });

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
