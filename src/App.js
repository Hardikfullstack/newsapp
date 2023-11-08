import React, { useReducer, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NewsArticles from "./components/NewsArticles.js";
import PersonalizedNewsFeedPopup from "./components/PersonalizedNewsFeedPopup.js";
import {
  fetchGuardianApi,
  fetchNewsApi,
  fetchNyTimesApi,
} from "./common/services";
import { Flex, Spin } from "antd";
import { Spinner, MessageText } from "./common/styles.js";

// for resolving date issue https://github.com/ant-design/ant-design/issues/26190#issuecomment-703673400
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

function preferenceReducer(preferences, action) {
  switch (action.type) {
    case "update": {
      localStorage.setItem("preferences", JSON.stringify(preferences));
      return { ...action.data };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const cachedPreferences = JSON.parse(localStorage.getItem("preferences"));

const initialPreferences = {
  selectedCategories: [],
  selectedSources: [],
  selectedAuthors: [],
  isLoading: false,
};

function App() {
  const [preferences, dispatch] = useReducer(
    preferenceReducer,
    typeof cachedPreferences !== "object"
      ? cachedPreferences
      : initialPreferences,
  );

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fetchData = async (
    selectedCategory,
    selectSources,
    dateFilter = "",
  ) => {
    let data = [];
    dispatch({ type: "update", data: { ...preferences, isLoading: true } });
    if (
      selectedCategory.length > 0 &&
      (dateFilter === null || dateFilter === "")
    ) {
      for (const value of selectedCategory) {
        if (selectSources.includes("newsApi")) {
          const url = `=${value.newsAPICategory}&language=en&apiKey=${process.env.REACT_APP_NEWSAPI}`;
          const newsApiResponse = await fetchNewsApi(url);

          data = [
            ...data,
            ...newsApiResponse.filter(
              (item) => item.title.toLowerCase() !== "[removed]",
            ),
          ];
        }
        if (
          selectSources.includes("nytimes") &&
          value.nyTimesCategory.length > 0
        ) {
          const nyTimeUrl = `/all/${value.nyTimesCategory}.json?api-key=${process.env.REACT_APP_NYTIMES}`;
          const nyTimesApiResponse = await fetchNyTimesApi(nyTimeUrl);
          data = [...data, ...nyTimesApiResponse];
        }
      }
    } else {
      if (
        selectSources.includes("newsApi") &&
        (dateFilter === null || dateFilter === "")
      ) {
        const url = `=&language=en&apiKey=${process.env.REACT_APP_NEWSAPI}`;
        const newsApiResponse = await fetchNewsApi(url);
        data = [...data, ...newsApiResponse];
      }
      if (
        selectSources.includes("nytimes") &&
        (dateFilter === null || dateFilter === "")
      ) {
        const nyTimeUrl = `/all/all.json?api-key=${process.env.REACT_APP_NYTIMES}`;
        const nyTimesApiResponse = await fetchNyTimesApi(nyTimeUrl);
        data = [...data, ...nyTimesApiResponse];
      }
    }

    if (selectSources.includes("guardian")) {
      const guardianUrl =
        (dateFilter ? `&from-date=${dateFilter}&to-date=${dateFilter}` : "") +
        `&api-key=${process.env.REACT_APP_GUARDIANAPI}`;
      const guardianApiResponse = await fetchGuardianApi(guardianUrl);
      data = [...data, ...guardianApiResponse];
    }
    setArticles([...data]);
    dispatch({ type: "update", data: { ...preferences, isLoading: false } });
  };

  const handlePreferencesChanges = (value) => {
    dispatch({
      type: "update",
      data: value,
    });
  };
  return (
    <>
      {!showPopup ? (
        <PersonalizedNewsFeedPopup
          setShowPopup={setShowPopup}
          preferences={preferences}
          handlePreferencesChanges={handlePreferencesChanges}
          onSave={fetchData}
        />
      ) : (
        <>
          <SearchBar
            search={search}
            setSearch={setSearch}
            setShowPopup={setShowPopup}
            preferences={preferences}
            handlePreferencesChanges={handlePreferencesChanges}
            onSave={fetchData}
          />
          {articles.length <= 0 ? (
            preferences.selectedSources.length <= 0 ? (
              <MessageText>Please select the sources</MessageText>
            ) : preferences.selectedSources.length > 0 &&
              !preferences.isLoading ? (
              <MessageText>No news founds</MessageText>
            ) : (
              <Spinner>
                <Flex align="center">
                  <Spin size="large" />
                </Flex>
              </Spinner>
            )
          ) : (
            <NewsArticles
              articles={articles}
              search={search}
              selectedCategories={preferences?.selectedCategories}
              authorOption={preferences?.selectedAuthors}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
