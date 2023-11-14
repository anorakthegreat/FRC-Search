// /team/{team_key}/events/{year}/statuses
let firstRunCurrEpa = false
let myChart

let firstRunchartEpaOvertime = false
let chartEpaOvertime

let redirectName = ""

let redirectYear = ""


function myFunction(id) {
    var x = document.getElementById(id);
    var arrow = document.getElementById('arrow' + id.slice(-1));
  
    if (x.style.display === "none") {
      x.style.display = "block";
      arrow.classList.remove('arrow-right');
      arrow.classList.add('arrow-down');
    } else {
      x.style.display = "none";
      arrow.classList.remove('arrow-down');
      arrow.classList.add('arrow-right');
    }
}

function redirectSave(){
    // saveSwitch().then( () => {
    //     window.location.href = "page.html";
    // })
    // console.log("BOOOOOOOOOOOOOOO")
    // chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
    // saveSwitch()

    
    console.log("AHHHHHH")

    let teamFieldTBA = document.getElementById("teamInput")
    let yearFieldTBA = document.getElementById("yearInput")

    redirectName = teamFieldTBA.value
    redirectYear = yearFieldTBA.value

    setName(teamFieldTBA.value)
    setYear(yearFieldTBA)

    console.log(redirectName)
    console.log(redirectYear)

    window.location.href = "page.html"

    console.log("AHHHHHHHHHHHHHHHHHHHHHH")


}

function chartData(num, mean, teamNumber, year){
   // Example data for the chart

   if(firstRunCurrEpa){
    console.log("AH")
    myChart.destroy()
   }

   let ctx = document.getElementById('myChart').getContext('2d');
   myChart = new Chart(ctx, {
       type: 'bar',
       data: {
        //    labels: ['Baseline', teamNumber, " ", " ", ""],
           labels: ['Norm EPA', teamNumber + "(" + year + ")", "Mean EPA", " ", " "],

           datasets: [{
               label: 'EPA',
               data: [1500, num, mean],
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
           }]
       },
       options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 1300, // Set the minimum value for the y-axis
                    max: 3000, // Set the maximum value for the y-axis
                    stepSize: 500 // Set the step size for the y-axis ticks

                }
            }]
        },
        annotation: {
            annotations: [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 1500, // Set the y-axis value for the horizontal line
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                label: {
                    enabled: false,
                    content: 'Threshold'
                }
            }]
        }
    }
   });

   firstRunCurrEpa = true

}

function chartEAPOT(epaArr, teamNumber){
    // Example data for the chart

    console.log(epaArr)

    let newData = []

    for(let i = 0; i < epaArr.length; i++){
        newData.push("")
    }
 
    if(firstRunchartEpaOvertime){
        console.log("AH")
        chartEpaOvertime.destroy()
    }
 
    let ctx = document.getElementById('epaOverTime').getContext('2d');
    chartEpaOvertime = new Chart(ctx, {
        type: 'line',
        data: {
         //    labels: ['Baseline', teamNumber, " ", " ", ""],
            labels: newData,
 
            datasets: [{
                label: 'EPA Over Time',
                data: epaArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
         scales: {
             yAxes: [{
                 ticks: {
                     min: 1300, // Set the minimum value for the y-axis
                     max: 3000, // Set the maximum value for the y-axis
                    //  stepSize: 500 // Set the step size for the y-axis ticks
 
                 }
             }]
         },
         annotation: {
             annotations: [{
                 type: 'line',
                 mode: 'horizontal',
                 scaleID: 'y-axis-0',
                 value: 1500, // Set the y-axis value for the horizontal line
                 borderColor: 'rgb(75, 192, 192)',
                 borderWidth: 0.5,
                 label: {
                     enabled: false,
                     content: 'Threshold'
                 }
             }]
         }
     }
    });
 
    firstRunchartEpaOvertime = true
 
 }




function fetchSavedData(){

    let charts = document.getElementById("charts")
    charts.style.display = "none"


    let timeDiff = 0

    chrome.storage.sync.get("lastOpenedTime", (result) => {
        const lastOpenedTime = result.lastOpenedTime;


        console.log(lastOpenedTime)
        if (lastOpenedTime) {

            console.log(new Date(lastOpenedTime))

            let lastOpenedTimeMs = new Date(lastOpenedTime).getTime();
            let currentTimeMs = Date.now();


            console.log("Last opened time in milliseconds:", lastOpenedTimeMs);
            console.log("Current time in milliseconds:", currentTimeMs);

            timeDiff = currentTimeMs - lastOpenedTimeMs

            timeDiff = timeDiff / 1000

            console.log("Time Diff:", timeDiff);

            rememberOrForget(timeDiff)


        } else {
          console.log("Extension opened for the first time.");
          timeDiff = 0
        }
    }); 

    chrome.storage.sync.set({ lastOpenedTime: Date.now() });
    

}

const getStoredTeamData = async() =>{

    console.log("APJIDF{{{{EIPHFPEIHPVIHPIAHPIWEHVPWIEH")
    chrome.storage.sync.get(['teamData'], function(result) { 

        console.log("BLEHHHHHHHHHHHHHHHHHHHH")

        // if(result.teamData[0].teamData == undefined){
            return result.teamData[0].teamData
        // }
        
    });

}

function retrieveFromStorage(key) {
    console.log("3")
    return new Promise((resolve, reject) => {
        console.log("4")

      chrome.storage.sync.get(key, function (result) {
        console.log("5")

        resolve(result[key]);
      });
    });
  }
  
   

const rememberOrForget = async(timeDiff) => {

    // let tDO = await getStoredTeamData()

    // console.log("ADOOOOOOOOOO")

    // retrieveFromStorage('teamData', function (data) {
    //     console.log("BAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAH: " + data); // You can replace this with any print mechanism you prefer
    // });
    let td0

    console.log("1")

    try {
        console.log("2")
        const data = await retrieveFromStorage('teamData');
        console.log(data); // You can replace this with any print mechanism you prefer
        // Any other operations you want to perform after the data is retrieved

        td0 = data[0].teamData
      } catch (error) {
        console.error(error);
      }
    
    console.log("666666666666666")
    console.log(td0)

    console.log("TIIIME DIFFFFFFF: " + timeDiff)


    if(td0 != undefined){
        onStartup(timeDiff)
    } else {
        let teamDataTi = document.getElementById("teamDataTitle")

        teamDataTi.style.display = "none"

        let websiteTitle = document.getElementById("WebsiteTitles")
        websiteTitle.style.display = "none"


        console.log("WEWWEWEWEWEWEEWWEWEWEWEEWEWEWEWEWE")
    }
    

    


    

}

function onStartup(timeDiff){
    clearTable()

    let teamData = document.getElementById("teamData")
    clearElement(teamData)

    let websiteTitle = document.getElementById("WebsiteTitles")
    websiteTitle.style.display = "block"

    if(timeDiff <= 30){

        console.log("AOOGO")
        console.log(timeDiff)

            let epaChartS = document.getElementById("myChart")

            let eapotChartS = document.getElementById("epaOverTime")
    
            epaChartS.style.display = "none"
    
            eapotChartS.style.display = "none"

        
            let eventDropdown = document.getElementById("myDropdown")

            const loadingTeamData = document.getElementById("loadingTeamData")
            loadingTeamData.style.display = "block"
    
            let loadingWins = document.getElementById("loadingWins")
            loadingWins.style.display = "flex"
    
            let superDropdownContainer = document.getElementById("dropdownSuperContainer")
            superDropdownContainer.style.display = "none"
    
            let dropdownTriangle = document.getElementById("dropdown-triangle")
            dropdownTriangle.style.display = "none"

            let websiteTitle = document.getElementById("WebsiteTitles")
            websiteTitle.style.display = "block"

            let websiteListW = document.getElementById("WebsiteList")
            websiteListW.style.display = "block"

            

            let teamFieldElementW = document.getElementById("teamInput")
            let yearFieldElementW = document.getElementById("yearInput")

           

        


        chrome.storage.sync.get(['yearTeam'], function(result) {
            let yearTeamObject = result.yearTeam

            let teamFieldElement = document.getElementById("teamInput")
            let yearFieldElement = document.getElementById("yearInput")

            // console.log(result)

            
            teamFieldElement.value = result.yearTeam[0]
            yearFieldElement.value = result.yearTeam[1]

            addHref(websiteListW, "li", "TBA", "https://www.thebluealliance.com/team/" + result.yearTeam[0])
            addHref(websiteListW,  "li", "Statbotics", "https://www.statbotics.io/team/" + result.yearTeam[0])
            
            
        });

        chrome.storage.sync.get(['teamData'], function(result) {

            

            // console.log("BOOOO " + result.teamData[0].href)
            let teamDataObject = result.teamData

            let teamDataD = document.getElementById("teamData")


                for(let i = 0; i < teamDataObject.length; i++){
                    if(teamDataObject[i].href == "none"){
                        addElement(teamDataD, "li", teamDataObject[i].teamData)
                    } else{
                        addHref(teamDataD, "li", teamDataObject[i].teamData, teamDataObject[i].href)
                    }
                }
            
               
           

            
        });

        chrome.storage.sync.get(['savedEvents'], function(res) {

            let eventDropdownD = document.getElementById("myDropdown")


            console.log("AHHHHHHHHHHH" + res.savedEvents[0].name)

            if(res.savedEvents.length != 0){
                for(let i = 0; i <res.savedEvents.length; i++){
                    // addHref(eventDropdownD, "li", res.savedEvents[i].name, res.savedEvents[i].href )
                    addRow(res.savedEvents[i].name, res.savedEvents[i].rank, res.savedEvents[i].won, res.savedEvents[i].href)

                }
            } else {
                addElement(eventDropdownD, "li", "No Events Won")
            }
                

                // addHref(eventDropdownD, "li", "ALALALALA", "htt" )

            
                
            

        });

        
            let loadTeamData = document.getElementById("loadingTeamData")
            loadTeamData.style.display = "none"
    
            let teamDataT = document.getElementById("teamDataTitle")
            teamDataT.style.display = "block"
    
            loadingWins.style.display = "none"
    
            superDropdownContainer.style.display = "flex"

            dropdownTriangle.style.display = "inline-block"

            let eventDropdownDD = document.getElementById("myDropdown")


        
        
       
    } else {

        console.log("DEEEEEEEEEEEEELEEEEEEETTTTTTEEEEEEEEEEEEE")
        let teamDataCom = document.getElementById("teamData")

        let myDropdownCon = document.getElementById("myDropdown")

        let teamDataT = document.getElementById("teamDataTitle")
        teamDataT.style.display = "none"

        let superDropdownContainer = document.getElementById("dropdownSuperContainer")
        superDropdownContainer.style.display = "none"

        let websiteTitle = document.getElementById("WebsiteTitles")
        websiteTitle.style.display = "none"

        

        console.log("WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

        // chrome.storage.local.set({ lastOpenedTime: "n" });

        let arr = [""]
        let arr2 = [""]

        chrome.storage.sync.set({'teamData': arr });
        chrome.storage.sync.set({'savedEvents': arr2 });

        cleared = true
        // chrome.storage.local.set({ 'teamData' : arr});
        // chrome.storage.local.set({ 'savedEvents' : arr2 });


        // dropdownTriangle.style.display = "none"

        chrome.storage.sync.get(['savedEvents'], function(res) {

            console.log(res.savedEvents)
            

        });

        chrome.storage.sync.get(['teamData'], function(res) {

            console.log(res.teamData)
            

        });


        clearElement(teamDataCom)
        clearElement(myDropdownCon)
    }

}

function statData(){
    statbotics()
    eapot()
}

let clicked = false
const fetchData = async(string, signal) =>{
    // let teamData = document.getElementById("teamData")

    console.log("CLIICKKKEDD")

    let ele = document.getElementById("incorrect")
    ele.style.display = "none"

    // const controllerTBA = new AbortController()
    // const signal = controllerTBA.signal;

    const simpleTeamBlacklist = ["address", "gmaps_place_id", "gmaps_url", "lat", "lng", "location_name", "motto", "postal_code", "name","team_number", "key"]

    const token = '55uiQoq7fHVi6nNnl9mF2NupDv8njw4NsKcDvh0zMHVnSnreLp00fcgGKQYpHnZw'

    const teamData = document.getElementById("teamData")

    // const eventsWon = document.getElementById("eventsWon")

    const myDropdown = document.getElementById("myDropdown")

    const statsYear = document.getElementById("statsYearDropdown")

    const statsTeam = document.getElementById("statsTeamDropdown")

    let statsYearSuperContainer = document.getElementById("statsYearSuperContainer")

    let statsTeamSuperContainer = document.getElementById("statsTeamSuperContainer")

    let eventDropdown = document.getElementById("dropdownSuperContainer")

    let epaChart = document.getElementById("myChart")

    let eapotChart = document.getElementById("epaOverTime")

    let teamDataT = document.getElementById("teamDataTitle")

    let websiteTitle = document.getElementById("WebsiteTitles")

    let websiteListW = document.getElementById("WebsiteList")

    let eventsWin = document.getElementById("loading")
    eventsWin.style.display = "block"
    
    let dropdownTri = document.getElementById("dropdown-triangle")
    dropdownTri.style.display = "inline-block"

    eventDropdown.style.display = "none"

    statsTeamSuperContainer.style.display = "none"

    statsYearSuperContainer.style.display = "none"

    teamDataT.style.display = "none"

    epaChart.style.display = "none"

    eapotChart.style.display = "none"

    websiteTitle.style.display = "none"

    // clearElement(teamData)




    const headers = new Headers({
        'X-Tba-Auth-Key': token
      });

    // clearElement(eventDropdown)

    clearElement(teamData)

    clearElement(myDropdown)

    clearElement(statsYear)

    clearElement(statsTeam)

    clearElement(epaChart)

    clearElement(eapotChart)

    clearElement(websiteListW)

    clearTable()

    clicked = true


    let charts = document.getElementById("charts")
    // charts.style.display = "none"

    let teamFieldElementWW = document.getElementById("teamInput")
    let yearFieldElementWW = document.getElementById("yearInput")

    let loadingBefore = document.getElementById("loadingBefore")
    loadingBefore.style.display = "block"
    
    let x = await requestStatbotics("https://api.statbotics.io/v2/team/" + teamFieldElementWW.value)
    console.log("YEUHHHHHHHHHH" + x)

    let q = await requestStatbotics("https://api.statbotics.io/v2/year/" + yearFieldElementWW.value)
    console.log("YEUHHHHHHHHHH" + x)

    loadingBefore.style.display = "none"

    if(x == undefined || q == undefined){
        let ele = document.getElementById("incorrect")
        ele.style.display = "block"
    } else {

        // addHref(websiteListW, "li", "TBA", "https://www.thebluealliance.com/team/" + teamFieldElementWW.value)
        // addHref(websiteListW,  "li", "Statbotics", "https://www.statbotics.io/team/" + teamFieldElementWW.value)

        let ele = document.getElementById("incorrect")
        ele.style.display = "none"

        cleared = false

        if(clicked){
            if(string == "tba"){
                fetchTBAData(simpleTeamBlacklist, headers, token, myDropdown, signal)
            } else {
                fetchStatData()
            }
        }
       
    }


    
    clicked = false

    

    


}

const fetchStatData = async(string, signal) => {

    let ele = document.getElementById("incorrect")
    ele.style.display = "none"

    let websiteTitle = document.getElementById("WebsiteTitles")
    websiteTitle.style.display = "block"

    var loadingWins = document.getElementById("loadingWins")
    loadingWins.style.display = "none"

    let dropEv = document.getElementById("dropdownSuperContainer")
    dropEv.style.display = "none"

    // let websiteList = document.getElementById("WebsiteList")
    // websiteList.style.display = "block"
    // clearElement(websiteList)

    // let statsYear = document.getElementById("statsYearSuperContainer")
    // statsYear.style.display = "none"

    let loadTeam = document.getElementById("loadingTeamData")
    loadTeam.style.display = "none"

    let teamDataT = document.getElementById("teamDataTitle")
    teamDataT.style.display = "none"

    let teamData = document.getElementById("teamData")
    teamData.style.display = "none"
    
    // let dropdownTri = document.getElementById("dropdown-triangle")
    // dropdownTri.style.display = "none"

    let epaChart = document.getElementById("myChart")

    let eapotChart = document.getElementById("epaOverTime")

    epaChart.style.display = "block"

    eapotChart.style.display = "block"

    let charts = document.getElementById("charts")
    charts.style.display = "block"

    // let teamFieldElementWW = document.getElementById("teamInput")
    // let yearFieldElementWW = document.getElementById("yearInput")

    

    // let x = await requestStatbotics("https://api.statbotics.io/v2/team/" + teamFieldElementWW.value)
    // console.log("YEUHHHHHHHHHH" + x)

    // let q = await requestStatbotics("https://api.statbotics.io/v2/year/" + yearFieldElementWW.value)
    // console.log("YEUHHHHHHHHHH" + x)

    let teamFieldElementWW = document.getElementById("teamInput")
    let yearFieldElementWW = document.getElementById("yearInput")

    let websiteListW = document.getElementById("WebsiteList")

    let websiteList = document.getElementById("WebsiteList")
    websiteList.style.display = "block"
    clearElement(websiteList)

    addHref(websiteListW, "li", "TBA", "https://www.thebluealliance.com/team/" + teamFieldElementWW.value)
    addHref(websiteListW,  "li", "Statbotics", "https://www.statbotics.io/team/" + teamFieldElementWW.value)



    // if(x == undefined || q == undefined){
    //     let ele = document.getElementById("incorrect")
    //     ele.style.display = "block"
    // } else {

    //     // addHref(websiteListW, "li", "TBA", "https://www.thebluealliance.com/team/" + teamFieldElementWW.value)
    //     // addHref(websiteListW,  "li", "Statbotics", "https://www.statbotics.io/team/" + teamFieldElementWW.value)

    //     let ele = document.getElementById("incorrect")
    //     ele.style.display = "none"

    //     cleared = false

        // if(string == "tba"){
        //     fetchTBAData(simpleTeamBlacklist, headers, token, myDropdown, signal)
        // } else {
        //     fetchStatData()
        // }
        statbotics()
        eapot()
    // }


    // eventsWin.style.display = "none"
    // dropdownTri.style.display = "none"


}

function fetchTBAData(simpleTeamBlacklist, headers, token, myDropdown, signal ){

    console.log("WE INNNNNNNNNNN HEREEEEEEEEEEEEEEEEEEEEEEEEE")

    let teamData = document.getElementById("teamData")
    clearElement(teamData)

    // clearTable()

    // let websiteList = document.getElementById("WebsiteList")

    let websiteTitle = document.getElementById("WebsiteTitles")
    websiteTitle.style.display = "block"

    let websiteList = document.getElementById("WebsiteList")
    websiteList.style.display = "block"
    clearElement(websiteList)

    let teamFieldElementWW = document.getElementById("teamInput")
    let yearFieldElementWW = document.getElementById("yearInput")

    let websiteListW = document.getElementById("WebsiteList")

    addHref(websiteListW, "li", "TBA", "https://www.thebluealliance.com/team/" + teamFieldElementWW.value)
    addHref(websiteListW,  "li", "Statbotics", "https://www.statbotics.io/team/" + teamFieldElementWW.value)

    let charts = document.getElementById("charts")
    // charts.style.display = "none"
    charts.style.height = "0"

    const teamField = document.getElementById("teamInput")
    const yearField = document.getElementById("yearInput")

    // if(yearField != ""){
        fetchSimpleTeamData(simpleTeamBlacklist, headers)

        fetchTeamEvents(token, myDropdown, signal)
    //   

}


const statbotics = async() =>{

    const teamField = document.getElementById("teamInput")
    const yearField = document.getElementById("yearInput")
    const statsYear = document.getElementById("statsYearDropdown")
    const statsTeam = document.getElementById("statsTeamDropdown")
    const superContainer = document.getElementById("statsYearSuperContainer")
    const teamSuperContainer = document.getElementById("statsTeamSuperContainer")
    const statsYearLoading = document.getElementById("statsYearLoading")
    const statsTeamLoading = document.getElementById("statsTeamLoading")

    statsYearLoading.style.display = "flex"
    statsTeamLoading.style.display = "flex"

    let x = await requestStatbotics("https://api.statbotics.io/v2/team_year/" + teamField.value + "/" + yearField.value)
    console.log(x)

    let y = await requestStatbotics("https://api.statbotics.io/v2/team/"+ teamField.value)
    console.log(y)

    let norm = x.norm_epa_end

    clearElement(statsYear)
    clearElement(statsTeam)

    addElement(statsYear, "li", "EPA Percentile: " + Math.floor(x.total_epa_percentile * 100) + "%")
    addElement(statsYear, "li", "EPA Rank: " + x.total_epa_rank + "/" + x.total_team_count)
    addElement(statsYear, "li", "Winrate: " + Math.floor(x.winrate * 100) + "%")

    addElement(statsTeam, "li", "Total Wins: " + y.full_wins)
    addElement(statsTeam, "li", "Total Losses: " + y.full_losses)
    addElement(statsTeam, "li", "Total Winrate: " + y.full_winrate)


    statsYearLoading.style.display = "none"
    statsTeamLoading.style.display = "none"
    superContainer.style.display = "flex"
    teamSuperContainer.style.display = "flex"
    // addElement(statsYear, "li", "HAH")
    // addElement(statsYear, "li", "WHY")
    // addElement(statsYear, "li", "PLease")



    chartData(norm, y.norm_epa_mean, teamField.value, yearField.value)


}

const eapot = async() =>{

    const teamField = document.getElementById("teamInput")
    const yearField = document.getElementById("yearInput")
    const perYearData = document.getElementById("statsYear")

    let x = await requestStatbotics("https://api.statbotics.io/v2/team_years/team/" + teamField.value)
    let epaArr = []
    for(let i = 0; i < x.length; i++){
        epaArr.push(x[i].norm_epa_end)
    }

    // console.log(epaArr)
    // console.log(x)

    // let norm = x.norm_epa_end

    // addElement(perYearData, "li" , "AHAHHHHHHHHHHHHHHHHHHHHAAAAAAAAAAAAAA")


    chartEAPOT(epaArr, teamField.value)


}
function handleSelection() {
    var dropdown = document.getElementById("myDropdown");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    alert("Selected value: " + selectedValue);
  }

function addElement(element, type, text){
    const textLine = document.createElement(type);
    textLine.textContent = text;
    element.appendChild(textLine);
}

function addHref(element, type, text, href){
    const textLine = document.createElement(type);
    var link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    link.target = '_blank'; // Open link in a new tab
    textLine.appendChild(link);
    element.appendChild(textLine);

   
}

function animateLoadingText(element) {
    let loadingState = 0;
    let loadingHeading = element

    let text = element.textContent

    console.log("TEEEAM DATA" + text)
    setInterval(() => {
        switch (loadingState) {
            case 0:
                loadingHeading.textContent = text;
                loadingState = 1;
                break;
            case 1:
                loadingHeading.textContent = text + '.';
                loadingState = 2;
                break;
            case 2:
                loadingHeading.textContent = text + '..';
                loadingState = 3;
                break;
            case 3:
                loadingHeading.textContent = text + '...';
                loadingState = 0;
                break;
            default:
                break;
        }
    }, 250); // Adjust the interval as needed
}



function clearElement(element){
    element.textContent = ""
}

function fetchSimpleTeamData(simpleTeamBlacklist, headers){

    const url = 'https://www.thebluealliance.com/api/v3/'

    const teamField = document.getElementById("teamInput")
    const yearField = document.getElementById("yearInput")

    let teamData = document.getElementById("teamData")
    clearElement(teamData)
    teamData.style.display = "none"

    const loadingTeamData = document.getElementById("loadingTeamData")
    loadingTeamData.style.display = "block"

    let arr = []

    let anotherArr = []

    

    fetch(url + 'team/frc' + teamField.value , {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        var result = Object.keys(data).map((key) => [key, data[key]]);
        console.log(result)  
    
        for(let i = 0; i < result.length; i++){
            let text = result[i][0] + ": " +  result[i][1]
    
            if(simpleTeamBlacklist.includes(result[i][0])){
                continue
            } else {
                if(result[i][0] == "website"){
                    arr.push({teamData: result[i][0] + ": " + result[i][1], href:result[i][1]})
                    // addHref(teamData, "li", result[i][0] + ": " + result[i][1], result[i][1])
                } else {
                    arr.push({teamData: text, href: "none"})
                    // addElement(teamData, "li" , text)
                }

                anotherArr.push({title: result[i][0], data: result[i][1]})
            }
        }

        let yearTeam = [teamField.value, yearField.value]

        chrome.storage.sync.set({ 'teamData': arr });
        chrome.storage.sync.set({ 'yearTeam': yearTeam });


        let formArr = []
        for(let i = 0; i < anotherArr.length; i++){

            if(formArr.includes(anotherArr[i].title)){

            } else {
                if(anotherArr[i].title == "website"){
                    addHref(teamData, "li", anotherArr[i].title + ": " + anotherArr[i].data, anotherArr[i].data)
                } else {
                    addElement(teamData, "li", anotherArr[i].title + ": " + anotherArr[i].data)
                }

                formArr.push(anotherArr[i].title)
            }



            

        }

        formArr = []
       
        teamData.style.display = "block"

        const loadingTeamData = document.getElementById("loadingTeamData")
        loadingTeamData.style.display = "none"

        const teamDataTitle = document.getElementById("teamDataTitle")
        teamDataTitle.style.display = "block"

    
    
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const fetchTeamEvents = async (token, myDropdown, signal) => {

   

    var team = document.getElementById('teamInput').value;
    var year = document.getElementById('yearInput').value;

    var loadingWins = document.getElementById("loadingWins")
    loadingWins.style.display = "flex"

    var superDropdownContainer = document.getElementById("dropdownSuperContainer")
    superDropdownContainer.style.display = "none"

    let dropdownTriangle = document.getElementById("dropdown-triangle")
    dropdownTriangle.style.display = "none"

    let savedArr = []

    var keyArr = []
    var hrefArr = []
    var rankArr = []
    var wonArr = []

    console.log(token)
    var x = await requestWithSig('https://www.thebluealliance.com/api/v3/team/frc' + team + '/events/' + year, token, signal)
    console.log("XXXXXXXXXXXXXXXXX: " + x.length)
    for(let i = 0; i < x.length; i++){
        var y = await requestWithSig("https://www.thebluealliance.com/api/v3/team/frc" + team +"/event/" + x[i].key+ "/status", token, signal)

        console.log(x[i].name)
        console.log(y)
        // console.log("1999999 " + y.length)
        if(y !== null){
            if(y.playoff !== null){
                if(y.playoff.status !== null){
                    if(y.playoff.status === "won" && y.overall_status_str.includes("won the event")){
                        // console.log(x[i].key)

                        
                        console.log(x[i].name)
                        keyArr.push(x[i].name)
                        hrefArr.push(x[i].key)
                        if(y.qual != undefined){
                            if(y.qual.ranking != undefined){
                                if(y.qual.ranking.rank != undefined){
                                    rankArr.push(y.qual.ranking.rank + " out of " + y.qual.num_teams)

                                } else {
                                    rankArr.push("")
                                }
                            } else {
                                rankArr.push("")
                            }
                        } else {
                            rankArr.push("")
                        }
                        wonArr.push("Won")
                        console.log("AHHH " + y.overall_status_str.includes("won the event"))
                        // console.log(y)
                    }  else {
                        
                        keyArr.push(x[i].name)
                        hrefArr.push(x[i].key)
                        wonArr.push("Loss")
                        
                        if(y.qual != undefined){
                            if(y.qual.ranking != undefined){
                                if(y.qual.ranking.rank != undefined){
                                    rankArr.push(y.qual.ranking.rank + " out of " + y.qual.num_teams)
         
                                } else {
                                    rankArr.push("")
                                }
                            } else {
                                rankArr.push("")
                            }
                        } else {
                            rankArr.push("")
        
                        }
        
                    }
                }
                // console.log(x[i].name)
                // console.log(y)
                
            } else {
                        
                keyArr.push(x[i].name)
                hrefArr.push(x[i].key)
                wonArr.push("Loss")
                
                if(y.qual != undefined){
                    if(y.qual.ranking != undefined){
                        if(y.qual.ranking.rank != undefined){
                            rankArr.push(y.qual.ranking.rank + " out of " + y.qual.num_teams)

                        }
                    }
                } else {
                    rankArr.push("")

                }

            }
        }

        
    }



    clearTable()

    if(keyArr.length == 0){

        // addElement(myDropdown, "div", "EVENTS WON")
        addElement(myDropdown, "li", "No Events Won")
    } else {
        // addElement(myDropdown, "div", "EVENTS WON IN " + year)
        for(let i = 0; i < keyArr.length; i++){
            if(rankArr[i] == ""){
                // addRow(keyArr[i], rankArr[i], wonArr[i])
                addRow(keyArr[i], rankArr[i] + "No Rank", wonArr[i], "https://www.thebluealliance.com/event/" + hrefArr[i])

                addHref(myDropdown, "li", keyArr[i] + " / Won: " + wonArr[i], "https://www.thebluealliance.com/event/" + hrefArr[i])
                savedArr.push({name:keyArr[i], rank: "No Rank", won: wonArr[i], href:"https://www.thebluealliance.com/event/" + hrefArr[i]})

            } else {
                addRow(keyArr[i], rankArr[i], wonArr[i], "https://www.thebluealliance.com/event/" + hrefArr[i])
                addHref(myDropdown, "li", keyArr[i] + " / Rank: " + rankArr[i] + " / Won: " + wonArr[i], "https://www.thebluealliance.com/event/" + hrefArr[i])
                savedArr.push({name:keyArr[i], rank: rankArr[i], won: wonArr[i], href:"https://www.thebluealliance.com/event/" + hrefArr[i]})

            }
        }
    }

    

    console.log(savedArr)
    chrome.storage.sync.set({'savedEvents': savedArr });

    

    // var dropdownTriangle = document.getElementById("dropdown-triangle")
    // dropdownTriangle.style.display = "inline-block"


    // // var loading = document.getElementById("loading")
    // // loading.style.display = "none"

    // var eventsWonText = document.getElementById("eventsWonText")
    // eventsWonText.style.display = "block"

    var loadingWins = document.getElementById("loadingWins")
    loadingWins.style.display = "none"

    var superDropdownContainer = document.getElementById("dropdownSuperContainer")
    superDropdownContainer.style.display = "flex"

    dropdownTriangle.style.display = "inline-block"


    
    
    

    // console.log(keyArr)
    
    // };

    console.log("DONE")

};



const request = async (url, token) => {

    try {
        const response = await fetch(url, {
            headers: { 'X-TBA-Auth-Key': token }
        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const requestWithSig = async (url, token, signal, object, object2) => {

    try {
        const response = await fetch(url, {
            headers: { 'X-TBA-Auth-Key': token },
            signal: signal
        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch (error) {
        // object.style.display = "none"
        // object2.style.display = "none"
        console.error('Error:', error);
    }
};

const requestStatbotics = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

function addRow(name, rank, won, link) {
    console.log("WE ARE NOW IN ADD ROW")
    // console.log(danger)
  
    // console.log("COURSE: " + course)
    // console.log("PERCENT: " + percent)
    // console.log("GRADE: " + grade)
  
    // if(percent == null){
    //   percent = "n/a"
    // }
  
    var table = document.getElementById("myTable");
    var row = table.insertRow(table.rows.length);
    // row.style.backgroundColor = "red";
  
    // row.className = "hover-item"; // Add class to the newly added rows
  
    // row.classList.add('blue-row');
  
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    
    // var cell4 = row.insertCell(3);
    // var cell5 = row.insertCell(4);
  
    // cell1.innerHTML = "New";
  
    // console.log("PEEEEEEEEEERCENTNTNTNT" + grade)
    
    
  
    cell1.innerHTML = '<a href="' + link + '">' + name + '</a>'; // Apply bold style to the variable content
    cell2.innerHTML = rank;
    cell3.innerHTML = won;

    if(won == "Loss"){
        cell3.id = "pls"
    } else{
        cell3.id = "pls1"
    }
    // cell4.innerHTML = grade;
  
    // var checkbox = document.createElement('input');
    // checkbox.type = "checkbox";
    // checkbox.checked = checked
  
    // for(let i = 0; i < total.length; i++){
    //   // if(total[i][0] == course){
    //     if(checked){
    //       console.log("AGHGHGHGHGHGHGHHGHHGHHGHGHGHG")
    //       // total[i][1] =  total[i][1] + 1 
    //     }
    //   // }
    // }
  
    
  
   
  
    // row.classList.add("highlight");
  
    // row.classList.background-col or = "red"
  
    // row.style.color = "red"; // Set text color to white for better visibility
    // row.className = "table-hover";
  
  
  }

  
function clearTable() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
  
    for (var i = rowCount - 1; i > 1; i--) {
        table.deleteRow(i);
    }
  }




