export const int = Math.trunc;

let time = Date.now();

export const capitalize = s => s[0].toUpperCase() + s.slice(1);

export const debounce = (f, delay) => {
  let timeout = null;
  let args = null;

  const g = () => {
    f.apply(null, args);
    time = Date.now();
  };

  return function () {
    args = arguments;

    if (!timeout && Date.now() >= time + delay) {
      g();
    } else {
      if (!!timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(g, delay);
    }
  };
};

const ENTITY_REGEX = /&(lt|gt|quot|amp|nbsp);/g;

const ENTITY_MAPPING = {
  lt: '<',
  gt: '>',
  amp: '&',
  nbsp: ' ',
};

// Decode HTML entities
export const decode = str =>
  str
    .replace(ENTITY_REGEX, (match, entity) => ENTITY_MAPPING[entity])
    .replace(new RegExp('&#(d+);', 'gi'), (match, num) =>
      String.fromCharCode(int(num))
    );
