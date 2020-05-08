//const evaluator = require('./countdown-RPN-evaluator')
const OPERANDS = ['+', '*', '-', '/']

results = {}
maxNo = -1;
minNo = 200;
mxN = -1;
mxArr = [];

class Permutatron {
  constructor(numbers, target) {
    this.numbers = numbers
    this.target = target
    this.targets = [],
    this.extra = []
  }

  evaluate(pattern, writePos) {
    const {allowed, result} = evaluator(pattern, writePos)
    /*if (result === this.target) {
      this.found = pattern
    }*/
    return allowed
  }

  removeEntryFromArray(array, skipIndex) {
    const subset = new Array(array.length - 1)
    for (let i=0; i<array.length; i++) {
      if (i === skipIndex) continue;
      subset[i > skipIndex ? i - 1 : i] = array[i]
    }
    return subset
  }

  iterate(pattern, remaining, writePos, unresolvedNumbers) {

    if (unresolvedNumbers > 1) {
      for (let i=0; (i<OPERANDS.length && !this.found); i++) {
        const findRep = pattern.indexOf(OPERANDS[i]);
        if(findRep==-1)
          pattern[writePos] = OPERANDS[i]
        const allowed = this.evaluate(pattern, writePos)

        if (!this.found && allowed && findRep==-1) {
          this.iterate(pattern, remaining, writePos + 1, unresolvedNumbers - 1)
        }
      }
    }
    if(remaining.length == 0 ){
      const {allowed, result} = evaluator(pattern, writePos);
      let obj = {
        pattern,
        allowed,
        result
      }
      if(allowed){
        let str = this.numbers.toString()
        results[str].arr.push(obj)
        let f = results[str].targets.indexOf(result);
        if(f!=-1){
          results[str].targets.splice(f,1);
        }
        if(result > 100){
          this.extra.push(result)
        }
      }

    }

    for (let i=0; i<remaining.length && !this.found; i++) {
      const remainingSubset = this.removeEntryFromArray(remaining, i)
      pattern[writePos] = remaining[i]
      this.iterate(pattern, remainingSubset, writePos + 1, unresolvedNumbers + 1)
    }
  }

  find() {
    const pattern = new Array(2 * this.numbers.length - 1)
    this.iterate(pattern, this.numbers, 0, 0)
    return this.found
  }

  allCombination(){
    let arr = []

    for(let i1=1;i1<=4;i1++){
      arr.push(i1)
      for(let i2=1;i2<=6;i2++){
        let ct2 = arr.filter(x => x==i2).length
        if(ct2<1){
          arr.push(i2)
          for(let i3=1;i3<=8;i3++){

            let ct3 = arr.filter(x => x==i3).length
            if(ct3<1){
              arr.push(i3)
              for(let i4=1;i4<=12;i4++){
                let ct4 = arr.filter(x => x==i4).length
                if(ct4<1){
                  arr.push(i4)
                  for(let i5=1;i5<=20;i5++){
                    let ct5 = arr.filter(x => x==i5).length

                    if(ct5<1){
                      arr.push(i5)
                      this.numbers = arr;
                      let str = this.numbers.toString()
                      results[str] = {
                        arr:[],
                        targets: []
                      };
                      this.target = 20;
                      for(let i=1;i<100;i++){
                        results[str].targets.push(i);
                      }
                      this.find();
                      if(results[str].targets.length > mxN){
                        mxN = results[str].targets.length
                        mxArr = [...results[str].targets]
                      }
                      /*if(results[str].length < minNo){
                        minNo = results[str].length
                      }*/
                    }

                  }
                }



              }
            }


          }
        }

      }
    }
  }

  targetsgen(){
    this.targets = [];
    for(let i=1;i<=100;i++){
      this.targets.push(i);
    }
  }

  f(){
    for(let i1=1;i1<=4;i1++){
      for(let i2=1;i2<=6;i2++){
        for(let i3=1;i3<=8;i3++){
          for(let i4=1;i4<=12;i4++){
            for(let i5=1;i5<=20;i5++){
              const arr = [i1,i2,i3,i4,i5]
              let str = arr.toString()
              if(mx > results[str].targets.length){
                mx = results[str].targets.length
                 mxArr = results[str].targets
              }
            }

          }
        }
      }
    }
  }

}

//module.exports = Permutatron
