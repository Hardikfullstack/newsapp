import { Tag } from "antd";
import React from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
const Link = styled.a`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  backgound: #fff;
  width: 400px;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: #000;
  transition: 0.3s;
  padding-bottom: 8px;
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;
const ArticleImage = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
  height: 240px;
  img {
    width: 100%;
    height: 100%;
    transition: 0.7s ease-in-out;
  }
`;
const ArticleContent = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-grow: 1;
`;
const ArticleSource = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  span {
    text-wrap: wrap;
  }
`;
const ArticleTitle = styled.div`
  color: #000;
`;
const ArticleDescription = styled.div`
  p {
    line-height: 25px;
    color: #555;
  }
`;
const NewsCard = ({
  url,
  urlToImage = "https://vskills.in/certification/blog/wp-content/uploads/2015/01/structure-of-a-news-report.jpg",
  title,
  sourceName,
  description,
  publishedAt,
  author,
  category,
}) => {
  const formatTime = publishedAt.replace("T", " ").replace("Z", "");
  return (
    <>
      <Link href={url} target="_blank">
        <ArticleImage>
          <img src={urlToImage} alt={title} />
        </ArticleImage>
        <ArticleContent>
          <ArticleSource>
            {sourceName && <Tag color="magenta">{sourceName}</Tag>}
            {author && <Tag color="green">{author}</Tag>}
            {category && <Tag color="blue">{category}</Tag>}
            {/* <span>{sourceName}</span> */}
          </ArticleSource>

          <ArticleTitle>
            <h2>{title}</h2>
          </ArticleTitle>
          <ArticleDescription>{description}</ArticleDescription>
          <div className="article-dete">
            <small>
              <b>published At: </b>
              {formatTime}
            </small>
          </div>
        </ArticleContent>
      </Link>
    </>
  );
};
NewsCard.propTypes = {
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  title: PropTypes.string,
  sourceName: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.date,
  author: PropTypes.string,
  category: PropTypes.string,
};
export default NewsCard;
