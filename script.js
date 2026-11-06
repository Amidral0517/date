// ==========================================
// СОНГОЛТУУДЫГ ХАДГАЛАХ
// ==========================================

let selectedType = "";
let selectedDate = "";
let selectedTime = "";
let selectedPlace = "";
let userMessage = "";

// ==========================================
// PAGE ХУУДАС СОЛИХ
// ==========================================

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// ЭХНИЙ "ТИЙМ" ТОВЧ
// ==========================================

const yesBtn = document.getElementById("yesBtn");

yesBtn.addEventListener("click", function () {
  showPage("typePage");

  createHearts();
});

// ==========================================
// "ҮГҮЙ" ТОВЧ ЗУГТААХ
// ==========================================

const noBtn = document.getElementById("noBtn");

const hint = document.getElementById("hint");

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", function (event) {
  event.preventDefault();

  moveNoButton();
});

// ==========================================
// ҮГҮЙ ТОВЧИЙГ ӨӨР ГАЗАР ЗӨӨХ
// ==========================================

function moveNoButton() {
  const buttonWidth = noBtn.offsetWidth;

  const buttonHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - buttonWidth - 25;

  const maxY = window.innerHeight - buttonHeight - 25;

  const randomX = Math.random() * Math.max(maxX, 50);

  const randomY = Math.random() * Math.max(maxY, 50);

  noBtn.style.position = "fixed";

  noBtn.style.left = randomX + "px";

  noBtn.style.top = randomY + "px";

  noBtn.style.zIndex = "9999";

  const messages = [
    "Өө хөөе 😂 баригдсангүй!",
    "Энэ товч зугтаад байна аа 😏",
    "Дахиад оролдоод үз дээ 😂",
    "Бараг барьчихлаа!",
    "Яагаад намайг барих гээд байгаа юм бэ? 😆",
    "guiy bitgiildee",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  hint.textContent = randomMessage;
}

// ==========================================
// БОЛЗООНЫ ТӨРӨЛ
// ==========================================

const typeButtons = document.querySelectorAll(".choice");

const typeNext = document.getElementById("typeNext");

typeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    typeButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedType = button.dataset.type;

    typeNext.disabled = false;
  });
});

typeNext.addEventListener("click", function () {
  showPage("datePage");
});

// ==========================================
// ӨДӨР СОНГОХ
// ==========================================

const dateInput = document.getElementById("dateInput");

const selectedDateText = document.getElementById("selectedDate");

const dateNext = document.getElementById("dateNext");

// Өнөөдрөөс өмнөх өдрийг сонгохгүй
const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;

dateInput.addEventListener("change", function () {
  selectedDate = dateInput.value;

  if (selectedDate !== "") {
    const date = new Date(selectedDate + "T00:00:00");

    const formatted = date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    selectedDateText.textContent = "📅 " + formatted;

    dateNext.disabled = false;
  }
});

dateNext.addEventListener("click", function () {
  showPage("timePage");
});

// ==========================================
// ЦАГ СОНГОХ
// ==========================================

const timeButtons = document.querySelectorAll(".time-btn");

const selectedTimeText = document.getElementById("selectedTime");

const timeNext = document.getElementById("timeNext");

timeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    timeButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedTime = button.textContent.trim();

    selectedTimeText.textContent = "🕐 Сонгосон цаг: " + selectedTime;

    timeNext.disabled = false;
  });
});

timeNext.addEventListener("click", function () {
  showPage("placePage");
});

// ==========================================
// ГАЗАР СОНГОХ
// ==========================================

const placeButtons = document.querySelectorAll(".place-btn");

const customPlace = document.getElementById("customPlace");

const selectedPlaceText = document.getElementById("selectedPlace");

const placeNext = document.getElementById("placeNext");

placeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    placeButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    const placeName = button.querySelector("span").textContent;

    selectedPlace = placeName;

    customPlace.value = "";

    selectedPlaceText.textContent = "📍 Сонгосон газар: " + selectedPlace;

    placeNext.disabled = false;
  });
});

// Өөрийн газар бичих

customPlace.addEventListener("input", function () {
  if (customPlace.value.trim() !== "") {
    placeButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    selectedPlace = customPlace.value.trim();

    selectedPlaceText.textContent = "📍 Сонгосон газар: " + selectedPlace;

    placeNext.disabled = false;
  } else {
    selectedPlace = "";

    selectedPlaceText.textContent = "Газар сонгоогүй байна.";

    placeNext.disabled = true;
  }
});

placeNext.addEventListener("click", function () {
  showPage("messagePage");
});

// ==========================================
// МЕССЕЖ
// ==========================================

const messageInput = document.getElementById("messageInput");

const reviewBtn = document.getElementById("reviewBtn");

reviewBtn.addEventListener("click", function () {
  userMessage = messageInput.value.trim();

  if (userMessage === "") {
    userMessage = "Мессеж үлдээгээгүй.";
  }

  showSummary();

  showPage("reviewPage");
});

// ==========================================
// СОНГОЛТУУДЫГ ХАРУУЛАХ
// ==========================================

function showSummary() {
  document.getElementById("summaryType").textContent = selectedType;

  document.getElementById("summaryDate").textContent = formatDate(selectedDate);

  document.getElementById("summaryTime").textContent = selectedTime;

  document.getElementById("summaryPlace").textContent = selectedPlace;

  document.getElementById("summaryMessage").textContent = userMessage;
}

// ==========================================
// ӨДРИЙГ МОНГОЛООР ХАРУУЛАХ
// ==========================================

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ==========================================
// БОЛЗООГ БАТАЛГААЖУУЛАХ
// ==========================================

const confirmBtn = document.getElementById("confirmBtn");

confirmBtn.addEventListener("click", function () {
  document.getElementById("finalDate").textContent = formatDate(selectedDate);

  document.getElementById("finalTime").textContent = selectedTime;

  document.getElementById("finalPlace").textContent = selectedPlace;

  document.getElementById("finalType").textContent = selectedType;

  document.getElementById("finalMessage").textContent =
    userMessage === "Мессеж үлдээгээгүй." ? "" : "💌 " + userMessage;

  showPage("successPage");

  createHearts();

  startCountdown();
});

// ==========================================
// COUNTDOWN
// ==========================================

let countdownInterval;

function startCountdown() {
  clearInterval(countdownInterval);

  const target = new Date(`${selectedDate}T${selectedTime}:00`).getTime();

  function updateCountdown() {
    const now = new Date().getTime();

    const difference = target - now;

    if (difference <= 0) {
      document.getElementById("countdown").textContent =
        "💗 Өнөөдөр бидний болзоо!";

      clearInterval(countdownInterval);

      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("countdown").textContent =
      `${days} өдөр ` +
      `${hours} цаг ` +
      `${minutes} минут ` +
      `${seconds} секунд`;
  }

  updateCountdown();

  countdownInterval = setInterval(updateCountdown, 1000);
}

// ==========================================
// НИСЭХ ЗҮРХНҮҮД
// ==========================================

function createHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");

    heart.textContent = ["💗", "💖", "💕", "💓"][Math.floor(Math.random() * 4)];

    heart.style.position = "fixed";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.bottom = "-40px";

    heart.style.fontSize = 15 + Math.random() * 25 + "px";

    heart.style.zIndex = "9999";

    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    const duration = 2 + Math.random() * 3;

    heart.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },

        {
          transform: `translateY(-${window.innerHeight + 100}px)
                         rotate(360deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,

        easing: "ease-out",
      },
    );

    setTimeout(function () {
      heart.remove();
    }, duration * 1000);
  }
}
