let init = {
    method: 0,
    url: "/upload_base64",
    jsonImageKey: "img",
    jsonBlackList: ["img"],
    jsonBlackListDefault: ""
}

function analysisReturn(responseText) {
    let resultObj = JSON.parse(responseText);
    document.getElementById("return").src = "data:image/jpg;base64," + resultObj[init.jsonImageKey];
    for(let key in resultObj) {
        if(init.jsonBlackList.includes(key)) {
            resultObj[key] = init.jsonBlackListDefault;
        }
    }
    document.getElementById("jsonResult").value = JSON.stringify(resultObj);
}

function uploadFile() {
    let form = new FormData();
    let image = document.getElementById("image")
    form.append("image", image.files[0]);
    document.getElementById("show").src = window.URL.createObjectURL(image.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", init.url);
    xhr.send(form);
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && xhr.status==200) {
            analysisReturn(xhr.responseText);
        }
    }
}

function uploadBase64() {
    let image = document.getElementById("image")
    let reader = new FileReader();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", init.url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && xhr.status==200) {
            analysisReturn(xhr.responseText);
        }
    }
    reader.onload = function(env) {
       let imgFile = env.target.result;
       xhr.send(JSON.stringify({
            "image": imgFile
       }))
       document.getElementById("show").src = imgFile;
    }
    reader.readAsDataURL(image.files[0]);
}

function upload() {
    if(init.method == 0) {
        uploadBase64();
    } else if(init.method == 1) {
        uploadFile();
    }
}

function closeJsonWindow() {
    let jsonWindow = document.getElementById("jsonWindow");
    jsonWindow.style.zIndex = -1;
    jsonWindow.style.visibility="hidden"
}

function showJsonWindow() {
    let jsonWindow = document.getElementById("jsonWindow");
    jsonWindow.style.zIndex = 999;
    jsonWindow.style.visibility="visible"
}

function selectImage() {
    document.getElementById("image").click();
}