import {requestI2CAccess} from "chirimen";
import MCP9808 from "./mcp9808.js";
// 高精度温度センサー

const i2cAccess = await requestI2CAccess();
// i2cPort生成処理
const i2cPort = i2cAccess.ports.get(1);

// インスタンス生成処理
const mcp9808 = new MCP9808(i2cPort, 0x18);
// 初期化処理
await mcp9808.init();

await mcp9808.wake();
await mcp9808.setResolution(3);

const interval = setInterval(async function() { 

  let mode = await mcp9808.getResolution();
  let data_t = await mcp9808.readTempC();
  let data_f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({"T":data_t,"F":data_f});

}, 500);