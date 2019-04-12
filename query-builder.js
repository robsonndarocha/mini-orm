class QueryBuilder {
  static function encode(data) {
    return Object.keys(data).map(key => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join(' AND ');
  }
}

module.exports = QueryBuilder;
