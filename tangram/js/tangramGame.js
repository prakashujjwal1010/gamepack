
var TangramGame = {
  template: `
    <div id="tangram-game">
      <div id="generateContainer">
        <button id="switchModeButton" name="switchModeButton" @click="switchMode">Switch Mode</button>
        <br></br>
        <div v-if="!settingMode">
          <button id="genTangramButton" name="genTangramButton" @click="generateTangram">Generate Tangram</button>
          <br></br>
          <button id="genEasyTangramButton" name="genEasyTangramButton" @click="generateEasyTangram">Generate Easy Tangram</button>
          <br></br>
          <button id="genStandardTangramButton" name="genStandardTangramButton" @click="generateStandardTangram">Generate standard Tangram</button>
          <br></br>
          <button id="generateCustomTangramButton" name="generateCustomTangramButton" @click="generateCustomTangram">Generate Custom Tangram  Avaiable</button>
          <br></br>
          <button id="levelButton" name="levelButton" @click="changeLevel">Change Level</button>
          <br></br>
          <div v-if="standard!=null" >standard Tangram : {{standard}}</div>
          <div v-else >random Tangram</div>
          <br></br>
          <div v-if="score==7">puzzle solved!!!!!</div>
        </div>
        <div v-else>
          <button id="addShapeButton" name="addShapeButton" @click="addShape">create and add shapee</button>
          <br></br>
          <div>JOIN THE TANS TO FORM A VALID SHAPE. <br></br> A VALID SHAPE WOULD BE THE ONE WHICH HAS NON-OVERLAPPED CONNECTED TANS WHERE EACH TAN IS CONNECTED TO ATLEAST ONE TAN BY ATLEAST ONE VERTICE </div>
          <br></br>
          <div> {{settingFlags}} </div>
        </div>
        <br></br>
        <button id="flipButton" name="flipButton" @click="flipPgram">flip parallelogram</button>
        <br></br>
      </div>
      <div id="gameArea">
        <v-stage ref="stage" :config="configKonva">
          <v-layer ref="layer" :config="configLayer" @mousemove="onMouseMove($event)">
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
      configLayer:{
        scaleX: 6,
        scaleY: 6
      },
      level: 1,
      settingMode:false,
      score:0,
      flip:5,
      standard:null,
      translateVal: 10,
      easyOutlines: [],
      target: [],
      tans: [],
      generated: null,
      created: [],
      settingFlags: "",
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
          strokeWidth: 0.2,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + this.translateVal));
           outline.push((tansOut[k][i].toFloatY() + this.translateVal));
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
    generateCustomTangram: function () {
      if (this.created.length==0) {
        return;
      }
      console.log("starting generation");
      this.score = 0;
      var ele = this.created[Math.floor(Math.random()*this.created.length)];
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
          strokeWidth: 0.2,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + this.translateVal));
           outline.push((tansOut[k][i].toFloatY() + this.translateVal));
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
          strokeWidth: 0.2,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           outline.push((tansOut[k][i].toFloatX() + this.translateVal));
           outline.push((tansOut[k][i].toFloatY() + this.translateVal));
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
          strokeWidth: 0.2,
          closed: true,
        }
        var outline = [];
        for (var i = 0; i < tansOut[k].length; i++) {
           //outline.push((tansOut[k][i].toFloatX() + 0)*this.scaleX + 100);
           //outline.push((tansOut[k][i].toFloatY() + 0)*this.scaleY + 100);
           outline.push(tansOut[k][i].toFloatX() + this.translateVal);
           outline.push(tansOut[k][i].toFloatY() + this.translateVal);
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
          strokeWidth: 0.2,
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
          points[j].x.add(new IntAdjoinSqrt2(this.translateVal,0));
          points[j].y.add(new IntAdjoinSqrt2(this.translateVal,0));
          pointsObjs.push(points[j]);
          floatPoints.push((points[j].toFloatX() + 0));
          floatPoints.push((points[j].toFloatY() + 0));
        }

        tan.offsetX = (center.toFloatX() + this.translateVal);
        tan.offsetY = (center.toFloatY() + this.translateVal);
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
            strokeWidth: 0.5,
            closed: true,
            dash :[2,0]
          }
          var points = generated[0].tans[i].getPoints();
          var center = generated[0].tans[i].center();
          var floatPoints = [];
          var pointsObjs = [];
          for (var j = 0; j < points.length; j++) {
            points[j].x.add(new IntAdjoinSqrt2(this.translateVal,0));
            points[j].y.add(new IntAdjoinSqrt2(this.translateVal,0));
            pointsObjs.push(points[j]);
            floatPoints.push((points[j].toFloatX() + 0));
            floatPoints.push((points[j].toFloatY() + 0));
          }

          easyTan.offsetX = (center.toFloatX() + this.translateVal);
          easyTan.offsetY = (center.toFloatY() + this.translateVal);
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

      var flag = false;
      for (var i = 0; i < 7; i++) {
        if (i == index) {
          continue;
        }
        var checkTanPoints = this.tans[i].points;
        var checkTanPointsObjs = this.tans[i].pointsObjs;
        for (var j = 0; j < tanPoints.length; j+=2) {
          var fl = false;
          for (var k = 0; k < checkTanPoints.length; k+=2) {
            if (Math.abs(tanPoints[j] - checkTanPoints[k]) <= 1.5 && Math.abs(tanPoints[j+1] - checkTanPoints[k+1]) <= 1.5) {

              var diff = this.tans[i].pointsObjs[k/2].dup().subtract(this.tans[index].pointsObjs[j/2]);

              var dx = diff.toFloatX();
              var dy = diff.toFloatY();

              //console.log(dx+" "+dy);
              this.updatePointsObj(index, diff)
              this.updatePointsIfMoved(index, dx, dy, true);

              console.log("snapped tan " + index+ " tan to "+ i);
              fl =true;
              break;
            }
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

      if (!flag) {
        for (var i = 0; i < tanPoints.length; i+=2) {

          for (var easyTan = 0; easyTan < this.easyOutlines.length; easyTan++) {
            var fl = false;
            for(var j=0;j<this.easyOutlines[easyTan].points.length;j+=2)
            if (Math.abs(tanPoints[i] - this.easyOutlines[easyTan].points[j]) <= 1.5 && Math.abs(tanPoints[i+1] - this.easyOutlines[easyTan].points[j+1]) <= 1.5) {

              var diff = this.easyOutlines[easyTan].pointsObjs[j/2].dup().subtract(this.tans[index].pointsObjs[i/2]);

              var dx = diff.toFloatX();
              var dy = diff.toFloatY();

              //console.log(dx+" "+dy);
              this.updatePointsObj(index, diff)
              this.updatePointsIfMoved(index, dx, dy, true);

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
      }
      /*var p1 = [];
      var p2 = [];
      for (var i = 0; i < this.tans.length; i++) {
        for (var j = 0; j < this.tans[i].pointsObjs.length; j++) {
          p1.push(this.tans[i].pointsObjs[j].toFloatX());
          p1.push(this.tans[i].pointsObjs[j].toFloatY());

        }
      }
      for (var i = 0; i < this.easyOutlines.length; i++) {
        for (var j = 0; j < this.easyOutlines[i].pointsObjs.length; j++) {
        //  p2.push(this.easyOutlines[i].points[j]);
          p2.push(this.easyOutlines[i].pointsObjs[j].toFloatX());
          p2.push(this.easyOutlines[i].pointsObjs[j].toFloatY());
        }
      }
      p1.sort();
      p2.sort();
      //console.log(p1);
      //console.log(p2);
      var res = 0;
      for (var i = 0; i < p1.length; i++) {
        if(Math.abs(p1[i] - p2[i]) <= 0.5){
          res++;
        }
        else{
          res--;
        }
      }
      console.log(arrayEq(p1,p2,function (a, b) {
        return a - b;
      }));
      console.log(res);
      */
      this.tans[index] = currentTan;
    },
    comparePoints: function (index) {
      var p1 = [];
      var p2 = [];
        for (var j = 0; j < this.tans[index].pointsObjs.length; j++) {
          p1.push(this.tans[index].pointsObjs[j].toFloatX());
          p1.push(this.tans[index].pointsObjs[j].toFloatY());

        }

        for (var j = 0; j < this.easyOutlines[index].pointsObjs.length; j++) {
          p2.push(this.easyOutlines[index].pointsObjs[j].toFloatX());
          p2.push(this.easyOutlines[index].pointsObjs[j].toFloatY());
        }
      p1.sort();
      p2.sort();
      console.log(p1);
      console.log(p2);
      var res = 0;
      for (var i = 0; i < p1.length; i++) {
        if(Math.abs(p1[i] - p2[i]) <= 0.5){
          res++;
        }
        else{
          res--;
        }
      }
      console.log(arrayEq(p1,p2,function (a, b) {
        return a - b;
      }));
      console.log(res);
    },
    addShape: function () {
      var res = this.createShape();
      if (res!=undefined) {
        var obj = {
          name: 'tangram #' +this.created.length,
          tangram: res
        }
        this.created.push(obj);
        this.settingFlags = "Tangram created and added !!";
      }
      else{
        console.log("invalid shape");
        this.settingFlags = "Invalid Shape !!";
      }
    },
    createShape: function () {
      var tans = [];
      var currentTan;
      var index = Math.floor(Math.random()*7);
      for (var i = 0; i < this.tans.length; i++) {
        var tan = new Tan(this.tans[i].tanType, this.tans[i].pointsObjs[0], this.tans[i].orientation);
        if (i!=index) {
          tans.push(tan);
        }
        else {
          currentTan = tan;
        }
      }
      console.log(tans);

      var tangramFromPieces = new Tangram([...tans,currentTan]);
      console.log(tangramFromPieces);

      if (tangramFromPieces.outline == undefined) {
        return;
      }
      var res = checkNewTanInSettingMode(tans, currentTan);
      console.log(res);
      if (res) {
        //standardTangrams = [{name:'tangramFromPieces', tangram:tangramFromPieces}];
        return tangramFromPieces;
      }

      return;
    },
    checkIfSolved: function () {
      var targetPoints = [];
      for (var i = 0; i < this.target.length; i++) {
        for (var j = 0; j < this.target[i].points.length; j++) {
          targetPoints.push(this.target[i].points[j]);
        }
      }

      var tans = [];
      var score=0;

      for (var i = 0; i < this.tans.length; i++) {
      //  var anchor = new Point(new IntAdjoinSqrt2((this.tans[i].anchorX-100)/this.scaleX, 0), new IntAdjoinSqrt2((this.tans[i].anchorY-100)/this.scaleY, 0));
        var tan = new Tan(this.tans[i].tanType, this.tans[i].pointsObjs[0], this.tans[i].orientation);
        tans.push(tan);
      }

      var currentOut = computeOutline(tans,true);
      console.log(currentOut);
      var currentPoints = [];
      // TODO: check their length also...
      if (typeof currentOut === 'undefined'){
        console.log("invalid");
      }
      else {
        for (var k = 0; k < currentOut.length; k++) {
          for (var i = 0; i < currentOut[k].length; i++) {
             currentPoints.push((currentOut[k][i].toFloatX() + 0));
             currentPoints.push((currentOut[k][i].toFloatY() + 0));
           }

        }
        function compareFunc(a, b) {
          return a - b;
        }

        var solved = arrayEq(targetPoints, currentPoints, compareFunc);
        console.log(solved);
        var res = 0;
        currentPoints.sort();
        targetPoints.sort();
        //console.log(currentPoints);
        //console.log(targetPoints);
        for (var i = 0; i < targetPoints.length; i++) {
          if(Math.abs(targetPoints[i] - currentPoints[i]) <= 0.5){
            res++;
          }
          else{
            res--;
          }
        }
        console.log(res);
        if (res == currentPoints.length) {
          score = 7
        }


      }

      this.score = score;

    },
    updatePointsObj: function (index, diff) {
      console.log(diff.toFloatX() +"  "+diff.toFloatY());
      for (var i = 0; i < this.tans[index].pointsObjs.length; i++) {
        this.tans[index].pointsObjs[i].add(diff);
      }
    },
    updatePointsIfMoved: function (index, dx, dy,special) {
      var tan = new Tan(this.tans[index].tanType, this.tans[index].pointsObjs[0], this.tans[index].orientation);
      tana = tan;
      var points = []

      for (var i = 0; i < this.tans[index].points.length; i+=2) {
        if (!special) {
          this.tans[index].pointsObjs[i/2].x.add(new IntAdjoinSqrt2(dx,0));
          this.tans[index].pointsObjs[i/2].y.add(new IntAdjoinSqrt2(dy,0));
        }
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
        this.tans[index].pointsObjs[i/2].subtract(tanCenter).rotate(45* inc).add(tanCenter);
        pt.subtract(tanCenter).rotate(45 * inc).add(tanCenter);
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
      this.snap(index);
      this.checkIfSolved();
      //this.tans[index].rotation = (this.tans[index].rotation + 45 * inc) % 360;

    },
    flipPgram: function () {
      var cx;
      var cy;
      var index = 6;
      var points = [];
      for (var i = 0; i < this.tans.length; i++) {
        if (this.tans[i].tanType == this.flip) {
          index = i;
          break;
        }
      }
      var cenx = this.tans[index].x;
      var ceny = this.tans[index].y;
      this.tans[index].tanType = this.flip == 4 ? 5: 4;
      this.tans[index].orientation = 0;

      var cen = new Point(new IntAdjoinSqrt2(cenx, 0), new IntAdjoinSqrt2(ceny, 0));
      var anchor = cen.dup();
      var sub = InsideDirections[this.tans[index].tanType][this.tans[index].orientation][0];
      var dx = cen.toFloatX() - sub.toFloatX();
      var dy = cen.toFloatY() - sub.toFloatY();

      anchor.x.subtract(new IntAdjoinSqrt2(sub.toFloatX() ,0));
      anchor.y.subtract(new IntAdjoinSqrt2(sub.toFloatY() ,0));


      //cx = this.tans[index].points[0];
      //cy = this.tans[index].points[1];
      //var anchor = new Point(new IntAdjoinSqrt2(cx, 0), new IntAdjoinSqrt2(cy, 0));

      var flipTan = new Tan(this.tans[index].tanType, anchor, this.tans[index].orientation);
      console.log(anchor);

      var points = flipTan.getPoints();
      var center = flipTan.center();
      var floatPoints = [];
      var pointsObjs = [];

      for (var j = 0; j < points.length; j++) {
        /*points[j].x.multiply(new IntAdjoinSqrt2(this.scaleX,0));
        points[j].x.add(new IntAdjoinSqrt2(100,0));
        points[j].y.multiply(new IntAdjoinSqrt2(this.scaleY,0));
        points[j].y.add(new IntAdjoinSqrt2(100,0));*/

      /*dx = flipTan.anchor.toFloatX() - points[j].toFloatX() ;
        dy = flipTan.anchor.toFloatY()- points[j].toFloatY();

        points[j].x.add(new IntAdjoinSqrt2(dx  + 0,0));
        points[j].y.add(new IntAdjoinSqrt2(dy + 0,0));*/

        pointsObjs.push(points[j]);
        floatPoints.push((points[j].toFloatX() + 0));
        floatPoints.push((points[j].toFloatY() + 0));
      }
      console.log(floatPoints);
      this.tans[index].offsetX = cenx ;
      this.tans[index].offsetY = ceny ;
      this.tans[index].x =  this.tans[index].offsetX;
      this.tans[index].y =  this.tans[index].offsetY;
      this.tans[index].points = floatPoints;
      this.tans[index].pointsObjs = pointsObjs;
      this.tans[index].anchorX = floatPoints[0];
      this.tans[index].anchorY = floatPoints[1];
      this.flip = this.flip == 4? 5: 4;
    },
    switchMode: function () {
      if (this.settingMode) {
        this.generateTangram();
      }
      else {
        this.generated = null;
        this.easyOutlines = [];
        this.target = [];
        this.score = 0;
      }
      this.settingMode = !this.settingMode;
      this.settingFlags = "";
    },
    onDragEnd: function(e, index) {
      var dx = e.target.attrs.x - this.tans[index].x;
      var dy = e.target.attrs.y - this.tans[index].y;

      this.updatePointsIfMoved(index, dx, dy);

      this.snap(index);
      this.checkIfSolved();
      //if (this.settingMode) {
        //this.createShape(index);
      //}
    },
    onMouseMove: function (e, index) {
      const mousePos = this.$refs.stage.getNode().getPointerPosition();
      const x = mousePos.x ;
      const y = mousePos.y ;
      //console.log(x + " "+ y);
    },
    onTap: function (e, index) {
      this.updateRotation(index, 1);

    },
    onClick: function (e, index) {
      this.updateRotation(index, 1);

    }
  },
}
