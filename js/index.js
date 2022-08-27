/* Creamos las Clases a utilizar */
class Producto{
    constructor(nombre,precio,cant){
        this.nombre=nombre.toUpperCase(); //aplicamos la funcion tuUppercase() para que el texto ingreso este en mayusculas
        this.valorUnidad=parseFloat(precio);
        this.cantidad=cant===0 || cant==="" ?1:parseInt(cant)
}
}

class Calculos{
    constructor(totalValores){
    this.valorEvaluar=totalValores;
    this.descuento= this.valorEvaluar<=5000?false:true;
    this.valorTotalDescuento=0;
    this.porcentajeDescuento=0+"%";
    this.totalCobrar=0
    this.iva=1.21;
    }
    valorDescuento(){
if (this.descuento===true){
    if (this.valorEvaluar > 5000 && this.valorEvaluar < 8000) {
        this.valorTotalDescuento=this.valorEvaluar*0.05;
        this.porcentajeDescuento=5+"%"
      } else {
        this.valorTotalDescuento=this.valorEvaluar*0.1;
        this.porcentajeDescuento=10+"%"
      } 
} 
    }

facturacion(){
    this.totalCobrar=this.iva*(this.valorEvaluar-this.valorTotalDescuento);
}
}

/* inicializamos las variables a utilizar */
const productos=[];
let acumulaValores=0
let index=0;
let continuar=1;
let calculosProd;
let nombreProducto=prompt("Ingrese el nombre del Producto a cobrar");
let valorProducto=prompt("Ingrese el Precio del producto");
let cantidadProduct=prompt("Cantidad de productos")

while (continuar === 1){ // generamos el while para cargar los productos, permitiendo que el usuario ponga el limite de productos a cargar al asignarle el valor 1 a la varibale "continuar"

productos.push(new Producto(nombreProducto,valorProducto,cantidadProduct)) //agregamos los objetos en el array "productos"

continuar=parseInt(prompt("Presione 1 si desea continuar cargando productos de lo contrario eliga otro valor"));

if(continuar===1){
index++;
nombreProducto=prompt("Ingrese el nombre del Producto a cobrar");
valorProducto=prompt("Ingrese el Precio del producto");
cantidadProduct=prompt("Cantidad de productos")
}

}

let cantprod=0;
for (const aux of productos){ // recorremos el array de objetos "productos" para acumular el valor de los productos cargados
    cantprod=aux.cantidad*aux.valorUnidad
    acumulaValores=acumulaValores+cantprod;
}
calculosProd=new Calculos(acumulaValores) // genero una instancia de la clase Calculos
calculosProd.valorDescuento();
 //llamamos a la funcion de la clase calculos para que gener el valor del descuento que tenemo que aplicar en el valor total a cobrar
calculosProd.facturacion();

alert(`DETALLES DE PAGO\n Subtotal: $${calculosProd.valorEvaluar} \n ${calculosProd.porcentajeDescuento} Descuento: $${calculosProd.valorTotalDescuento}\n Total a Pagar (mas IVA 21%): $${calculosProd.totalCobrar}`)
