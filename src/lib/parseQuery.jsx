export default function parseQuery(searchParams) {
  let queryObj = {};
  for (let p of searchParams) {
    queryObj[p[0]] = p[1];
  }
  return queryObj;
}
