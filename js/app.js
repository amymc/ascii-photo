var app = (function() {

  var asciiContainer = document.getElementById("ascii"),
      snapshotContainer = document.getElementById('snapshot-container'),
      video = document.createElement("video"),
      canvas = document.createElement("canvas"),
      context = canvas.getContext('2d'),
      newSnapshot,
      width= 160,
      height= 120;


  function init(){

    video.setAttribute('width', width);
    video.setAttribute('height', height);

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    document.getElementById('snapshot-btn').addEventListener('click', takeSnapshot, false);
    document.getElementById('colours-btn').addEventListener("click", changeColour, false);

    navigator.getUserMedia({video: true}, function(stream) {
      successCallback(stream);
    }, errorCallback);

  }


  function takeSnapshot() {
    var oldSnapshot = document.getElementById('snapshot');
    snapshotContainer.removeChild(oldSnapshot);
    newSnapshot = asciiContainer.cloneNode(true);
    newSnapshot.id = "snapshot";
    snapshotContainer.appendChild(newSnapshot);
     // document.getElementById('email-input').style.display = "block";
     // document.getElementById('send-btn').addEventListener("click", sendEmail, false);
  }

  // function sendEmail(){
  //     var emailAddress = document.getElementById("email").value;
  //     var newCanvas = document.createElement("canvas");
  //     newCanvas.width = newSnapshot.width;
  //     newCanvas.height = newSnapshot.height;
  //     newCanvas.getContext("2d").drawImage(newSnapshot, 0, 0);
  //     var mailto_link="mailto:"+emailAddress+"?subject='your ascii snapshot'&body="newSnapshot"/>";
  //     win=window.open(mailto_link,'emailWin');
  // }


  function changeColour(){
    asciiContainer.classList.toggle('dark');
}

  function successCallback(stream) {

    video.src = window.URL.createObjectURL(stream);
    video.play();

    setInterval(function() {
      context.drawImage(video, 0, 0, video.width, video.height);
      ascii.fromCanvas(canvas, {
        callback: function(asciiString) {
            asciiContainer.innerHTML = asciiString;
        }
      });
    }, 100);
  }


  function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
  }


  return{
    asciiContainer: asciiContainer,
    init: init()
  }

})();
