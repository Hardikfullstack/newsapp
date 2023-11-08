import { apiHelper } from "./apiHelper";
import { guardianApiUrl, NewsApiUrl, NyTimesUrl } from "./constant";

export const fetchNewsApi = async (url) => {
  const response = await apiHelper(NewsApiUrl + url);
  return response?.articles || [];
};

export const fetchNyTimesApi = async (nyTimeUrl) => {
  const response = await apiHelper(NyTimesUrl + nyTimeUrl);
  return response?.results || [];
};
export const fetchGuardianApi = async (guardianUrl) => {
  const response = await apiHelper(guardianApiUrl + guardianUrl);
  return response?.response?.results || [];
};
