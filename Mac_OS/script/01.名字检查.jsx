{
    #include "../include/tools.jsx"
    #include "../include/Main.jsx"

    //存放数据
    var rightName = [];
    var badName = [];
    var nullFileName = [];

    //主要功能函数
    var aeCheck = (function () {

        //判断颜色深度，统一为8bpc
        function depthColor() {
            writeLn("开始检查模版颜色深度....");
            if (app.project.bitsPerChannel !== 8) {
                app.project.bitsPerChannel = 8;
                alert("颜色深度已修改为8bpc");
            }
            writeLn("颜色深度没有问题！");
        }

        //判断project文件名是否符合规范
        function projectName() {
            writeLn("开始检查文件名....");
            for (var i = 1; i <= app.project.numItems; i++) {
                if (app.project.item(i).mainSource instanceof SolidSource) { } else {
                    var itemName = app.project.item(i).name;
                    var checkName = itemName.split("");
                    for (var j = 0; j < itemNullName.length; j++) {
                        if (isInArray(checkName, itemNullName[j])) {
                            if (isInArray(badName, itemName) !== true) {
                                badName.push(itemName);
                            }
                            // badName.push("\n");
                            // alert("badName");
                            // alert(badName);
                            // break;
                        } else {
                            if (isInArray(rightName, itemName) !== true) {
                                rightName.push(itemName);
                            }
                            // rightName.push("\n");
                            // alert("rightName");
                            // alert(rightName);
                            // break;
                        }
                    }
                }

            }
            //alert(itemNullName[1]);
        }

        //判断文件夹名字是否正确
        function projectFileNameIsTure() {
            writeLn("开始判断文件名是否符合规范....");
            var itemFileIsTrue = ["hori", "vert", "public", "sub_comp", "material", "Solids"];
            for (var i = 0; i < itemFileIsTrue.length; i++) {
                if (isInArray(rightName, itemFileIsTrue[i]) !== true) {
                    nullFileName.push(itemFileIsTrue[i]);
                }
            }
        }

        return {
            depthColor: depthColor,
            projectName: projectName,
            projectFileNameIsTure: projectFileNameIsTure
        }
    })();

    //执行功能
    aeCheck.depthColor();
    aeCheck.projectName();
    aeCheck.projectFileNameIsTure();

    //输出错误
    var badNameInformation = badName.join("\n");
    var nullFileNameInformation = nullFileName.join("\n");
    var alertI = itemNullName.join(" 和 ");

    if (badName.length !== 0 || nullFileName.length !== 0) {
        alert("本脚主要检查是否包含以下字符： \n" + alertI + "\n");
        alert("#这些item的名字有问题：\n" + badNameInformation + "\n" + "#缺少这几个文件夹： \n" + nullFileNameInformation);
        writeLn("发现问题！");
    } else {
        alert("item命名没有问题！");
        writeLn("命名没有问题");
    }
}