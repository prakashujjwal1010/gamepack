var rpns = [];
var targetsEz = [];
var targetsMed = [];
var best = "";
var maxScore = 0;
var uniq = {}
var dups = false
var compulsory = '/';
var targetNumber = 27;
var numbers = [1,2,2,4,5];

function score(pattern,writePos) {
  var scr = 0;
  map = {}
  var flag = 0;
  for (var i = 0; i <= writePos; i++) {
    if (isNaN(pattern[i])) {
      if(!(pattern[i] in map)){
        map[pattern[i]] = 1;
        flag++
      }
      if (pattern[i]=='+' || pattern[i]=='*' ) {
        scr+=1;
      }
      else if (pattern[i]=='-') {
        scr+=2
      }
      else if (pattern[i]=='/') {
        scr+=3
      }

    }
  }
  if(flag == 4){
    scr = 18
  }
  return scr;
}

function findEle(arr, ele) {
  var len = arr.length;
  for (var i = len - 1; i >= 0; i--) {
    if (arr[i] === ele) {
      return true;
    }
  }
  return false;
}

function gentips(pattern, remaining, writePos, unresolvedNumbers) {
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
      if(result > targetNumber && hasTwo){
        flag = false;
      }

      if (!found && allowed && flag) {
        if (compulsory != null) {
          var comp = findEle(rpn,compulsory);
        }
        else {
          var comp = 1;
        }

        if(result == targetNumber && comp != -1){
          var s = score(pattern,writePos);
          if(s > maxScore){
            maxScore = s
            best = rpn
          }

        }
        gentips(pattern, remaining, writePos + 1, unresolvedNumbers - 1)
      }
    }
  }

  for (let i = 0; i < remaining.length && !found; i++) {
    const remainingSubset = removeEntryFromArray(remaining, i)
    pattern[writePos] = remaining[i]
    gentips(pattern, remainingSubset, writePos + 1, unresolvedNumbers + 1)
  }

}

function findTips(inputNumbers) {
  rpns = [];
  targetsEz = [];
  targetsMed = [];
  maxScore = 0;
  best = ""
  uniq = {}
  numbers = inputNumbers;
  dups = checkIfArrayHasDups(numbers)
  const pattern = new Array(2 * numbers.length)
  var t0 = performance.now();
  gentips(pattern, numbers, 0, 0)
  var t1 = performance.now();
  console.log(t1-t0 + " msecs");
  var bestArr = best.split(',');
  var slots = rpnToSlots(bestArr)
  return slots;
}
