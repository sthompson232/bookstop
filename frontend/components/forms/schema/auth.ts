import * as yup from 'yup';
import {
  REQUIRED, VALID_EMAIL, PASSWORD_MATCH, PASSWORD_MIN,
} from '../../../constants/error-messages';

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(VALID_EMAIL).required(REQUIRED),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email(VALID_EMAIL).required(REQUIRED),
  password: yup.string().required(REQUIRED),
});

export const resetPasswordSchema = yup.object().shape({
  password1: yup.string().required(REQUIRED).min(8, PASSWORD_MIN),
  password2: yup.string().required(REQUIRED).min(8, PASSWORD_MIN).oneOf([yup.ref('password1')], PASSWORD_MATCH),
});
