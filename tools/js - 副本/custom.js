/*-----------------------------------------------------------------------------------*/
/*	Document ready stuff
/*-----------------------------------------------------------------------------------*/

var progressInterval;
var progressOldValue;
$(document).ready(function() {
	
	function getProgress(){
		var progressDate = new Date(parseDate($('#progress .progress').data('progress')));
		var countdownDate = new Date(parseDate($('#countdown').data('date')));
		var nowDate = new Date();
//		var countdownDate = new Date(date.getTime()+15000);
		return (nowDate.getTime() - progressDate.getTime())/(countdownDate.getTime() - progressDate.getTime());
	}
	
	function getFormatProgress(progress){
		return ((progress * 100) + "").split(".")[0] + "%";
	}
	function parseDate(input) {
		var parts = input.match(/(\d+)/g);
		return new Date(parts[0], parts[1]-1, parts[2]);
	}

	$('#countdown').countdown({
		layout:	'<div class="span3 counter-block"><span id="days-num">{dn}</span><h4 id="days-desc">{dl}</h4></div>' +
				'<div class="span3 counter-block"><span id="hours-num">{hn}</span><h4 id="hours-desc">{hl}</h4></div>' +
				'<div class="span3 counter-block"><span id="min-num">{mn}</span><h4 id="min-desc">{ml}</h4></div>' +
				'<div class="span3 counter-block"><span id="sec-num">{sn}</span><h4 id="sec-desc">{sl}</h4></div>',
		until: new Date(parseDate($('#countdown').data('date'))),
		tickInterval:1
	});
	
	$("#countdown").parent().click(function(){
//		$('#countdown').toggle()
//		$('#progress').toggle();
		var countdown = $('#countdown').is(":visible");//可见的
		if(countdown){
			$('#countdown').hide();
			$('#progress').show();
			clearInterval(progressInterval);
			animateProgressInit();
		}else{
			$('#countdown').show();
			$('#progress').hide();
			$('.progress').stop().css("width","0%").children('span').text("");
		}
	});
	
	function progress(){
		progressInterval = setInterval(function(){
			var progressValue = getProgress();
			if(progressValue < 1){
				progressValue = getFormatProgress(progressValue);
				if($('#progress').is(":visible") && progressOldValue != progressValue){
					$('.progress').stop().animate({
						width: progressValue
					},1000);
				}
			}else{
				$("#wrap1").hide();
				$("#page").show();
			}
		}, 1000);
	}
	
	function animateProgressInit(){
		var progressValue = getFormatProgress(getProgress());
		progressOldValue = progressValue;
		$('.progress').delay(500).animate({
			width: progressValue
		}, 2000, 'easeInOutQuart', function() {
			$(this).children('span').text(progressValue).fadeIn('fast');
			progress();
		});
	}
	
	//入口
	if(getProgress() < 1){
		$("#wrap1").show();
		progress();
	}else{
		$("#page").show();
	}
});

$('#subscribe').submit(function() {
	$.ajax({
		url: 'inc/newsletter.php',
		data: 'ajax=true&email=' + escape($('#email').val()),
		success: function(data) {
			var data = jQuery.parseJSON(data);
			if (data.success == 1) {
				alertMessage(data.message, 'success');
				$('#subscribe-submit').addClass('btn-green').val($('#subscribe-submit').data('done'));
			}
			else {
				alertMessage(data.message, 'error');
			}
		}
	});
	return false;
});

function alertMessage(message, type) {
	$bar = $('#alertbar');
	if ($bar.length) {
		$bar.animate({
			top: '-45px'
		}, 150, 'easeOutQuad', function() {
			$bar.removeAttr('class').addClass(type).find('.message').html(message);
			$bar.animate({
				top: 0
			}, 500, 'easeOutBounce')
		});
	}
	else {
		$('body').prepend('<div id="alertbar" class="' + type + '"><span class="message">' + message + '</span><span class="close">&times;</span></div>');
		$('#alertbar').show().animate({
			top: 0
		}, 500, 'easeOutBounce');
	}
}

$('body').on('click', '.close', function() {
	$(this).closest('#alertbar').animate({
		top: '-45px'
	}, 500, 'easeOutExpo', function() {
		$(this).remove();
	});
});