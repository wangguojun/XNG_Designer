{
    checkRenderTime(this);

    function checkRenderTime() {
        writeLn("欢迎使用检查图层渲染时间脚本");
        var check = new Object();

        //basics
        check.scriptName = "检查图层渲染时间";
        check.version = "1.1";
        check.scriptTitle = check.scriptName + " V" + check.version;

        //UI data

        if (parseFloat(app.version) < 9.0) check.eTextSize2 = "[60,16]";
        check.panelSize = "[190,-1]";

        //buttons
        check.strPlacementButton = "XYZ";
        check.toolsPanel = checkcreateUI(this);
        check.toolsPanel.show();

        function checkcreateUI(thisObj) {
            var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", check.scriptName, undefined, { resizeable: true }); //replace undefined with [300,300,570,550]??
            if (pal != null) {
                var res =
                    "group { \
						orientation:'column', alignment:['left','top'], \
						Panel1: Panel { text: '选择要测试的合成', orientation: 'row', minimumSize:" + check.panelSize + ", margins: 15, spacing: 5, \
							Gr1: Group {\
								alignment:['right','top'], \
                            mainButton: Button { text:'开始测试渲染时间', preferredSize:[170,50], alignment:['right','center'] }, \
                        }\
						}\
						Panel2: Panel { text: '删除所有测试文件', orientation: 'column', minimumSize:" + check.panelSize + ", margins:15, spacing: 5, \
                        Gr1: Group {\
                            alignment:['right','top'], \
							help: Button { text:'帮助', preferredSize:[40,25], alignment:['left','center'] }, \
							mainButton: Button { text:'删除所有测试文件', preferredSize:[120,30], alignment:['right','center'] }, \
                        }\
                    }\
					}";

                pal.grp = pal.add(res);
                pal.layout.layout(true);
                pal.grp.minimumSize = pal.grp.size;

                pal.grp.Panel2.Gr1.help.onClick = function () {
                    alert("合成渲染效率检查工具\n© Limbo Eric 2018." +
                        "\n\n" +
                        "脚本功能说明：\n1.脚本将逐层关闭所选合成的图层，并渲染\n2.脚本将输出每一层layer关闭后的渲染时间\n3.渲染时会在桌面的testRender文件夹缓存视频文件\n4.渲染完成后会自动移除用到的所有文件\n5.本脚本需要设置一个名为mp4的渲染模块"
                    );
                }

                pal.grp.Panel1.Gr1.mainButton.onClick = function () {
                    {
                        var renderTimeArray = [];
                        renderTimeArray.renderTime = [];
                        renderTimeArray.renderUseTime = [];
                        renderTimeArray.renderUseName = [];
                        renderInformation = [];

                        //获取选中的合成，并将其添加到渲染队列
                        function getRenderCompInProj() {
                            selItems = app.project.selection;
                            if (selItems == 0) {
                                alert("！！本脚本会清空AE缓存！！\n\n！！！请先在project窗口中选择要测试“渲染效率”的合成！！！");
                                return;
                            } else {
                                writeLn("开始判断选择的是否为合成....");
                                if (selItems[0] instanceof CompItem) {
                                    //清空缓存
                                    writeLn("清空缓存");
                                    app.purge(PurgeTarget.ALL_CACHES);
                                    //清空渲染队列
                                    writeLn("清空渲染队列");
                                    var renderNum = app.project.renderQueue.numItems;
                                    for (var i = renderNum; i >= 1; i--) {
                                        app.project.renderQueue.item(i).remove();
                                    }
                                    //生成合成并添加到文件夹
                                    writeLn("准备生成新的合成到文件夹内");
                                    for (var i = 0; i < selItems.length; i++) {
                                        var selLayer = selItems[i];
                                        var testFolder = app.project.items.addFolder("testRender_" + (i + 1));
                                        for (var j = 1; j <= selLayer.numLayers; j++) {
                                            var selLayerName = selLayer.layer(j).name;
                                            // var selLayerName2 = selLayer.layer(j - 1).name;
                                            if (j - 1 !== 0) {
                                                var selLayerName2 = selLayer.layer(j - 1).name;
                                            } else {
                                                var selLayerName2 = "NO.1";
                                            }

                                            if (selLayerName == selLayerName2 || selLayer.layer(j).enabled == false) {
                                            } else {
                                                var newRenderComp = selLayer.duplicate();
                                                newRenderComp.name = "select_" + (i + 1) + "_layer_" + (j) + "_render";
                                                newRenderComp.layer(j).enabled = false;
                                                newRenderComp.parentFolder = testFolder;
                                                app.project.renderQueue.items.add(newRenderComp);
                                                renderTimeArray.renderUseName.push(newRenderComp.name);
                                            }
                                        }
                                    }
                                    //开始渲染
                                    writeLn("准备开始渲染....");
                                    renderModule();
                                } else {
                                    writeLn("有错误！");
                                    alert("所选择的不是合成，请选择合成");
                                }
                            }
                        }
                        getRenderCompInProj()

                        //渲染模块
                        function renderModule() {
                            //设定所有待渲染合成输出目录为桌面/test文件夹
                            var renderNum = app.project.renderQueue.items.length;
                            for (var i = 1; i <= renderNum; i++) {
                                var outM = app.project.renderQueue.item(i).outputModule(1);
                                var file_name = File.decode(outM.file.name);
                                var new_path = "~/Desktop";
                                var new_dir = new Folder(new_path);
                                new_path = new_dir.fsName;
                                var new_data = {
                                    "Output File Info":
                                    {
                                        "Base Path": new_path,
                                        "Subfolder Path": "testRender",
                                        "File Name": file_name
                                        // "Color Depth": "32 bits per channel",
                                        // "Quality": "Best",
                                        // "Effects": "All On",
                                        // "Time Span Duration": "1.0",
                                        // "Time Span Start": "2.0",
                                        // "Crop": true,
                                        // "Crop Bottom": 0,
                                        // "Crop Left": 0,
                                        // "Crop Right": 8,
                                        // "Crop Top": 10
                                    }
                                }
                                outM.setSettings(new_data);

                                //将队列的render module改为名称为mp4的
                                app.project.renderQueue.item(i).outputModule(1).applyTemplate("Lossless");
                                //将渲染队列中的第i个跳2帧渲染
                                app.project.renderQueue.item(i).skipFrames = 2;
                            }

                            //开始渲染
                            writeLn("开始渲染！");
                            app.project.renderQueue.render();

                            //获取渲染时间
                            writeLn("准备获取渲染时间");
                            for (var i = 1; i <= renderNum; i++) {
                                var renderUseTime = app.project.renderQueue.item(i).elapsedSeconds;
                                var renderTime = app.project.renderQueue.item(i).startTime;
                                renderTimeArray.renderTime.push(renderTime);
                                renderTimeArray.renderUseTime.push(renderUseTime);
                            }
                            //输出渲染时间
                            writeLn("输出渲染时间");
                            for (var i = 0; i < renderTimeArray.renderUseTime.length; i++) {
                                renderInformation.push(
                                    "所选第 " +
                                    renderTimeArray.renderUseName[i].split("_")[1] +
                                    " 个合成去除第 " +
                                    renderTimeArray.renderUseName[i].split("_")[3] +
                                    " 层后渲染时间为: " +
                                    renderTimeArray.renderUseTime[i] +
                                    " 秒" +
                                    "\n"
                                );
                            }
                            alert(renderInformation);
                        }
                    }
                }
                pal.grp.Panel2.Gr1.mainButton.onClick = function () {
                    //删除测试文件
                    writeLn("删除project里的测试文件");
                    for (var i = 1; i <= app.project.numItems; i++) {
                        if (app.project.item(i).name.split("_")[0] == "testRender" && app.project.item(i).typeName == "Folder") {
                            app.project.item(i).remove()
                        }
                    }

                    //清空缓存
                    writeLn("清空AE缓存");
                    app.purge(PurgeTarget.ALL_CACHES);

                    //清除硬盘渲染缓存文件
                    writeLn("清除硬盘上的缓存文件");
                    system.callSystem("cmd.exe /c \"rd /S /Q %USERPROFILE%\\Desktop\\testRender\"");
                    writeLn("测试结束");
                }
            }
            return (pal);
        }
    }
}