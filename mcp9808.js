const MCP9808_I2CADDR_DEFAULT= 0x18;    ///< I2C address
const MCP9808_REG_CONFIG= 0x01;         ///< MCP9808 config register

const MCP9808_REG_CONFIG_SHUTDOWN= 0x0100   ///< shutdown config
const MCP9808_REG_CONFIG_CRITLOCKED= 0x0080 ///< critical trip lock
const MCP9808_REG_CONFIG_WINLOCKED= 0x0040  ///< alarm window lock
const MCP9808_REG_CONFIG_INTCLR= 0x0020     ///< interrupt clear
const MCP9808_REG_CONFIG_ALERTSTAT= 0x0010  ///< alert output status
const MCP9808_REG_CONFIG_ALERTCTRL= 0x0008  ///< alert output control
const MCP9808_REG_CONFIG_ALERTSEL= 0x0004   ///< alert output select
const MCP9808_REG_CONFIG_ALERTPOL= 0x0002   ///< alert output polarity
const MCP9808_REG_CONFIG_ALERTMODE= 0x0001  ///< alert output mode

const MCP9808_REG_UPPER_TEMP= 0x02      ///< upper alert boundary
const MCP9808_REG_LOWER_TEMP= 0x03      ///< lower alert boundery
const MCP9808_REG_CRIT_TEMP= 0x04       ///< critical temperature
const MCP9808_REG_AMBIENT_TEMP= 0x05    ///< ambient temperature
const MCP9808_REG_MANUF_ID= 0x06        ///< manufacture ID
const MCP9808_REG_DEVICE_ID= 0x07       ///< device ID
const MCP9808_REG_RESOLUTION= 0x08      ///< resolution

class MCP9808{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }
  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    await this.i2cSlave.write16(MCP9808_REG_CONFIG,0x0);
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
    let temp = null;
    const t = await this.i2cSlave.read16(MCP9808_REG_AMBIENT_TEMP);
    if (t != 0xFFFF) {
       temp = t & 0x0FFF;
       temp /= 16.0;
       if (t & 0x1000){
         temp -= 256;
       }
       temp = temp * 9.0 / 5.0 + 32;
    }
    return temp;
  }
  async shutdown(){
    let conf_register = read16(MCP9808_REG_CONFIG);
    let conf_shutdown = conf_register | MCP9808_REG_CONFIG_SHUTDOWN;
    this.i2cSlave.write16(MCP9808_REG_CONFIG, conf_shutdown);
  }
  async wake(){
    let conf_register = read16(MCP9808_REG_CONFIG);
    let conf_shutdown = conf_register & ~MCP9808_REG_CONFIG_SHUTDOWN;
    this.i2cSlave.write16(MCP9808_REG_CONFIG, conf_shutdown);
    
    setTimeout(function() {
      console.log("260ms delay");
    }, 260); 
  }
  async getResolution(){
    return this.i2cSlave.read8(MCP9808_REG_RESOLUTION);
  }
  async setResolution(value){
    this.i2cSlave.write8(MCP9808_REG_RESOLUTION, value & 0x03);
  }
}
export default MCP9808;