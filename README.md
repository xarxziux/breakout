# Breakout #

This project is a slightly modified version of the [MDN breakout tutorial][1].  This version places the code in a separate JavaScript file instead of embedding it within the HTML page.  It also uses a more object-oriented design than the original by wrapping the variables for the blocks, ball and paddle within objects instead of as separate variables.  It also aims for better separation of the functions, replacing some of the closure-stlye functions of the original with pure functions.  It also implements a simple bot that auto-plays the game.

At present, this project is still in a pre-alpha phase and lacks polish.  It is planned to add more user customisation to the game, to change the winning and losing conditions and add more randomity to the game, but none of that has been added yet.


[1]: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript