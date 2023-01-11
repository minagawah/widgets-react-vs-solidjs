import { useState } from 'react';
import Cookies from 'js-cookie';

const DEFAULT_DURATION = 60 * 60 * 24 * 365 * 100;

export const getCookie = (name, initial) => {
  const cookie = Cookies.get(name);
  return cookie ? JSON.parse(cookie) : initial;
};

export const useCookie = (name, initialValue) => {
  const [cookieValue, setCookieValue] = useState(() => {
    return getCookie(name, initialValue);
  });

  const _set = (value, options = {}) => {
    if (typeof value === 'undefined') {
      throw new Error('Nothing is given for cookie');
    }
    const { expires = DEFAULT_DURATION, path = '/' } = options;
    setCookieValue(value);
    Cookies.set(name, JSON.stringify(value), { expires });
  };

  const _del = (path = '/') => {
    _set('', { expires: -1, path }); // TODO????
    setCookieValue(null);
  };

  return [cookieValue, _set, _del];
};
