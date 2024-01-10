const createQuery = (params: Record<string, unknown>) => {
  if (
    params &&
    typeof params === 'object' &&
    params instanceof Object &&
    params.constructor === Object
  ) {
    const tempParams = Object.entries(params)
      .reduce((result, [key, value]) => {
        return { ...result, [key]: String(value) };
      }, {});
    return `?${new URLSearchParams(tempParams).toString()}`;
  }
  return '';
};

export const sendGet = async (url: string, params: Record<string, unknown>) => {
  return fetch(`${url}${createQuery(params)}`)
    .then(response => response.json())
}
