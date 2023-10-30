import axios from "axios";
import toast from "react-simple-toasts";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  console.log("enviando...");
  return config;
});

api.interceptors.response.use(
  (config) => {
    console.log("recebendo...");
    return config;
  },
  (error) => {
    if (error.response.status === 400) {
      const errors = error.response.data.errors.map((issue) =>
        Object.values(issue.constraints).at(0)
      );
      errors.forEach((error) =>
        toast(error, {
          render(message) {
            return (
              <div className="p-2 rounded-md text-gray-100 bg-red-500">
                {message}
              </div>
            );
          },
        })
      );
    } else if (error.response.data.message && error.response.status >= 400) {
      toast(error.response.data.message, {
        render(message) {
          return (
            <div className="p-2 rounded-md text-gray-100 bg-red-500">
              {message}
            </div>
          );
        },
      });
    } else {
      throw error;
    }
  }
);
