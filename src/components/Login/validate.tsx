const validateInput = (form: Object, regex: String) => {
  let err;
  for (let key in form) {
    if (form[key] == null || form[key] == undefined || form[key] == "") {
      err = false;
      break;
    } else {
      err = true;
    }
  }
  return err;
};
export default validateInput;
