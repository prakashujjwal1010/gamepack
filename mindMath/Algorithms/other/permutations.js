//const evaluator = require('./countdown-RPN-evaluator')
const OPERANDS = [ "+","-","*","/"]

results = {}
maxNo = -1;
minNo = 200;
mxN = -1;
mxArr = [];
totalAll = 0;
allTargets = [];
mapAll={};
genmap = {};
repArr=[];
ord =[]

function score(pattern,writePos) {
  scr = 0;
  const distinct = (value, index, self) => {
    return !(typeof value === 'number') && self.indexOf(value) == index && index < writePos;
  }
  const noOps = pattern.filter(distinct).length;
  if (noOps == 4) {
    return 18
  }

  for (var i = 0; i < writePos; i++) {
    if (!(typeof pattern[i] === 'number')) {
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
  return scr;
}

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
        let str = this.numbers.concat().sort().join(',')
        /*results[str].arr.push(obj)
        let f = results[str].targets.indexOf(result);
        if(f!=-1){
          results[str].targets.splice(f,1);
        }
        if(result > 100){
          this.extra.push(result)
        }
        */
        let rpn = pattern.toString();

        if (result<100 ) {
          if(mapAll[str][result]==0){
            allTargets[result].rpns.push(rpn);
            mapAll[str][result]=1;
          }
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

  findAll() {
    const pattern = new Array(2 * this.numbers.length - 1)
    this.iterateAll(pattern, this.numbers, 0, 0)
    return this.found
  }


  iterateAll(patter, remaining, writePos, unresolvedNumbers) {

  /*  if (unresolvedNumbers > 1) {
      for (let i=0; (i<OPERANDS.length && !this.found); i++) {

        pattern[writePos] = OPERANDS[i]
        const allowed = this.evaluate(pattern, writePos)

        if (!this.found && allowed) {
          this.iterateAll(pattern, remaining, writePos + 1, unresolvedNumbers - 1)
        }
      }
    }


  //  if(remaining.length == 0 ){
      const {allowed, result} = evaluator(pattern, writePos);
      let obj = {
        pattern,
        allowed,
        result
      }
      if(allowed){
        let str = this.numbers.concat().sort().join(',')
        let rpn = pattern.toString();
        repArr.push(rpn);

        if (result<100 ) {
          if(mapAll[str][result]==0){
            allTargets[result].rpns = [rpn];
            mapAll[str][result] = score(pattern);
          }
          else {
            let scr = score(pattern)
            if (scr > mapAll[str][result]) {
              allTargets[result].rpns = [rpn]
              mapAll[str][result] = scr;
            }
          }
        }


      }

  //  }



    for (let i=0; i<remaining.length && !this.found; i++) {
      const remainingSubset = this.removeEntryFromArray(remaining, i)
      pattern[writePos] = remaining[i]
      this.iterateAll(pattern, remainingSubset, writePos + 1, unresolvedNumbers + 1)
    }*/
    let pattern = patter;
    if (unresolvedNumbers > 1) {
      for (let i=0; (i<OPERANDS.length && !this.found); i++) {
        pattern[writePos] = OPERANDS[i]
        const allowed = this.evaluate(pattern, writePos)
        if (pattern.join(',').substr(0,15) == "1,1,/,1,/,1,+,1" && writePos == 8) {
          console.log(allowed);
          //console.log(pattern.join(','));
        }

      if (!this.found && allowed) {
        this.iterateAll(pattern, remaining, writePos + 1, unresolvedNumbers - 1)
      }
    }
  }

        const {allowed, result} = evaluator(pattern, writePos);

    //  if(remaining.length == 0 ){


        if(allowed){
          if (pattern.join(',') == "1,1,/,1,/,1,+,1,+") {
            console.log("no");
            console.log();

          }
          let str = this.numbers.concat().sort().join(',')
          let rpn = pattern.toString();
          repArr.push(rpn);

          if (result<100 ) {

            if(mapAll[str][result]==0){
              allTargets[result].rpns = [rpn];
              mapAll[str][result] = score(pattern,writePos);
            }
            else {
              if (scr > mapAll[str][result]) {
                let scr = score(pattern, writePos)
                allTargets[result].rpns = [rpn]
                mapAll[str][result] = scr;
              }
            }
          }


        }

    //  }


    for (let i=0; i<remaining.length && !this.found; i++) {
      const remainingSubset = this.removeEntryFromArray(remaining, i)
      pattern[writePos] = remaining[i]
      this.iterateAll(pattern, remainingSubset, writePos + 1, unresolvedNumbers + 1)
    }
  }


  initMap(){
    mapAll = {}
    for(var i1=1;i1<=4;i1++){
    //  arr.push(i1);
      for(var i2=1;i2<=6;i2++){
        if (i1 != i2) {
          for(var i3=1;i3<=8;i3++){
            if (i3!=i2 && i3!=i1) {
              for (var i4 = 1; i4 <= 12 ; i4++) {
                if (i4!=i3 && i4!=i2 && i4!=i1) {
                  for (var i5 = 1; i5 <= 20; i5++) {
                    if (i5!=i4 && i5!=i3 && i5!=i2 && i5!=i1) {
                      let tmpArr = [i1,i2,i3,i4,i5];
                      let str = tmpArr.sort().join(',')
                      if (!(str in mapAll)) {
                        mapAll[str]=[];
                        for (var i = 0; i < 100; i++) {
                          mapAll[str].push(0);
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
    }

  }

  initMapFall(){
    mapAll = {}
    for(var i1=1;i1<=4;i1++){
      for (var i2 = 1; i2 <= 6; i2++) {
        for (var i3 = 1; i3 <= 8; i3++) {
          for (var i4 = 1; i4 <= 12; i4++) {
            for (var i5 = 1; i5 <= 20; i5++) {
              let tmpArr = [i1,i2,i3,i4,i5];
              let str = tmpArr.sort().join(',')
              if (!(str in mapAll)) {
                mapAll[str]=[];
                for (var i = 0; i < 100; i++) {
                  mapAll[str].push(0);
                }
              }
            }
          }
        }
      }
    }
  }

  initMapPair(){
    mapAll = {}
    for(var i1=1;i1<=4;i1++){
      var map = {};
    //  arr.push(i1);
      map[i1] = 1;
      for(var i2=1;i2<=6;i2++){
        var exist = i2 in map
        var t2 =  false;
        if (!exist) {
          t2 = true;
          map[i2] = 1;
        }
        else if (map[i2]==1) {
          map[i2]++;
          t2 = true;
        }
        if (t2) {
          for(var i3=1;i3<=8;i3++){
            var exist = i3 in map
            var t3 =  false;
            if (!exist) {
              t3 = true;
              map[i3] = 1;
            }
            else if (map[i3]==1) {
              map[i3]++;
              t3 = true;
            }
            if (t3) {
              for (var i4 = 1; i4 <= 12 ; i4++) {
                var exist = i4 in map
                var t4 =  false;
                if (!exist) {
                  t4 = true;
                  map[i4] = 1;
                }
                else if (map[i4]==1) {
                  map[i4]++;
                  t4 = true;
                }
                if (t4) {
                  for (var i5 = 1; i5 <= 20; i5++) {
                    var exist = i5 in map
                    var t5 =  false;
                    if (!exist) {
                      t5 = true;
                      map[i5] = 1;
                    }
                    else if (map[i5]==1) {
                      map[i5]++;
                      t5 = true;
                    }
                    if (t5) {
                      let tmpArr = [i1,i2,i3,i4,i5];
                      let str = tmpArr.sort().join(',')
                      if (!(str in mapAll)) {
                        mapAll[str]=[];
                        for (var i = 0; i < 100; i++) {
                          mapAll[str].push(0);
                        }
                      }
                      if (map[i5]==1) {
                        delete map[i5];
                      }
                      else {
                        map[i5]--;
                      }

                    }

                  }
                  if (map[i4]==1) {
                    delete map[i4];
                  }
                  else {
                    map[i4]--;
                  }
                }
              }
              if (map[i3]==1) {
                delete map[i3];
              }
              else {
                map[i3]--;
              }
            }
          }
          if (map[i2]==1) {
            delete map[i2];
          }
          else {
            map[i2]--;
          }
        }
      }
    }
  }



  all(){
    let arr = []
    allTargets = [];
    for (var i = 0; i<100; i++) {
      allTargets.push({
        rpns:[]
      })
    }
    totalAll=0;
    genmap={}
    var t0 = performance.now();
    for(var i1=1;i1<=4;i1++){
    //  arr.push(i1);
      for(var i2=1;i2<=6;i2++){
        if (i1 != i2) {
          for(var i3=1;i3<=8;i3++){
            if (i3!=i2 && i3!=i1) {
              for (var i4 = 1; i4 <= 12 ; i4++) {
                if (i4!=i3 && i4!=i2 && i4!=i1) {
                  for (var i5 = 1; i5 <= 20; i5++) {
                    if (i5!=i4 && i5!=i3 && i5!=i2 && i5!=i1) {
                      arr = [i1,i2,i3,i4,i5];
                      let str = arr.sort().join(',')
                      if (!(str in genmap)) {
                        genmap[str]=1;
                        this.numbers = arr;
                        this.findAll();
                        var s1=0,s2=0;
                        for (var i = 0; i < 100; i++) {
                          if (mapAll[str][i]==1) {
                            if (i<=69 && i>=10) {
                              s1++
                            }
                            else if ((i<=99 && i>=70) || (i<10 && i>=1)) {
                              s2++
                            }
                          }
                        }
                        if (s1==0) {
                          console.log("no easy in "+str);
                        }
                        else {
                          if (s1<minNo) {
                            minNo = s1;
                          }
                          if (s1>maxNo) {
                            maxNo=s1;
                          }
                        }
                        if (s2==0) {
                          console.log("no medium in "+str);
                        }
                        totalAll+=1;
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

    var t1 = performance.now();
    console.log(t1-t0 + "msecs");
  }

  one(){
    allTargets = [];
    for (var i = 0; i<100; i++) {
      allTargets.push({
        rpns:[]
      })
    }
    var danger = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 2],
      [1, 1, 1, 1, 3],
      [1, 1, 1, 1, 4],
      [1, 1, 1, 1, 5],
      [1, 1, 1, 1, 6],
      [1, 1, 1, 1, 7],
      [1, 1, 1, 1, 8],
      [1, 1, 1, 2, 2],
      [1, 1, 1, 2, 3],
      [1, 1, 1, 2, 4],
      [1, 1, 1, 3, 3],
      [1, 1, 2, 2, 2],
      [1, 1, 2, 2, 3],
      [1, 1, 2, 2, 4],
      [1, 1, 2, 3, 3],
      [1, 1, 10, 2, 3],
      [1, 1, 10, 2, 4],
      [1, 1, 3, 3, 3],
      [1, 2, 2, 2, 2],
      [1, 2, 2, 2, 3],
      [1, 2, 2, 2, 4],
      [1, 2, 2, 3, 3],
      [1, 2, 3, 3, 3],
      [1, 2, 3, 3, 4],
      [1, 2, 3, 3, 5],
      [1, 2, 3, 3, 6],
      [1, 2, 3, 4, 4],
      [1, 2, 3, 4, 5],
      [1, 3, 3, 3, 3],
      [1, 3, 4, 4, 4],
      [1, 3, 4, 4, 5],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 3],
      [2, 2, 2, 2, 4],
      [2, 2, 2, 3, 3],
      [10, 10, 2, 2, 2],
      [11, 11, 2, 2, 2],
      [2, 2, 3, 3, 3],
      [10, 10, 2, 2, 3],
      [11, 11, 2, 2, 3],
      [10, 10, 2, 2, 4],
      [11, 11, 2, 2, 4],
      [2, 3, 3, 3, 3],
      [10, 10, 2, 3, 3],
      [11, 11, 2, 3, 3],
      [3, 3, 3, 3, 3],
      [10, 10, 3, 3, 3],
      [11, 11, 3, 3, 3],
      [12, 12, 3, 3, 3],
    ];
    for (var j = 0; j < 1; j++) {
      var t0 = performance.now();
      this.numbers = danger[j];
      let str = this.numbers.sort().join(',')
      this.findAll()
      var t1 = performance.now();
      console.log(t1-t0 + "msecs");
      var s1=0,s2=0;
      for (var i = 0; i < 100; i++) {
        if (mapAll[str][i]!=0) {
          if (i<=69 && i>=10) {
            s1++
          }
          else if ((i<=99 && i>=70) || (i<10 && i>=1)) {
            s2++
          }
        }
      }
      if (s1==0) {
        console.log("no easy in "+str);
      }
      else {
        if (s1<minNo) {
          minNo = s1;
        }
        if (s1>maxNo) {
          maxNo=s1;
        }
      }
      if (s2==0) {
        console.log("no medium in "+str);
      }
    }

  }

  withpairs(){
    allTargets = [];
    for (var i = 0; i<100; i++) {
      allTargets.push({
        rpns:[]
      })
    }
    var arr=[]
    totalAll=0;
    genmap={}
    var t0 = performance.now();
    for(var i1=1;i1<=4;i1++){
      var map = {};
    //  arr.push(i1);
      map[i1] = 1;
      for(var i2=1;i2<=6;i2++){
        var exist = i2 in map
        var t2 =  false;
        if (!exist) {
          t2 = true;
          map[i2] = 1;
        }
        else if (map[i2]==1) {
          map[i2]++;
          t2 = true;
        }
        if (t2) {
          for(var i3=1;i3<=8;i3++){
            var exist = i3 in map
            var t3 =  false;
            if (!exist) {
              t3 = true;
              map[i3] = 1;
            }
            else if (map[i3]==1) {
              map[i3]++;
              t3 = true;
            }
            if (t3) {
              for (var i4 = 1; i4 <= 12 ; i4++) {
                var exist = i4 in map
                var t4 =  false;
                if (!exist) {
                  t4 = true;
                  map[i4] = 1;
                }
                else if (map[i4]==1) {
                  map[i4]++;
                  t4 = true;
                }
                if (t4) {
                  for (var i5 = 1; i5 <= 20; i5++) {
                    var exist = i5 in map
                    var t5 =  false;
                    if (!exist) {
                      t5 = true;
                      map[i5] = 1;
                    }
                    else if (map[i5]==1) {
                      map[i5]++;
                      t5 = true;
                    }
                    if (t5) {
                      arr = [i1,i2,i3,i4,i5];
                      let str = arr.sort().join(',')
                      if (!(str in genmap)) {
                        genmap[str]=1;
                        this.numbers = arr;
                        this.find();
                        var s1=0,s2=0;
                        for (var i = 0; i < 100; i++) {
                          if (mapAll[str][i]==1) {
                            if (i<=69 && i>=10) {
                              s1++
                            }
                            else if ((i<=99 && i>=70) || (i<10 && i>=1)) {
                              s2++
                            }
                          }
                        }
                        if (s1==0) {
                          console.log("no easy in "+str);
                        }
                        else {
                          if (s1<minNo) {
                            minNo = s1;
                          }
                          if (s1>maxNo) {
                            maxNo=s1;
                          }
                        }
                        if (s2==0) {
                          console.log("no medium in "+str);
                        }

                        totalAll+=1;
                      }
                      if (map[i5]==1) {
                        delete map[i5];
                      }
                      else {
                        map[i5]--;
                      }

                    }

                  }
                  if (map[i4]==1) {
                    delete map[i4];
                  }
                  else {
                    map[i4]--;
                  }
                }
              }
              if (map[i3]==1) {
                delete map[i3];
              }
              else {
                map[i3]--;
              }
            }
          }
          if (map[i2]==1) {
            delete map[i2];
          }
          else {
            map[i2]--;
          }
        }
      }
    }
    var t1 = performance.now();
    console.log(t1-t0 + "msecs");
  }

  fall(){
    let arr = []
    genmap={}
    allTargets = [];
    for (var i = 0; i<100; i++) {
      allTargets.push({
        rpns:[]
      })
    }
    totalAll=0;
    var t0 = performance.now();
    for(var i1=1;i1<=4;i1++){
      for (var i2 = 1; i2 <= 6; i2++) {
        for (var i3 = 1; i3 <= 8; i3++) {
          for (var i4 = 1; i4 <= 12; i4++) {
            for (var i5 = 1; i5 <= 20; i5++) {
              arr = [i1, i2, i3, i4, i5];
              let str = arr.sort().join(',')
              if (!(str in genmap)) {
                genmap[str]=1;
                this.numbers = arr;
                this.find();
                var s1=0,s2=0;
                for (var i = 0; i < 100; i++) {
                  if (mapAll[str][i]==1) {
                    if (i<=69 && i>=10) {
                      s1++
                    }
                    else if ((i<=99 && i>=70) || (i<10 && i>=1)) {
                      s2++
                    }
                  }
                }
                if (s1==0) {
                  console.log("no easy in "+str);
                }
                else {
                  if (s1<minNo) {
                    minNo = s1;
                  }
                  if (s1>maxNo) {
                    maxNo=s1;
                  }
                }
                if (s2==0) {
                  console.log("no medium in "+str);
                }
                totalAll+=1;
              }
            }
          }
        }
      }
    }
    var t1 = performance.now();
    console.log(t1-t0 + "msecs");
  }


  download(){

    const data = "";
    /*for (var i = 0; i < allTargets.length; i++) {
      data+=JSON.stringify(allTargets[i].rpns)
    }*/
    const textToBLOB = new Blob([JSON.stringify(allTargets)], { type: 'text/json' });
        const sFileName = 'formData.json';	   // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click();
  }

  targetsgen(){
    this.targets = [];
    for(let i=1;i<=100;i++){
      this.targets.push(i);
    }
  }


}

//module.exports = Permutatron
