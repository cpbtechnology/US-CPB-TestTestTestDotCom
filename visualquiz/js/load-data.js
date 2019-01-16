
const logos = [
	{
		image: `ADT.jpg`,
		options: [
			{ name: 'Police Station', correct: false },
			{ name: 'Stop Sign', correct: false },
			{ name: 'ADT', correct: true },
			{ name: 'Ring Security', correct: false }
		]
	},
	{
		image: `Arm&Hammer.jpg`,
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
		image: `BK.jpg`,
		options: [
			{ name: 'Red Robin', correct: false },
			{ name: 'Burger King', correct: true },
			{ name: 'Chipotle', correct: false },
			{ name: 'Chick-fil-A', correct: false },
		]
	},
	{
		image: `BP.jpg`,
		options: [
			{ name: 'Exxon', correct: false },
			{ name: 'Shell', correct: false },
			{ name: 'BP', correct: true },
			{ name: 'Deloitte', correct: false },
		]
	},
	{
		image: `Hardees.jpg`,
		options: [
			{ name: `Hardee's`, correct: true },
			{ name: 'Starbucks', correct: false },
			{ name: 'Yelp', correct: false },
			{ name: 'Johnny Rockets', correct: false },
		]
	},
	{
		image: `ADT_House.jpg`,
		options: [
			{ name: 'Police Station', correct: false },
			{ name: 'Stop Sign', correct: false },
			{ name: 'ADT', correct: true },
			{ name: 'Ring Security', correct: false },
		]
	},
	{
		image: `IKEA.jpg`,
		options: [
			{ name: 'Pfizer', correct: false },
			{ name: 'Walmart', correct: false },
			{ name: 'Ikea', correct: true },
			{ name: 'Tylenol', correct: false },
		]
	},
	{
		image: `JohnDeere.jpg`,
		options: [
			{ name: 'Browning Hunting', correct: false },
			{ name: 'Caterpillar', correct: false },
			{ name: 'Milwaukee Bucks', correct: false },
			{ name: 'John Deere', correct: true },
		]
	},
	{
		image: `Levis.jpg`,
		options: [
			{ name: 'Levis', correct: true },
			{ name: 'Wrangler', correct: false },
			{ name: 'JNCO', correct: false },
			{ name: 'Red Robin', correct: false },
		]
	},
	{
		image: `PizzaHut.jpg`,
		options: [
			{ name: 'Five Guys', correct: false },
			{ name: 'Red Roof Inn', correct: false },
			{ name: 'Pizza Hut', correct: true },
			{ name: 'Village Inn', correct: false },
		]
	},
	{
		image: `RedBull.jpg`,
		options: [
			{ name: 'Monster', correct: false },
			{ name: 'Red Bull', correct: true },
			{ name: '5 Hour Energy', correct: false },
			{ name: 'Chicago Bulls', correct: false },
		]
	},
	{
		image: `Snickers.jpg`,
		options: [
			{ name: 'Snickers', correct: true },
			{ name: 'Crunch', correct: false },
			{ name: 'Baby Ruth', correct: false },
			{ name: 'Butterfinger', correct: false },
		]
	},
	{
		image: `SteakNShake.jpg`,
		options: [
			{ name: 'Whataburger', correct: false },
			{ name: 'Taco Bell', correct: false },
			{ name: `Steak'n'Shake`, correct: true },
			{ name: 'Panda Express', correct: false },
		]
	},
	{
		image: `UPS.jpg`,
		options: [
			{ name: 'Amazon', correct: false },
			{ name: 'UPS', correct: true },
			{ name: `FedEx`, correct: false },
			{ name: 'DHL', correct: false },
		]
	}
]
const itemTemplate = `
<div class="carousel-item" style="background-image: url('{{image}}')">
	<div class="carousel-caption">
		<h3> </h3>
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
			${result.name}? <strong>Nope, try again!</strong>
			<p>Score so far: ${((score.nTotalGuesses - score.nWrongGuesses) / score.nTotalGuesses * 100).toFixed(0)}%!</p>
		`)
		$('#result-modal .modal-footer').html(`
			<button type="button" class="btn btn-primary" data-dismiss="modal">Darn!</button>
		`)
		$('#result-modal .modal-footer button').on('click', () => $('#logo-carousel').carousel('next'))
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