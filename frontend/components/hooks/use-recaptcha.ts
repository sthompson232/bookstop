import { useEffect } from 'react';
// Constants
import { RECAPTCHA_SITE_KEY } from '../../constants';

const useRecaptcha = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
};

export default useRecaptcha;
