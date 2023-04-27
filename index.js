const swipl = require("swipl");

swipl.call("working_directory(_, 'node_modules/swipl')");

swipl.call("consult('uniformedSearch.pl')");

const query = new swipl.Query("search([[[[#,#,#,#],[#,x,x,#]],null]], [],X).");

let ret = null;
while ((ret = query.next())) {
  console.log(ret.X);
}
