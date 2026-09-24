document.addEventListener("DOMContentLoaded", () => {
  // Mobilní menu
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // Ceník podle velikosti vozu
  const formatter = new Intl.NumberFormat("cs-CZ");
  const rows = document.querySelectorAll(".prices tbody tr");
  const tabs = document.querySelectorAll(".sizes button");

  const showPrices = (size) => {
    rows.forEach((row) => {
      row.querySelector(".price").textContent = formatter.format(row.dataset[size]) + " Kč";
    });
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.size === size)));
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => showPrices(tab.dataset.size)));
  showPrices("m");

  // Porovnání lakuů před a po
  const compare = document.getElementById("compare");
  const range = compare.querySelector("input[type=range]");
  range.addEventListener("input", () => compare.style.setProperty("--pos", range.value + "%"));

  // Formulář (ukázka: pro ostrý provoz napojte na e-mail nebo backend)
  const form = document.getElementById("form");
  const msg = form.querySelector(".form-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = form.querySelectorAll("[required]");
    let valid = true;
    required.forEach((field) => {
      const empty = !field.value.trim();
      field.classList.toggle("invalid", empty);
      if (empty) valid = false;
    });
    if (!valid) {
      msg.textContent = "Vyplňte prosím jméno a kontakt.";
      return;
    }
    const name = form.jmeno.value.trim();
    msg.textContent = "Děkujeme, " + name + ". Poptávku jsme přijali a ozveme se do jednoho pracovního dne.";
    form.reset();
  });

  // Aktuální rok v patičce
  document.getElementById("year").textContent = new Date().getFullYear();
});
