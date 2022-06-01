console.log('hello')

window.addEventListener("load", () => {
  // initialize number of participants with local video.
  // we can have a max of six participants.
  let availableYarn = [1, 2, 3, 4, 5, 6];

  // element identifiers
  const startDiv = document.getElementById("start");
  const identityInput = document.getElementById("identity");
  const joinButton = document.getElementById("join");

  // join the video room
  async function connect() {
    console.log('connect')
    startDiv.style.display = "none";
    // TODO: Fetch an access token
    const response = await fetch("/token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({identity: identityInput.value})
    });
    const { token } = await response.json();
    console.log({token})

    // TODO: Use the access token to join a room
  }

  // TODO: Complete function for handling when a participant connects to the room
  function handleConnectedParticipant(participant) {}

  // TODO: Complete function for handling when a new participant track is published
  function handleTrackPublished(trackPublication, participant) {}

  // tidy up helper function for when a participant disconnects
  // or closes the page
  function handleDisconnectedParticipant(participant) {
    participant.removeAllListeners();
    const el = document.getElementById(`yarn-${participant.number}`);
    el.innerHTML = "";
    availableYarn.push(participant.number);
  }

  // helper to find a spot on the page to display participant video
  function findNextAvailableYarn(participant) {
    const index = Math.floor(Math.random() * availableYarn.length);
    const choice = availableYarn[index];
    availableYarn = availableYarn.filter((e) => e != choice);
    participant.number = choice;
  }

  // event listeners
  joinButton.addEventListener("click", connect);
});
