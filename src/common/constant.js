export const guardianApiUrl = `https://content.guardianapis.com/search?page-size=100`;
export const NyTimesUrl = `https://api.nytimes.com/svc/news/v3/content`;
export const NewsApiUrl = "https://newsapi.org/v2/top-headlines?category";

export const categoryData = [
  {
    category: "World",
    nyTimesCategory: "World",
    guardianCategory: "World",
    newsAPICategory: "general",
  },
  {
    category: "Business",
    nyTimesCategory: "Business",
    guardianCategory: "Business",
    newsAPICategory: "business",
  },
  {
    category: "Movies",
    nyTimesCategory: "Movies",
    guardianCategory: "Film",
    newsAPICategory: "entertainment",
  },
  {
    category: "Science",
    nyTimesCategory: "Science",
    guardianCategory: "Science",
    newsAPICategory: "Science",
  },
  {
    category: "Technology",
    nyTimesCategory: "",
    guardianCategory: "Technology",
    newsAPICategory: "technology",
  },
  {
    category: "Gameplay",
    nyTimesCategory: "Gameplay",
    guardianCategory: "Sport",
    newsAPICategory: "sports",
  },
  {
    category: "U.S.",
    nyTimesCategory: "U.S.",
    guardianCategory: "",
    newsAPICategory: "",
  },
  {
    category: "Arts",
    nyTimesCategory: "Arts",
    guardianCategory: "Music",
    newsAPICategory: "",
  },
  {
    category: "Books",
    nyTimesCategory: "Books",
    guardianCategory: "Books",
    newsAPICategory: "",
  },
  {
    category: "Travel",
    nyTimesCategory: "Travel",
    guardianCategory: "Travel",
    newsAPICategory: "",
  },
  {
    category: "health",
    nyTimesCategory: "",
    guardianCategory: "",
    newsAPICategory: "health",
  },
  {
    category: "environment",
    nyTimesCategory: "",
    guardianCategory: "Environment",
    newsAPICategory: "",
  },
];

export const sources = ["newsApi", "nytimes", "guardian"];
export const sourceOption = sources.map((source) => ({
  value: source,
  label: source,
}));
export const categoryOption = categoryData.map((source) => ({
  value: source.category,
  label: source.category,
}));
