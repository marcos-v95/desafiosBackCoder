import fs from 'fs'

const pathOfData='./src/files/data.json';

class FileSystem{
  getAllData= async ()=>{
    try{
      if(fs.existsSync(pathOfData)){
        let readData=await fs.promises.readFile(pathOfData,'utf-8');
        let parseData= JSON.parse(readData)
        return parseData
      }else{
        return []
      }
    }catch(error){
      console.log(`----- Cannot read the file ----- ${error}-----`)
    }
  }
  //metodo para agregar datos al archivo
  saveData= async (data)=>{
    try{
      let arrData= await this.getAllData();//arreglo que va a contener los datos que luego van a ser agregados al archivo
      if(arrData.length===0){
        data.id=1;
        arrData.push(data);
        await fs.promises.writeFile(pathOfData,JSON.stringify(arrData,null,'\t'));
      }else{
        data.id=arrData[arrData.length-1].id+1;
        arrData.push(data);
        await fs.promises.writeFile(pathOfData,JSON.stringify(arrData,null,'\t'));
      }
    }catch(error){
      console.log(`----- There is an error ----- ${error}-----`)
    }
  }
  // metodo para filtrar por id el array de objetos
  getById= async (id)=>{
    try{
      let arrData= await this.getAllData() // contiene los datos del archivo
      let filterId= arrData.find((data)=>{return data.id===id})
      // console.log(filterId) //print para ver resultado
    }catch(error){
      console.log(`----- There is an error ----- ${error}-----`)
    }
  }
  // metodo para eliminar del archivo el objeto seleccionado
  deleteById= async (contain,id)=>{
    try{
      let arrData= contain // contiene los datos del archivo
      arrData= arrData.filter((item)=>item.id!==id)
      // console.log(arrData) // print para ver resultado
      await fs.promises.writeFile(pathOfData,JSON.stringify(arrData,null,'\t'))
    }catch(error){
      console.log(`----- There is an error ----- ${error}-----`)
    }
  }
  // metodo para eliminar todos los datos del archivo
  deleteAll= async ()=>{
    try{
      await fs.promises.writeFile(pathOfData,JSON.stringify([],null,'\t'))
    }catch(error){
      console.log(`----- There is an error ----- ${error}-----`)
    }
  }
}
export default FileSystem;