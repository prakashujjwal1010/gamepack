

function rpnToSlots(pattern) {
 const stack = []
 const slots = []
 const len = pattern.length
 for (var i = 0; i < len; i++) {
   if (!isNaN(pattern[i])) {
     stack.push(parseInt(pattern[i]))
   }
   else{
     const second = stack.pop()
     const first = stack.pop()
     const operand = pattern[i]
     var result;

     if (operand === '+') {
       result =  first + second
     }
     else if (operand === '*') {
       result =  first * second
     }
     else if (operand === '-') {
       result =  first - second
     }
     else if (operand === '/') {
       result =  first / second
     }

     const slot = first + operand + second + '=' + result;
     stack.push(result);
     slots.push(slot);

     }
   }
   return slots
 }
