// script generado utilizando nodejs y jquery
ObtenerItemsBySeller_id (81644614);
 //crear funcion que llame a la api que se encuentro en los document de mercadolibre con el criterio de que sea el seller_id 81644614
 //se deja la opcion de para reutilizar el llamado y cambiar el nro de seller_id que se obtenga resultados
 function ObtenerItemsBySeller_id (seller_id){
    $.ajax({
        type: "GET",
        url: 'https://api.mercadolibre.com/sites/MLA/search?seller_id=' + seller_id + '/',
        dataType: "json",
        contentType: "application/json",
        async: false, //blocks window close
        success: function(data) {
            console.log("API GET/POST SUCCESS");

    //se crea variable que capture del resultado las variables que se pidio en el enunciado menos el name de categoria que no viene en este result
            var result = data;
             $(result).each(function( index ) {

                 /* "id" del ítem, "title" del item, "category_id" donde está publicado, 
                  */
                
             
                 
                 var items = [];


                $(this.results).each(function( j ) {
                  var item;
                  item.id = $(this).id;
                 item.title = $(this).title;
                 item.category_id=$(this).category_id;
                 
//se hace otro llamado a la api con el critero de busqueda del category_id resultante capturado anteriormente para obtener el name de categoria que se pide en el enunciado
                   $.ajax({
                    type: "GET",
                    url:'https://api.mercadolibre.com/categories/' + item.category_id,
                   
                    dataType: "json",
                    contentType: "application/json",
                    async: false,
                  
              success: function(data2){
                    var result2=data2;
                     $(result2).each(function( x ) {
                        item.name=$(this).name;
                     });
                     

                }, 
                // en caso de error se llama esta funcion para que se vea en console en la herramienta de desarrolladores del browser web
                error: function(xhr,status,error){
                    console.log("-----------Error Api GET " + this.baseUrl + req + "------------------");
                    console.log("Status: " + status);
                    console.log("Error :" + error);
                    console.log(xhr);
                    console.log("---------------End Error----------------");
                    this.result = "error";
                }});
                if(!async){
                    while (this.result == undefined) {}
                    return this.result;
                }
                

                });

                items.push(item);
     //se llama a la variable items que contiene los campos resultantes que son requeridos en el enunciado
     //se pasan los datos capturados del arrays a un tipo string y luego se genera un txt llamado log.txt en donde se graban el string 

    var textToWrite = items.toString();

    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

    var fileNameToSaveAs = "log.txt";


           });
    
        }, //funcion que encapsula en caso de errores
        error: function(xhr,status,error){
            console.log("-----------Error Api GET " + this.baseUrl + req + "------------------");
            console.log("Status: " + status);
            console.log("Error :" + error);
            console.log(xhr);
            console.log("---------------End Error----------------");
            this.result = "error";
        }});

  }



 