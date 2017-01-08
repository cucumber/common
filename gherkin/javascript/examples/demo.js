var input = document.getElementById('input');
var output = document.getElementById('output');
var parser = new Gherkin.Parser();
parser.stopAtFirstError = false;

function parse() {
  var result;
  try {
    var ast = parser.parse(input.value);
    result = JSON.stringify(ast, null, 2);
  } catch (e) {
    result = e.stack;
  }
  output.innerText = result;
}

input.onkeyup = function () {
  parse();
};

parse();
