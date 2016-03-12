
$(function() {
	

	var expEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		expLettersOnly = /^[a-zA-Z\s]+$/,
		expPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	
	document.getElementById("reset").onclick = function() {
		var answer = confirm("Are you sure you want to reset all text?");
	    if(answer){
	    	resetValidation();
	    }
	};

	function validateLength(fieldValue, minLength) {
		return( $.trim( fieldValue ).length > minLength );
	}

	$("#form").on( "keyup", "input", function() {
		validateField($(this));
	});

	$("#form" ).on( "keyup", "textarea", function() {
		var area = $(this),
			value = area.val();

		area.removeClass("invalid");
		area.removeClass("valid");
		if(value.length > 0) {
			area.addClass("valid");
			updateLabel(area.attr("id"), "valid");
		}
	});

	function validateField(field) {
		var value = field.val();

		if(value.length > 0) {
			switch( field.attr("id")) {
				case "role":
				case "goal":
				case "organization":
				case "last-name":
				case "first-name":
					validateFiledValue(expLettersOnly,value, field);				
					break;

				case "email":
					validateFiledValue(expEmail,value, field);
					break;

				case "country":
				case "code":
				case "number":
					validatePhone();
				break;
			}
		}	
	}

	function validateFiledValue(exp, value, field){
		if(!exp.test( value)) {
			field.removeClass("valid");
			field.addClass("invalid");
			updateLabel(field.attr("id"), "invalid");
		} else {
			field.removeClass("invalid");
			field.addClass("valid");
			updateLabel(field.attr("id"), "valid");
		}
	}

	function validatePhone(){
		var phonegroup = document.getElementById('phone-group'), 
			country =  $(document.getElementById('country')).val(),
		 	code =  $(document.getElementById('code')).val(),
		 	number = $(document.getElementById('number')).val();
		
		var phone = (country.concat(code)).concat(number);
		if(!expPhone.test(phone)){
			$(phonegroup).addClass("invalid");
			$(phonegroup).removeClass("valid");
		} else {
			$(phonegroup).removeClass("invalid");
			$(phonegroup).addClass("valid");
		}	
	}

	function updateLabel(fieldID, className) {
		var labels = document.getElementsByTagName('LABEL');
		for (var i = 0; i < labels.length; i++) {
		    if (labels[i].htmlFor != '') {
		         if (labels[i].htmlFor === fieldID){
		         	$(labels[i]).removeClass("valid");
		         	$(labels[i]).removeClass("invalid");
		         	$(labels[i]).addClass(className);
		         }   				
		    }
		}
	}

	function resetValidation(){
		var elements = Array.prototype.slice.call(document.getElementsByTagName('LABEL'));
		elements = elements.concat(Array.prototype.slice.call(document.getElementsByTagName('INPUT')));
		elements = elements.concat(Array.prototype.slice.call(document.getElementsByTagName('TEXTAREA')));
		elements.push(document.getElementById('phone-group'));
		elements.forEach(function(entry){
			$(entry).removeClass("valid");
         	$(entry).removeClass("invalid");
         	$(entry).blur();
		});
	}
});