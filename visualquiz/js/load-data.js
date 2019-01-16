
const logos = [
	{
		image: `ADT_Blue.jpg`,
		options: [
			{ name: 'Police Station', correct: false },
			{ name: 'Stop Sign', correct: false },
			{ name: 'ADT', correct: true },
			{ name: 'KK suggestion', correct: false }
		]
	},
	{
		image: `ADT_House.jpg`,
		options: [
			{ name: 'Police Station', correct: false },
			{ name: 'Stop Sign', correct: false },
			{ name: 'ADT', correct: true },
			{ name: 'KK suggestion', correct: false },
		]
	},
	{
		image: `Arm_Hamer.jpg`,
		options: [
			{ name: 'Tide', correct: false },
			{ name: 'Arm & Hammer', correct: true },
			{ name: '24 Hour Fitness', correct: false },
			{ name: 'Bechtel Construction', correct: false },
		]
	},
	{
		image: `BestBuy.jpg`,
		options: [
			{ name: 'StubHub', correct: false },
			{ name: 'Best Buy', correct: true },
			{ name: 'K-Mart', correct: false },
			{ name: 'Sears', correct: false },
		]
	},
	{
		image: `BK.png`,
		options: [
			{ name: 'Red Robin', correct: false },
			{ name: 'Burger King', correct: true },
			{ name: 'Chipotle', correct: false },
			{ name: 'Chick-fil-A', correct: false },
		]
	},

// `BP.png`
// `Hardees.png`
// `IKEA.jpg`
// `JohnDeere.png`
// `Levis.jpg`
// `PizzaHut.png`
// `Red Bull.png`
// `Snickers.jpg`
// `SteakNShake.png`
// `UPS.png`

]
const itemTemplate = `
<div class="carousel-item" style="background-image: url('{{image}}')">
	<div class="carousel-caption">
		<h3>What Does This Logo Mean?</h3>
		<ul class="answer-options">
			{{#each options}}
			<li><button data-correct={{correct}} type="button" class="btn btn-primary">{{name}}</button></li>
			{{/each}}
		</ul>
	</div>
</div>
`

let score = {
	nWrongGuesses: 0,
	nTotalGuesses: 0
}

const showResultModal = (result) => {
	// var source = document.getElementById("result-template").innerHTML;
	// var template = Handlebars.compile(source);
	// console.log('result', result)
	score.nTotalGuesses += 1
	if (!result.correct) {
		score.nWrongGuesses += 1
		$('#result-modal-title').text('Oops!')
		$('#result-modal .modal-body').html(`
			${result.name}: <strong>Nope, try again!</strong>
			<p>Score so far: ${((score.nTotalGuesses - score.nWrongGuesses) / score.nTotalGuesses * 100).toFixed(0)}%!</p>
		`)
		$('#result-modal .modal-footer').html(`
			<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
		`)
	}
	else {
		$('#result-modal-title').text('Good Work!')
		$('#result-modal .modal-body').html(`
			<strong>That's Right! ${result.name}!</strong>
			<p>Score so far: ${((score.nTotalGuesses - score.nWrongGuesses) / score.nTotalGuesses * 100).toFixed(0)}%!</p>
		`)
		$('#result-modal .modal-footer').html(`
			<button type="button" class="btn btn-primary" data-dismiss="modal">Next</button>
		`)
		$('#result-modal .modal-footer button').on('click', () => $('#logo-carousel').carousel('next'))
	}
	$('#result-modal').modal('show')
}

$(document).ready(() => {

	var template = Handlebars.compile(itemTemplate);
	logos.forEach((logo, logoIndex) => {
		logo.image = `./logos/${logo.image}`
		$('#logo-carousel .carousel-indicators').append(`<li data-target="#logo-carousel" data-slide-to="${logoIndex}"></li>`)
		$('#logo-carousel .carousel-inner').append(template(logo))
		$(`#logo-carousel .carousel-inner .carousel-item:eq(${logoIndex}) button`).each((buttonIndex, button) => {
			$(button).on('click', function(event) {
				showResultModal(logos[logoIndex].options[buttonIndex])
			})
		})
	})
	
	$('#logo-carousel .carousel-inner .carousel-item:eq(0)').addClass('active')
	$('#logo-carousel .carousel-indicators li:eq(0)').addClass('active')
})