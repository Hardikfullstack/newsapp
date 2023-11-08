import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import CustomMultiSelect from "./CustomMultiSelect";
import { fetchNyTimesApi } from "../common/services";
import { categoryData } from "../common/constant";
import { debounce } from "../common/utils";
import {
  Button,
  NewsSelect,
  NewsSelectContainer,
  NewsSelectData,
  SaveButton,
} from "../common/styles";
import { sourceOption, categoryOption } from "../common/constant";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(180 255 221);
`;
const Category = styled.div`
  width: 40%;
  height: 40%;
  min-width: 420px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
const NewsType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 20px;
  padding: 20px 0px;
  h2 {
    text-align: center;
    color: rgb(42 137 124);
  }
`;

const PersonalizedNewsFeedPopup = ({
  setShowPopup,
  preferences,
  handlePreferencesChanges,
  onSave,
}) => {
  const [authors, setAuthors] = useState([]);

  const handleSave = () => {
    if (preferences.selectedCategories && preferences.selectedSources) {
      onSave(preferences.selectedCategories, preferences.selectedSources);
      setShowPopup(true);
      // setSelectCategory(selectedCategory);
      // setSelectSources(selectSources);
    }
  };

  const fetchAuthorData = debounce(async () => {
    const fetchedAuthorList = await fetchNyTimesApi(
      `/all/all.json?api-key=${process.env.REACT_APP_NYTIMES}`,
    );
    // setAuthors(fetchedAuthorList);

    const authorOptionsSet = new Set(
      fetchedAuthorList?.map((source) => source?.byline),
    );
    const uniqueAuthorOptions = Array.from(authorOptionsSet).map((source) => ({
      value: source,
      label: source,
    }));
    setAuthors([...uniqueAuthorOptions]);
  });

  useEffect(() => {
    if (authors.length <= 0) {
      fetchAuthorData();
    }
  }, []);

  const handleChangeCategory = (value) => {
    const findCategory = categoryData.filter((data) =>
      value.includes(data.category),
    );
    // setCategoriesSelect(findCategory);
    handlePreferencesChanges({
      ...preferences,
      selectedCategories: findCategory,
    });
  };

  const handleChange = (type, value) => {
    handlePreferencesChanges({ ...preferences, [type]: value });
  };

  return (
    <Container>
      <Category>
        <Content>
          <NewsType>
            <Title>
              <h2>Set Your Preferences</h2>
            </Title>
          </NewsType>
          <NewsSelectContainer>
            <NewsSelect>
              <NewsSelectData>
                <CustomMultiSelect
                  // handleSave={handleSave}
                  handleChange={handleChangeCategory}
                  options={categoryOption}
                  title={"Category"}
                  defaultValue={preferences.selectedCategories?.map(
                    (i) => i.category,
                  )}
                />
              </NewsSelectData>
              <NewsSelectData>
                <CustomMultiSelect
                  // handleSave={handleSave}
                  handleChange={(value) =>
                    handleChange("selectedSources", value)
                  }
                  options={sourceOption}
                  title={"Source"}
                  defaultValue={preferences.selectedSources}
                />
              </NewsSelectData>
              <NewsSelectData>
                <CustomMultiSelect
                  // handleSave={handleSave}
                  handleChange={(value) =>
                    handleChange("selectedAuthors", value)
                  }
                  options={authors}
                  title={"Author"}
                  defaultValue={preferences.selectedAuthors}
                />
              </NewsSelectData>
            </NewsSelect>
            <SaveButton>
              <Button onClick={handleSave}>Save</Button>
            </SaveButton>
          </NewsSelectContainer>
        </Content>
      </Category>
    </Container>
  );
};
PersonalizedNewsFeedPopup.propTypes = {
  setShowPopup: PropTypes.func,
  preferences: PropTypes.object,
  handlePreferencesChanges: PropTypes.func,
  setSelectCategory: PropTypes.func,
  selectSources: PropTypes.string,
  setSelectSources: PropTypes.func,
  setAuthorOption: PropTypes.func,
  authorOption: PropTypes.string,
  setCategoriesSelect: PropTypes.func,
  onSave: PropTypes.func,
  process: PropTypes.string,
  selectedCategory: PropTypes.string,
};
export default PersonalizedNewsFeedPopup;
