import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchArticles = async (topic, currentPage) => {
  const response = await axios.get("search/photos/", {
    params: {
      client_id: "WvpQUGKJ8p1GjzbRWgnVuaIYR9xZfCsQK3xlHajgvjE",
      page: currentPage,
      query: topic,
      per_page: 5,
    },
  });
  return response.data.results;
};