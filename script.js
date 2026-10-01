document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Zavřít menu" : "Otevřít menu");
      navToggle.textContent = isOpen ? "Zavřít" : "Menu";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Otevřít menu");
        navToggle.textContent = "Menu";
      });
    });
  }

  const compare = document.querySelector("#compare");
  const range = compare?.querySelector('input[type="range"]');

  if (compare && range) {
    const updateCompare = () => {
      compare.style.setProperty("--pos", `${range.value}%`);
    };
    range.addEventListener("input", updateCompare);
    updateCompare();
  }

  const sizeButtons = document.querySelectorAll(".sizes button");
  const priceRows = document.querySelectorAll(".prices tbody tr");

  const updatePrices = (size) => {
    priceRows.forEach(row => {
      const price = row.querySelector(".price");
      const value = row.dataset[size];
      if (price && value) {
        price.textContent = `${Number(value).toLocaleString("cs-CZ")} Kč`;
      }
    });
  };

  sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
      sizeButtons.forEach(btn => btn.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      updatePrices(button.dataset.size);
    });
  });

  updatePrices("m");

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#form");
  const formMsg = document.querySelector(".form-msg");

  if (form && formMsg) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements.jmeno;
      const contact = form.elements.kontakt;
      let valid = true;

      [name, contact].forEach(field => {
        field.classList.remove("invalid");
        if (!field.value.trim()) {
          field.classList.add("invalid");
          valid = false;
        }
      });

      if (!valid) {
        formMsg.textContent = "Vyplňte prosím jméno a telefon nebo e-mail.";
        return;
      }

      formMsg.textContent = "Děkujeme, poptávka je připravena k odeslání.";
      form.reset();
    });
  }
});
