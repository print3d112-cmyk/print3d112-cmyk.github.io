const sceneRoot = document.getElementById('sceneRoot');
const launchButton = document.getElementById('launchButton');
const speedValue = document.getElementById('speedValue');
const countdownValue = document.getElementById('countdownValue');
const engageStatus = document.getElementById('engageStatus');
const vaultStatus = document.getElementById('vaultStatus');
const vaultScene = document.getElementById('vaultScene');
const rickLink = document.getElementById('rickLink');

let countdownInterval;
let currentSpeed = 0;
let driftTimer = null;

const easeOutQuad = (t) => t * (2 - t);

const updateSpeed = (value) => {
  currentSpeed = value;
  speedValue.textContent = `${value.toFixed(2)}c`;
};

const animateSpeedTo = (target, duration = 700) => {
  const start = currentSpeed;
  const change = target - start;
  const begin = performance.now();

  const tick = (now) => {
    const elapsed = Math.min((now - begin) / duration, 1);
    const next = start + change * easeOutQuad(elapsed);
    updateSpeed(next);

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const setCountdownText = (value) => {
  countdownValue.textContent = value;
};

const setEngageStatus = (text) => {
  engageStatus.textContent = text;
};

const setVaultStatus = (text) => {
  vaultStatus.textContent = text;
};

const triggerDriftStop = () => {
  if (sceneRoot.classList.contains('drift-stop')) return;
  sceneRoot.classList.add('drift-stop', 'vault-ready');
  setVaultStatus('UNLOCKED');
  setEngageStatus('DRIFT');
  launchButton.textContent = 'VAULT READY';
  launchButton.disabled = true;
};

const scheduleDriftStop = () => {
  if (driftTimer) return;
  driftTimer = setTimeout(triggerDriftStop, Math.floor(Math.random() * 5000) + 5000);
};

const startLaunch = () => {
  if (sceneRoot.classList.contains('launching')) return;

  sceneRoot.classList.add('launching');
  launchButton.textContent = 'ENGAGING';
  launchButton.disabled = true;
  setEngageStatus('PREPARE');
  setVaultStatus('LOCKED');

  const launchStages = [
    { value: 5, speed: 2.8, label: 'SYSTEMS' },
    { value: 4, speed: 9.4, label: 'IGNITION' },
    { value: 3, speed: 19.6, label: 'TORQUE' },
    { value: 2, speed: 36.2, label: 'ACCEL' },
    { value: 1, speed: 58.1, label: 'AFTERBURN' },
  ];

  let stageIndex = 0;
  setCountdownText(launchStages[0].value);
  animateSpeedTo(launchStages[0].speed, 400);

  countdownInterval = setInterval(() => {
    stageIndex += 1;

    if (stageIndex < launchStages.length) {
      const stage = launchStages[stageIndex];
      setCountdownText(stage.value);
      setEngageStatus(stage.label);
      animateSpeedTo(stage.speed, 650);
      if (stageIndex === 1) {
        launchButton.textContent = 'LOCKED';
      }
    } else {
      clearInterval(countdownInterval);
      setCountdownText('LIFT OFF');
      setEngageStatus('HYPERDRIVE');
      setVaultStatus('INGRESS');
      animateSpeedTo(112.0, 1100);
      launchButton.textContent = 'LAUNCH';
      sceneRoot.classList.add('in-flight');
      scheduleDriftStop();

      setTimeout(() => {
        sceneRoot.classList.add('ready');
        sceneRoot.classList.remove('launching');
      }, 1400);
    }
  }, 1000);
};

window.addEventListener('load', () => {
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    sceneRoot.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });

  setTimeout(() => {
    if (!sceneRoot.classList.contains('launching')) {
      launchButton.textContent = 'PRESS SPACE OR CLICK LAUNCH';
    }
  }, 1200);
});

launchButton.addEventListener('click', (event) => {
  event.stopPropagation();
  startLaunch();
});

sceneRoot.addEventListener('click', (event) => {
  if (!sceneRoot.classList.contains('launching')) {
    startLaunch();
  }
});

vaultScene.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!sceneRoot.classList.contains('vault-ready') || sceneRoot.classList.contains('vault-open')) return;
  sceneRoot.classList.add('vault-open');
  setEngageStatus('OPENING');
  setVaultStatus('ACCESS GRANTED');
  launchButton.textContent = 'OPENING';
});

if (rickLink) {
  rickLink.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    startLaunch();
  }
});
