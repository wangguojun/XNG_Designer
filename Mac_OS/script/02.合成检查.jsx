{
    checkCompDisplay(this);
    var transTime = [];
    var vTransTime = [];
    var bug = [];

    function checkCompDisplay() {
        writeLn("欢迎使用检查合成效果脚本");

        var proj = app.project;
        var undoStr = "checkComp";
        var activeItem = proj.activeItem;

        var check = null;
        var check = new Object();

        //basics
        check.scriptName = "检查合成工具";
        check.version = "1.1";
        check.scriptTitle = check.scriptName + " V" + check.version;

        //获取转场时间
        check.transTime01 = 0;
        check.transTime02 = 0;
        check.transTime03 = 0;
        check.transTime04 = 0;
        check.transTime05 = 0;
        check.transTime06 = 0;
        check.transTime07 = 0;
        check.transTime08 = 0;
        check.transTime09 = 0;
        check.transTime10 = 0;
        check.transTime11 = 0;
        check.transTime12 = 0;
        check.vTransTime01 = 0;
        check.vTransTime02 = 0;
        check.vTransTime03 = 0;
        check.vTransTime04 = 0;
        check.vTransTime05 = 0;
        check.vTransTime06 = 0;

        //UI data
        check.scrollSize = "[130,20]";
        check.eTextSize = "[30,-1]";
        check.eTextSize2 = "[60,-1]";
        if (parseFloat(app.version) < 9.0) check.eTextSize2 = "[60,16]";
        check.panelSize = "[190,-1]";

        //buttons
        check.strHelp = "有问题请点我";
        check.strButton = "开始";
        check.strPlacementButton = "XYZ";
        //help and alerts
        check.help = "";
        check.help += "© Limbo Eric 2018.\n\n";
        check.help += "本插件主要搜索project文件夹中的所有名为:\nbody_photo/body_video的合成，并将其添加到新的测试合成中\n\n" +
            "使用方法：\n" +
            "1.输入每组动画之间的转场时间(时间为s，支持小数点如0.625)，没有的不用填写\n" +
            "2.点击开始按钮\n" +
            "3.查看新生成的文件夹内的合成，检查每个画面是否有问题\n" +
            "4.删除生成的文件夹和合成，提交移植\n";

        check.toolsPanel = checkcreateUI(this);
        check.toolsPanel.show();

        function checkcreateUI(thisObj) {
            var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", check.scriptName, undefined, { resizeable: true }); //replace undefined with [300,300,570,550]??
            if (pal != null) {
                var res =
                    "group { \
						orientation:'column', alignment:['left','top'], \
						Panel1: Panel { text: 'Check Comp Display', orientation: 'row', minimumSize:" + check.panelSize + ", margins: 15, spacing: 5, \
							Gr1: Group {\
								alignment:['left','center'], minimumSize: [120,-1],  spacing:15,\
								placementYText: StaticText { text:'在下方输入转场时间(秒)，点击开始', preferredSize:[-1,-1], alignment:['left','center'] }, \}\
						}\
						Panel2: Panel { text: 'Comp Information', orientation: 'column', minimumSize:" + check.panelSize + ", margins:15, spacing: 5, \
							Gr1: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第01组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input01: EditText { text:'" + check.transTime01 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr2: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第02组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input02: EditText { text:'" + check.transTime02 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr3: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第03组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input03: EditText { text:'" + check.transTime03 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr4: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第04组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input04: EditText { text:'" + check.transTime04 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr5: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第05组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input05: EditText { text:'" + check.transTime05 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr6: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第06组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input06: EditText { text:'" + check.transTime06 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr7: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第07组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input07: EditText { text:'" + check.transTime07 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr8: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第08组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input08: EditText { text:'" + check.transTime08 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr9: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第09组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input09: EditText { text:'" + check.transTime09 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr10: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第10组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input10: EditText { text:'" + check.transTime10 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr11: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第11组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input11: EditText { text:'" + check.transTime11 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
							Gr12: Group {\
								alignment:['fill','center'], spacing:15,\
								Gr1a: Group {\
									alignment: ['left','center'], minimumSize: [90,-1], \
									triangleText: StaticText { text:'第12组画面', minimumSize:[60,-1], alignment:['left','center'] }, \
								}\
								Gr1b: Group {\
									alignment: ['right','center'], spacing:5,\
									input12: EditText { text:'" + check.transTime12 + "', preferredSize:[50,20], alignment:['right','center'] }, \
								}\
							}\
						}\
						footer: Group { \
							alignment:['right','top'], \
							help: Button { text:'" + check.strHelp + "', preferredSize:[100,25], alignment:['left','center'] }, \
							mainButton: Button { text:'" + check.strButton + "', preferredSize:[80,30], alignment:['right','center'] }, \
						}, \
					}";

                pal.grp = pal.add(res);
                pal.layout.layout(true);
                pal.grp.minimumSize = pal.grp.size;
                // pal.onFocus = alert("focus");

                // pal.grp.Panel2.Gr12.Gr1b.input12.onChange = function () {
                // 	if (isNaN(this.text)) this.text = check.transTime;
                // 	check.transTime = parseFloat(this.text);
                // }
                pal.grp.Panel2.Gr1.Gr1b.input01.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime01;
                    check.transTime01 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr2.Gr1b.input02.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime02;
                    check.transTime02 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr3.Gr1b.input03.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime03;
                    check.transTime03 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr4.Gr1b.input04.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime04;
                    check.transTime04 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr5.Gr1b.input05.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime05;
                    check.transTime05 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr6.Gr1b.input06.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime06;
                    check.transTime06 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr7.Gr1b.input07.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime07;
                    check.transTime07 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr8.Gr1b.input08.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime08;
                    check.transTime08 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr9.Gr1b.input09.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime09;
                    check.transTime09 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr10.Gr1b.input10.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime10;
                    check.transTime10 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr11.Gr1b.input11.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime11;
                    check.transTime11 = parseFloat(this.text);
                }

                pal.grp.Panel2.Gr12.Gr1b.input12.onChange = function () {
                    if (isNaN(this.text)) this.text = check.transTime12;
                    check.transTime12 = parseFloat(this.text);
                }

                pal.grp.footer.help.onClick = function () { alert(check.scriptTitle + "\n" + check.help, check.scriptName); }
                pal.grp.footer.mainButton.onClick = checkmainFunction;
            }
            return (pal);
        }

        function main() {
            //横版数据
            var compWidth_hori = 1280;
            var compHeight_hori = 720;
            var compDuration_hori = 600;

            //竖版数据
            var compWidth_vert = 720;
            var compHeight_vert = 1080;
            var compDuration_vert = 600;
            var horiCompTime = 0;
            var vertCompTime = 0;
            var horiVideoCompTime = 0;
            var vertVideoCompTime = 0;

            //获取vert/public/hori的位置
            writeLn("开始获取vert/public/hori图层位置");
            var horiNumItems, publicNumItems, vertNumItems;
            function getFolderNum() {
                for (var i = 1; i <= app.project.numItems; i++) {
                    if (app.project.item(i).name == "hori" && app.project.item(i).typeName == "Folder") {
                        horiNumItems = i;
                    }
                }
                if (horiNumItems == undefined) {
                    bug.push("没有找到hori文件夹\n");
                }
                for (var i = 1; i <= app.project.numItems; i++) {
                    if (app.project.item(i).name == "public" && app.project.item(i).typeName == "Folder") {
                        publicNumItems = i;
                    }
                }
                for (var i = 1; i <= app.project.numItems; i++) {
                    if (app.project.item(i).name == "vert" && app.project.item(i).typeName == "Folder") {
                        vertNumItems = i;
                    }
                }
                if (vertNumItems == undefined) {
                    bug.push("没有找到vert文件夹\n");
                }

                return horiNumItems, publicNumItems, vertNumItems;
            }
            getFolderNum();
            writeLn("获取成功！");

            writeLn("准备创建测试合成...");
            writeLn("开始创建照片横版测试合成...");
            if (bug.length == 0) {
                //创建新的横版测试合成 checkCompError，并将合成放入checkCompErrorFile文件夹中
                var gHoriCompData = app.project.items.addComp('checkCompError_hori', compWidth_hori, compHeight_hori, 1, compDuration_hori, 25);
                //create a new FolderItem in project, with name "checkCompErrorFile"
                var compFolder = app.project.items.addFolder("checkCompErrorFile");
                for (var i = 1; i <= app.project.numItems; i++) {
                    // if(app.project.item(i) instanceof CompItem)
                    if (app.project.item(i).name == "checkCompError_hori")
                        app.project.item(i).parentFolder = compFolder;
                }

                if (publicNumItems == undefined) {
                    for(var i=horiNumItems; i<=vertNumItems; i++){
                        if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration;
                        }
                    }
                    for (var i = horiNumItems; i <= vertNumItems; i++) {
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime01;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime02;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime03;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime04;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime05;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime06;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime07;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime08;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime09;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime10;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime11;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime12;
                        }
                    }
                    for(var i=horiNumItems; i<=vertNumItems; i++){
                        if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime - 1;
                        }
                    }
                } else {
                    for(var i=horiNumItems; i<=vertNumItems; i++){
                        if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration;
                        }
                    }
                    for (var i = horiNumItems; i <= publicNumItems; i++) {
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime01;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime02;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime03;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime04;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime05;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime06;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime07;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime08;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime09;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime10;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime11;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime;
                            horiCompTime += compDuration - check.transTime12;
                        }
                    }
                    for(var i=horiNumItems; i<=vertNumItems; i++){
                        if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiCompTime - 1;
                        }
                    }
                }
                writeLn("创建成功！");

                writeLn("将合成放入文件夹....");
                //创建新的竖版测试合成 checkCompError，并将合成放入checkCompErrorFile文件夹中
                var gHoriVideoCompData = app.project.items.addComp('checkVideoCompError_hori', compWidth_hori, compHeight_hori, 1, compDuration_hori, 25);
                //create a new FolderItem in project, with name "checkVideoCompErrorFile"
                var compFolder1 = app.project.items.addFolder("checkVideoCompErrorFile");
                for (var i = 1; i <= app.project.numItems; i++) {
                    // if(app.project.item(i) instanceof CompItem)
                    if (app.project.item(i).name == "checkVideoCompError_hori")
                        app.project.item(i).parentFolder = compFolder1;
                }

                if (publicNumItems == undefined) {
                    for(var i = horiNumItems; i <= vertNumItems; i++){
                        if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration;
                        }
                    }
                    for (var i = horiNumItems; i <= vertNumItems; i++) {
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime01;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime02;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime03;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime04;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime05;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime06;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime07;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime08;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime09;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime10;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime11;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime12;
                        }
                    }
                    for(var i = horiNumItems; i <= vertNumItems; i++){
                        if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime - 1;
                        }
                    }
                } else {
                    for(var i = horiNumItems; i <= publicNumItems; i++){
                        if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration;
                        }
                    }
                    for (var i = horiNumItems; i <= publicNumItems; i++) {
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            var compDuration = app.project.item(i).duration;
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime01;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime02;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime03;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime04;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime05;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime06;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime07;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime08;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime09;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime10;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime11;
                        }
                        if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime;
                            horiVideoCompTime += compDuration - check.transTime12;
                        }
                    }
                    for(var i = horiNumItems; i <= publicNumItems; i++){
                        if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                            var newComp2gComp = gHoriVideoCompData.layers.add(app.project.item(i));
                            newComp2gComp.startTime = horiVideoCompTime - 1;
                        }
                    }
                }

                // //获取所有public文件
                // var allPublicItem;

                //创建新的竖版测试合成 checkCompError，并将合成放入test文件夹中
                var gVertCompData = app.project.items.addComp('checkCompError_vert', compWidth_vert, compHeight_vert, 1, compDuration_vert, 25);
                //create a new FolderItem in project, with name "checkCompErrorFile"
                for (var i = 1; i <= app.project.numItems; i++) {
                    // if(app.project.item(i) instanceof CompItem)
                    if (app.project.item(i).name == "checkCompError_vert")
                        app.project.item(i).parentFolder = compFolder;
                }

                var projectNumber = app.project.numItems;

                for(var i = vertNumItems; i <= projectNumber; i++){
                    if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        var compDuration = app.project.item(i).duration;
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration;
                    }
                }
                for (var i = vertNumItems; i <= projectNumber; i++) {
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        var compDuration = app.project.item(i).duration;
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime01;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime02;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime03;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime04;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime05;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime06;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime07;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime08;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime09;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime10;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime11;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "photo" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime;
                        vertCompTime += compDuration - check.transTime12;
                    }
                }
                for(var i = vertNumItems; i <= projectNumber; i++){
                    if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                        var newComp2gComp = gVertCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertCompTime - 1;
                    }
                }

                //创建新的竖版测试合成 checkCompError，并将合成放入test文件夹中
                var gVertVideoCompData = app.project.items.addComp('checkVideoCompError_vert', compWidth_vert, compHeight_vert, 1, compDuration_vert, 25);
                //create a new FolderItem in project, with name "checkVideoCompErrorFile"
                for (var i = 1; i <= app.project.numItems; i++) {
                    // if(app.project.item(i) instanceof CompItem)
                    if (app.project.item(i).name == "checkVideoCompError_vert")
                        app.project.item(i).parentFolder = compFolder1;
                }

                var projectNumber = app.project.numItems;

                for(var i = vertNumItems; i <= projectNumber; i++){
                    if (app.project.item(i).name == "start" && app.project.item(i).typeName == "Composition") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        var compDuration = app.project.item(i).duration;
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration;
                    }
                }
                for (var i = vertNumItems; i <= projectNumber; i++) {
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "1" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        var compDuration = app.project.item(i).duration;
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime01;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "2" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime02;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "3" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime03;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "4" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime04;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "5" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime05;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "6" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime06;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "7" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime07;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "8" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime08;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "9" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime09;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "10" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime10;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "11" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime11;
                    }
                    if (app.project.item(i).name.split("_")[0] == "body" && app.project.item(i).name.split("_")[1] == "video" && app.project.item(i).name.split("_")[2] == "12" && app.project.item(i).name.split("_")[3] == "r") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime;
                        vertVideoCompTime += compDuration - check.transTime12;
                    }
                }
                for(var i = vertNumItems; i <= projectNumber; i++){
                    if (app.project.item(i).name == "end" && app.project.item(i).typeName == "Composition") {
                        var newComp2gComp = gVertVideoCompData.layers.add(app.project.item(i));
                        newComp2gComp.startTime = vertVideoCompTime - 1;
                    }
                }
                writeLn("全部结束！");

                // alert(app.project.item(1).typeName);
                function getInput(value) {
                    if (isNaN(this.text)) this.text = value;
                    value = parseFloat(this.text);
                }
            }
        };

        writeLn("判断测试中是否有错误");
        function checkmainFunction() {
            if (bug.length == 0) {
                main();
            }
            else {
                alert(bug);
            }
        }
    }
}