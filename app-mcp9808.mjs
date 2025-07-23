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

const interval = setInterval(async function() {
  
  mcp9808.setResolution(0);
  let data_0t = mcp9808.readTempC();
  let data_0f = mcp9808.readTempF();
  console.dir("mode=0");
  console.dir({"T":data_0t,"F":data_0f});
  
  mcp9808.setResolution(1);
  let data_1t = mcp9808.readTempC();
  let data_1f = mcp9808.readTempF();
  console.dir("mode=1");
  console.dir({"T":data_1t,"F":data_1f});

  mcp9808.setResolution(2);
  let data_2t = mcp9808.readTempC();
  let data_2f = mcp9808.readTempF();
  console.dir("mode=2");
  console.dir({"T":data_2t,"F":data_2f});

  mcp9808.setResolution(3);
  let data_3t = mcp9808.readTempC();
  let data_3f = mcp9808.readTempF();
  console.dir("mode=3");
  console.dir({"T":data_3t,"F":data_3f});

}, 500);