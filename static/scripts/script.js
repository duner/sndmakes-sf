var flowchart = {
	selection:'' 
}

$(document).ready(function(){

	$('.button').on('click', function(){
		next_slide('home', null);
	})

	$('.small_button').on('click', function(){
		var box = $(this).attr('box');
		next_slide(box, null);

	})

	$('.choiceopt').on('click', function(){
		var pos = $(this).position(), box = $(this).attr('box');
		$('.fc-slide[slide="' + box + '"]').append('<div class="choicebox" box="'+ box +'"></div>');
		$('.choicebox').css({
			left: pos.left - 20,
			top: pos.top - 110
		});

		switch(box){
			case 'looking_for':
				$('.choicebox').append('<p box="'+box+'">networking</p><p box="'+box+'">skill building</p>');
				break;
			case 'networking':
				$('.choicebox').append('<p box="'+box+'">critique</p><p box="'+box+'">career advice</p><p box="'+box+'">coffee</p>');
				break;
			case 'skills':
				$('.choicebox').append('<p box="'+box+'">front end development</p><p box="'+box+'">back end development</p><p box="'+box+'">product design</p><p box="'+box+'">editorial design</p>');
				break;
		}

		$('.choicebox p').on('click', function(){
			var sel = $(this).text(), box = $(this).attr('box');
			$('.fc-slide[slide="'+box+'"] a').text(sel);
			$('.fc-slide[slide="'+box+'"]').attr('opt', sel);
			$('.choicebox').remove();

			if (box === 'networking'){
				goToResults({
					'type': 'networking',
					'sel': sel
				});
			} else if (box == 'skills') {
				goToResults({
					'type': 'skills',
					'sel': sel
				});
			} else {
				next_slide(box, sel);
			}
		});
	});

	function next_slide(box, sel){
		switch(box){
			case 'looking_for':
				if (sel === 'networking'){
					$('.fc-slide[slide="'+box+'"]').animate({left:'-4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="networking"]').animate({left:'10%'}, 500);
				}
				else {
					$('.fc-slide[slide="'+box+'"]').animate({left:'-4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="skills"]').animate({right:'10%'}, 500);
				}
				break;
			case 'home':
				$('.home-slide[slide="home"]').animate({right:'4000px'}, 500, function(){$('.home-slide').remove();});
				$('.fc-slide[slide="info1"]').animate({right:'10%'}, 500);
				break;
			case 'info1':
				$('.fc-slide[slide="info1"]').animate({right:'4000px'}, 500, function(){$('.fc-slide[slide="info1"]').remove();});
				$('.fc-slide[slide="looking_for"]').animate({right:'10%'}, 500);
				break;

		}
	}

	function goToResults(opts) {
		var sel = '';
 		switch (opts.sel) {
 			case 'front end development': sel = 'front_end'; break;
 			case 'back end development': sel = 'back_end'; break;
 			case 'product design': sel = 'product'; break;
 			case 'editorial design': sel = 'editorial'; break;
 			case 'coffee': sel = 'coffee'; break;
 			case 'career advice': sel = 'career_advice'; break;
 			case 'critique': sel = 'critique'; break;
 		}
 		window.location = '/directory?filter=' + opts.type + '&sel=' + sel + '&fullsel=' + encodeURIComponent(opts.sel);
	}

})