import React from "react";
import { Select, Space } from "antd";
import { PropTypes } from "prop-types";
const CustomMultiSelect = ({ handleChange, options, title, defaultValue }) => {
  return (
    <>
      <h3>{title}</h3>
      <Space
        style={{
          width: "50%",
        }}
        direction="vertical"
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder={`Please select ${title}`}
          onChange={handleChange}
          options={options}
          defaultValue={
            defaultValue && defaultValue.length ? defaultValue : undefined
          }
        />
      </Space>
    </>
  );
};
CustomMultiSelect.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  defaultValue: PropTypes.array,
};
export default CustomMultiSelect;
