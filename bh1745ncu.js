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
    const rc = await read(BH1745NUC_RED_DATA_LSB, data, 8);
    if (rc != 0) {
      console.log("Can't get BH1745NUC RGBC value");
    }

    return (rc);
  }

  async get_val(data){
    let val;

    let rc = get_rawval(val);
    //if (rc != 0) {///エラー時
      //return (rc);
    //}

    data[0] =  ((val[1] << 8) & 0xffff) | val[0];
    data[1] =  ((val[3] << 8) & 0xffff) | val[2];
    data[2] =  ((val[5] << 8) & 0xffff) | val[4];
    data[3] =  ((val[7] << 8) & 0xffff) | val[6];

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

    Wire.requestFrom(this.slaveAddress, size, true);
    let cnt = 0;
    while(Wire.available()) {
      data[cnt] = Wire.read();
      cnt++;
    }

    return (0);
  }
}
export default BH1745NUC;