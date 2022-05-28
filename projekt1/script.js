//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// START OF SCRIPT FILE :D //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////
// GLOBALA VARIABLER //
///////////////////////

let validFirstName;
let validLastName;
let validAmount;
let validRent;
let finalAmount;
let firstName;
let lastName;
let rentValue;

/////////////////////////////////////
///KÖRS NÄR MAN TRYCKER PÅ SUBMIT ///
/////////////////////////////////////

function handleForm() {
    handleUserDetails();
    moneyHandler();
    calc();

    // Göm formuläret och visa fylda formuläret VVVV
    // Checkar om alla fält är fyllda korrekt
    if (validFirstName === true && validLastName === true && validAmount === true && validRent === true) {
        console.log("FORM VALID");
        hideForm();
        document.querySelector("#errorOther").style.display = "none";
        displayResults();
        hacked();
    } else {
        console.log("FORM INVALID");
        document.querySelector("#errorOther").style.display = "block";
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 1 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function handleUserDetails() {
    firstName = document.form.firstName.value;
    lastName = document.form.lastName.value;
    console.log("Förnamn: " + firstName);
    console.log("Efternamn: " + lastName);
}

// Checkar om förnamnet är skriven med stor bokstav i början (Uppg 1)
function checkFirstName(event) {
    if (event.target.value.length > 0 && event.target.value.charAt(0) !== event.target.value.charAt(0).toUpperCase()) {
        console.log("FIRST LETTER OF FIRSTNAME IS LOWERCASE!");
        document.form.firstName.style.color = "red";
        document.querySelector("#errorFirstName").style.display = "block";
        validFirstName = false;
    }
    if (event.target.value && event.target.value.charAt(0) === event.target.value.charAt(0).toUpperCase()) {
        document.form.firstName.style.color = "black";
        document.querySelector("#errorFirstName").style.display = "none";
        validFirstName = true;
    }
}

// Checkar om efternamnet är skrivet med stor bokstav i början (Uppg 1)
function checkLastName(event) {
    if (event.target.value && event.target.value.charAt(0) !== event.target.value.charAt(0).toUpperCase()) {
        console.log("FIRST LETTER OF LASTNAME IS LOWERCASE!");
        document.form.lastName.style.color = "red";
        document.querySelector("#errorLastName").style.display = "block";
        validLastName = false;
    }
    if (event.target.value && event.target.value.charAt(0) === event.target.value.charAt(0).toUpperCase()) {
        document.form.lastName.style.color = "black";
        document.querySelector("#errorLastName").style.display = "none";
        validLastName = true;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 2 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function moneyHandler() {
    let amount = document.form.amount.value;
    amount = amount.replace(",", "."); // Ersätter kommatecken med punkt
    amount = amount.replace(" ", "");
    amount = (Math.floor(amount * 20) / 20).toFixed(2);
    finalAmount = amount;
    console.log(finalAmount);

}

function moneyChecker(event) {
    amount = event.target.value.replace(",", "."); // Ersätter kommatecken med punkt
    amount = amount.replace(" ", "");

    if (event.target.value && Math.sign(amount) !== 1 || isNaN(amount)) {
        console.log("negativt");
        console.log(isNaN(event.target.value));
        document.form.amount.style.color = "red";
        document.querySelector("#errorAmount").style.display = "block";
        validAmount = false;
    }
    if (event.target.value && Math.sign(amount) === 1) {
        console.log("negativt");
        console.log(isNaN(event.target.value));
        document.form.amount.style.color = "black";
        document.querySelector("#errorAmount").style.display = "none";
        validAmount = true
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 3 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function calc() {

    if (document.form.amount.value && document.form.rent.value && document.form.payLength.value !== null) {
        let payLength = document.form.payLength.value;
        let rent = document.form.rent.value / 1200;
        let monthlyPayment = amount * rent / (1 - (Math.pow(1 / (1 + rent), payLength * 12)))
        let total = monthlyPayment * payLength * 12;
        total = (Math.floor(total * 20) / 20).toFixed(2);
        monthlyPayment = (Math.floor(monthlyPayment * 20) / 20).toFixed(2);

        console.log(monthlyPayment);
        console.log(total);


        document.getElementById("total").innerHTML = "Totalbelopp: " + total + "€<br>" + "Månadsbelopp: " + monthlyPayment + "€";
    }
}


function rentChecker(event) {

    rentValue = event.target.value;

    if (Math.sign(rentValue) === -1 || isNaN(rentValue) || rentValue > 100) {
        console.log(isNaN(event.target.value));
        document.form.rent.style.color = "red";
        document.querySelector("#errorRent").style.display = "block";
        validRent = false;
    }
    if (rentValue <= 100 && Math.sign(rentValue) === 1) {
        console.log(isNaN(event.target.value));
        document.form.rent.style.color = "black";
        document.querySelector("#errorRent").style.display = "none";
        validRent = true;
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 4 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function dateCalc() {
    let days = document.dateCalc.amountDays.value;
    let payDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    let weekDay = payDate.getDay();

    console.log(weekDay)

    if (weekDay == 6) {
        payDate.setDate(payDate.getDate() + 2);
    }
    if (weekDay == 0) {
        payDate.setDate(payDate.getDate() + 1);
    }

    let day;

    if (payDate.getDay() == 1) day = "Måndag";
    if (payDate.getDay() == 2) day = "Tisdag";
    if (payDate.getDay() == 3) day = "Onsdag";
    if (payDate.getDay() == 4) day = "Torsdag";
    if (payDate.getDay() == 5) day = "Fredag";

    document.getElementById("dateResult").innerHTML = day + " " + payDate.getDate() + "." + (payDate.getMonth() + 1) + "." + payDate.getFullYear();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 5 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function referenceNumberGenerator() {
    let base = document.referenceNumberGen.numberInput.value;
    let splitBase = base.split("");
    let reverseBase = splitBase.reverse();
    let multiplier;
    let count = 0;

    if (document.referenceNumberGen.numberInput.value.split("")[0] == 0) console.log("DJFLASJD");

    // Fungerade inte med "splitBase[0] != 0" för någon orsak ¯\_(ツ)_/¯ -> VVVVV
    if (base.length >= 3 && base.length <= 19 && document.referenceNumberGen.numberInput.value.split("")[0] != 0) {

        // Väldigt klumpigt programerat men fungerande

        for (i = 0; i < base.length; i++) {
            if (i === 0) multiplier = 7;
            if (i === 1) multiplier = 3;
            if (i === 2) multiplier = 1;
            if (i === 3) multiplier = 7;
            if (i === 4) multiplier = 3;
            if (i === 5) multiplier = 1;
            if (i === 6) multiplier = 7;
            if (i === 7) multiplier = 3;
            if (i === 8) multiplier = 1;
            if (i === 9) multiplier = 7;
            if (i === 10) multiplier = 3;
            if (i === 11) multiplier = 1;
            if (i === 12) multiplier = 7;
            if (i === 13) multiplier = 3;
            if (i === 14) multiplier = 1;
            if (i === 15) multiplier = 7;
            if (i === 16) multiplier = 3;
            if (i === 17) multiplier = 1;
            if (i === 18) multiplier = 7;
            if (i === 19) multiplier = 3;
            console.log("multiplier: " + multiplier)


            let multiplied = reverseBase[i] * multiplier;
            count = parseInt(multiplied) + count;
        }


        roundedUp = Math.ceil(count / 10) * 10;
        console.log(roundedUp)

        checkNumber = roundedUp - count;


        let referenceNumber = base + checkNumber;
        console.log(referenceNumber);

        document.getElementById("generatedNumber").innerHTML = "Genererade referensnummern är: " + referenceNumber;

    } else {
        document.getElementById("generatedNumber").innerHTML = "Invalid inmatning";
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 6 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hideForm() {
    document.querySelector("form").style.display = "none";
    document.querySelector("#submit").style.display = "none";
}

function displayResults() {
    document.getElementById("formP").innerHTML += "Namn: " + lastName + " " + firstName + "<br>";
    document.getElementById("formP").innerHTML += "Lånets mängd: " + finalAmount + "€" + "<br>";
    document.getElementById("formP").innerHTML += "Lånetid: " + document.form.payLength.value + " år<br>";
    document.getElementById("formP").innerHTML += "Årlig renta (%): " + rentValue + "%<br>";
    document.querySelector("#submitted").style.display = "block";
    document.querySelector("#headText").style.display = "none";
    document.querySelector("#play").style.display = "block";
    document.querySelector("#playGame").style.display = "block";
    document.querySelector("#calc").style.display = "none";
    document.querySelector("#spel").style.display = "block";
}


function hacked() {
    document.querySelector("#hacked").style.display = "block";

    let OS = "Unknown";
    if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
    if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";
    if (navigator.userAgent.indexOf("Mac") != -1) OS = "Apple";
    if (navigator.userAgent.indexOf("Android") != -1) OS = "Android";

    let browser = "Unknown";
    if (navigator.userAgent.indexOf("Opera") != -1 && navigator.userAgent.indexOf("OPR") == -1) {
        browser = "Opera v. " + navigator.userAgent.split("Opera/")[1].split(" ")[0];
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browser = "Chrome v. " + navigator.userAgent.split("Chrome/")[1].split(" ")[0];
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = "Safari v. " + navigator.userAgent.split("Safari/")[1].split(" ")[0];
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Firefox v. " + navigator.userAgent.split("Firefox/")[1].split(" ")[0];
    }

    let language = "Unknown";
    if (navigator.language.indexOf("en") != -1) language = "Engelska";
    if (navigator.language.indexOf("fi") != -1) language = "Finska";
    if (navigator.language.indexOf("se") != -1) language = "Svenska";

    let ip = "Unknown";

    // Fick inte IP API att fungera

    let browserWidth = document.documentElement.clientWidth;
    let browserHeight = document.documentElement.clientHeight;

    document.getElementById("hackedP").innerHTML = firstName + " " + lastName + ", DU ÄR MISTÄNKT FÖR CYBERCRIMES, VI SKICKAR FÖLJANDE INFORMATION TILL NETTIPOLIISI OM DU INTE KÖPER AttVPN!!<br><br>" + "DITT NAMN: " + firstName + " " + lastName +
        "<br>DITT OPERATIVSYSTEM: " + OS + "<br>" + "SPRÅK: " + language + "<br>" + "DIN BROWSER: " + browser + "<br>" + "DIN BROWSERS STORLEK: " + browserWidth + " x " + browserHeight + "<br>DIN IP: " + ip;


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 7 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



let player1, player2, player3, player4, player5;

function generateNames() {

    let letters = ["a", "b", "d", "e", "f", "g", "n", "o", "p"];
    console.log(letters);
    let slumpFornamn = "";
    let slumpEfternamn = "";
    let randomFirstName;
    let randomLastName;
    let firstNameLength;
    let lastNameLength;
    console.log(firstNameLength)

    for (i = 0; i < 5; i++) {
        // Skapa random långa namn
        firstNameLength = Math.floor(Math.random() * 7);
        if (firstNameLength < 3) firstNameLength = 4;
        lastNameLength = Math.floor(Math.random() * 10);
        if (lastNameLength < 5) lastNameLength = 5;

        slumpEfternamn = "";
        slumpFornamn = "";

        for (il = 0; il < firstNameLength; il++) {

            if (slumpFornamn.length < firstNameLength) {
                randomFirstName = Math.floor(Math.random() * firstNameLength);
                randomLastName = Math.floor(Math.random() * lastNameLength);

                slumpFornamn += letters[randomFirstName];
            }
        }
        for (ill = 0; ill < lastNameLength; ill++) {

            if (slumpEfternamn.length < lastNameLength) {
                randomLastName = Math.floor(Math.random() * lastNameLength);

                slumpEfternamn += letters[randomLastName];
            }
        }
        if (i === 0) player1 = slumpFornamn + " " + slumpEfternamn;
        if (i === 1) player2 = slumpFornamn + " " + slumpEfternamn;
        if (i === 2) player3 = slumpFornamn + " " + slumpEfternamn;
        if (i === 3) player4 = slumpFornamn + " " + slumpEfternamn;
        if (i === 4) player5 = slumpFornamn + " " + slumpEfternamn;
    }

    generateHands();
}


let hand1, hand2, hand3, hand4, hand5, randomHand;

function generateHands() {
    for (i = 0; i < 5; i++) {

        randomHand = Math.floor(Math.random() * 3);
        if (randomHand === 0) randomHand = "sten";
        if (randomHand === 1) randomHand = "sax";
        if (randomHand === 2) randomHand = "papper";

        if (i === 0) hand1 = randomHand;
        if (i === 1) hand2 = randomHand;
        if (i === 2) hand3 = randomHand;
        if (i === 3) hand4 = randomHand;
        if (i === 4) hand5 = randomHand;
    }
    startaSpelet()
    console.log(randomHand)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 8 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let round = 1;
let currentHand = "";
let opponent;
let choise = "";
let gameOn = true;

function startaSpelet() {
    console.log("loading game..");

    document.querySelector("#spel").style.display = "block";
    document.querySelector("#spelArea").style.display = "block";
    document.querySelector("#endGame").style.display = "block";
    document.querySelector("#playGame").style.display = "none";
    document.querySelector("#gameButtons").style.display = "block";
    if (round == 1) opponent = player1;
    if (round == 1) currentHand = hand1;
    if (round == 2) opponent = player2;
    if (round == 2) currentHand = hand2;
    if (round == 3) opponent = player3;
    if (round == 3) currentHand = hand3;
    if (round == 4) opponent = player4;
    if (round == 4) currentHand = hand4;
    if (round == 5) opponent = player5;
    if (round == 5) currentHand = hand5;

    document.querySelector("#opponentName").innerHTML = "Round " + round + ": " + "Du spelar mot " + opponent;

    if (round > 5) {
        document.querySelector("#gameButtons").style.display = "none";
        document.querySelector("#opponentName").innerHTML = "DU VANN ALLA DINA MOTSTÅNDARE! BÖRJA SPELET OM MANUALT OM DU VILL FÖRSÖKA IGEN :)"
        round = 1;
    }
    console.log(opponent + currentHand)



}

function rockChoise() {
    document.querySelector("#gameButtons").style.display = "none";
    choise = "sten";
    vemVann();
}

function scissorChoise() {
    document.querySelector("#gameButtons").style.display = "none";
    choise = "sax";
    vemVann();
}

function paperChoise() {
    document.querySelector("#gameButtons").style.display = "none";
    choise = "papper";
    vemVann();
}

function vemVann() {
    if (choise == currentHand) {
        document.querySelector("#opponentName").innerHTML = "Du valde " + choise + ", " + opponent + " valde " + currentHand + ". TASAPELI!"
        document.querySelector("#gameButtons").style.display = "none";
        setTimeout(function () {
            startaSpelet();
        }, 2000)
    } else if (choise == "papper" && currentHand == "sten" || choise == "sax" && currentHand == "papper" || choise == "sten" && currentHand == "sax") {
        round++;
        document.querySelector("#opponentName").innerHTML = "Du valde " + choise + ", " + opponent + " valde " + currentHand + ". DU VANN!";
        document.querySelector("#gameButtons").style.display = "none";
        setTimeout(function () {
            startaSpelet();
        }, 2000)
    } else {
        document.querySelector("#opponentName").innerHTML = "Du valde " + choise + ", " + opponent + " valde " + currentHand + ". DU FÖRLORA :(<br>Spelet börjar om automatiskt :)";
        round = 1;
        document.querySelector("#gameButtons").style.display = "none";
        setTimeout(function () {
            generateNames();
        }, 5000)
    }
}

function endGame() {
    document.querySelector("#spelArea").style.display = "none";
    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#playGame").style.display = "block";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 9 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let timerVar; //Måste defineras utanför timer() för att kunna stoppa timern
// Funktionen lägger till en sekund till t - vår tidsvariabel

let hour = parseInt(document.stopwatchForm.hour.value);
let min = parseInt(document.stopwatchForm.min.value);
let sec = parseInt(document.stopwatchForm.sec.value);

function bytTimme(event) {
    document.querySelector("#timer").innerText = event.target.value + ":" + min + ":" + sec;
    hour = parseInt(event.target.value);
}

function bytMinut(event) {
    document.querySelector("#timer").innerText = hour + ":" + event.target.value + ":" + sec;
    min = parseInt(event.target.value);
}

function bytSekund(event) {
    document.querySelector("#timer").innerText = hour + ":" + min + ":" + event.target.value;
    sec = parseInt(event.target.value);
}

function sekundKlocka() {

    sec += 1;

    if (sec >= 60) {
        sec = 0;
        min += 1;
    }

    if (min >= 60) {
        min = 0;
        hour += 1;
    }

    document.querySelector("#timer").innerText = hour + ":" + min + ":" + sec;
}

let timerOn = false;

// Startar en timer som kör sekundKlocka() en gång i sekunden
function timer() {
    if (!timerOn) {
        timerVar = setInterval(sekundKlocka, 1000);
        timerOn = true;
    }
}

function mellantid(event) {
    if (event.buttons == 2) {
        document.getElementById("mellantider").value = document.getElementById("mellantider").value + hour + ":" + min + ":" + sec + "\n"; // <---- Fungerar fast användaren skriver i textfältet
        //        document.querySelector("#mellantider").innerHTML += hour + ":" + min + ":" + sec + "\n"; <---- Fungerar inte om användaren skriver något i textfältet
    }
}

function reset() {
    clearInterval(timerVar);
    hour = 0;
    min = 0;
    sec = 0;
    document.querySelector("#timer").innerText = hour + ":" + min + ":" + sec;
    timerOn = false;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// EVENT HANDLERS /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.querySelector("#submit").addEventListener("click", handleForm);
document.querySelector("#firstName").addEventListener("input", checkFirstName);
document.querySelector("#lastName").addEventListener("input", checkLastName);
document.querySelector("#amount").addEventListener("input", moneyChecker);
document.querySelector("#rent").addEventListener("input", rentChecker);
document.querySelector("#calc").addEventListener("click", calc);
document.querySelector("#playGame").addEventListener("click", generateNames);
document.querySelector("#endGame").addEventListener("click", endGame);
document.querySelector("#rock").addEventListener("click", rockChoise);
document.querySelector("#paper").addEventListener("click", paperChoise);
document.querySelector("#scissor").addEventListener("click", scissorChoise);
document.querySelector("#generateButton").addEventListener("click", referenceNumberGenerator);
document.querySelector("#countT").addEventListener("click", dateCalc);
document.querySelector("#hour").addEventListener("input", bytTimme);
document.querySelector("#min").addEventListener("input", bytMinut);
document.querySelector("#sec").addEventListener("input", bytSekund);
document.querySelector("#startStopwatch").addEventListener("click", timer);
document.querySelector("#mellantid").addEventListener("mousedown", mellantid);
document.querySelector("#resetStopwatch").addEventListener("click", reset);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// END OF SCRIPT FILE :c //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////