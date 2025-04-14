
let score = 0;
let progress = 1;

const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');

const scenarios = {

  newsletter: {
    title: "📰 Weekly Newsletter",
    text: `Thanks for subscribing to our weekly newsletter!

Stay tuned for updates, exclusive content, and tips straight to your inbox every Monday.

No action needed – just enjoy!`,
    correct: "real"
  },
  orderConfirmation: {
    title: "🛒 Order Confirmation",
    text: `Hi,

Thanks for your order! Your package #12345 has been confirmed and is being prepared for shipment.

You can track your order here: [🔒official-store.com/track-order]`,
    correct: "real"
  },
  doctorReminder: {
    title: "🩺 Appointment Reminder",
    text: `Bonjour,

This is a friendly reminder for your dentist appointment on Tuesday at 14:30.

If you need to reschedule, please call us at 05 56 00 00 00.

– Cabinet Dentaire Bordeaux`,
    correct: "real"
  },
  calendarInvite: {
    title: "📆 Calendar Invite",
    text: `You have been invited to the meeting:
"Team Sync – Friday at 10:00"

Click to accept or decline: [🔒calendar.google.com]`,
    correct: "real"
  },
  eventTicket: {
    title: "🎟️ Event Ticket",
    text: `Your ticket for “Jazz Night Bordeaux” is confirmed!

Show this QR code at the entrance:
[✔️ valid QR image here]

Doors open at 19:00. See you there!`,
    correct: "real"
  },

  fakeSurvey: {
    title: "📋 Survey",
    text: `You're selected for an exclusive survey! 🧠

Complete this 2-minute survey and win a free iPhone 15.

Just share your address and card info for shipping ➡️ [htpps://-survey.link]`,
    correct: "scam"
  },
  socialMedia: {
    title: "📱 Social Media Giveaway",
    text: `🎁 You've been tagged in a giveaway!

You won a $500 Amazon Gift Card 🤑

Just verify your identity by logging in here: [htpps-login.social]`,
    correct: "scam"
  },
  charity: {
    title: "❤️ Charity",
    text: `URGENT: Help Earthquake Victims 🆘

Donate now to support families in crisis. Every euro counts.

Send your donation to this crypto wallet: [https://-eth-address]

Thank you for your compassion.`,
    correct: "scam"
  },
  qrCode: {
    title: "🔳 QR Code ",
    text: `Parking payment required 🚗

Scan the QR code below to pay €2.50

[🟦 QR image here]

(Do not miss your payment or your vehicle may be fined.)`,
    correct: "scam"
  },
  bankCall: {
    title: "🏦  Bank Call",
    text: `Hello, this is your bank.

We noticed suspicious activity. For your security, please confirm your card number and PIN now.

Failure to respond may lead to account freeze.`,
    correct: "scam"
  },
imposterscam: {
  title: "🎭 Work email",
  text: `Subject: Action Required: IT Support

Dear Employee,

This is your designated IT support provider. Due to a security update, you must reset your password using the secure link below. Failure to comply may result in suspended access.

Reset here: [htpps:///company-support.tech/]`,
  correct: "scam"
},
taxrefundnotif: {
title: "🧾 Tax Refund",
text: `Subject: Immediate Tax Refund Notification
Dear Taxpayer,
You are eligible for a €1,225 tax refund. Please confirm your identity and submit your bank details here: [govs-refounnd-portal.tax]
Deadline: Today at 6PM`,
correct: "scam"
},
bankscam: {
title: "💳 Credit Card and Debit Card ",
text: `[Your Bank] ALERT: Suspicious transaction of €450 at “Tech Gear EU.”
If this wasn’t you, click here and reset your account immediately to secure your card: [bannnk-link.com]`,
correct: "scam"
}
};

let currentLevel = null;
let scenarioQueue = [];

function loadRandomScenario() {
  if (scenarioQueue.length === 0) {
    scenarioQueue = Object.keys(scenarios)
      .map(key => ({ key, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ key }) => key);
  }
  const nextKey = scenarioQueue.pop();
  document.getElementById('progress-count').textContent = `Progress: Question ${progress} / 7`;
  startLevel(nextKey);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToHome() {
  document.getElementById('level-progress').textContent = progress;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('filled', i < progress);
  });
  showScreen('home-screen');
}

function goToLevels() {
  showScreen('levels-screen');
}

function startLevel(key) {
  playSound(clickSound);
  currentLevel = scenarios[key];
  document.getElementById('level-title').textContent = currentLevel.title;
  document.getElementById('scenario-text').textContent = currentLevel.text;
  showScreen('game-screen');
}

function answer(choice) {
  const result = document.getElementById('result-msg');
  const badge = document.getElementById('badge');

  let isCorrect = (choice === currentLevel.correct);
  if (isCorrect) {
    if (currentLevel.correct === "scam") {
      result.textContent = "✅ Correct! You spotted the scam.";
    } else {
      result.textContent = "🆗 Well done! This message was safe.";
    }
    playSound(successSound);
    score++;
    badge.classList.remove('hidden');
  } else {
    result.textContent = "❌ Oops! That was a scam.";
    playSound(failSound);
    badge.classList.add('hidden');
  }
  document.getElementById('score').textContent = score;
  const funFacts = [
    "Scammers often use urgency to trick you.",
    "Romance scams cost victims over $300 million per year.",
    "Phishing emails often have spelling mistakes.",
    "Fake job offers usually ask for personal info early.",
    "If it seems too good to be true, it probably is.",
    "Scammers may impersonate real companies or banks.",
    "Verify links before clicking – always.",
    "Real organizations don’t pressure you to act fast.",
    "Don't trust unknown senders asking for money or info.",
    "Scams often use emotional manipulation to trick victims."
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  document.getElementById("fun-fact").textContent = "💡 " + randomFact;
  progress++;
  document.getElementById('progress-count').textContent = `Progress: Question ${progress} / 7`;
  showScreen('result-screen');

  if (progress >= 7) {
    document.getElementById('final-score').textContent = `🎯 Final Score: ${score} out of 7 correct`;
    const badge = document.getElementById('final-badge');
    if (score <= 2) {
      badge.textContent = "😬 Beginner – Watch out!";
    } else if (score <= 5) {
      badge.textContent = "👀 Getting There – Stay alert!";
    } else {
      badge.textContent = "🧠 Scam Radar Pro!";
    }
    showScreen('final-screen');
    return;
  }

}

function playSound(sound) {
  if (!sound) return;
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("🔊 Sound played:", sound.id);
      })
      .catch((error) => {
        console.warn("🚫 Sound playback blocked or failed:", sound.id, error);
        document.body.addEventListener('click', () => {
          sound.play().catch(err => console.error("Still blocked:", err));
        }, { once: true });
      });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const introSound = document.getElementById('intro-sound');
  if (!introSound) return;

  const playPromise = introSound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("🎵 Intro played");
      })
      .catch((err) => {
        console.warn("🔇 Autoplay blocked, waiting for click...");
        document.body.addEventListener('click', () => {
          introSound.play().catch(err => console.error("Still blocked:", err));
        }, { once: true });
      });
  }
});


function resetGame() {
  score = 0;
  progress = 1;
  document.getElementById('score').textContent = score;
  document.getElementById('level-progress').textContent = progress;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.remove('filled');
    if (i === 0) d.classList.add('filled');
  });
  loadRandomScenario();
}



window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const levelKey = params.get("level");
  if (levelKey && typeof startLevel === 'function') {
    startLevel(levelKey);
    showScreen('game-screen');
  }
});
