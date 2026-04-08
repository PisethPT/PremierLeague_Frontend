import { defineStore } from "pinia";
import { useApiConfig } from "./apiConfig";
import axios from "axios";

export const useNewsStore = defineStore("useNewsStore", {
  state: () => {
    const apiConfig = useApiConfig();
    return {
      apiConfig,
      news: [],
      dailyNews: [],
      fileList: [],
      NEWS_IMAGE_DIR: apiConfig.NEWS_IMAGE_DIR,
    };
  },
  getters: {},
  actions: {
    async getNews() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.NEWS_ENDPOINTS.GET_NEWS_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          this.news = [];
          this.news = response.data.content;
        }
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async createNews(form, fileList) {
      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("subTitle", form.subTitle);
        formData.append("body", form.body);
        formData.append(
          "publishedDate",
          new Date(form.publishedDate).toISOString()
        );
        formData.append("expireDate", new Date(form.expireDate).toISOString());
        formData.append("isActive", form.isActive);
        formData.append("videoLink", form.videoLink);

        const userId = localStorage.getItem("userId");
        formData.append("userId", userId);

        // Append image(s)
        if (fileList && fileList.length > 0) {
          fileList.forEach((file, index) => {
            const rawFile = file.raw instanceof File ? file.raw : file;
            formData.append("image", rawFile); // change to "image[]" if backend expects array
          });
        }

        const token = localStorage.getItem("token");
        const response = await axios.post(
          this.apiConfig.ENDPOINTS.NEWS_ENDPOINTS.POST_NEWS_ENDPOINT,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response.status, response.data);
        return response.status;
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async editNews(form, fileList, newId) {
      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("subTitle", form.subTitle);
        formData.append("body", form.body);
        formData.append(
          "publishedDate",
          new Date(form.publishedDate).toISOString()
        );
        formData.append("expireDate", new Date(form.expireDate).toISOString());
        formData.append("isActive", form.isActive);
        formData.append("videoLink", form.videoLink);

        if (fileList && fileList.length > 0) {
          fileList.forEach((file) => {
            const rawFile = file.raw instanceof File ? file.raw : file;
            formData.append("image", rawFile);
          });
        }
        const userId = localStorage.getItem("userId");
        formData.append("userId", userId);
        const token = localStorage.getItem("token");
        const response = await axios.put(
          this.apiConfig.ENDPOINTS.NEWS_ENDPOINTS.PUT_NEWS_ENDPOINT + newId,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status;
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async deleteNewsById(newsId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          this.apiConfig.ENDPOINTS.NEWS_ENDPOINTS.DELETE_NEWS_ENDPOINT + newsId,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status;
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
    async getDailyNews() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          this.apiConfig.ENDPOINTS.NEWS_ENDPOINTS.GET_NEWS_DAILY_ENDPOINT,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          this.dailyNews = [];
          this.dailyNews = response.data.content.news;
        }
      } catch (error) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
        } else {
          console.error("Request error:", error.message);
        }
        return error;
      }
    },
  },
});
