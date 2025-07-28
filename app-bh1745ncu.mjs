import { requestI2CAccess } from "chirimen";
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

const interval = setInterval(async function () {
  let data = await bh1745ncu.get_val();

  console.dir({ RED: data[0], GREEN: data[1], BLUE: data[2], CLEAR: data[3] });
}, 1000);
