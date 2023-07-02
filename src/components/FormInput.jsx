const FormInput = ({ label, type, inputProps, validationMessage }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        value={inputProps.value}
        onChange={inputProps.handleChange}
      />
      {!inputProps.isValid() && inputProps.value && (
        <p style={{ color: "red" }}>{validationMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
