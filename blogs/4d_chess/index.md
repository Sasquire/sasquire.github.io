---
layout: "default"
date: "2020-07-31"
title: "4d_chess"
---

## [Play it now!](./chess.html)

# 4d Chess
This is a very bad chess program that doesn't really work. I made it after finding a 4d chessboard on [Tabletop Simulator](https://www.tabletopsimulator.com/). What I found most interesting was that this 4d chess could be played on a regular 8x8 chessboard. This was accomplished by using a table-of-tables approach (or matrix-of-matrices if you'd rather).

## How to play
This chess ""program"" provides no utilities like turn order, check or check mate, pawn promotion, or capturing your own pieces (however it *does* disallow illegal moves). I would recommend this game be played [hotseat](https://en.wikipedia.org/wiki/Hotseat_(multiplayer_mode)) or one player "hosts" the game and does the moves for another. You have the standard white-plays-first of chess.

I would say checkmate is the only win-condition, but I am unsure a checkmate is even possible. Other poorly thought out (never tested) game modes could be:

* Animal Rights: Play until all of someone's knights are captured.
* Tower Defense: Play until all of someone's rooks are captured.
* Creative Name 1: Play until all of someone's bishops are captured.
* Creative Name 2: Play until all of someone's pawns are captured.
* Variety: Play until someone has captured at least one rook, one knight, one bishop, and one pawn.

## What are all these colors and symbols?

In an effort to extend [chess notation](https://en.wikipedia.org/wiki/Chess_notation) to four dimensions you can find a bunch of symbols and colors along the chess squares. 

* `1`, `2`, `3`, and `4` are the outer vertical checkering.
* `A`, `B`, `C`, and `D` are the outer horizontal checkering.
* `#` and `-` are the inner vertical checkering.
* `^` and `*` are the inner horizontal checkering.

The numbers preceded by `i` are the spots index in the 4 dimensional array that represents the chessboard.

## Piece move extensions

* Pawn: Can move 1 unit in any of the vertical dimensions and *optionally* 1 unit in any other dimension (to mimic diagonal captures).
* Knight: Can *only* move 1 unit in any dimension and 2 units in a different dimension.
* Rook: Can move any amount of units in any single dimension.
* Bishop: Can move any amount of units in exactly 2 dimensions simultaneously.
* Queen: Has the Rook and Bishop's moveset combined.
* King: Can move in 1 unit in any number of dimensions simultaneously.