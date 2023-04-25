search(Open, _):-
    getBestState(Open, [CurrentState,Parent,_], _),
   % not(checkValid(CurrentState,0,*,*)),
   % not(hash(CurrentState,0)),
    printSolution([CurrentState,Parent,_]).

search(Open, Closed):-
    getBestState(Open, CurrentNode, TmpOpen),
    getAllValidChildren(CurrentNode,TmpOpen,Closed,Children), % Step3
    addChildren(Children, TmpOpen, NewOpen), % Step 4
    append(Closed, [CurrentNode], NewClosed), % Step 5.1
    search(NewOpen, NewClosed). % Step 5.2


% Implementation of step 3 to get the next states
getAllValidChildren(Node, Open, Closed, Children):-
    findall(Next, getNextState(Node, Open, Closed, Next), Children).

getNextState([State,_,_], Open, Closed, [Next,State,Hvalue]):-
    move(State, Next),
    count_domino(Next,0,Hvalue,_),
    not(member([Next,_], Open)),
    not(member([Next,_], Closed)).

% Implementation of getState and addChildren determine the search
alg.
% BFS
getBestState(Open, BestNode, Rest):-
    findMin(Open,BestNode),
    delete(Open,BestNode,Rest).

% Greedy best-first search
findMin([X], X):- !.

findMin([Head|T], Min):-
    findMin(T, TmpMin),
    Head = [_,_,HeadH],
    TmpMin = [_,_,TmpH],
    (TmpH < HeadH -> Min = TmpMin ; Min = Head).

addChildren(Children, Open, NewOpen):-
    append(Open, Children, NewOpen).

% Implementation of printSolution to print the actual solution path
printSolution([State, null,_],_):-
    write(State), nl.

printSolution([State, _,_]):-
    write(State), nl.

checkValid(State,I,Char1,Char2):-
     nth0(I,State,R),
     I1 is I + 1,
     (   nth0(J,R,Char1)->
     ((empty(State,I,J,Char2),!);(checkValid(State,I1,Char1,Char2))),!;
     checkValid(State,I1,Char1,Char2)).

count_domino(State,I,Count,NewState3):-
    nth0(I, State,R),
    (   (   nth0(J, R, #); nth0(J,R,*)),
    I1 is I + 1,
    ((J1 is J + 1,
      nth0(J1, R, Tile),
      (   Tile = #; Tile = *),
      substitute(State,I,J,$,NewState),
      substitute(NewState,I,J1,$,NewState1),
      count_domino(NewState1, I, Count1,NewState2),
      count_domino(NewState2,I1, Count2,NewState3),
      Count is Count1 + Count2 + 1,!);

      (   nth0(I1,State,R1),
      nth0(J,R1,Tile),
      (   Tile = #; Tile = *),
      substitute(State,I,J,@,NewState),
      substitute(NewState,I1,J,@,NewState1),
      count_domino(NewState1, I, Count1,NewState2),
      count_domino(NewState2,I1, Count2,NewState3),
      Count is Count1 + Count2 + 1,!));
    (   I2 is I + 1,
        count_domino(State,I2, Count,NewState3),!)).






%base Case.
count_domino(State,_,0,State).


empty(State,I,J,Char):-
    J1 is J + 1,
    nth0(I,State,R),
    (   nth0(J1,R,Tile),
        Tile = Char,!);
    (   I1 is I + 1,
        nth0(I1,State,R1),
        nth0(J,R1,Tile1),
        Tile1 = Char).

hash(State,I):-
    nth0(I,State,R),
    (   (   nth0(_,R,#),!);
    (   I1 is I + 1,
        hash(State,I1))).

get(State, I, H,W):-
    nth0(I,State,R),
    I1 is I + 1,
    (nth0(J,R,#) -> (H = I, W = J,!);get(State,I1,H,W)).

horizontal(State,Next):-
    get(State,0,H,W),
    nth0(H,State,R),
    W1 is W + 1,
    nth0(W1,R,Tile),
    Tile = # -> (
    substitute(State,H,W,h,New1),
    substitute(New1,H,W1,h,Next),!);forward(State,Next).


vertical(State,Next):-
    get(State,0,H,W),
    H1 is H + 1,
    nth0(H1,State,R1),
    nth0(W,R1,Tile),
    Tile = # -> (
    substitute(State,H,W,v,New1),
    substitute(New1,H1,W,v,Next),!);forward(State,Next).

forward(State,Next):-
    get(State,0,H,W),
    substitute(State,H,W,*,Next).


move(State,Next):-
    horizontal(State,Next);
    vertical(State,Next).





% Define a predicate to substitute an element in the array
substitute(Array, X, Y, NewVal, NewArray) :-
    nth0(X, Array, Row),     % Get the Xth row of the array
    replace(Row, Y, NewVal, NewRow), % Replace the variable with the new value
    replace(Array, X, NewRow, NewArray). % Replace the Xth row with the new row

% Define a predicate to replace a row in the array
replace(Array, X, NewRow, NewArray) :-
    length(Array, Len),
    X < Len,
    append(Before, [_|After], Array), % Split the array into two parts before and after the Xth row
    length(Before, X),
    append(Before, [NewRow|After], NewArray). % Concatenate the two parts with the new row



count_bomb(State,I,Count,NewState3):-
    nth0(I, State,R),
    (   (   nth0(J, R, x),
    I1 is I + 1,
    ((J1 is J + 1,
      nth0(J1, R, Tile),
      Tile = x,
      substitute(State,I,J,$,NewState),
      substitute(NewState,I,J1,$,NewState1),
      count_bomb(NewState1, I, Count1,NewState2),
      count_bomb(NewState2,I1, Count2,NewState3),
      Count is Count1 + Count2 + 1,!);

    (   nth0(I1,State,R1),
      nth0(J,R1,Tile),
      Tile = x,
      substitute(State,I,J,@,NewState),
      substitute(NewState,I1,J,@,NewState1),
      count_bomb(NewState1, I, Count1,NewState2),
      count_bomb(NewState2,I1, Count2,NewState3),
      Count is Count1 + Count2 + 1,!);

    (
      substitute(State,I,J,@,NewState1),
      count_bomb(NewState1, I, Count1,NewState2),
      count_bomb(NewState2,I1, Count2,NewState3),
      Count is Count1 + Count2 + 1,!)));
    (   I2 is I + 1,
    count_bomb(State,I2, Count,NewState3),!)).

count_bomb(State,_,0,State).





