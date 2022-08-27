/* Creamos las Clases a utilizar */

/* 
Genere un programa que esta cargando productos, ingresando el nombre del producto, precio y la cantidad que esta llevando de ese producto.
        La carga se repite hasta que el usuario elige detenerse. 
        Luego al terminar la carga de todos los productos,si corresponde al sumar los valores totales de cada producto sin aplicar el IVA, pueden obtener un descuento:
        _Menor o igual 5000 - SIN DESCUENTO
        _Mayor a 5000 y menor o igual a 8000 - DESCUENTO DE 5%.
        _Mayor a 8000 - DESCUENTO 10%.
        Mostramos en un Alert el detalle del total a pagar, realizando el descuento y sumando al total el impuesto al IVA(21%).
*/
class Producto {
  constructor(nombre, precio, cant) {
    this.nombre = nombre.toUpperCase(); //aplicamos la funcion tuUppercase() para que el texto ingreso este en mayusculas
    this.valorUnidad = parseFloat(precio);
    this.cantidad = cant === 0 || cant === "" ? 1 : parseInt(cant); //dejamos que por defecto ponga 1 si no obtenemos un resultado
  }
}

class Calculos {
  constructor(totalValores) {
    this.valorEvaluar = totalValores;
    this.descuento = this.valorEvaluar <= 5000 ? false : true; //indicamos si el valor es menor o igual a 5000 ponemos false, para no aplicarle descuentos.
    this.valorTotalDescuento = 0;
    this.porcentajeDescuento = 0 + "%";
    this.totalCobrar = 0;
    this.iva = 1.21; //dejamos 1.21 para que se incremente en un 21% el valor  al multiplicarlo por el valor total.
  }
  valorDescuento() {
    //la funcion permite obtener el descuento que corresponde aplicar al monto total
    if (this.descuento === true) {
      if (this.valorEvaluar > 5000 && this.valorEvaluar < 8000) {
        this.valorTotalDescuento = this.valorEvaluar * 0.05; //sacamos el 5% del valor total para poder usarlo para el calculo del total a pagar y tambien mostrarlo en el detalle del pago.
        this.porcentajeDescuento = 5 + "%"; //permite poder mostrar el % a descontar, lo concatenamos con un string para que sea mas visual el resultado
      } else {
        this.valorTotalDescuento = this.valorEvaluar * 0.1;
        this.porcentajeDescuento = 10 + "%";
      }
    }
  }

  facturacion() {
    //creamos la funcion para que retorne el valor que terminaremos cobrando por el total de productos ingresados
    this.totalCobrar = this.iva * (this.valorEvaluar - this.valorTotalDescuento);
  }
}

/* inicializamos las variables a utilizar */
const productos = [];
let acumulaValores = 0;
let index = 0;
let continuar = 1;
let calculosProd;
let cantprod = 0;
let nombreProducto = prompt("Ingrese el nombre del Producto a cobrar");
let valorProducto = prompt("Ingrese el Precio del producto");
let cantidadProduct = prompt("Indiquemos la cantidad a cargar");

while (continuar === 1) {
  // generamos el while para cargar los productos, permitiendo que el usuario ponga el limite de productos a cargar al asignarle el valor 1 a la varibale "continuar"

  productos.push(new Producto(nombreProducto, valorProducto, cantidadProduct)); //agregamos los objetos en el array "productos"

  continuar = parseInt(
    prompt(
      "Presione 1 si desea continuar cargando productos de lo contrario eliga otro valor"
    )
  ); //solicitamos darle valor a la variable "continuar" para poder darle continuidad al while

  if (continuar === 1) {
    index++;
    nombreProducto = prompt("Ingrese el nombre del Producto a cobrar");
    valorProducto = prompt("Ingrese el Precio del producto");
    cantidadProduct = prompt("Cantidad de productos");
  }
}


for (const aux of productos) {
  // recorremos el array de objetos "productos" para acumular el valor de los productos cargados
  cantprod = aux.cantidad * aux.valorUnidad;
  acumulaValores = acumulaValores + cantprod;
  console.log(`Nombre de Producto: ${aux.nombre}\n valor por unidad: $${aux.valorUnidad}\n Cantidad cargada: ${aux.cantidad}\n Total a cobrar: ${cantprod}\n`) //Mostramos con el "console.log" cada uno de los productos cargados con sus valores para poder controlar con el Alert que muestra al final con los valores totales a cobrar
}
calculosProd = new Calculos(acumulaValores); // genero una instancia de la clase Calculos
calculosProd.valorDescuento();//Llamamos a la funcion "valorDescuento" de la clase calculos para que gener el valor del descuento que tenemo que aplicar en el valor total a cobrar
calculosProd.facturacion(); // Ejecutamos la funcion "facturacion" de la clase calculos para poder realizar los calculos que permitan saber el total a pagar.

alert(
  `DETALLES DEL PAGO\n Subtotal: $${calculosProd.valorEvaluar} \n ${calculosProd.porcentajeDescuento} Descuento: $${calculosProd.valorTotalDescuento}\n Total a Pagar (mas IVA 21%): $${calculosProd.totalCobrar}`
); //mostramos el detalle del valor total sin IVA, el descuento aplicado y el total a pagar con IVA.
