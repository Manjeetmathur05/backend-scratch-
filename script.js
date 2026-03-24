const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

// Golden scratch layer
const gradient = ctx.createLinearGradient(0, 0, 300, 160);
gradient.addColorStop(0, "#facc15");
gradient.addColorStop(1, "#eab308");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
});

let revealed = false;

canvas.addEventListener("mouseup", async () => {
  if (revealed) return;

  const userId = document.getElementById("userId").value;

  if (!userId) {
    alert("Enter mobile number");
    return;
  }

  const res = await fetch("https://backend-scratch.onrender.com/scratch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });

  const data = await res.json();

  document.getElementById("rewardText").innerHTML =
    `🎉 ₹${data.reward}`;

  document.getElementById("result").innerHTML =
    `Code: ${data.code}`;

  revealed = true;

  // Card animation
  document.getElementById("card").style.transform = "scale(1.05)";

  // Confetti 🎉
  for (let i = 0; i < 80; i++) {
    let confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "6px";
    confetti.style.height = "6px";
    confetti.style.background = "yellow";
    confetti.style.top = "0";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.opacity = Math.random();

    document.body.appendChild(confetti);

    let fall = setInterval(() => {
      confetti.style.top = parseInt(confetti.style.top) + 5 + "px";
    }, 20);

    setTimeout(() => {
      clearInterval(fall);
      confetti.remove();
    }, 2000);
  }
});
