const drawBtn = document.getElementById("draw-btn");
const backBtn = document.getElementById("back-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const solutioneBtn = document.getElementById("solution-btn");
const card = document.getElementById("card");
const checkbox = document.getElementById("checkbox");


const file = document.getElementById("file");
const fileBtn = document.getElementById("fileBtn");
const displayTxt = document.getElementById("display-txt");
const displayFile = document.getElementById("display-file");
const correction = document.getElementById("solution");
const inputField = document.getElementById("input");

file.addEventListener("change", e => {
    let selectedFile = file.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        let data = event.target.result;
        let workbook = XLSX.read(data, {
            type: "binary"
        });
        workbook.SheetNames.forEach(sheet => {
            var flashcards = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
            );
            let i = 0;
            document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
            document.getElementById("translation").innerHTML = flashcards[i].translation;


            function displayNumber() {
                displayTxt.innerHTML = i + "/" + (flashcards.length - 1);
            }
            drawBtn.addEventListener("click", e => {
                console.log(i);
                if (i+1 === flashcards.length) {
                    i = 0;
                    document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                    document.getElementById("translation").innerHTML = flashcards[i].translation;
                }
                else {
                    i = i + 1;
                    document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                    document.getElementById("translation").innerHTML = flashcards[i].translation;
                    
                }
                displayNumber();
            })



            backBtn.addEventListener("click", e => {
                if (i === 0) {
                    i = flashcards.length - 1;
                    document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                    document.getElementById("translation").innerHTML = flashcards[i].translation;
                }

                else {
                    i = i - 1;
                    document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                    document.getElementById("translation").innerHTML = flashcards[i].translation;
                }
                displayNumber();
            })

            

            shuffleBtn.addEventListener("click", e => {
                for (let i = flashcards.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = flashcards[i];
                    flashcards[i] = flashcards[j];
                    flashcards[j] = temp;
                }
                i = 0;
                document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                document.getElementById("translation").innerHTML = flashcards[i].translation;
                displayNumber();     
            })
            function reset() {
                i = 0;
                document.getElementById("vocab").innerHTML = flashcards[i].vocabulary;
                document.getElementById("translation").innerHTML = flashcards[i].translation;
                displayNumber();
            }
            checkbox.addEventListener("click", e=> {

                if (checkbox.checked == true) {
                    inputField.classList.add("block");
                    drawBtn.classList.add("none");
                    backBtn.classList.add("none");
                }

                if (checkbox.checked == false) {
                    inputField.classList.remove("block");
                    drawBtn.classList.remove("none");
                    backBtn.classList.remove("none");
                }
                card.classList.remove("wrong");
                reset();
            })   

        });
    }
    reader.readAsBinaryString(selectedFile);
});

card.addEventListener("click", e => {
    if (checkbox.checked == false) {
        front.classList.toggle("none");
        back.classList.toggle("block");
        card.classList.toggle("tilt");
        back.classList.toggle("tilt");
    }
        
        
    })

let mistakeCounter = 0;
inputField.addEventListener("keyup", e => {
    card.classList.remove("wrong");
    input = "";
    if (event.keyCode === 13) {
        if (back.classList.contains("block")) {
        var whatIsAskedFor = document.getElementById("vocab").innerHTML;
    }

    else {
        var whatIsAskedFor = document.getElementById("translation").innerHTML;
    }

    console.log(whatIsAskedFor);
        let input = document.getElementById("input").value;
        if (input === whatIsAskedFor) {
            drawBtn.click();
            mistakeCounter = 0;
        }
        else {
            card.classList.add("wrong");
            mistakeCounter++;
        }
        inputField.value = ""
    }
    if (mistakeCounter >= 3) {
        correction.classList.toggle("block");
        inputField.classList.toggle("block");
        correction.innerHTML = "Korrekt: " + whatIsAskedFor;
        
        setTimeout(
            function() {
                drawBtn.click(); 
                correction.classList.toggle("block");
                inputField.classList.toggle("block");
                mistakeCounter = 0;
        }, 2000);
    }
})