const validLibro = (libro, files) => {
    var regexTexto = /^[A-Za-zÀ-ÿ\u00f1\u00d10-9¡¿]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d10-9¡!,.:¿?]*)*[A-Za-zÀ-ÿ\u00f1\u00d10-9!?]+$/g;
    var regexTextoSinopsi = /^[A-Za-zÀ-ÿ\u00f1\u00d10-9¡¿<]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d10-9¡!,.:¿?<>/]*)*[A-Za-zÀ-ÿ\u00f1\u00d10-9!?>]+$/g;
    var regexTextoSinopsiCard = /^[A-Za-zÀ-ÿ\u00f1\u00d10-9¡¿]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d10-9¡!,.:¿?]*)*[A-Za-zÀ-ÿ\u00f1\u00d10-9!?]+$/g;
    var regexTextoAutor = /^[A-Za-zÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[A-Za-zÀ-ÿ\u00f1\u00d1]+$/g;
    var regexNumero = /^[0-9]+([^,][0-9.]+[0-9]*)*[0-9]+$/g;
    var regexImagePortada = /(.jpg|.jpeg|.png)$/i;
    var regexImageBaner = /(.jpg|.jpeg|.png)$/i;

    if(libro.nombre === '') return {error: 'Ingrese un nombre porfavor'}
    if(!regexTexto.test(libro.nombre)) return {error: 'Ingrese un nombre valido, solo debe contener letras, numeros, espacios y caracteres especiales como ,.:¡!¿?'}

    if(libro.precio === '') return {error: 'Ingrese un precio porfavor'}
    if(!regexNumero.test(libro.precio)) return {error: 'Ingrese un precio valido, solo debe contener numeros y puntos'}

    if(libro.autor === '') return {error: 'Ingrese un autor porfavor'}
    if(!regexTextoAutor.test(libro.autor)) return {error: 'Ingrese un autor valido, solo debe contener letras y espacios'}

    if(libro.genero === '') return {error: 'Porfavor seleccione almenos 1 genero'}

    if(libro.sinopsiCard === '') return {error: 'Ingrese una sinopsis para la tarjeta porfavor'}
    if(!regexTextoSinopsiCard.test(libro.sinopsiCard)) return {error: 'Ingrese una sinopsis para la tarjeta valida, solo debe contener letras, numeros, espacios y caracteres especiales como ,.:¡!¿?'}

    if(libro.sinopsi === '') return {error: 'Ingrese una sinopsis porfavor'}
    if(!regexTextoSinopsi.test(libro.sinopsi)) return {error: 'Ingrese una sinopsis valida, solo debe contener letras, numeros, espacios y caracteres especiales como ,.:¡!¿?'}

    if(libro.portada === '') return {error: 'Ingrese una imagen de portada porfavor'}
    if(libro.banner === '') return {error: 'Ingrese una imagen de banner porfavor'}

    if(!regexImagePortada.test(files.portada[0].filename)) return {error: 'Ingrese un formato valido para la imagen de portada'}
    if(!regexImageBaner.test(files.banner[0].filename)) return {error: 'Ingrese un formato valido para la imagen de banner'}
}

module.exports = {
    validLibro
}