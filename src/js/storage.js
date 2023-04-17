class StorageWrapper {
  constructor(key, stringifyValue = false) {
    this._key = key;
    this._stringifyValue = stringifyValue;
  }

  getValue() {
    let value = localStorage.getItem(this._key);
    return this._stringifyValue ? JSON.parse(value) : value;
  }

  setValue(value, cb = null, ...params) {
    value = this._stringifyValue ? JSON.stringify(value) : value;
    localStorage.setItem(this._key, value);
    console.log("params", params)
    if (cb) cb(...params);
  }
}
