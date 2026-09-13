const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

const toolGrid = $("#toolGrid");
const productGrid = $("#productGrid");
const categoryGrid = $("#categoryGrid");
const filterBar = $("#filterBar");
const searchInput = $("#toolSearch");
const mobileNav = $("#mobileNav");
const menuToggle = $("#menuToggle");
const themeToggle = $("#themeToggle");

let activeFilter = "All";
let query = "";

function cardHTML(item){
  const badgeClass = item.type === "Premium" ? "premium" : "free";
  return `
    <article class="${item.kind === "product" ? "product-card" : "tool-card"}">
      <div class="card-top">
        <div class="tool-icon">${item.icon}</div>
        <span class="badge ${badgeClass}">${item.type}</span>
      </div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="card-footer">
        <span class="text-link">${item.category}</span>
        <a class="use-link" href="${item.link}">${item.kind === "product" ? "View Product →" : "Use Now →"}</a>
      </div>
    </article>
  `;
}

function renderCategories(){
  categoryGrid.innerHTML = CATEGORIES.map((c, i) => `
    <button class="category-card" type="button" data-category="${c.name}">
      <div class="category-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </button>
  `).join("");

  $$(".category-card").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.category;
      renderFilters();
      renderTools();
      document.querySelector("#tools").scrollIntoView({behavior:"smooth"});
    });
  });
}

function renderFilters(){
  const filters = ["All", ...CATEGORIES.map(c => c.name)];
  filterBar.innerHTML = filters.map(f => `
    <button class="filter-chip ${f === activeFilter ? "active":""}" type="button" data-filter="${f}">
      ${f}
    </button>
  `).join("");

  $$(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      renderFilters();
      renderTools();
    });
  });
}

function renderTools(){
  const results = XR.filter(x => {
    if (x.kind !== "tool") return false;
    const matchFilter = activeFilter === "All" || x.category === activeFilter;
    const hay = `${x.name} ${x.desc} ${x.category}`.toLowerCase();
    return matchFilter && hay.includes(query.toLowerCase());
  });
  toolGrid.innerHTML = results.length
    ? results.map(cardHTML).join("")
    : `<div class="empty-state">No tools found. Try another search.</div>`;
}

function renderProducts(){
  productGrid.innerHTML = XR.filter(x => x.kind === "product").map(cardHTML).join("");
}

searchInput.addEventListener("input", e => {
  query = e.target.value;
  renderTools();
});

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

$$(".mobile-nav a").forEach(a => a.addEventListener("click", () => {
  mobileNav.classList.remove("show");
}));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☾" : "☼";
});

renderCategories();
renderFilters();
renderTools();
renderProducts();
