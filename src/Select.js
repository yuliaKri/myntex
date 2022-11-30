import React from "react";
import PropTypes from "prop-types";

const Select = ({
  defaultOption,
  error,
  labelClassName = "",
  labelText,
  onChange,
  options,
  value,
  id,
  name,
  required,
}) => (
  <>
    {labelText && (
      <label htmlFor={id} className={labelClassName}>
        <p
          style={{marginBottom: '2px', marginTop: '12px', color: "blue"}}
        >
          {labelText}
        </p>
      </label>
    )}
    <div className="">
      <select
        className=""
        onChange={onChange}
        value={value}
        multiple={false}
        id={id}
        name={name || id}
        required={!!required}
      >
        {defaultOption && (
          <option style={{color: "gray"}} value={defaultOption.value}>
            {defaultOption.label}
          </option>
        )}
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
    {error && (
      <div style={{color: 'red'}}>
        {error}
      </div>
    )}
  </>
);

Select.defaultProps = {
  error: null,
  labelClassName: "",
  labelText: "",
  labelTextClassNames: "",
  defaultOption: {
    label: "select city",
    value: "select city",
  },
  name: null,
  required: false,
};

Select.propTypes = {
  defaultOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  error: PropTypes.string,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  labelTextClassNames: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]).isRequired,
  place: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default Select;
