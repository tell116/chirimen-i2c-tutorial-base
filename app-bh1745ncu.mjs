import {requestI2CAccess, SHT40} from "chirimen";
// import BH1745NCU from "@chirimen/bh1745ncu";
import BH1745NCU from "./bh1745ncu.js";
// カラーセンサー

const i2cAccess = await requestI2CAccess();
// i2cPort生成処理
const i2cPort = i2cAccess.ports.get(1);

// インスタンス生成処理
const bh1745ncu = new BH1745NCU(i2cPort, 0x39);
// 初期化処理
await bh1745ncu.init();

let count = 0;
const interval = setInterval(async function() {
    const buffer = new ArrayBuffer(4);
    const data = new Uint16Array(buffer);
    // 
    let rc = await bh1745ncu.get_val(data);
    // 
    console.dir({"RED":data[0], "GREEN":data[1], "BLUE":data[2], "CLEAR":data[3]});

    count++;
    if (count === 5) {
        clearInterval(interval);
    }
}, 1000);