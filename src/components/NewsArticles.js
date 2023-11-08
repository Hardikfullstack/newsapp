import React from "react";
import styled from "styled-components";
import NewsCard from "./NewsCard";
import { PropTypes } from "prop-types";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  padding: 40px;
`;
const NewsArticles = ({
  articles,
  search,
  selectedCategories,
  authorOption,
}) => {
  const sortArticles = (item) =>
    item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
    item?.description?.toLowerCase()?.includes(search?.toLowerCase()) ||
    item?.source?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
    item?.webTitle?.toLowerCase()?.includes(search?.toLowerCase()) ||
    selectedCategories?.includes((i) =>
      item?.sectionName
        ?.toLowerCase()
        .includes(i?.guardianCategory?.toLowerCase()),
    ) ||
    item?.abstract?.toLowerCase()?.includes(search?.toLowerCase()) ||
    authorOption?.includes((i) =>
      i?.toLowerCase().includes(item?.byline?.toLowerCase()),
    ) ||
    item?.publishedAt?.toLowerCase()?.includes(search?.toLowerCase());

  return (
    <Container>
      <>
        {articles.filter(sortArticles).map((data, ind) => (
          <NewsCard
            key={"sortedArticles" + ind}
            index={ind}
            url={data?.url || data?.webUrl}
            urlToImage={data?.urlToImage || data?.multimedia?.[2]?.url}
            title={data?.title || data?.webTitle}
            sourceName={data?.source?.name || data?.source || "Guardian"}
            author={data?.author || data?.byline}
            category={data?.section || data?.sectionName}
            description={data?.description || data?.abstract}
            publishedAt={
              data?.publishedAt ||
              data?.webPublicationDate ||
              data?.first_published_date
            }
          />
        ))}
      </>
    </Container>
  );
};
NewsArticles.propTypes = {
  articles: PropTypes.array,
  search: PropTypes.string,
  selectedCategories: PropTypes.array,
  authorOption: PropTypes.array,
};
export default NewsArticles;
