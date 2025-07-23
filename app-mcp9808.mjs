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

  await mcp9808.wake();

  for(let i=0;i<4;i++){
    await mcp9808.setResolution(i);
    let mode = await mcp9808.getResolution();
    let data_t = await mcp9808.readTempC();
    let data_f = await mcp9808.readTempF();
    console.dir(mode);
    console.dir({"T":data_t,"F":data_f});
  }

  /*
  await mcp9808.setResolution(0);
  let mode = await mcp9808.getResolution();
  let data_0t = await mcp9808.readTempC();
  let data_0f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({"T":data_0t,"F":data_0f});
  
  await mcp9808.setResolution(1);
  mode = await mcp9808.getResolution();
  let data_1t = await mcp9808.readTempC();
  let data_1f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({"T":data_1t,"F":data_1f});

  await mcp9808.setResolution(2);
  mode = await mcp9808.getResolution();
  let data_2t = await mcp9808.readTempC();
  let data_2f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({"T":data_2t,"F":data_2f});

  await mcp9808.setResolution(3);
  mode = await mcp9808.getResolution();
  let data_3t = await mcp9808.readTempC();
  let data_3f = await mcp9808.readTempF();
  console.dir(mode);
  console.dir({"T":data_3t,"F":data_3f});
  */
  await mcp9808.shutdown();

}, 500);

