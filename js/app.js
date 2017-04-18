document.addEventListener('DOMContentLoaded', function() {
	const $jobRoleOther = $('#other-title');
	const $tShirtColors = $('#colors-js-puns');
	const $title = $('#title');
    const $color = $('#color');
	const $jsPunsColors = $color.find('.js-puns');
	const $heartJSColors = $color.find('.heart-js');
	const $design = $('#design');
    const $creditCard = $('#credit-card');
    const $paypal = $('#paypal');
    const $bitcoin = $('#bitcoin');
    const $paymentType = $('#payment');
    const $name = $('#name');
    const $email = $('#mail');
    const $registerButton = $('button[type=submit]');
    const $creditCardInput = $('#cc-num');
    const $zipCodeInput = $('#zip');
    const $cvvInput = $('#cvv');
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const zipCodeRegExp = /^\d{5}$/;
    const cvvRegExp = /^\d{3}$/;
    const creditCardRegExp = /^\d{13,16}$/;

    // BASIC INFO
	// Autofocus on the name text input on page load
    $name.focus();

	// 	JOB ROLE
	// When 'other' is selected from the dropdown menu, a new 'job role' text field is created

	$jobRoleOther.hide();
	$title.change(function() {
		if ($title.val() === 'other') {
			$jobRoleOther.show();
		} else {
			$jobRoleOther.hide();
		}
	});

	// T-SHIRT
	//Color label is hidden unless a design theme is selected
	
	$tShirtColors.hide();
    $design.change(function() {
		if ($design.val() === 'Select Theme') {
			$tShirtColors.hide();
		} else {
			$tShirtColors.show();
		}
	});

	// When a design theme is selected, the color options matching that theme are shown,
	// and the options not matching are hidden.

    $design.change(function() {
		const $designTheme = $design.val();

		for (let i = 0; i <= $design.children().length; i++) {
			if ($designTheme === 'js puns') {
				$heartJSColors.hide();
				$jsPunsColors.show();
                $color.val('');
			} else if ($designTheme === 'heart js') {
				$jsPunsColors.hide();
				$heartJSColors.show();
                $color.val('');
			}
		}
	});

	// When an activity checkbox is checked, the checkboxes for other activities
	// in the same time slow are disabled.

	$('.activities input').on('change', function() {
	    const $mainConference = $('input[name=all]');
	    const $jsFrameworks = $('input[name=js-frameworks]');
	    const $express = $('input[name=express]');
	    const $jsLibs = $('input[name=js-libs]');
	    const $node = $('input[name=node]');
	    const $buildTools = $('input[name=build-tools]');
	    const $npm = $('input[name=npm]');

		let mainConferenceCost = 0;
		let jsFrameworksCost = 0;
		let jsLibrariesCost = 0;
		let expressCost = 0;
		let nodeCost = 0;
		let buildToolsCost = 0;
		let npmCost = 0;
		let totalCost = 0;

		//Keep a running total of the total cost
		function getTotalCost() {
			totalCost = mainConferenceCost + jsFrameworksCost + jsLibrariesCost + expressCost + nodeCost + buildToolsCost + npmCost;
			return totalCost;
		}
		
		if ($mainConference.is(':checked')) {
			mainConferenceCost = 200;
		} else {
			mainConferenceCost = 0;
		}

		if ($jsFrameworks.is(':checked')) {
            $express.prop({
				disabled: true
			});
            $express.parent().addClass('disabled');
			jsFrameworksCost = 100;

		} else {
            $express.prop({
				disabled: false
			});
            $express.parent().removeClass('disabled');
			jsFrameworksCost = 0;
		}

		if ($express.is(':checked')) {
            $jsFrameworks.prop({
				disabled: true
			});
            $jsFrameworks.parent().addClass('disabled');
			expressCost = 100;
		} else {
			$jsFrameworks.prop({
				disabled: false
			});
            $jsFrameworks.parent().removeClass('disabled');
			expressCost = 0;
		}

		if ($jsLibs.is(':checked')) {
            $node.prop({
				disabled: true
			});
            $node.parent().addClass('disabled');
			jsLibrariesCost = 100;

		} else {
            $node.prop({
				disabled: false
			});
            $node.parent().removeClass('disabled');
			jsLibrariesCost = 0;
		}

		if ($node.is(':checked')) {
			$jsLibs.prop({
				disabled: true
			});
            $jsLibs.parent().addClass('disabled');
			nodeCost = 100;
		} else {
			$jsLibs.prop({
				disabled: false
			});
            $jsLibs.parent().removeClass('disabled');
			nodeCost = 0;
		}

		if ($buildTools.is(':checked')) {
			buildToolsCost = 100;
		} else {
			buildToolsCost = 0;
		}

		if ($npm.is(':checked')) {
			npmCost = 100;
		} else {
			npmCost = 0;
		}

		getTotalCost();
		$('#total-cost').html('Total: ' + '$' + totalCost);
	});

	//PAYMENT METHODS
	// Whichever payment method is selected, only the information about that payment method will display

	// By default, credit card is selected, and other method divs are hidden
    $paypal.hide();
    $bitcoin.hide();

    $paymentType.change(function () {

		const $paymentMethod = $paymentType.val();


		for (let i = 0; i <= $paymentType.children().length; i++) {
			if ($paymentMethod === 'credit card') {
                $paypal.hide();
                $bitcoin.hide();
                $creditCard.show();
			} else if ($paymentMethod === 'paypal') {
                $creditCard.hide();
                $bitcoin.hide();
                $paypal.show();
			} else if ($paymentMethod === 'bitcoin') {
                $creditCard.hide();
                $paypal.hide();
                $bitcoin.show();
			} else if ($paymentMethod === 'select_method') {
                $creditCard.hide();
                $paypal.hide();
                $bitcoin.hide();
			}
		}
	});

    // FORM VALIDATION

    // Inline form validation for name and email fields
    $name.keyup(function () {
        const isValidName = $name.val().length > 0;

        if (!isValidName) {
            $name.addClass('invalid');
        } else {
            $name.removeClass('invalid');
        }
    });

    $email.keyup(function () {
        const isValidEmail = $email.val().length > 0 && emailRegExp.test($email.val());

        if ($email.val().length === 0) {
            $('#no-email-error').show();
        } else if ($email.val().length > 0) {
            $('#no-email-error').hide();
        }

        if (!isValidEmail) {
            $email.addClass('invalid');
            $('#invalid-email-error').show();
        } else {
            $email.removeClass('invalid');
            $('#invalid-email-error').hide();

        }
    });

    $creditCardInput.keyup(function () {
        const $creditCardValue = $creditCardInput.val();
        const isValidCreditCard = $creditCardValue > 0 && creditCardRegExp.test($creditCardValue);

        if(!isValidCreditCard) {
            $creditCardInput.addClass('invalid');
            $('#invalid-cc-error').show();
        } else {
            $creditCardInput.removeClass('invalid');
            $('#invalid-cc-error').hide();

        }

    });

    $zipCodeInput.keyup(function () {
        const $zipCodeValue = $zipCodeInput.val();
        const isValidZipCode = $zipCodeValue.length > 0 && zipCodeRegExp.test($zipCodeValue);

        if(!isValidZipCode) {
            $zipCodeInput.addClass('invalid');
            $('#invalid-zip-error').show();
        } else {
            $zipCodeInput.removeClass('invalid');
            $('#invalid-zip-error').hide();

        }
    });

    $cvvInput.keyup(function () {
        const $cvvValue = $cvvInput.val();
        const isValidCVV = $cvvValue.length > 0 && cvvRegExp.test($cvvValue);

        if (!isValidCVV) {
            $cvvInput.addClass('invalid');
            $('#invalid-cvv-error').show();
        } else {
            $cvvInput.removeClass('invalid');
            $('#invalid-cvv-error').hide();

        }
    });


    // Form validation for Registration submit button
    $registerButton.on('click', function (e) {
        const $creditCardValue = $creditCardInput.val();
        const $zipCodeValue = $zipCodeInput.val();
        const $cvvValue = $cvvInput.val();
        const isValidName = $name.val().length > 0;
        const isValidEmail = $email.val().length > 0 && emailRegExp.test($email.val());
        const isValidCreditCard = $creditCardValue > 0 && creditCardRegExp.test($creditCardValue);
        const isValidZipCode = $zipCodeValue.length > 0 && zipCodeRegExp.test($zipCodeValue);
        const isValidCVV = $cvvValue.length > 0 && cvvRegExp.test($cvvValue);


        if (!isValidName) {
            $name.addClass('invalid');
            e.preventDefault();
        } else {
            $name.removeClass('invalid');
        }

        if ($email.val().length === 0) {
            $('#no-email-error').show();
        } else {
            $('#no-email-error').hide();
        }

        if (!isValidEmail) {
            $email.addClass('invalid');
            e.preventDefault();
        } else {
            $email.removeClass('invalid');
        }

        if($('input[type=checkbox]:checked').length === 0) {
            $('#activities-unchecked-error').show();
            e.preventDefault();
        } else {
            $('#activities-unchecked-error').hide();
        }

        if(!isValidCreditCard) {
            $creditCardInput.addClass('invalid');
            $('#invalid-cc-error').show();
            e.preventDefault();
        } else {
            $creditCardInput.removeClass('invalid');
            $('#invalid-cc-error').hide();
        }

        if(!isValidZipCode) {
            $zipCodeInput.addClass('invalid');
            $('#invalid-zip-error').show();
            e.preventDefault();
        } else {
            $zipCodeInput.removeClass('invalid');
            $('#invalid-zip-error').hide();
        }

        if (!isValidCVV) {
            $cvvInput.addClass('invalid');
            $('#invalid-cvv-error').show();
            e.preventDefault();
        } else {
            $cvvInput.removeClass('invalid');
            $('#invalid-cvv-error').hide();
        }

    });


});