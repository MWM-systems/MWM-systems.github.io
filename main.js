document.addEventListener("DOMContentLoaded", () => {
  const speedSlider    = document.getElementById("orbitSpeed");
  const angleSlider    = document.getElementById("particleAngle");
  const reverseToggle  = document.getElementById("reverseOrbit");
  const calmToggleBtn  = document.getElementById("calmToggle");

  const triadTracks = document.querySelectorAll(".triad-track");
  const userTrack   = document.querySelector(".user-track");
  const body        = document.body;

  /* 1. ORBIT SPEED CONTROL
     Slider 30–170 maps to factor ~0.5–1.7. We scale the
     animation duration of each triad track (3, 6, 9). */

  const baseDurations = [18, 12, 9]; // seconds for triad-3, -6, -9

  function updateSpeed() {
    if (!speedSlider) return;
    const value  = Number(speedSlider.value || 100);
    const factor = value / 100; // 0.3–1.7

    triadTracks.forEach((track, index) => {
      const base = baseDurations[index] || 18;
      // smaller duration = faster
      const adjusted = base / factor;
      track.style.animationDuration = `${adjusted}s, ${adjusted}s`;
      // note: we set both animations (reveal + spin) in CSS,
      // but spin is the infinite one so this mainly affects that.
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", updateSpeed);
    updateSpeed();
  }

  /* 2. USER PARTICLE ANGLE
     We rotate the user track around the torus, so the
     particle sits anywhere on the ring. */

  function updateUserAngle() {
    if (!userTrack || !angleSlider) return;
    const angle = Number(angleSlider.value || 15);
    userTrack.style.transform =
      `translate(-50%, -50%) rotate(${angle}deg)`;
  }

  if (angleSlider) {
    angleSlider.addEventListener("input", updateUserAngle);
    updateUserAngle();
  }

  /* 3. REVERSE ORBIT DIRECTION
     Toggle animation-direction on triad tracks. */

  function updateDirection() {
    const reverse = reverseToggle && reverseToggle.checked;
    triadTracks.forEach(track => {
      track.style.animationDirection = reverse ? "reverse, reverse" : "normal, normal";
    });
  }

  if (reverseToggle) {
    reverseToggle.addEventListener("change", updateDirection);
    updateDirection();
  }

  /* 4. CALM MODE
     Adds/removes a class on <body> that pauses animations.
     Button label updates so you know the state. */

  function toggleCalmMode() {
    body.classList.toggle("calm-mode");
    const isCalm = body.classList.contains("calm-mode");
    if (calmToggleBtn) {
      calmToggleBtn.textContent = isCalm ? "Calm mode: ON" : "Calm mode";
    }
  }

  if (calmToggleBtn) {
    calmToggleBtn.addEventListener("click", toggleCalmMode);
  }
});
