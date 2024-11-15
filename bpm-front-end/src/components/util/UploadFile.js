import { API_LINK } from "./Constants";

const uploadFile = async (file) => {
  if (file) { // Check if file exists
    const data = new FormData();
    data.append("file", file instanceof File ? file : file.files[0]); // Directly append if already a File object

    try {
      const response = await fetch(API_LINK + "/api/Upload/UploadFile", {
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        return "ERROR";
      }
    } catch (err) {
      return "ERROR";
    }
  } else return "";
};

export default uploadFile;

