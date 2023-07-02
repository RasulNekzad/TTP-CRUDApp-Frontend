import { useState } from "react";

const useValidatedFormInput = (
  initialValue,
  validationPattern,
  min = null,
  max = null
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const isValid = () => {
    if (validationPattern) {
      return validationPattern.test(value);
    }
    return value >= min && value <= max;
  };

  const inputProps = {
    value,
    handleChange,
    isValid,
    setValue,
  };
  return inputProps;
};

export default useValidatedFormInput;
