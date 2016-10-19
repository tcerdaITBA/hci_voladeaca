function initSearchbox(global){
	if(! global.$acUtils ){
		console.log("Err");
	}

	var $id_map = global.$acUtils.id_map;
	var soloIda = false;

	$("#datepicker1").datepicker({minDate: '+2D'});
	$("#datepicker2").datepicker({minDate: '+2D'});

	$("#datepicker1").keydown(function() {
		$( function(){$("#datepicker1").datepicker("hide") } );
  		return true;
		});

	$("#cal1").click( function() {
		$( function() { $("#datepicker1").datepicker("show") });
	});

	$("#cal2").click( function() {
		$( function() { $("#datepicker2").datepicker("show") });
	});

	$("#origen, #destino").on('focus', function(){
		var self = $(this);
		if(self.hasClass('inputerr')){
			self.val("");
			self.removeClass('inputerr')
			var errid = '#' + self.attr("id") + '-err';
			$(errid).fadeOut();
		}

	});

	$("#origen").on('blur', function(evt){
			isValidAirport(this);
	});

	$("#destino").on('blur', function(evt){
			isValidAirport(this);
	});


	jQuery(function($) {
	 // CLEARABLE INPUT
 	function tog(v){return v?'addClass':'removeClass';} 
  	$(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
  	}).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');   
 	 }).on('touchstart click', '.onX', function( ev ){
   	 ev.preventDefault();
   	 $(this).removeClass('x onX').val('').change();
   	});
	});

	var validators = {};

	validators["origen"] = isValidAirport;
	validators["destino"] = isValidAirport;

	function isValidAirport(textbox, emptyCheck){
		textbox = $(textbox);

		textbox.removeClass('inputerr');

		var errid = "#" + textbox.attr("id") + "-err";
		var error = $(errid);

		error.fadeOut();

		if(textbox.val()){
			if(!$id_map[textbox.val()]){
				textbox.addClass('inputerr');
				error.text("Por favor ingrese algo valido");
				textbox.addClass('x');
				error.fadeIn();
				return false;
			}
			else{
				return true;
			}
		}
		else if(emptyCheck){
			textbox.addClass('inputerr');
			error.text("Esto no puede quedar vacío");
			error.fadeIn();
			return false;
		}
		return true;
	}


	function dateCheck(emptyCheck){
		var valid = true;

		var date1 = $("#datepicker1");
		var date2 = $("#datepicker2");

		date1.removeClass("inputerr");
		date2.removeClass("inputerr");

		$("#datepicker1-err").fadeOut();
		$("#datepicker2-err").fadeOut();

		var departure, arrival;

		if(date1.val() || emptyCheck){
			departure = moment(date1.val(), "DD/MM/YYYY", true);
			if(!departure.isValid()){
				date1.addClass('inputerr');
				valid = false;

				$("#datepicker1-err").text("Ingrese una fecha valida");
				$("#datepicker1-err").fadeIn();
			}

		}

		if(!soloIda && (date2.val() || emptyCheck)) {
			arrival = moment(date2.val(), "DD/MM/YYYY", true);
			if(!arrival.isValid()){
				date2.addClass("inputerr");
				valid = false;
				$("#datepicker2-err").text("Ingrese una fecha valida");
				$("#datepicker2-err").fadeIn();
			}
		}

		if(valid && departure && (soloIda || arrival)){
			//Si ambas estan definidas y bien formadas
			//chequeo que no sean incompatibles.

			var now = moment();
			now.add(2,'days');
			console.log(now);
			if(now.isAfter(departure)){
				date1.addClass('inputerr');
				$("#datepicker1-err").text("Debe ser por lo menos dos días desde ahora");
				$("#datepicker1-err").fadeIn();

			}
			if(!soloIda && departure.isAfter(arrival)){
				ret = false
				date1.addClass('inputerr');
				date2.addClass('inputerr');

				$("#datepicker1-err").text("La ida debe ser antes que la vuelta");
				$("#datepicker1-err").fadeIn();
			}
		}

		return valid;
	}

	global.validateInput = function(target){
		var id = ($(target).attr("id"));
		validators[id] && validators[id](target);
	}

	global.setOneWay = function() {
		var pickerVuelta = $("#date-col-2");
		pickerVuelta.addClass("disabled-dp");
		pickerVuelta.find("input").prop('disabled', true);
		soloIda = true;
	}

	global.setRoundWay = function() {
		var pickerVuelta = $("#date-col-2");
		pickerVuelta.removeClass("disabled-dp");
		pickerVuelta.find("input").prop('disabled', false);
		soloIda = false;
	}

	$("#date-col-2").removeClass("disabled-dp");
	$(".idavuelta button").on("click", function() {
		$(".idavuelta button").removeClass("selected-iv");
		$(this).addClass("selected-iv");

		if ($(this).data("info") == "ida") {
			global.setOneWay();
			$("#datepicker2").val("");
		}
		else
			global.setRoundWay();

	})

	$("#searchButton").on('click', function(obj){

		var checker = isValidAirport($("#origen"), true);

		checker =  isValidAirport($("#destino"), true) & checker;

		checker = dateCheck(true) & checker;

		if(checker){
			var iDate = moment($("#datepicker1").val(), "DD/MM/YYYY").format("YYYY-MM-DD");

			if(!soloIda){
				var vDate = moment($("#datepicker2").val(), "DD/MM/YYYY").format("YYYY-MM-DD");
			}
			var uri = 'search3.html?';
			uri += 'orig=' + $id_map[$("#origen").val()];
			uri += '&dest=' + $id_map[$("#destino").val()];
			uri += '&date=' + iDate;
			uri += (soloIda ? "" : '&vdate=' + vDate);
			uri += '&adults=' + window.passengers.adults;
			uri += '&children=' + window.passengers.children;
			uri += '&infants=' + window.passengers.infants;
			window.location.href = uri;
		}
	})

};
