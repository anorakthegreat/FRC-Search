// function saveClosingTime() {
//     chrome.storage.sync.set({"lastOpenedTime": Date.now() }, function() {
//         console.log('Extension closing time is saved.');
//     });
// }

// // Event listener for runtime.onSuspend
// chrome.runtime.onSuspend.addListener(function() {
//     alert("AHHHHHHHHHHOAF")
// });

// chrome.runtime.onConnect.addListener(function(port) {
//     if (port.name === "popup") {
//         port.onDisconnect.addListener(function() {
//             chrome.storage.sync.set({"lastOpenedTime": Date.now() }, function() {
//                 console.log('Extension closing time is saved.');
//             });
//         });
//     }
// });

// chrome.windows.onFocusChanged.addListener(function(window) {
//     //handle close event
//     console.log("PLELELELASELELASELAPSLAEPLDPALEPSALEPDL")

//     alert("AHHHHHHHHHHOAF")
// });