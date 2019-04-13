class QueryBuilder {
  static encode(params) {
    return Object.keys(params).map(key => [key, params[key]].join('=')).join(' AND ');
  }

  static bind(params) {
    return Object.keys(params).map(key => params[key]);
  }
}

export default QueryBuilder;
