import { requestGPIOAccess } from "chirimen"; // WebGPIO を使えるようにするためのライブラリをインポート
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec)); // sleep 関数を定義
let port; // port 変数を複数の関数で使えるように宣言

async function blink() {
  const gpioAccess = await requestGPIOAccess(); // GPIO を操作する 
  port = gpioAccess.ports.get(26); // 26 番ポートを操作する

  await port.export("out"); // ポートを出力モードに設定

  const port2 = gpioAccess.ports.get(5);
  await port2.export("in");
  port2.onchange = showPort;
}

function showPort(ev){
    console.log(ev.value);
    if (ev.value==0){
        port.write(1);
    } else {
        port.write(0);
    }
}

blink();
