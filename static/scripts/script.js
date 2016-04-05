var flowchart = {
	selection:'' 
}

$(document).ready(function(){

	$('.button').on('click', function(){
		next_slide('home', null);
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
				$('.choicebox').append('<p box="'+box+'">front-end development</p><p box="'+box+'">back end development</p><p box="'+box+'">product design</p><p box="'+box+'">editorial design</p>');
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
					$('.fc-slide[slide="'+box+'"]').animate({left:'4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="networking"]').animate({left:'25%'}, 500);
				}
				else {
					$('.fc-slide[slide="'+box+'"]').animate({left:'-4000px'}, 500, function(){$('.fc-slide[slide="'+box+'"]').remove();});
					$('.fc-slide[slide="skills"]').animate({right:'25%'}, 500);
				}
				break;
			case 'home':
				$('.home-slide[slide="home"]').animate({right:'4000px'}, 500, function(){$('.home-slide').remove();});
				$('.fc-slide[slide="looking_for"]').animate({right:'25%'}, 500);
				break;
		}
	}

	function goToResults(opts) {
		window.location = '/directory?filter=' + opts.type + '&sel=' + encodeURIComponent(opts.sel);
		// window.location.search = 
		// var url = '?filter=' + opts.type + '&sel=' + opts.sel;
		// var full_url = '/directory?' + encodeURI(url);
		// window.location.pathname = full_url;
	}

})