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
    const $activities = $('.activities');
    const $registerButton = $('button[type=submit]');
    const $creditCardInput = $('#cc-num');
    const $zipCode = $('#zip');
    const $cvv = $('#cvv');
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

        if (!isValidEmail) {
            $email.addClass('invalid');
        } else {
            $email.removeClass('invalid');
        }
    });

    $creditCardInput.keyup(function () {
        const isValidCreditCard = $creditCardInput.val().length >= 13 && $creditCardInput.val().length <= 16;

        if(!isValidCreditCard) {
            $creditCardInput.addClass('invalid');
        } else {
            $creditCardInput.removeClass('invalid');
        }

    });

    $zipCode.keyup(function () {
        const isValidZipCode = $zipCode.val().length === 5;

        if(!isValidZipCode) {
            $zipCode.addClass('invalid');
        } else {
            $zipCode.removeClass('invalid');
        }
    });

    $cvv.keyup(function () {
        const isValidCVV = $cvv.val().length === 3;

        if (!isValidCVV) {
            $cvv.addClass('invalid');
        } else {
            $cvv.removeClass('invalid');
        }
    });

    // Form validation for Registration submit button
    $registerButton.on('click', function (e) {

        e.preventDefault();

        const isValidName = $name.val().length > 0;
        const isValidEmail = $email.val().length > 0 && emailRegExp.test($email.val());
        const isValidCreditCard = $creditCardInput.val().length >= 13 && $creditCardInput.val().length <= 16;
        const isValidZipCode = $zipCode.val().length === 5;
        const isValidCVV = $cvv.val().length === 3;


        if (!isValidName) {
            $name.addClass('invalid');
            e.preventDefault();
        } else {
            $name.removeClass('invalid');
        }

        if (!isValidEmail) {
            $email.addClass('invalid');
            e.preventDefault();
        } else {
            $email.removeClass('invalid');
        }

        if($('input[type=checkbox]:checked').length === 0) {
            $activities.append('<div class="activities-unchecked-error">Please select at least one activity.</div>');
            e.preventDefault();
        } else {
            $('.activities-unchecked-error').remove();
        }

        if(!isValidCreditCard) {
            $creditCardInput.addClass('invalid');
            e.preventDefault();
        } else {
            $creditCardInput.removeClass('invalid');
        }

        if(!isValidZipCode) {
            $zipCode.addClass('invalid');
            e.preventDefault();
        } else {
            $zipCode.removeClass('invalid');
        }

        if (!isValidCVV) {
            $cvv.addClass('invalid');
            e.preventDefault();
        } else {
            $cvv.removeClass('invalid');
        }

    });


});