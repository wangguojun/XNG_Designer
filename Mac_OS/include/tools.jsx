var horiArry = [],
    vertArry = [],
    publicArry = [];

//判断数组中是否存在某个元素
function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

//对象转换输出
function alertInformationTools(strVar) {
    return strVar["en"];
}

