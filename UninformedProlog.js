const swipl = require("swipl");

swipl.call("working_directory(_, prolog)");

const consultUninformed = function () {
  swipl.call("consult('uniformedSearch.pl')");
};

const query = new swipl.Query("search([[[[#,#,#,#],[#,x,x,#]],null]], [],X).");

let ret = null;
while ((ret = query.next())) {
  console.log(ret.X);
}
