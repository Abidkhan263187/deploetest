import * as Yup from "yup";
import { Constants } from "../../constants/Constant";

export const formValidationSchema = Yup.object().shape({
    userName: Yup.string().required(Constants.userNameValidation),
    password: Yup.string().required(Constants.passwordValidation),
  });
