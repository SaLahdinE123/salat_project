let city = document.getElementById("city")
let adan = document.getElementById("adan")
let salawat = document.getElementById('salawat')
let timeadan = new Date().toLocaleTimeString().substring(0 , 5)
let date = document.getElementById("date")
let cityName = document.getElementById("city-name")
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '-' + mm + '-' + yyyy;
function getTiming(city){
    fetch(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country=morocco&method=9&month=1&year=2023`)
    .then(response => response.json())
    .then(timing => {
        for (const time of timing.data) {
            console.log(time);
            if (parseInt(time.date.gregorian.day) === dd) {
                date.innerHTML = `${time.date.gregorian.date}`
                salawat.innerHTML = `
                    <div class="card-salats">
                        <h3 class="salat-name">الفجر</h3>
                        <h1 class="time">${time.timings.Fajr.substring(0 , 5)}</h1>
                        
                    </div>
                    <div class="card-salats">
                        <h3 class="salat-name">الظهر</h3>
                        <h1 class="time">${time.timings.Dhuhr.substring(0 , 5)}</h1>
                        
                    </div>
                
                    <div class="card-salats">
                        <h3 class="salat-name">العصر</h3>
                        <h1 class="time">${time.timings.Asr.substring(0 , 5)}</h1>
                        
                    </div>
            
                    <div class="card-salats">
                        <h3 class="salat-name">المغرب</h3>
                        <h1 class="time">${time.timings.Maghrib.substring(0 , 5)}</h1>
                        
                    </div>
                    <div class="card-salats">
                        <h3 class="salat-name">العشاء</h3>
                        <h1 class="time">${time.timings.Isha.substring(0 , 5)}</h1>
                
                    </div>
                
                `
                // alfajr.innerHTML = time.timings.Fajr.substring(0 , 5)
                // aldohr.innerHTML = time.timings.Dhuhr.substring(0 , 5)
                // alasr.innerHTML = time.timings.Asr.substring(0 , 5)
                // almarghrib.innerHTML = time.timings.Maghrib.substring(0 , 5)
                // alicha.innerHTML = time.timings.Isha.substring(0 , 5)
                // console.log(almarghrib.innerHTML);
                // console.log(timeadan);
                // if ("18:26" == almarghrib.innerHTML) {
                //     playAdhan()
                //     console.log("test");
                // }
            }
        }
    })
}
function playAdhan(){
    adan.play()
}

function changeCity() {
    getTiming(city.value)
    city.addEventListener("change" , ()=>{
        cityName.innerHTML = city.value
        getTiming(city.value)
    })
}
changeCity()
