let rotated = false

let rotatedTeam = false

let rotatedEvents = false

document.addEventListener("DOMContentLoaded", function () {

   

    // chrome.runtime.connect();

    function logPls(){
        // chrome.storage.sync.set({"lastOpenedTime": Date.now() }, function() {
        //     console.log('Extension closing time is saved.');
        // });

        chrome.storage.sync.set({ lastOpenedTime: Date.now() });

        // alert("AHH")

    }

    // setInterval( logPls, 1000);

    document.addEventListener('visibilitychange', logPls, false);


    fetchSavedData()

    

    animateLoadingText(document.getElementById("loadingBefore"))
    
    animateLoadingText(document.getElementById("statsYearLoading"));

    animateLoadingText(document.getElementById("statsTeamLoading"));

    animateLoadingText(document.getElementById("loadingWins"));

    animateLoadingText(document.getElementById("loadingTeamData"));

    // animatingLoadingTeamData()

    // animateLoadingEvents()

    let controllerTBA = new AbortController()
    let signal = controllerTBA.signal;

    test.addEventListener("click", function(){
        // chrome.tabs.create({ url: chrome.runtime.getURL('page.html') });
        // window.location.href = 'page.html';
        let triangle = document.getElementById("dropdown-triangle")

        triangle.style.transform = 'rotate(-45deg)'

        let dropdown = document.getElementById("myTable")

        
        dropdown.style.display = "none"
        fetchData("tba", signal )
        // chartData()
    })

    redirect.addEventListener("click", function(){
        // console.log("BOOOOOOOOOOOOOOOOOOO")
        // redirectSave()
        // window.location.href = "page.html";
        controllerTBA.abort()
        fetchData("stat", signal)
        controllerTBA = new AbortController()
        signal = controllerTBA.signal

        if(rotatedEvents){
            let triangle = document.getElementById("dropdown-triangle")

            triangle.style.transform = 'rotate(-45deg)'

            let dropdown = document.getElementById("myTable")

            
            dropdown.style.display = "none"

        }
    })

    var dropdownContainer = document.querySelector(".dropdown-container");

    dropdownContainer.addEventListener("click", function() {
        // dropdownContainer.classList.toggle("active");

        let triangle = document.getElementById("dropdown-triangle")
        if(!rotatedEvents){
            triangle.style.transform = 'rotate(45deg)'
            
            let dropdown = document.getElementById("myTable")
            
            console.log("ROOOROROTATED")
            setTimeout(function () {
                dropdown.style.display = "table"
              }, 150); 

            rotatedEvents = true
        } else {
            triangle.style.transform = 'rotate(-45deg)'

            let dropdown = document.getElementById("myTable")

            
            dropdown.style.display = "none"
            
            rotatedEvents = false
        }
    });

    

    var statsYearContainer = document.getElementById("statsYear-container");
    // var dropdownTriangle = document.getElementById("dropdown-triangle");

    statsYearContainer.addEventListener("click", function() {

        let triangle = document.getElementById("dropdown-triangleStats")
        if(!rotated){
            triangle.style.transform = 'rotate(45deg)'
            
            let dropdown = document.getElementById("statsYearDropdown")
            
            console.log("ROOOROROTATED")
            setTimeout(function () {
                dropdown.style.display = "block"
              }, 150); 

            rotated = true
        } else {
            triangle.style.transform = 'rotate(-45deg)'

            let dropdown = document.getElementById("statsYearDropdown")

            
            dropdown.style.display = "none"
            
            rotated = false
        }

    });

    var statsTeamContainer = document.getElementById("statsTeam-container");
    // var dropdownTriangle = document.getElementById("dropdown-triangle");

    statsTeamContainer.addEventListener("click", function() {

        let triangle = document.getElementById("dropdown-triangleStatsTeam")
        if(!rotatedTeam){
            triangle.style.transform = 'rotate(45deg)'
            
            let dropdown = document.getElementById("statsTeamDropdown")
            
            console.log("ROOOROROTATED")
            setTimeout(function () {
                dropdown.style.display = "block"
              }, 150); 

              rotatedTeam = true
        } else {
            triangle.style.transform = 'rotate(-45deg)'

            let dropdown = document.getElementById("statsTeamDropdown")

            
            dropdown.style.display = "none"
            
            rotatedTeam = false
        }

    });

    // window.onbeforeunload = function (event) {
    //     // Store the current time in local storage
    //     // localStorage.setItem("extensionClosedTime", new Date().toString());

    //     chrome.storage.sync.set({ lastOpenedTime: Date.now() });

    // };

    // chrome.runtime.onSuspend.addListener(function() {
    //     // Store the current time using chrome.storage.sync
    //     // chrome.storage.sync.set({ "extensionClosedTime": new Date().toString() }, function() {
    //     //     console.log('Extension closing time is saved.');
    //     // });

    //     chrome.storage.sync.set({ lastOpenedTime: Date.now() });
    // });

    // function saveClosingTime() {
    //     chrome.storage.sync.set({"lastOpenedTime": Date.now() }, function() {
    //         console.log('Extension closing time is saved.');
    //     });
    // }
    
    // // Event listener for runtime.onSuspend
    // chrome.runtime.onSuspend.addListener(function() {
    //     saveClosingTime();
    // });









});