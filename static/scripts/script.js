$(document).ready(function(){

	$('.button').on('click', function(){
		next_slide('home', null);
	})

	$('.choiceopt').on('click', function(){
		var pos = $(this).position(), box = $(this).attr('box');
		$('.fc-slide[slide="' + box + '"]').append('<div class="choicebox" box="'+ box +'"></div>');
		$('.choicebox').css({
			left: pos.left,
			top: pos.top - 80
		});

		switch(box){
			case 'looking_for':
				$('.choicebox').append('<p box="'+box+'">networking</p><p box="'+box+'">skill building</p>');
				break;
			case 'networking':
				$('.choicebox').append('<p box="'+box+'">critique</p><p box="'+box+'">career advice</p><p box="'+box+'">coffee</p>');
				break;
			case 'skills':
				$('.choicebox').append('<p box="'+box+'">front-end development</p><p box="'+box+'">back end development</p><p box="'+box+'">product design</p><p box="'+box+'">editorial design</p>');
				break;
		}

		$('.choicebox p').on('click', function(){
			var sel = $(this).text(), box = $(this).attr('box');
			$('.fc-slide[slide="'+box+'"] a').text(sel);
			$('.fc-slide[slide="'+box+'"]').attr('opt', sel);
			$('.choicebox').remove();

			next_slide(box, sel);
		})

		
	})

	function next_slide(box, sel){
		switch(box){
			case 'looking_for':
				if (sel === 'networking'){
					$('.fc-slide[slide="'+box+'"]').animate({left:'4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="networking"]').animate({left:'25%'}, 500);
				}
				else {
					$('.fc-slide[slide="'+box+'"]').animate({left:'-4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="skills"]').animate({right:'25%'}, 500);
				}
				break;
			case 'home':
				$('.fc-slide[slide="home"]').animate({right:'4000px'}, 500, function(){$('.home').remove();});
				$('.fc-slide[slide="looking_for"]').animate({right:'25%'}, 500);
				break;
		}

	}
})