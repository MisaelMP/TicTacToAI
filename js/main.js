const computerTurn = function () {
  const choose = $(".tile:not(.marked)");
  randChoice = choose[Math.floor(Math.random() * choose.length)];
  $(randChoice).addClass('marked');
  $(randChoice).addClass('o-mark');
  trackTicTac(randChoice, 'o-mark');
}

const resetTicTacToe = function () {
  $(".tile").removeClass("marked");
  $(".tile").removeClass("o-mark");
  $(".tile").removeClass("x-mark");
  $("#game-result").hide();
  $("#game-result").html("");
  $("#game-result").removeClass("win");
  $("#game-result").removeClass("lost");
  finished = false;
}

const trackTicTac = function (obj, mark) {
  const winning_probability = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const markedPosition = $(obj).data("position");
  $.each(winning_probability, function(key, winning_probability_index) {
    if ($.inArray(markedPosition, winning_probability_index) >= 0) {
      markedLength = 0;
      $.each(winning_probability_index, function(index, value) {
        const innerSquareClass = $("#tile-" + value).attr("class");
        if (innerSquareClass.indexOf(mark) > 0) {
          markedLength = markedLength + 1;
          if (markedLength == winning_probability_index.length) {
            finished = true;
            if (mark == "x-mark") {
              status = " You Win!";
              className = "win";
            } else {
              status = " You Lost!";
              className = "lost";
            }
            $("#game-result").show();
            $("#game-result").html("Game Over." + status + " <button class='reset' onclick='resetTicTacToe();'>Reset to play again</button>.");
            $("#game-result").addClass(className);
          }
        }
      });
    }
  });
  return finished;
}

$(document).ready(function() {
  finished = false;
  $(".tile").on('click', function() {
    if (!finished) {
      const squareClass = $(this).attr("class");
      if (squareClass.indexOf("marked") < 0) {
        $(this).addClass('marked');
        $(this).addClass('x-mark');
        finished = trackTicTac(this, 'x-mark');
        computerTurn();
      }
    }
  });
});
