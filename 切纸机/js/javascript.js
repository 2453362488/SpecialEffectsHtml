$(document).ready(function() {

	$('.shred-me').click(function() {
		$('.shredded-paper').addClass('animate-shredded-paper');
		$('.shredded-paper > .content').addClass('animate-content');
		$('.shredder-holder').addClass('shredded-holder-animate');
		
		$('.shredded-paper .part-1, .shredded-paper .part-2, .shredded-paper .part-4, .shredded-paper .part-6, .shredded-paper .part-8, .shredded-paper .part-10').addClass('shredded-paper-p-animate');
		
		$('.shredded-paper .part-3, .shredded-paper .part-5, .shredded-paper .part-7, .shredded-paper .part-9').addClass('shredded-paper-q-animate');
		
		setTimeout(function() {
		
			$('.shredded-paper').css({'top' : '-300px'});
	
			$('.shredded-paper').removeClass('animate-shredded-paper');
			$('.shredded-paper > .content').removeClass('animate-content');
			$('.shredder-holder').removeClass('shredded-holder-animate');
			
			$('.shredded-paper .part-1, .shredded-paper .part-2, .shredded-paper .part-4, .shredded-paper .part-6, .shredded-paper .part-8, .shredded-paper .part-10').removeClass('shredded-paper-p-animate');
			
			$('.shredded-paper .part-3, .shredded-paper .part-5, .shredded-paper .part-7, .shredded-paper .part-9').removeClass('shredded-paper-q-animate');
			
			$('.shredded-paper').animate({'top' : '20px'});
			
		}, 4000);
	});
});
