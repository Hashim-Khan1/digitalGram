const validateInput = (form: Object, regex: String) => {
  let err;
  Object.values(form).map((value, index) => {
    if (value == null || value == undefined || value == "") {
      err = false;
    } else {
      err = true;
    }
  });
  return err;
};
export default validateInput;
