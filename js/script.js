/* three lives  */
var lives = 3;
var steps = 0;

$(window).on("load", function () {
  var retry = getUrlVars()["retry"];

  /* when you load the game the welcome-screen modal will come up */
  if (retry == null) {
    $("#welcome-screen").modal("show");
  }
});

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function random(value, btn) {
  // clear colours from buttons
  reset();

  // generate random number between 1 and 2
  let number = Math.floor(Math.random() * 2 + 1);

  // finds button that was pressed
  var element = document.getElementById(btn);

  // if random number = number you selected
  if (value == number) {
    // put class on button that was selected to make green
    element.classList.add("correct");

    // Add 1 to the step variable if correct button was pressed
    steps = steps + 1;

    // Get html element that shows step count and update it
    var leapCount = document.getElementById("leap-count");
    leapCount.innerHTML = steps;

    // make character move
    var gizmo = document.getElementById("gizmo");
    gizmo.classList.add("gizmoMove" + steps);

    // if we get to the forth step the level should end
    if (steps == 4) {
      $("#next-level-screen").modal("show");
    }
  } else {
    element.classList.add("wrong");
    /* if you guess the wrong button you will lose a life */
    lives = lives - 1;
    setLives(lives);

    /* if you lose all your lives the end game modal will appear  */
    if (lives == 0) {
      $("#game-over-screen").modal("show");
    }
  }
}

/* set lives */
function setLives(lives) {
  var heart = document.getElementById("heart-" + lives);

  heart.classList.remove("fa-heart");
  heart.classList.add("fa-heart-broken");
}

/* if you press a btn and then you go to press another btn it should reset both btns to it's noraml colour */
function reset() {
  var btnA = document.getElementById("btn-a");
  btnA.classList.remove("wrong");
  btnA.classList.remove("correct");

  var btnB = document.getElementById("btn-b");
  btnB.classList.remove("wrong");
  btnB.classList.remove("correct");
}
