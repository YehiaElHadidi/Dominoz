const swipl = require("swipl");

const consultUninformed = function () {
  swipl.call("consult('uniformedSearch.pl')");
};

const queryProlog = function (q) {
  swipl.call("working_directory(_, prolog)");
  consultUninformed();

  console.info(q);
  let qu = `search([[${JSON.stringify(q)},null]], [],X).`;
  console.info(qu);
  qu = qu.replaceAll(`\"`, ``);
  console.info(qu);
  const query = new swipl.Query(qu);
  let solutions = [];
  let ret = null;
  while ((ret = query.next())) {
    console.info(ret.X);
    solutions.push(ret.X);
  }
  return solutions;
};

module.exports = {
  queryProlog,
  consultUninformed,
};
