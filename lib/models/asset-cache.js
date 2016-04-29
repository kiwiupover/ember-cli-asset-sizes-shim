var LibQuantifier = require('./lib-quantifier');

function AssetCache(options) {
  this._cache = {};
  this._options = options || {};

  this.isActive = this._options.logAssets || this._options.addonToTrace;
}

AssetCache.prototype.lookup = function lookup(name) {
  var cached = this._cache[name];

  if (!cached) {
    this._cache[name] = cached = new LibQuantifier(name, this._options);
  }

  return cached;
};

AssetCache.prototype.forEach = function(callback) {
  var cache = this._cache;

  Object.keys(cache).forEach(function(item, index) {
    callback(cache[item], index);
  });
};

AssetCache.prototype.analyze = function analyze() {
  var libs = [];

  this.forEach(function(lib) {
    lib.analyze();
    libs.push(lib);
  });

  libs.sort(function compare(a, b) {
    if (a.stats.size > b.stats.size) {
      return -1;
    }
    if (a.stats.size < b.stats.size) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  libs.forEach(function(lib) {
    lib.log();
  });

};

module.exports = AssetCache;