//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// START OF SCRIPT FILE :D //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////
// GLOBALA VARIABLER //
///////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 1 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cards = document.querySelectorAll(".card");
console.log(cards);

function flipCard(ev) {

    ev.target.style.transformStyle = "preserve-3d";
    ev.target.style.transition = "transform 2s";

    // Olika card fronts, man skulle kunna jobba vidare med att generera korten slumpmässigt, men det var ju inte iden i uppgiften, så focuserar inte på det
    // därför assignerade jag card fronts manualt..
    let cardFront;
    if (ev.target.classList.contains("1")) cardFront = "../media/cardFront1.jpg";
    if (ev.target.classList.contains("2")) cardFront = "../media/cardFront2.jpg";
    if (ev.target.classList.contains("3")) cardFront = "../media/cardFront3.jpg";

    if (!ev.target.classList.contains("flipped")) {
        ev.target.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            ev.target.src = cardFront;
            ev.target.classList.add("flipped");
        }, 500);

    } else if (ev.target.classList.contains("flipped")) {
        ev.target.style.transform = "rotateY(0deg)";
        setTimeout(function () {
            ev.target.src = "../media/cardBack.png";
            ev.target.classList.remove("flipped");
        }, 500);
    }
}

function cardGlow(ev) {
    ev.target.style.border = "2px dashed #696969";
}

function cardNoGlow(ev) {
    ev.target.style.border = "none";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 2 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let thumbs = document.querySelectorAll(".thumb");
let interval;
let intervalIn;
let targetSrc;

function swapImg(ev) {
    targetSrc = ev.target.src;
    // Så att man kan inte byta till samma bild.
    if (targetSrc !== document.querySelector("#galleri").src) fadeOut();
}

function fadeOut() {
    document.querySelector("#galleri").style.opacity = 1;
    interval = setInterval(fadeOutStep, 100);
}

function fadeOutStep() {
    if (document.querySelector("#galleri").style.opacity > 0) {
        document.querySelector("#galleri").style.opacity -= 0.1;
    } else {
        clearTimeout(interval);
        document.querySelector("#galleri").src = targetSrc;
        intervalIn = setInterval(fadeInStep, 100);
    }
}

function fadeInStep() {
    if (document.querySelector("#galleri").style.opacity < 1) {
        document.querySelector("#galleri").style.opacity = parseFloat(document.querySelector("#galleri").style.opacity) + 0.1;
    } else {
        clearTimeout(intervalIn);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 3 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateColor() {
    let redAmount = document.querySelector("#redSlider").value;
    let greenAmount = document.querySelector("#greenSlider").value;
    let blueAmount = document.querySelector("#blueSlider").value;
    redAmount = parseInt(redAmount);
    greenAmount = parseInt(greenAmount);
    blueAmount = parseInt(blueAmount);

    redBin = redAmount.toString(2);
    greenBin = greenAmount.toString(2);
    blueBin = blueAmount.toString(2);

    redOct = redAmount.toString(8);
    greenOct = greenAmount.toString(8);
    blueOct = blueAmount.toString(8);

    redHex = redAmount.toString(16);
    greenHex = greenAmount.toString(16);
    blueHex = blueAmount.toString(16);
    document.querySelector("#rgb").innerText = "rgb(" + redAmount + " ," + greenAmount + " ," + blueAmount + ")"
    document.querySelector("#redAmount").innerText = "Binary: " + redBin + " Octal: " + redOct + " Hex: " + redHex;
    document.querySelector("#greenAmount").innerText = "Binary: " + greenBin + " Octal: " + greenOct + " Hex: " + greenHex;
    document.querySelector("#blueAmount").innerText = "Binary: " + blueBin + " Octal: " + blueOct + " Hex: " + blueHex;
    document.querySelector("#container").style.backgroundColor = "rgb(" + redAmount + "," + greenAmount + "," + blueAmount + ")";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 4 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    console.log("Ready for jquery");
    //göm gallerirubriken när man klickar på galleriet
    $("#buttonHide").on("click", function () {
        $("#codeImg").toggle(2000);
    })
    $("#buttonFade").on("click", function () {
        $("#codeImg").fadeToggle(2000);
    })
    $("#buttonSlide").on("click", function () {
        $("#codeImg").slideToggle(2000);
    })
    $("#buttonAnimation").on("click", function () {
        $("#codeImg").animate({
            width: "200px",
            opacity: "20%"
        }, 2000);
        $("#codeImg").animate({
            width: "100px",
            opacity: "100%"
        }, 2000);
        $("#codeImg").animate({
            left: "100px",
        }, 2000);
        $("#codeImg").animate({
            left: "-100px",
        }, 2000);
        $("#codeImg").animate({
            left: "0px",
        }, 2000);
        $("#codeImg").animate({
            width: "200px",
            opacity: "20%"
        }, 1000);
        $("#codeImg").animate({
            width: "100px",
            opacity: "100%"
        }, 1000);
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 5 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let kakor = document.cookie.split(";"); // Hämtar alla kakor
    console.log(kakor[0]); //Skriver ut första kakan
    return kakor[0];
}

function login() {
    let username = prompt("Användarnamn?:", ""); // Be om användernamn
    setCookie("username", username, 2); // Kakan i kraft 2 dagar
    getCookie("username"); // Kolla inmatad kaka, vem är inloggad.
    localStorage.setItem("username", username);
    checkCookie();
}

function checkCookie() {
    let user = getCookie();
    console.log("Användaren heter: " + localStorage.username);
    if (user == "username=atte") {
        visits();
        loggedIn();
    }
}

function visits() {
    let visits = localStorage.getItem('visits');
    if (visits == null || visits == 0) {
        localStorage.setItem('visits', 1);
        localStorage.setItem('firstVisit', new Date());
        console.log("First time visitor!");
        console.log("First visit date: " + localStorage.getItem("firstVisit"));
        document.getElementById("firstVisit").innerHTML += localStorage.getItem("firstVisit");
    } else {
        let parsedVisits = parseInt(visits);
        localStorage.setItem('visits', parsedVisits + 1);
        totalVisits = localStorage.getItem('visits');
        console.log(totalVisits + ' times visited');
    }
}

if (getCookie("username") == "username=atte") {
    console.log("active login found on username atte");
    visits();
    loggedIn();
}

function loggedIn() {
    document.getElementById("username").innerHTML = "Username: " + localStorage.getItem("username");
    document.getElementById("firstVisit").innerHTML = "First visit: " + localStorage.getItem("firstVisit");
    document.getElementById("visits").innerHTML = "Total visits: " + localStorage.getItem("visits");
    $("#loggedInText").show();
    $("#login").hide();
    $("#logout").show();
}

function logout() {
    setCookie('username', '', 0)
    console.log("username cookie cleared, logged out.");
    $("#loggedInText").hide();
    $("#login").show();
    $("#logout").hide();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 6 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Utan JQuery
function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ajax").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "ajax.txt", true);
    xhttp.send();
}

// Med JQuery
function loadDocJQ() {
    $.ajax({
        url: "ajax.txt",
        dataType: "text",
        success: function (data) {
            $("#jq").html(data);
        }
    })
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 7 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadJsonIp() {
    $.ajax({
        url: "https://api.ipgeolocation.io/ipgeo?apiKey=9a686d04aa094c2d9d7bd4ad0b0a7234",
        dataType: "json",
        success: function (data) {
            $("#jsonIp").html("IP: "+data.ip+"<br>ISP: "+data.isp+"<br>Country: "+data.country_name+"<br>State: "+data.state_prov+"<br>City: "+data.city+"<br>District: "+data.district+"<br><br>");
        }
    })
}
function loadJsonWeather() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=35976650cdc0cbc9ff24171475bd3fc7&units=metric",
        dataType: "json",
        success: function (data) {
            $("#jsonWeather").html("Weather: "+data.weather[0].main+"<br>Temperature: "+data.main.temp+"c<br>Airpressure: "+data.main.pressure+" hPa");
        }
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// UPPGIFT 8 //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GOOGLE CHARTS
google.charts.load('current', {
    'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Fruit');
    data.addColumn('number', 'Vote results');
    data.addRows([
        ['Apple', 51],
        ['Pear', 23],
    ]);

    // Set chart options
    var options = {
        'title': 'Fruits on the ground',
        'width': 340,
        'height': 250
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// HIGHCHARTS

Highcharts.chart('chartContainer', {
    data: {
        table: 'datatable'
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'Fruits picked'
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    }
});

// ChartsJS


const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];
const data = {
    labels: labels,
    datasets: [{
        label: 'Average Temperatures',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [2, 3, 5, 7, 12, 10, 19],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// EVENT HANDLERS /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
    cards[i].addEventListener("mouseover", cardGlow);
    cards[i].addEventListener("mouseout", cardNoGlow);
}

for (i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener("mouseover", swapImg);
}
document.querySelector("#redSlider").addEventListener("input", updateColor);
document.querySelector("#greenSlider").addEventListener("input", updateColor);
document.querySelector("#blueSlider").addEventListener("input", updateColor);
document.getElementById("login").addEventListener("click", login);
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("loadData").addEventListener("click", loadDoc);
document.getElementById("loadDataJQ").addEventListener("click", loadDocJQ);
document.getElementById("loadJsonWeather").addEventListener("click", loadJsonWeather);
document.getElementById("loadJsonIp").addEventListener("click", loadJsonIp);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// END OF SCRIPT FILE :c //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////