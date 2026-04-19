import { ref } from "vue";
import axios from "axios";

export function useFetch() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * @param {string} url
   * @param {string} method
   * @param {object|null} payload
   * @param {object|null} query
   * @param {object} headers
   */
  const execute = async (
    url,
    method = "GET",
    payload = null,
    query = null,
    headers = {},
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios({
        url,
        method,
        data: payload,
        params: query,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        paramsSerializer: {
          indexes: null,
        },
      });
      data.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
