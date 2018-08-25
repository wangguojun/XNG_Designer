// for (var i = 1; i<10; i++){
//     alert(app.project.item(i).mainSource instanceof  SolidSource);
// }

// for (var i = 1; i<10; i++){
//     alert(app.project.item(i).mainSource instanceof  CompSource);
// }

// var render = app.project.item(4).layer(3).enabled = false;
// alert(render);

// var renderNum = app.project.renderQueue.numItems;
// for (var i=renderNum; i>=1; i--){
//     app.project.renderQueue.item(i).remove();
// }

// var a = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
// var b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
// var c = [];

// for (i = 0; i < a.length; i++) {
//     c.push(a[i] +
//         "时间" +
//         b[i] +
//         "\n");
// }
// alert(c.join(","));

// alert(app.project.item(1).name.split("_")[0])

// if(app.project.item(1).name.split("_")[0] == "a1" && app.project.item(1).typeName == "Folder"){
//     app.project.item(1).remove()
// }

// for(var i = 1; i <= app.project.numItems; i++){
//     if(app.project.item(i).name.split("_")[0] == "testRender" && app.project.item(i).typeName == "Folder"){
//         app.project.item(i).remove()
//     }
// }

var timeStr = system.callSystem("cmd.exe /c \"rd /S /Q %USERPROFILE%\\Desktop\\test\"");
alert("Current time is" + timeStr);