import {requestI2CAccess, SHT40} from "chirimen";

const i2cAccess = await requestI2CAccess();
// i2cPort生成処理
const i2cPort = i2cAccess.ports.get(1);
// SHT40のインスタンス生成処理
const sht40 = new SHT40(i2cPort, 0x44);
// SHT40の初期化処理
await sht40.init();
// SHT40からデータ（data.humidityと、data.temperature）を読み出す。
let data = await sht40.readData();
// 読み出したデータをコンソール出力
console.dir(data);