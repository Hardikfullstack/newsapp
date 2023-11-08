import React, { useState } from "react";
import styled from "styled-components";
import CustomMultiSelect from "./CustomMultiSelect";
import {
  Button,
  NewsSelect,
  NewsSelectContainer,
  NewsSelectData,
  SaveButton,
} from "../common/styles";
import { DatePicker } from "antd";
import FilterIcon from "../assets/filter.svg";
import { PropTypes } from "prop-types";
import { sourceOption, categoryOption, categoryData } from "../common/constant";
import dayjs from "dayjs";
// import moment from "moment";
const Container = styled.div`
  align-items: center;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const SerachInput = styled.input`
  width: 45%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 17px;
  outline: none;
  box-shadow: 1px 1px 10px 1px #939393;
  @media (max-width: 600px) {
    width: 80%;
  }
`;

const PersonalizedNewsFeed = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 1px 1px 10px 1px #939393;
  }
  @media (max-width: 700px) {
    padding: 10px 10px;
    font-size: 14px;
  }
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;
const FilterIconContainer = styled.div`
  width: 40px;
  height: 100%;
  margin-top: 10px;
  position: relative;
  span {
    border: 1px solid black;
    padding: 8px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px 10px 1px #939393;
    }
  }
`;
const FilterPopupContainer = styled.div`
  position: absolute;
  top: 50px;
  width: 40%;
  min-width: 320px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    top: 75px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  width: 100%;
  h3 {
    margin-right: 15px;
    color: rgb(42 137 124);
  }
`;
const dateFormat = "YYYY-MM-DD";

const SearchBar = ({
  setSearch,
  search,
  setShowPopup,
  preferences,
  onSave,
  handlePreferencesChanges,
}) => {
  const [filterPopup, setFilterPopup] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const handleSave = () => {
    if (preferences.selectedCategories && preferences.selectedSources) {
      onSave(
        preferences.selectedCategories,
        preferences.selectedSources,
        dateFilter,
      );
      setFilterPopup(false);
    }
  };
  const handleChange = (type, value) => {
    handlePreferencesChanges({ ...preferences, [type]: value });
  };
  const handleChangeCategory = (value) => {
    const findCategory = categoryData.filter((data) =>
      value.includes(data.category),
    );
    handlePreferencesChanges({
      ...preferences,
      selectedCategories: findCategory,
    });
  };
  const onChangeDate = (date, dateString) => {
    setDateFilter(dateString);
  };
  return (
    <Container>
      <SerachInput
        type="text"
        placeholder="Search for articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FilterIconContainer onClick={() => setFilterPopup(!filterPopup)}>
        <img src={FilterIcon} alt="filter icon" height={20} width={20} />
      </FilterIconContainer>
      <PersonalizedNewsFeed onClick={() => setShowPopup(false)}>
        Personalized news feed
      </PersonalizedNewsFeed>
      {filterPopup && (
        <FilterPopupContainer>
          <NewsSelectContainer>
            <NewsSelect>
              <NewsSelectData>
                <CustomMultiSelect
                  title={"Source"}
                  options={sourceOption}
                  defaultValue={preferences?.selectedSources}
                  handleChange={(value) =>
                    handleChange("selectedSources", value)
                  }
                />
              </NewsSelectData>
              <NewsSelectData>
                <CustomMultiSelect
                  title={"Category"}
                  options={categoryOption}
                  defaultValue={preferences?.selectedCategories?.map(
                    (i) => i.category,
                  )}
                  handleChange={handleChangeCategory}
                />
              </NewsSelectData>
              <DateContainer>
                {" "}
                <h3>Select Date</h3>
                <DatePicker
                  type={"date"}
                  picker={"date"}
                  format={dateFormat}
                  onChange={onChangeDate}
                  defaultValue={
                    dayjs(dateFilter).isValid()
                      ? dayjs(dateFilter, dateFormat)
                      : undefined
                  }
                />
              </DateContainer>
            </NewsSelect>

            <SaveButton>
              <Button onClick={handleSave}>Save</Button>
            </SaveButton>
          </NewsSelectContainer>
        </FilterPopupContainer>
      )}
    </Container>
  );
};

SearchBar.propTypes = {
  setSearch: PropTypes.func,
  search: PropTypes.string,
  setShowPopup: PropTypes.func,
  preferences: PropTypes.object,
  onSave: PropTypes.func,
  handlePreferencesChanges: PropTypes.func,
};

export default SearchBar;
