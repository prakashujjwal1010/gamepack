
const OPERANDS = [ '+', '-','/', '*']
var opLen = 4
var found = false

function removeEntryFromArray(array, skipIndex) {
  const subset = new Array(array.length - 1)
  for (let i=0; i<array.length; i++) {
    if (i === skipIndex) continue;
    subset[i > skipIndex ? i - 1 : i] = array[i]
  }
  return subset
}

function checkIfArrayHasDups(arr) {
    var map = {}, i, size;

    for (i = 0, size = arr.length; i < size; i++){
        if (map[arr[i]]){
            return true;
        }

        map[arr[i]] = true;
    }
    return false;
}

function checkIfArrayHasUniqueOps(pattern, writePos) {
  var map = {};
  var flag = 0;
  var flag2 = 0;
  var noOfOps = 0;
  var op = [0,0]
  for (var i = 0; i <= writePos; i++){
    if (isNaN(pattern[i])) {
      noOfOps++
      if(!(pattern[i] in map)){
        map[pattern[i]] = 1;
        flag++
      }
      if(pattern[i] == '-'){
        if(op[0]==0){
          op[0]=1;
          flag2++;
        }
      }
      if(pattern[i] == '/'){
        if(op[1]==0){
          op[1]=1;
          flag2++;
        }
      }

    }
  }

  return {unique: flag==noOfOps, hasTwo: flag2==2}
}

var rpns = [];
var level = 0;
var skipQuestion = {}
var target = null;
var best = "";
var uniq = {}
var dups = false
var numbers = [11,11,11,11,3]


function genrpn(pattern, remaining, writePos, unresolvedNumbers) {
  if (unresolvedNumbers > 1) {
    for (let i = 0;
      (i < opLen  && !found); i++) {
      pattern[writePos] = OPERANDS[i]
      const {allowed, result} = evaluator(pattern, writePos)
      const rpn = pattern.slice(0,writePos+1).join(',')
      const {unique, hasTwo} = checkIfArrayHasUniqueOps(pattern, writePos)
      var flag = false;
      if (dups) {
        if(!(rpn in uniq)){
          flag = true;
          uniq[rpn] = 1;
        }
      }
      else {
        flag = true;
      }
      if(result > 100 && hasTwo){
        flag = false;
      }

      if (!found && allowed && flag && unique) {
        var str = numbers.sort().join();
        if (skipQuestion[str] != result) {
          if(result < 100 && writePos == 8){
            if (result<=69 && result>=10 && level == 0) {
              found = true;
              target = result;
              best = rpn;
              skipQuestion[str] = result;
            }
            if (result<100 && result>=1 && level == 1) {
              found = true;
              target = result;
              best = rpn;
              skipQuestion[str] = result;
            }

          }
        }

        genrpn(pattern, remaining, writePos + 1, unresolvedNumbers - 1)
      }
    }
  }

  for (let i = 0; i < remaining.length && !found; i++) {
    const remainingSubset = removeEntryFromArray(remaining, i)
    pattern[writePos] = remaining[i]
    genrpn(pattern, remainingSubset, writePos + 1, unresolvedNumbers + 1)
  }

}

function find() {
  rpns = [];
  found = false;
  target = null;
  best = "";
  uniq = {}
  dups = checkIfArrayHasDups(numbers)
  const pattern = new Array(2 * numbers.length)
  genrpn(pattern, numbers, 0, 0)
  return target
}

function generateInputNumbers() {
  var t = 5;
  const upperRanges = [4,6,8,12,20];
  var inputNumbers = [];
  var noOfOnes = 0;
  var noOfTwos = 0;
  while(t--){
    /*1, 1, 1, 1, 1
    1, 1, 1, 1, 2
    1, 1, 1, 1, 3
    1, 1, 1, 1, 4
    1, 1, 1, 1, 5
    1, 1, 1, 2, 2
    1, 1, 1, 2, 3
    1, 1, 2, 2, 2
    1, 2, 2, 2, 2
    2, 2, 2, 2, 2  are invalid combinations so we will avoid thes*/


    if ((noOfOnes == 1 && noOfTwos == 3) || (noOfOnes == 2 && noOfTwos == 2) || (noOfTwos == 4)) {
      var min = 3;
      var tmp = Math.floor(Math.random() * (upperRanges[t] + 1 - min) + min);
      inputNumbers.push(tmp)
    }
    else  {
      var min = 1;
      var tmp = Math.floor(Math.random() * (upperRanges[t] + 1 - min) + min);
      if (tmp == 1) {
        noOfOnes++;
      }
      else if (tmp == 2) {
        noOfTwos++;
      }
      inputNumbers.push(tmp)
    }
  }
  return inputNumbers
}

function genEzQuestion() {
  var t0 = performance.now();
  numbers = generateInputNumbers();
  level = 0;
  find()
  var t1 = performance.now();
  console.log(t1-t0 + " msecs");
  console.log("easy: " + target);
  console.log(best)
}
function genMedQuestion() {
  var t0 = performance.now();
  numbers = generateInputNumbers();
  level = 1;
  find()
  var t1 = performance.now();
  console.log(t1-t0 + " msecs");
  console.log("medium: " + target);
  console.log(best)
}


genEzQuestion();
genMedQuestion();
