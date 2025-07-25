/// https://www.switch-science.com/products/2773?srsltid=AfmBOoquPvtLrkOCluD7d_TCyT12E-vZcR5vBdlFiTRWnOE_i6j_sta_
/// https://github.com/SWITCHSCIENCE/samplecodes/blob/master/Conta/2773_BH1745NUC_module/BH1745NUC.zip
/// https://github.com/SWITCHSCIENCE/samplecodes/blob/master/Conta/2773_BH1745NUC_module/BH1745NUC_module/BH1745NUC_module.ino


const BH1745NUC_DEVICE_ADDRESS_38 = 0x38;// 7bit Addrss
const BH1745NUC_DEVICE_ADDRESS_39 = 0x39;// 7bit Addrss

const BH1745NUC_RED_DATA_LSB = 0x50;

const BH1745NUC_PART_ID_VAL = 0x0B;            
const BH1745NUC_MANUFACT_ID_VAL = 0xE0;         

const BH1745NUC_SYSTEM_CONTROL = 0x40;              
const BH1745NUC_MODE_CONTROL1 = 0x41;                
const BH1745NUC_MODE_CONTROL2 = 0x42;              
const BH1745NUC_MODE_CONTROL3 = 0x44;            
const BH1745NUC_MANUFACTURER_ID = 0x92;           

const BH1745NUC_MODE_CONTROL1_MEAS_TIME160MS = 0x00; 

const BH1745NUC_MODE_CONTROL2_ADC_GAIN_X1 = 0; 
const BH1745NUC_MODE_CONTROL2_ADC_GAIN_X2 = 1;
const BH1745NUC_MODE_CONTROL2_ADC_GAIN_X16 = 2;
const BH1745NUC_MODE_CONTROL2_RGBC_EN = (1 << 4);       

const BH1745NUC_MODE_CONTROL1_VAL = BH1745NUC_MODE_CONTROL1_MEAS_TIME160MS;
const BH1745NUC_MODE_CONTROL2_VAL = BH1745NUC_MODE_CONTROL2_RGBC_EN | BH1745NUC_MODE_CONTROL2_ADC_GAIN_X16;
const BH1745NUC_MODE_CONTROL3_VAL = 0x02; 

class BH1745NUC{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    ///
    let rc;

    reg = BH1745NUC_MODE_CONTROL1_VAL;
    rc = this.write(BH1745NUC_MODE_CONTROL1, [BH1745NUC_MODE_CONTROL1_VAL]);
    if (rc != 0) {
      console.log("Can't write BH1745NUC MODE_CONTROL1 register");
      return (rc);
    }

    rc = this.write(BH1745NUC_MODE_CONTROL2, [BH1745NUC_MODE_CONTROL2_VAL]);
    if (rc != 0) {
      console.log("Can't write BH1745NUC MODE_CONTROL2 register");
      return (rc);
    }

    rc = this.write(BH1745NUC_MODE_CONTROL3, BH1745NUC_MODE_CONTROL3_VAL);
    if (rc != 0) {
      console.log("Can't write BH1745NUC MODE_CONTROL3 register");
      return (rc);
    }
  }

  async get_rawval(data){
    const rc = await this.read(BH1745NUC_RED_DATA_LSB, data, 8);
    if (rc != 0) {
      console.log("Can't get BH1745NUC RGBC value");
    }
    console.dir({"r0":data[0], "r1":data[1], "r2":data[2], "r3":data[3],"r4":data[4], "r5":data[5], "r6":data[6], "r7":data[7]});///
    return (rc);
  }

  async get_val(data){
    const buffer = new ArrayBuffer(8);
    const val = new Uint8Array(buffer);

    let rc = await this.get_rawval(val);
    //if (rc != 0) {///エラー時
      //return (rc);
    //}

    data[0] =  (val[1] << 8) | val[0];
    data[1] =  (val[3] << 8) | val[2];
    data[2] =  (val[5] << 8) | val[4];
    data[3] =  (val[7] << 8) | val[6];
    console.dir({"d0":data[0], "d1":data[1], "d2":data[2], "d3":data[3]});///
    return (rc);
  }

  async write(memory_address, data){
    await this.i2cSlave.writeByte(memory_address);
    await this.i2cSlave.writeBytes(data);
  }

  async read(memory_address, data, size){
    let rc;

    if(size == 8){
      rc = await this.i2cSlave.write8(this.slaveAddress,memory_address);
    }else if(size == 16){
      rc = await this.i2cSlave.write16(this.slaveAddress,memory_address);
    }
    //if (rc != 0) {///エラー時
      //return (rc);
    //}
    
    let read;
    if(size == 8){
      read = await this.i2cSlave.read8(this.slaveAddress);
    }else if(size == 16){
      read = await this.i2cSlave.read16(this.slaveAddress);
    }
    for(let i = 0; i < size; i++){
      data[i] = read[i];
    }
    console.dir({"dr0":data[0], "dr1":data[1], "dr2":data[2], "dr3":data[3],"dr4":data[4], "dr5":data[5], "dr6":data[6], "dr7":data[7]});///
    return (0);
  }
}
export default BH1745NUC;