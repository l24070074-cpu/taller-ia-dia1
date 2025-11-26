// ejercicio :Array y objetos
// 1.array (lista)
// crea una lista de tus comidas favoritas
var comidasFavoritas=["pizza","tacos","shushi","hamburgesaa","ensalada"];
// 2 objeto (key y value)

var personas={
    nombre:"juan",
    edad:30,
    ciudad:"mexico",
    profesion:"desarrollador",
    estatura :1.75,
    programador:true,
    habilidades:["javascript","html","css"],

};
// como accedo a la proiedad nombre del objeto personas
console.log(personas.nombre);
// como accedo a la  propiedad habilidades de mi objeto persona
console.log(personas.habilidades); // Esto mostrará undefined porque no existe la propiedad habilidades en el objeto personas
// como acceedo  a la habilidad  de un dibujo de mi objeto persona

//3. array de objetos
// crea una lista de 3 alumnos(objetos)  con nombre  y calificacion
var alumnos=[
    {
        nombre:"ana",
        calificacion:85
    },
    {
        nombre:"luis",
        calificacion:90
    },  
    {
        nombre:"maria",
        calificacion:95 
               
    },
// escribe un bluce que recorra  el array de alunmos  e imprima imprima solo los que tengan  una calificion mayor a 80
];
for(var i=0;i<alumnos.length;i++){
    if(alumnos[i].calificacion>80){    
        console.log(alumnos[i].nombre+" tiene una calificacion de "+alumnos[i].calificacion);
    }


}
// como acceedo  a la habilidad  de un dibujo de mi objeto persona
//console.log(personas.dibujo.habilidad);


// // Esto mostrará undefined porque no existe la propiedad dibujo en el objeto personas
