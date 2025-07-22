import {requestI2CAccess} from "chirimen";
import MCP9808 from "./mcp9808.js";
// 高精度温度センサー

async function main() {
  const i2cAccess = await requestI2CAccess();
  // i2cPort生成処理
  const i2cPort = i2cAccess.ports.get(1);

  // インスタンス生成処理
  const mcp9808 = new MCP9808(i2cPort, 0x18);
  // 初期化処理
  await mcp9808.init();

  const data = await mcp9808.read();//データ読み込み（精度ごと4つ）
  //console.log("Temp: ");
  console.dir(data);
}

main();