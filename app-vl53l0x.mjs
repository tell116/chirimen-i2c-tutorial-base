import {requestI2CAccess, VL53L0X} from "chirimen";
// 測距センサー

const i2cAccess = await requestI2CAccess();

// i2cPort生成処理
const i2cPort = i2cAccess.ports.get(1);
// インスタンス生成処理
const vl53l0x = new VL53L0X(i2cPort, 0x29, 1000);
// 初期化処理
await vl53l0x.init();

let count = 0;
const interval = setInterval(async function() {
    // 
    let data = await vl53l0x.read();
    // 
    console.dir(data);
    
    count++;
    if (count === 5) {
        clearInterval(interval);
    }
}, 1000);