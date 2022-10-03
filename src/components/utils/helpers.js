export function getValueByPath(obj, path) {
  return path.split(".").reduce((o, i) => o[i], obj);
}
