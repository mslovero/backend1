const fs = require('fs/promises');

class Productos{
    constructor (ruta){
        this.ruta = ruta
    }

    async listarAll(){
        try {
            //retorna contenido
            const objs = await fs.readFile(this.ruta, 'utf-8');
            console.log(objs)
            console.log(JSON.parse(objs))
            return JSON.parse(objs); 
        } catch (error) {
            return []

        }
    }

    async guardar(obj){
        try {
            const objs = await this.listarAll();

        let newId;
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs [objs.length - 1].id + 1
        }

       const newObj = {id: newId, ...obj}
       objs.push(newObj);

       await fs.writeFile(this.ruta, JSON.stringify (objs, null, 2));
        return newId;
        } catch (error) {
            console.log('error al guardar')
        }
    }

    async actualizar(id, newObj){
       try {
        const objs = await this.listarAll();
        const indexObj = objs.findIndex((o)=> o.id == id);


        if (indexObj == -1) {
            return 'objeto no encontrado'
            
        } else {
            objs [indexObj] = {id, ...newObj};
            await fs.writeFile(this.ruta, JSON.stringify (objs, null, 2));
        }
        return {id, ...newObj};
        
       } catch (error) {
        console.log('error al actualizar')
        
       }
    }

    async eliminar(id){
        try {
            const objs = await this.listarAll();
        const indexObj = objs.findIndex((o)=> o.id ==id);

          if (indexObj == -1) {
            return 'articulo no encontrado'
          } else {
          //splice corta o elimmina
            objs.splice(indexObj, 1);
            await fs.writeFile(this.ruta, JSON.stringify (objs, null, 2));
          }
        } catch (error) {
            return 'no se pudo eliminar'
        }
    }

}

//creo un main para poder ejecutar todo
async function  main(){
  const productos = new Productos('./DB/productos-data.txt');
//primero imprimo el parametro y luego los métodos

  console.log('Consulta inicial');
  console.log(await productos.listarAll());
  console.log ('Guarda objetos')
  console.log(await productos.guardar({art: "sillon", price: 200000, img: "https://www.thefurnituremegastore.co.uk/products/hexham-chesterfield-wing-chair-harris-tweed-vintage-leather"}));
  console.log(await productos.guardar ({art: "silla", price: 12000, img: "https://www.muebles.com/producto/silla-modelo-roble-enea-2/"}));
  console.log(await productos.guardar ({art: "silla", price: 12000, img: "https://www.muebles.com/producto/silla-modelo-roble-enea-2/"}));
  console.log('Actualiza objeto')
  console.log(await productos.actualizar(2, {art: "mesa", price: 80000, img: "https://regaldekor.com/mesas/tipos-de-mesa/mesas-de-comedor/mesa-de-comedor-nordica-redonda-extensible-dt-155-120-160-cm.html://www.shopmania.es/q-jarrones"}));
  console.log('Consulta objetos')
  console.log(await productos.listarAll());
  console.log('elimina objeto')
  console.log(await productos.eliminar(1));
  console.log('consulta objetos')
  console.log(await productos.listarAll())
  console.log('guarda objetos')
  console.log(await productos.guardar ({art: "silla", price: 12000, img: "https://www.muebles.com/producto/silla-modelo-roble-enea-2/"}));
  console.log('Consulta objetos')
  console.log(await productos.listarAll());
}
main();
