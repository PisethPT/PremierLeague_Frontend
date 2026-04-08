import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useFunctionsStore = defineStore("functions", () => {
  const router = useRouter();
  const uploading = false;
  var dialogImageUrl = "";
  var dialogVisible = false;

  function logout() {
    console.log("logout");

    localStorage.removeItem("token");
    router.push({ name: "login" });
  }

  function handleFileChange(uploadFile, uploadFiles) {
    fileList.value = uploadFiles.map((file) => {
      if (file.raw) {
        file.url = URL.createObjectURL(file.raw);
      }
      return file;
    });
  }

  function handleRemoveFile(file) {
    const index = fileList.value.indexOf(file);
    if (index != -1) {
      if (file.raw && file.url) URL.revokeObjectURL(file.url);
      fileList.value.slice(index, 1);
    }
  }

  function handlePreviewFile(file) {
    dialogImageUrl = file.url;
    dialogVisible = true;
  }

  return {
    uploading,
    dialogImageUrl,
    dialogVisible,
    logout,
    handleFileChange,
    handleRemoveFile,
    handlePreviewFile,
  };
});
