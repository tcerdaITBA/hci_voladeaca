$(document).ready(function(){
    $('.btnNext').click(function(){

        if($('.nav-tabs > .active').next('li').hasClass('disabled-tab')) {
            $('.nav-tabs > .active').removeClass('disabled-tab');
            $('.nav-tabs > .active').removeClass('disabled');
        }
        $('.nav-tabs > .active').next('li').find('a').tab('show');
    });
});


$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        if($(this).not('disabled')) {
            $(this).tab('show');
        }
    });
});

$(document).ready(function(){
    $('.btnPrev').click(function(){

        $('.nav-tabs > .active').prev('li').find('a').tab('show');

    });
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover',

        content: function () {
            return '<img src="img/security-code.jpg"/>';
        }
})});

$(document).ready(function(){
    $('.basicField').click(function(){
        $('.openField').show();
    });
});



$(function(){
    $('.openField').hide();
    $('.basicField').on("click", function(){
        $('.openField').slideDown();
    });
});


$(document).ready(function(){
    var maxField = 3; //Input fields increment limitation
    var addButton = $('.add-Phone'); //Add button selector
    var wrapper = $('#contact-form'); //Input field wrapper
    var fieldHTML =' <div class="phone-data">' +
        '<div class="col-md-2 col-md-offset-1 form-field">' +
        '<label for="phone-type">Tipo:</label>' +
        '<select class="form-control" id="phone-type">' +
        '<option>Fijo</option> ' +
        '<option>Celular</option> ' +
        '</select> ' +
        '</div> ' +
        '<div class="col-md-3 form-field"> ' +
        '<label for="phone-country">País:</label> ' +
        '<select class="form-control" id="phone-country"> ' +
        '<option>Pais1</option> ' +
        '<option>Pais2</option> ' +
        '<option>Pais3</option> ' +
        '</select> ' +
        '</div> ' +
        '<div class="col-md-2 form-field"> ' +
        '<label for="phone-area">Cód.de Área:</label> ' +
        '<input type="number" class="form-control" id="phone-area"> ' +
        '</div> ' +
        '<div class="col-md-3 form-field"> ' +
        '<label for="phone">Número:</label> ' +
        '<input type="text" class="form-control" id="phone"> ' +
        '</div> ' +
        '<div class="col-md-1 tocenter-label">' +
        '<a href="#" class="btn btn-default remove-phone add-rem-button">' +
        '<span class="glyphicon glyphicon-minus-sign"></span>' +
        '</a>' +
        '</div>'+' </div>' +'</div>';


    var x = 1; //Initial field counter is 1
    $(addButton).click(function(){ //Once add button is clicked
        if(x < maxField){ //Check maximum number of input fields
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); // Add field html
        }
    });
    $(wrapper).on('click', '.remove-phone', function(e){ //Once remove button is clicked
        e.preventDefault();
        $(this).parent().parent().remove(); //Remove field html
        x--; //Decrement field counter
    })

});

/*
$(document).ready(function() {
// Function to get input value.
    $('#cont1').click(function() {
        var text_value =
        if (text_value == '') {
            alert("Enter Some Text In Input Field");
        } else {

        }
    })});
*/

//1 - Vacío
//2 - Error de fecha

function validateName(name){
    if(name === ""){
        return 1
    }
    return name;
}

function validateDoc(doc){
    //VER QUE VALIDAR
    if(doc =""){
        return 1;
    }
    return doc;
}

function validateDate(day,month,year){
    if(day=="" || month=="" || year=="") {
        return 1;
    }
    if (day < 0 || day > 31) {
        return 2
    }
    if (month < 0 || month > 11){
        return 2
    }

    if(year < 0){
        return 2;
    }
    var date = new Date(year,month - 1,day);
    return date.toDateString().slice(4);

}

function addSumField(field) {
    var toAdd = '<h5 ' + 'class=field-' + field + '></h5>';
    return toAdd;
}

function addSumBlockPass() {

    var first = '<div class= "summary-block">'+ '</div>';
    $(".summary").append(first);

    $(".summary-block").append(addSumField("name"));
    $(".summary-block").append(addSumField("lname"));
    $(".summary-block").append(addSumField("date"))
    $(".summary-block").append(addSumField("gen"));
    $(".summary-block").append(addSumField("country"));
    $(".summary-block").append(addSumField("doc"));
    $(".summary-block").append(addSumField("docnum"));


}

function completeDataPass(name, lname, date, gen, country, doc, docnum){
    $(".field-name").text(name);
    $(".field-lname").text(lname);
    $(".field-date").text(date);
    $(".field-gen").text(gen);
    $(".field-country").text(country);
    $(".field-doc").text(doc);
    $(".field-docnum").text(docnum);
}

function validation() {

    var name = validateName(document.getElementById("usr-name").value);
    if (name == 1) {
        console.log("Nombre vacío");
        name = "Nombre vacío";
    }

    var lname = validateName(document.getElementById("usr-lname").value);
    if(lname == 1) {
        console.log("Apellido vacío");
        lname= "Apellido Vacío";
    }

    // TODO: VALIDAR DOCUMENTO  Y TODO LA VERDAD...

    var day =document.getElementById("birth-day").value;
    var month = document.getElementById("birth-month").value;
    var year = document.getElementById("birth-year").value;
    date = validateDate(day,month,year);

    if( date == 1) {
        console.log("Fecha vacía");
        date =  "Fecha Vacía";
    }else if( date == 2) {
        console.log("Fecha inválida");
        date="Fecha Invalida";
    }
    console.log(date);

    var docnum = document.getElementById("usr-docnum").value;
    var doc = document.getElementById("usr-doc").value;

    if (doc != 1) {
        console.log("Docuemnto vacío");
        doc = "Documento Vacío";
    }

    var country= document.getElementById("usr-country").value;
    var gen = document.getElementById("usr-gen").value;
    completeDataPass('Nombre: ' + name , 'Apellido: ' + lname , 'fecha Nacimiento: '  + date , 'Sexo: '+ gen, 'País: ' + country +
        'Tipo de Documento: ' + doc, 'Numero de Documento: ' + docnum);


}


$(document).ready(function(){

    $('#cont1').click(validation);

});

$(document).ready(function(){

    addSumBlockPass();

});

