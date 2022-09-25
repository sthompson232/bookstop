import { RECAPTCHA_SITE_KEY } from '../constants';

export const getRecaptchaToken = (action: string) => {
  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
};
