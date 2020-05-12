
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
var targetsEz = [];
var targetsMed = [];
var target = new Array(100+1).join('0').split('').map(parseFloat);
var best = new Array(100+1).join('0').split('').map(parseFloat);
var uniq = {}
var dups = false
var compulsory = null;
var numbers = [11,11,11,11,3]

function pushTarget(result) {
  if (result<=69 && result>=10) {
    targetsEz.push(result);
  }
  if (result<100 && result>=1) {
    targetsMed.push(result);
  }
}


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
        if (compulsory != null) {
          var comp = rpn.indexOf(compulsory);
        }
        else {
          var comp = 1;
        }

        if(result < 100 && comp != -1 && writePos == 8){
          var s = 13;
          if(!target[result]){
            pushTarget(result)
            target[result] = s
            best[result] = rpn
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
  targetsEz = [];
  targetsMed = [];
  target = new Array(100+1).join('0').split('').map(parseFloat);
  best = new Array(100+1).join('0').split('').map(parseFloat);
  uniq = {}
  dups = checkIfArrayHasDups(numbers)
  const pattern = new Array(2 * numbers.length)
  genrpn(pattern, numbers, 0, 0)
  return found
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
  numbers = generateInputNumbers();
  find()
  var trgt = targetsEz[Math.floor(Math.random() * targetsEz.length)];
  console.log("easy: " + trgt);
  console.log(best[trgt])
}
function genMedQuestion() {
  numbers = generateInputNumbers();
  find()
  var trgt = targetsMed[Math.floor(Math.random() * targetsMed.length)];
  console.log("medium: " + trgt);
  console.log(best[trgt])
}

var t0 = performance.now();
genEzQuestion();
var t1 = performance.now();
console.log(t1-t0 + " msecs");
var t0 = performance.now();
genMedQuestion();
var t1 = performance.now();
console.log(t1-t0 + " msecs");
