// Firebase Config (Tumhara)
const firebaseConfig = {
    apiKey: "AIzaSyBIKwwwJa23liDXE89IsyJttQWJsReIPJA",
    authDomain: "yaduchat.firebaseapp.com",
    databaseURL: "https://yaduchat-default-rtdb.firebaseio.com",
    projectId: "yaduchat",
    storageBucket: "yaduchat.appspot.com",
    messagingSenderId: "266697407895",
    appId: "1:266697407895:web:f45ccaa470443e11bf18d2",
    measurementId: "G-FYG9D1XLLK"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);

// Database reference lo
const database = firebase.database();


// 🔥 4. Message Send Karne Ka Function
function sendMessage() {
    let messageInput = document.getElementById("message");
    let chatBox = document.getElementById("chat-box");

    if (messageInput.value.trim() === "") return;

    // Firebase me message save karo
    database.ref("messages").push({
        text: messageInput.value,
        timestamp: Date.now()
    });

    messageInput.value = "";
}

// 🔥 5. Realtime Messages Fetch Karo
database.ref("messages").on("child_added", function(snapshot) {
    let messageData = snapshot.val();
    let chatBox = document.getElementById("chat-box");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "received");
    messageDiv.textContent = messageData.text;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// 🔥 6. Enter Press Karne Par Message Send Ho
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
