import CaptureForm from '../CaptureForm';

let keys = {
  "api_key": "",
  "url": ""
}
let img;

//retrieve GCP keys from json file
//necessary to use GCP
export function readKey(path, ev) {
  var reader = new FileReader();

  const p =
    reader.onload = (ev) => {
      keys = JSON.parse(ev.target.result)

    };

  reader.readAsText(path.target.files[0]);
}

//sending img to GCP and get OCRed data
function sendImg(base64String) {
  if (keys.url == "") { alert("please input  yr GCP keys; "); return; }

  let body = {
    requests: [
      { image: { content: base64String }, features: [{ type: 'TEXT_DETECTION' }] }
    ]
  };
  let xhreq = new XMLHttpRequest();
  xhreq.open('POST', `${keys.url}?key=${keys.api_key}`, true);
  xhreq.setRequestHeader('Content-Type', 'application/json');
  const p = new Promise((resolve, reject) => {
    xhreq.onreadystatechange = () => {
      if (xhreq.readyState != XMLHttpRequest.DONE) return;
      if (xhreq.status >= 400) return reject({ message: `Failed with ${xhreq.status}:${xhreq.statusText}` });
      var annTxt = JSON.parse(xhreq.responseText);
      console.log(annTxt);
      var ret = annTxt.responses[0].fullTextAnnotation.text;
      ExtractProductNameAndPrice(ret);
      alert(JSON.stringify(ret));
      resolve(JSON.parse(xhreq.responseText));
    };
  })
  xhreq.send(JSON.stringify(body));
  return p;
}


function ExtractProductNameAndPrice(ocredTxt)
{
  let products = [];
  let prices = [];
  let txtArr = ocredTxt.split(/\r\n|\n/);
  console.log(txtArr);
  let rgEx = new RegExp("^[半￥'\'][0-9]+?[0-9]$", "");
  for (let i = 1; i < txtArr.length; i++) {
    console.log(txtArr[i]);
    if(rgEx.test(txtArr[i])){ 
      var price = txtArr[i].slice(1);
      prices.push(price);
    }
  }
  console.log(prices);
}
//Show OCRed Result in a Dialog
function showResult(ret) {
  //alert(ret);
  var str;
  for (let key in ret) {
    if (key === 'textAnnotations' || key === 'description') {
      str = key;
    }
  }
  //var parser =  new DOMParser(ret);
  //var dom = parser.parseFromString(ret,'text/xml');
  //var res = dom.getElementById('responses');
  //var content = dom.getElementById('textAnnotations');
  //var contents = dom.getElementById('description');


  //alert(JSON.stringify(str));
}

//reading image file fot OCRing
function readFile(file) {
  //ここがまだまだ
  let reader = new FileReader();

  const p = /*new Promise((resolve, reject) => {*/
    reader.onload = (ev) => {
        /*resolve(*/img = ev.target.result.replace(/^data:image\/(png|jpeg);base64,/, '');//);
    };
  //})

  reader.readAsDataURL(file);

  return p;
}

//これを呼び出すことでsend/readをuiで指定したイベントで実行できる
export function btn_clicked(path, ev) {

  if (img === null) {
    alert(`${img} is not good`)
    return;
  }

  var ret = sendImg(img);
  ret.then(txt => showResult(txt));
}

export function picture_uploaded(file) {

  var t = readFile(file.target.files[0]);

}
