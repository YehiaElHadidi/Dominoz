"use strict";

const runProlog = function () {
  const session = pl.create();
  const parsed = session.consult("uniformedSearch.pl", {
    success: function (goal) {
      console.log("CONSULT SUCCESSFULL");
    },
    error: function (err) {
      console.log("CONSULT NOT SUCCESSFULL");
    },
  });

  const query = session.query(
    "search([[[[#,#,#,#],[#,x,x,#]],null]], [], Output).",
    {
      success: function (goal) {
        console.log("QUERY SUCCESSFULL");
      },
      error: function (err) {
        console.log("QUERY NOT SUCCESSFULL");
      },
    }
  );
  // session.answer needs a callback function, here we "mute" the output
  session.answer((a) => console.log(pl.format_answer(a)));
};
