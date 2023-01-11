export const Result = () => {
  const x__ = {};

  let _ok = false;
  let _err = null;
  let _value = null;

  x__.ok = value => {
    _ok = true;
    _err = null;
    _value = value;
    return x__;
  };

  x__.err = err => {
    _ok = false;
    _err = err;
    _value = null;
    return x__;
  };

  x__.isOk = () => {
    return _ok;
  };

  x__.unwrap = () => {
    if (!_ok) {
      const msg =
        _err && typeof _err?.message === 'string' ? `: ${_err.message}` : '';
      throw new Error(`The result has an error${msg}`);
    }
    return _value;
  };

  x__.unwrap_err = () => {
    return _err;
  };

  return x__;
};
