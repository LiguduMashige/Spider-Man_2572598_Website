const text_area = document.getElementById("text-scroll");
const titles = [
    "Nerazzurri",
    "La Beneamata",
    "Internazionale Milan"
]
let current_index = 0;


setInterval(next_text, 2500);

function next_text(){
    current_index++;
    if(current_index >= titles.length){
        current_index = 0;
    }
    text_area.innerText = titles[current_index];
}