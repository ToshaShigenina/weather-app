const createQuery = (params: Record<string, unknown>) => {
  const result = [];
  if (
    params &&
    typeof params === 'object' &&
    params instanceof Object &&
    params.constructor === Object
  ) {
    for (let key in params) {
      if (typeof params[key] !== 'object') result.push(`${key}=${params[key]}`);
    }
    return `?${result.join('&')}`;
  }
  return '';
};

const sendGet = (url: string, params: Record<string, unknown>) => {
  return fetch(`${url}${createQuery(params)}`)
    .then(response => response.json())
}

export default sendGet