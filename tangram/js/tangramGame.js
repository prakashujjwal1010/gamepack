
var TangramGame = {
  template: `
    <div id="tangram-game">
      <div id="generateContainer">
        <button id="genTangramButton" name="genTangramButton" @click="generateTangram">Generate Tangram</button>
        <br></br>
        <button id="genEasyTangramButton" name="genEasyTangramButton" @click="generateEasyTangram">Generate Easy Tangram</button>
        <br></br>
        <button id="levelButton" name="levelButton" @click="changeLevel">Change Level</button>
      </div>
      <div id="gameArea">
        <v-stage ref="stage" :config="configKonva">
          <v-layer ref="layer">
            <v-line v-for="(targetOutline,index) in target" :key="index" :config="targetOutline"></v-line>
            <v-line v-for="(easyOutline,index) in easyOutlines" :key="index" :config="easyOutline"></v-line>
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
  },
  methods : {
    generateEasyTangram: function () {
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

      var tans = [];

      for (var i = 0; i < squareTangram.tans.length; i++) {
        var tan = {
          type:squareTangram.tans[i].tanType,
          x:100,
          y:100,
          offsetX: 100,
          offsetY: 100,
          rotation: 0,
          points: [],
          stroke: "black",
          strokeWidth: 0.5,
          closed: true,
          draggable: true,
          fill:"blue"
        }
        var points = squareTangram.tans[i].getPoints();
        var center = squareTangram.tans[i].center();
        var floatPoints = [];
        for (var j = 0; j < points.length; j++) {
          floatPoints.push((points[j].toFloatX() + 0)*this.scaleX + 100);
          floatPoints.push((points[j].toFloatY() + 0)*this.scaleY + 100);
        }


        tan.offsetX = (center.toFloatX() + 0)*this.scaleX + 100;
        tan.offsetY = (center.toFloatY() + 0)*this.scaleY + 100;
        tan.x =  tan.offsetX;
        tan.y =  tan.offsetY;
        console.log(tan.x + " , " + tan.y);
        tan.points = floatPoints;
        tans.push(tan);
      }
      this.tans = tans;
      console.log(this.tans);

    },
    updateEasyOutlines :function () {
      if(this.generated!=null && this.level == 0){
        var easyTans = [];
        var generated = this.generated;
        this.level = 0;
        for (var i = 0; i < generated[0].tans.length; i++) {
          var easyTan = {
            type:generated[0].tans[i].tanType,
            x:100,
            y:100,
            offsetX: 100,
            offsetY: 100,
            points: [],
            stroke: "black",
            strokeWidth: 1,
            closed: true,
            dash :[2,1]
          }
          var points = generated[0].tans[i].getPoints();
          var center = generated[0].tans[i].center();
          var floatPoints = [];
          for (var j = 0; j < points.length; j++) {
            floatPoints.push((points[j].toFloatX() + 0)*this.scaleX + 100);
            floatPoints.push((points[j].toFloatY() + 0)*this.scaleY + 100);
          }

          easyTan.offsetX = (center.toFloatX() + 0)*this.scaleX + 100;
          easyTan.offsetY = (center.toFloatY() + 0)*this.scaleY + 100;
          easyTan.x =  easyTan.offsetX;
          easyTan.y =  easyTan.offsetY;

          easyTan.points = floatPoints;
          easyTans.push(easyTan);
        }
        this.easyOutlines = easyTans;
      }
    },
    changeLevel: function () {
      if (this.level == 0) {
        this.level = 1;
        this.easyOutlines = [];
      }else {
        this.level = 0;
        this.updateEasyOutlines();
      }
    },

    onDragEnd: function (e, index) {
     //this.snap(index);
    },
    onTap: function (e, index) {
      this.tans[index].rotation = (this.tans[index].rotation + 45) % 360;
    },
    onClick: function (e, index) {
      this.tans[index].rotation = (this.tans[index].rotation + 45) % 360;
    }
  },
}
