const BH1745NUC_DEVICE_ADDRESS_38 = 0x38;// 7bit Addrss
const BH1745NUC_DEVICE_ADDRESS_39 = 0x39;// 7bit Addrss

const BH1745NUC_RED_DATA_LSB = 0x50;

class BH1745NUC{
    constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    ///
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

  async write(memory_address, data, size){
    let rc;
    const write_data = [memory_address,data,size];

    if(size == 8){
      rc = await this.i2cSlave.write8(this.slaveAddress,write_data);
    }else if(size == 16){
      rc = await this.i2cSlave.write16(this.slaveAddress,write_data);
    }
    return (rc);
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
    
    if(size == 8){
      data = await this.i2cSlave.read8(this.slaveAddress);
    }else if(size == 16){
      data = await this.i2cSlave.read16(this.slaveAddress);
    }
    console.dir({"dr0":data[0], "dr1":data[1], "dr2":data[2], "dr3":data[3],"dr0":data[4], "dr1":data[5], "dr2":data[6], "dr3":data[7]});///
    return (0);
  }
}
export default BH1745NUC;