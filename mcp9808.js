const MCP9808_I2CADDR_DEFAULT= 0x18;    ///< I2C address
const MCP9808_REG_CONFIG= 0x01;         ///< MCP9808 config register

const MCP9808_REG_AMBIENT_TEMP= 0x05    ///< ambient temperature

class MCP9808{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }
  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.i2cSlave.write16(MCP9808_REG_CONFIG,0);
  }
  async readTempC(){
    let temp = null;
    const t = await this.i2cSlave.read16(MCP9808_REG_AMBIENT_TEMP);
    if (t != 0xFFFF) {
       temp = t & 0x0FFF;
       temp /= 16.0;
       if (t & 0x1000){
         temp -= 256;
       }
    }
    return temp;
  }
  async readTempF(){

  }
  async shutdown(){

  }
  async wake(){

  }
  async getResolution(){

  }
  async setResolution(){

  }
  async getEvent(){

  }
  async getSensor(){

  }
}
export default MCP9808;