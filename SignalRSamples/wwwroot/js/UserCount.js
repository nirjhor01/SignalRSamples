//Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("hubs/userCount").build();
//methods that hub invokes aka receive notifications from hub.
connectionUserCount.on("UpdateTotalViews", (value) => {
    console.log(value);
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();

});
connectionUserCount.on("updateTotalUsers", (val) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = val.toString();
});
//3-invoke hub methods aka send notifications to hub.
function NewWindowLoadedOnClient() { 
    connectionUserCount.send("NewWindowLoaded");
}
//Start connection
function fulfilled() {
    NewWindowLoadedOnClient();
    console.log("Connection to Uer Hub Successful");
}

function rejected() {
    //rejected logs
     
}
connectionUserCount.start().then(fulfilled, rejected);
