import { useState } from "react";

const useValidationFormInput = (
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
  };
  return inputProps;
};

export default useValidationFormInput;
