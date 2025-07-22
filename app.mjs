import {requestI2CAccess, SHT40} from "chirimen";

const i2cAccess = await requestI2CAccess();

// i2cPort生成処理
const i2cPort = i2cAccess.ports.get(1);
// SHT40のインスタンス生成処理
const sht40 = new SHT40(i2cPort, 0x44);
// SHT40の初期化処理
await sht40.init();

let count = 0;
const interval = setInterval(async function() {
    // 
    let data = await sht40.readData();
    // 
    console.dir(data);
    
    count++;
    if (count === 5) {
        clearInterval(interval);
    }
}, 1000);