// /src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useApiConfig } from "@/stores/apiConfig";
import { ElMessage } from "element-plus";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const apiConfig = useApiConfig();
  const userName = ref("");
  const userId = ref("");
  const isLogin = ref(false);

  function parseJwt(token) {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  }

  function getRole(user) {
    return (
      user?.role ||
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    );
  }

  async function login(email, password) {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(
        apiConfig.ENDPOINTS.USER_ENDPOINTS.LOGIN_ENDPOINT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const token = response.data.token;
      userName.value = response.data.userName;
      userId.value = response.data.userId;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("userId", userId.value);
        const decoded = parseJwt(token);
        const role = getRole(decoded);

        //console.log("Login success, user:", decoded);

        ElMessage.success("Login successful!");
        isLogin.value = true;
        if (role == "Admin") router.push({ name: "admin" });
        else if (role == "Guest") router.push({ name: "index" });
      } else {
        ElMessage.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed", error);
      ElMessage.error(error.response?.data?.message || "Login failed!");
    }
  }

  async function register(form) {
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("gender", form.gender);

      const response = await axios.post(
        apiConfig.ENDPOINTS.USER_ENDPOINTS.REGISTER_ENDPOINT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        ElMessage.success("Register successful!");
        router.push({ name: "login" });
      } else {
        console.error("Login failed", error);
        ElMessage.error(error.response?.data?.message || "Login failed!");
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
      return error;
    }
  }

  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      const decoded = parseJwt(token);
      const role = getRole(decoded);

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        console.warn("Token expired");
        redirectToLogin();
      }

      return { decoded, role };
    } catch (e) {
      console.error("Invalid token", e);
      redirectToLogin();
    }
  }

  function redirectToLogin() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push({ name: "login" });
  }

  return {
    login,
    register,
    checkAuth,
    userName,
    isLogin,
  };
});
