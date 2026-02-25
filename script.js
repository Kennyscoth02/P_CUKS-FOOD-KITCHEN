// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// MOBILE MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
const overlay = document.getElementById("menuOverlay");

hamburger.addEventListener("click", () => {
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
});

// close mobile menu when a link is selected
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// FADE-IN ANIMATION
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.3,
};

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// SHOPPING CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function updateCartUI() {
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      name: button.dataset.name,
      price: button.dataset.price,
    };
    cart.push(item);
    updateCartUI();
  });
});

updateCartUI();

// DARK MODE
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// OPEN CHECKOUT
const cartIcon = document.querySelector(".fa-cart-arrow-down");
const modal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

cartIcon.parentElement.addEventListener("click", () => {
  modal.style.display = "flex";
  renderCart();
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += parseFloat(item.price);
    cartItemsContainer.innerHTML += `
      <p>${item.name} - $${item.price}</p>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
}

// STRIPE PAYMENT
const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");

document.getElementById("pay-btn").addEventListener("click", async () => {
  alert("Stripe test integration requires backend server.");
});

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".footer-col", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 85%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});

// After successful checkout redirect
function clearCart() {
  cart = []; // clear the array
  localStorage.removeItem("cart"); // remove from storage
  updateCartUI(); // update counter
}

// Example: call after Stripe redirect success
// If using a success.html page
window.onload = () => {
  clearCart();
};
