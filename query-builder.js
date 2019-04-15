class QueryBuilder {
  static makeWhereClausesParams(args) {
    return Object.keys(args).map(key => [key, args[key]].join('=')).join(' AND ');
  }

  static getParamsFromArgs(args) {
    return Object.keys(args).map(key => args[key]);
  }
}

module.exports = QueryBuilder;
