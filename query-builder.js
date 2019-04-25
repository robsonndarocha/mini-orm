class QueryBuilder {
  static getClauseParamsFromArgs(args) {
    return Object.keys(args).map((key) => {
      if (typeof args[key] === 'string') {
        return [key, `'${args[key]}'`].join(' = ');
      }
      return [key, args[key]].join(' = ');
    }).join(' AND ');
  }

  static getParamsFromArgs(args) {
    return Object.keys(args).map(key => args[key]);
  }
}

module.exports = QueryBuilder;
