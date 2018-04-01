const heart = document.querySelectorAll(".hearts li");
const restart = document.querySelector(".fa-redo-alt"); 
const deck = document.querySelector(".deck");
const cards = document.querySelectorAll("li.card")
let counter = 0;

deck.addEventListener("click", function(e) {
	if(e.target.className === "card") {
		e.target.style.fontSize = "30px";		
		e.target.style.color = "#000";		
		e.target.style.backgroundColor = "aqua";
		}
});

