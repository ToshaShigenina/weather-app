const createQuery = params => {
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
  
  const sendGet = (url, params) => {
    return fetch(`${url}${createQuery(params)}`)
      .then(response => response.json())
  }
  
  export default sendGet