const API_URL = "https://message-viewer.cubiodojo.workers.dev";

async function storeMessage() {
    const message = document.getElementById("messageInput").value;
    if (!message) return alert("Enter a message!");

    const response = await fetch(`${API_URL}/store`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    document.getElementById("messageLink").innerHTML = 
        `Share this ID: <b>${data.id}</b>`;
}

async function retrieveMessage() {
    const id = document.getElementById("messageId").value;
    if (!id) return alert("Enter an ID!");

    const response = await fetch(`${API_URL}/retrieve/${id}`);
    
    if (response.status === 404) {
        document.getElementById("retrievedMessage").innerText = "Message not found or already viewed!";
    } else {
        const data = await response.json();
        document.getElementById("retrievedMessage").innerText = `Message: ${data.message}`;
    }
}
