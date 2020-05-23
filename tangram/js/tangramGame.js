
var TangramGame = {
  template: `
    <div id="tangram-game">
      <div id="generateContainer">
        <button id="genTangramButton" name="genTangramButton" @click="generateTangram">Generate Tangram</button>
        <br></br>
        <button id="genEasyTangramButton" name="genEasyTangramButton" @click="generateEasyTangram">Generate Easy Tangram</button>
        <br></br>
        <button id="genStandardTangramButton" name="genStandardTangramButton" @click="generateStandardTangram">Generate standard Tangram</button>
        <br></br>
        <button id="levelButton" name="levelButton" @click="changeLevel">Change Level</button>
        <br></br>
        <div v-if="standard!=null" >standard Tangram : {{standard}}</div>
        <div v-else >random Tangram</div>

        <br></br>
        <div v-if="score==7">puzzle solved!!!!!</div>

      </div>
      <div id="gameArea">
        <v-stage ref="stage" :config="configKonva">
          <v-layer ref="layer">
            <v-line v-for="(targetOutline,index) in target" :key="index" :config="targetOutline"></v-line>
            <v-line v-if="level == 0" v-for="(easyOutline,index) in easyOutlines" :key="index" :config="easyOutline"></v-line>
            <v-line v-for="(tan,index) in tans" :key="index" :config="tan"
             @tap="onTap($event, index)"
             @click="onClick($event, index)"
             @dragend="onDragEnd($event, index)"></v-line>
          </v-layer>
        </v-stage>
      </div>

    </div>
  `,
  data: function () {
    return {
      configKonva: {
        width: 700,
        height: 600,
      },
      level: 1,
      score:0,
      standard:null,
      scaleX: 6,
      scaleY: 6,
      easyOutlines: [],
      target: [],
      tans: [],
      generated: null,
    };
  },
  mounted: function () {
    this.initGameTans();
    this.generateTangram();
  },
  methods : {
    generateStandardTangram: function () {
      console.log("starting generation");
      this.score = 0;
      var ele = standardTangrams[Math.floor(Math.random()*standardTangrams.length)];
      this.standard = ele.name;
      var tang = ele.tangram;
      var generated = []
      console.log(tang);
      console.log(this.standard);
      generated.push(tang);
      this.generated = generated;

      var tansOut = computeOutline(generated[0].tans,true);
      var target = []
      for (var k = 0; k < tansOut.length; k++) {
        var targetOutline = {
          points: [],
          stroke: "green",
          fill:"",
          strokeWidth: 0.5,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + 0)*this.scaleX + 100);
           outline.push((tansOut[k][i].toFloatY() + 0)*this.scaleY + 100);
        }
        if (k==0) {
          targetOutline.fill ="green";
        }
        else{
          targetOutline.fill ="#c0c0c0";
        }

        targetOutline.points = outline;
        target.push(targetOutline);
      }
      this.target = target;
      this.updateEasyOutlines();
    },
    generateEasyTangram: function () {
      console.log("starting generation");
      this.score = 0;
      this.standard = null;
      var generated = []
      var tang = generateTangram();
      console.log(tang);
      generated.push(tang);
      this.generated = generated;

      var tansOut = computeOutline(generated[0].tans,true);
      var target = []
      for (var k = 0; k < tansOut.length; k++) {
        var targetOutline = {
          points: [],
          stroke: "green",
          fill:"",
          strokeWidth: 0.5,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + 0)*this.scaleX + 100);
           outline.push((tansOut[k][i].toFloatY() + 0)*this.scaleY + 100);
        }
        if (k==0) {
          targetOutline.fill ="green";
        }
        else{
          targetOutline.fill ="#c0c0c0";
        }

        targetOutline.points = outline;
        target.push(targetOutline);
      }
      this.target = target;
      this.updateEasyOutlines();
    },
    generateTangram : function () {
      console.log("starting generation");
      this.score = 0;
      this.standard = null;
      var generated = generateTangrams(1);
      console.log(generated);
      this.generated = generated;

      var tansOut = computeOutline(generated[0].tans,true);
      var target = []
      for (var k = 0; k < tansOut.length; k++) {
        var targetOutline = {
          points: [],
          stroke: "green",
          fill:"",
          strokeWidth: 0.5,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + 0)*this.scaleX + 100);
           outline.push((tansOut[k][i].toFloatY() + 0)*this.scaleY + 100);
        }
        if (k==0) {
          targetOutline.fill ="green";
        }
        else{
          targetOutline.fill ="#c0c0c0";
        }

        targetOutline.points = outline;
        target.push(targetOutline);
        console.log(targetOutline);
      }
      this.target = target;
      this.updateEasyOutlines();
    },
    initGameTans: function () {
      var anchorBT1 = new Point(new IntAdjoinSqrt2(12, 0), new IntAdjoinSqrt2(12, 0));
      var bigTriangle1 = new Tan(0, anchorBT1, 1);
      var anchorBT2 = new Point(new IntAdjoinSqrt2(12, 0), new IntAdjoinSqrt2(12, 0));
      var bigTriangle2 = new Tan(0, anchorBT2, 7);
      var anchorM = new Point(new IntAdjoinSqrt2(0, 0), new IntAdjoinSqrt2(0, 0));
      var mediumTriangle = new Tan(1, anchorM, 0);
      var anchorST1 = new Point(new IntAdjoinSqrt2(6, 0), new IntAdjoinSqrt2(18, 0));
      var smallTriangle1 = new Tan(2, anchorST1, 3);
      var anchorST2 = new Point(new IntAdjoinSqrt2(12, 0), new IntAdjoinSqrt2(12, 0));
      var smallTriangle2 = new Tan(2, anchorST2, 5);
      var anchorS = new Point(new IntAdjoinSqrt2(0, 0), new IntAdjoinSqrt2(12, 0));
      var square = new Tan(3, anchorS, 7);
      var anchorP = new Point(new IntAdjoinSqrt2(24, 0), new IntAdjoinSqrt2(0, 0));
      var parallelogram = new Tan(5, anchorP, 4);

      var squareTangram = new Tangram([bigTriangle1, bigTriangle2, mediumTriangle, smallTriangle1, smallTriangle2, square, parallelogram]);
      //console.log(computeOutline(squareTangram.tans,true));
      var tans = [];

      for (var i = 0; i < squareTangram.tans.length; i++) {
        var tan = {
          tanType:squareTangram.tans[i].tanType,
          x:100,
          y:100,
          offsetX: 100,
          offsetY: 100,
          orientation: 0,
          anchorX: 0,
          anchorY: 0,
          rotation: 0,
          points: [],
          pointsObjs: [],
          stroke: "black",
          strokeWidth: 0.5,
          closed: true,
          draggable: true,
          fill:"blue",
          tan: null,
        }
        var points = squareTangram.tans[i].getPoints();
        var center = squareTangram.tans[i].center();
        var floatPoints = [];
        var pointsObjs = [];
        for (var j = 0; j < points.length; j++) {
          points[j].x.multiply(new IntAdjoinSqrt2(this.scaleX,0));
          points[j].x.add(new IntAdjoinSqrt2(100,0));
          points[j].y.multiply(new IntAdjoinSqrt2(this.scaleY,0));
          points[j].y.add(new IntAdjoinSqrt2(100,0));
          pointsObjs.push(points[j]);
          floatPoints.push((points[j].toFloatX() + 0));
          floatPoints.push((points[j].toFloatY() + 0));
        }


        tan.offsetX = (center.toFloatX() + 0)*this.scaleX + 100;
        tan.offsetY = (center.toFloatY() + 0)*this.scaleY + 100;
        tan.x =  tan.offsetX;
        tan.y =  tan.offsetY;
        tan.anchorX = floatPoints[0];
        tan.anchorY = floatPoints[1];
        tan.orientation = squareTangram.tans[i].orientation;
        tan.points = floatPoints;
        tan.pointsObjs = pointsObjs;
        tan.tan = squareTangram.tans[i];

        tans.push(tan);
      }
      this.tans = tans;
      console.log(this.tans);

    },
    updateEasyOutlines :function () {
      if(this.generated!=null){
        console.log("ok");
        var easyTans = [];
        var generated = this.generated;
        for (var i = 0; i < generated[0].tans.length; i++) {
          var easyTan = {
            tanType:generated[0].tans[i].tanType,
            x:100,
            y:100,
            offsetX: 100,
            offsetY: 100,
            pointsObjs: [],
            orientation: 0,
            anchorX: 0,
            anchorY: 0,
            points: [],
            stroke: "black",
            strokeWidth: 1,
            closed: true,
            dash :[2,1]
          }
          var points = generated[0].tans[i].getPoints();
          var center = generated[0].tans[i].center();
          var floatPoints = [];
          var pointsObjs = [];
          for (var j = 0; j < points.length; j++) {
            points[j].x.multiply(new IntAdjoinSqrt2(this.scaleX,0));
            points[j].x.add(new IntAdjoinSqrt2(100,0));
            points[j].y.multiply(new IntAdjoinSqrt2(this.scaleY,0));
            points[j].y.add(new IntAdjoinSqrt2(100,0));
            pointsObjs.push(points[j]);
            floatPoints.push((points[j].toFloatX() + 0));
            floatPoints.push((points[j].toFloatY() + 0));
          }

          easyTan.offsetX = (center.toFloatX() + 0)*this.scaleX + 100;
          easyTan.offsetY = (center.toFloatY() + 0)*this.scaleY + 100;
          easyTan.x =  easyTan.offsetX;
          easyTan.y =  easyTan.offsetY;
          easyTan.anchorX = floatPoints[0];
          easyTan.anchorY = floatPoints[1];
          easyTan.orientation = generated[0].tans[i].orientation;
          easyTan.points = floatPoints;
          easyTan.pointsObjs = pointsObjs;
          easyTans.push(easyTan);
        }
        this.easyOutlines = easyTans;
        console.log(this.easyOutlines);
      }
    },
    changeLevel: function () {
      if (this.level == 0) {
        this.level = 1;
      }else {
        this.level = 0;
      }
    },
    snap : function (index) {
      var currentTan = this.tans[index];
      var x = currentTan.x;
      var y = currentTan.y;
      var tanPoints = currentTan.points;

    /*  for (var i = 0; i < this.easyOutlines.length; i++) {
        if(this.easyOutlines[i].tanType === currentTan.tanType){

          if(Math.abs(x - this.easyOutlines[i].x) <= 10 && Math.abs(y - this.easyOutlines[i].y) <= 10){
            var correctOrientation = false;

            if (currentTan.tanType === 0 || currentTan.tanType === 1 || currentTan.tanType === 2) {
              if (( currentTan.rotation + currentTan.orientation * 45 ) % 360 == (this.easyOutlines[i].orientation) * 45) {
                correctOrientation = true;
              }
            }else if (currentTan.tanType === 3) {
              if (( currentTan.rotation + currentTan.orientation * 45 ) % 90 == (this.easyOutlines[i].orientation % 2) * 45) {
                correctOrientation = true;
              }
            }else if (currentTan.tanType === 4 || currentTan.tanType === 5) {
              if (( currentTan.rotation + currentTan.orientation * 45 ) % 180 == (this.easyOutlines[i].orientation % 4) * 45) {
                correctOrientation = true;
              }
            }
            if (true) {
              currentTan.x = this.easyOutlines[i].x;
              currentTan.y = this.easyOutlines[i].y;
              console.log("snapped");
              break;
            }
          }
        }
      }*/

      for (var i = 0; i < tanPoints.length; i+=2) {
        var flag = false;
        for (var easyTan = 0; easyTan < this.easyOutlines.length; easyTan++) {
          var fl = false;
          for(var j=0;j<this.easyOutlines[easyTan].points.length;j+=2)
          if (Math.abs(tanPoints[i] - this.easyOutlines[easyTan].points[j]) <= 5 && Math.abs(tanPoints[i+1] - this.easyOutlines[easyTan].points[j+1]) <= 5) {
            var dx = this.easyOutlines[easyTan].points[j] - tanPoints[i];
            var dy = this.easyOutlines[easyTan].points[j+1] - tanPoints[i+1];


            this.updatePointsIfMoved(index, dx, dy);
            console.log("snapped");
            fl =true;
            break;
          }
          if (fl) {
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }

      /*var p1 = [];
      var p2 = [];
      for (var i = 0; i < this.tans.length; i++) {
        for (var j = 0; j < this.tans[i].points.length; j++) {
          p1.push(this.tans[i].points[j]);
        }
      }
      for (var i = 0; i < this.easyOutlines.length; i++) {
        for (var j = 0; j < this.easyOutlines[i].points.length; j++) {
          p2.push(this.easyOutlines[i].points[j]);
        }
      }
      p1.sort();
      p2.sort();
      console.log(p1);
      console.log(p2);*/
      this.tans[index] = currentTan;
    },
    checkIfSolved: function () {
      /*var targetPoints = this.target[0].points;
      var tans = [];

      for (var i = 0; i < this.tans.length; i++) {
      //  var anchor = new Point(new IntAdjoinSqrt2((this.tans[i].anchorX-100)/this.scaleX, 0), new IntAdjoinSqrt2((this.tans[i].anchorY-100)/this.scaleY, 0));
        var tan = new Tan(this.tans[i].tanType, this.tans[i].pointsObjs[0], this.tans[i].orientation);
        tans.push(tan);
      }

      squaTangram = new Tangram([tans[0], tans[1], tans[2], tans[3], tans[4], tans[5], tans[6]]);
      console.log(computeOutline(squaTangram.tans,true));
      var currentOut = computeOutline(tans,true);

      console.log(currentOut);
      var currentPoints = [];
      if (typeof currentPoints === 'undefined'
        || targetPoints.length != currentPoints.length) {
        return false;
      }
      for (var k = 0; k < currentOut.length; k++) {
        for (var i = 0; i < currentOut[k].length; i++) {
           currentPoints.push((currentOut[k][i].toFloatX() + 0)*this.scaleX + 100);
         }
           currentPoints.push((currentOut[k][i].toFloatY() + 0)*this.scaleY + 100);
      }
      function compareFunc(a, b) {
        return a - b;
      }

      var solved = arrayEq(targetPoints, currentPoints, compareFunc);
      console.log(currentPoints.sort());
      console.log(targetPoints.sort());
      if (solved) {

        console.log(solved);
      }
      return solved;
      */
      var score=0;
      for (var index = 0; index < this.tans.length; index++) {
        var currentTan = this.tans[index];
        var x = currentTan.x;
        var y = currentTan.y;
        for (var i = 0; i < this.easyOutlines.length; i++) {
          if (this.easyOutlines[i].tanType === currentTan.tanType) {

            if (Math.abs(x - this.easyOutlines[i].x) <= 1 && Math.abs(y - this.easyOutlines[i].y) <= 1) {
              var correctOrientation = false;

              if (currentTan.tanType === 0 || currentTan.tanType === 1 || currentTan.tanType === 2) {
                if ((currentTan.rotation + currentTan.orientation * 45) % 360 == (this.easyOutlines[i].orientation) * 45) {
                  correctOrientation = true;
                }
              } else if (currentTan.tanType === 3) {
                if ((currentTan.rotation + currentTan.orientation * 45) % 90 == (this.easyOutlines[i].orientation % 2) * 45) {
                  correctOrientation = true;
                }
              } else if (currentTan.tanType === 4 || currentTan.tanType === 5) {
                if ((currentTan.rotation + currentTan.orientation * 45) % 180 == (this.easyOutlines[i].orientation % 4) * 45) {
                  correctOrientation = true;
                }
              }
              if (correctOrientation) {
                score++;
                break;
              }
            }
          }
        }
      }

      this.score = score;

    },
    updatePointsIfMoved: function (index, dx, dy) {
      var tan = new Tan(this.tans[index].tanType, this.tans[index].pointsObjs[0], this.tans[index].orientation);
      tana = tan;
      var points = []
      for (var i = 0; i < this.tans[index].points.length; i+=2) {
        this.tans[index].pointsObjs[i/2].x.add(new IntAdjoinSqrt2(dx,0));
        this.tans[index].pointsObjs[i/2].y.add(new IntAdjoinSqrt2(dy,0));
        points.push(this.tans[index].points[i] + dx);
        points.push(this.tans[index].points[i+1] + dy);
      }

      this.tans[index].points = points;
      this.tans[index].anchorX = points[0];
      this.tans[index].x += dx;
      this.tans[index].anchorY = points[1];
      this.tans[index].y += dy;
      this.tans[index].offsetX += dx;
      this.tans[index].offsetY += dy;

    },
    updatePointsIfRotated: function (index, inc) {
      var points = []
      var cx = this.tans[index].x;
      var cy = this.tans[index].y;
      var tan = new Tan(this.tans[index].tanType, this.tans[index].pointsObjs[0], this.tans[index].orientation);
      var tanCenter = new Point(new IntAdjoinSqrt2(cx, 0), new IntAdjoinSqrt2(cy, 0));
      for (var i = 0; i < this.tans[index].points.length; i+=2) {
        var x1 = this.tans[index].points[i];
        var y1 = this.tans[index].points[i+1];
        var pt = new Point(new IntAdjoinSqrt2(x1, 0), new IntAdjoinSqrt2(y1, 0))
        pt.subtract(tanCenter).rotate(45 * inc).add(tanCenter);
        this.tans[index].pointsObjs[i/2].subtract(tan.center()).rotate(45* inc).add(tan.center());
        points.push(pt.toFloatX());
        points.push(pt.toFloatY());
      }
      this.tans[index].points = points;
      this.tans[index].anchorX = points[0];
      this.tans[index].anchorY = points[1];

    },

    updateRotation: function (index, inc) {
      this.updatePointsIfRotated(index, 1);
      this.tans[index].orientation = (this.tans[index].orientation + inc) % 8;
      //this.tans[index].rotation = (this.tans[index].rotation + 45 * inc) % 360;

    },
    onDragEnd: function(e, index) {
      var dx = e.target.attrs.x - this.tans[index].x;
      var dy = e.target.attrs.y - this.tans[index].y;

      this.updatePointsIfMoved(index, dx, dy);

      this.snap(index);
      this.checkIfSolved();
    },
    onMouseMove: function (e, index) {
      const mousePos = this.$refs.stage.getNode().getPointerPosition();
      const x = mousePos.x ;
      const y = mousePos.y ;
      console.log(x + " "+ y);
    },
    onTap: function (e, index) {
      this.updateRotation(index, 1);
    },
    onClick: function (e, index) {
      this.updateRotation(index, 1);
    }
  },
}
