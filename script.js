const yearElement = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const sections = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");

if (yearElement) {
	yearElement.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const expanded = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!expanded));
		siteNav.classList.toggle("open", !expanded);
	});
}

for (const link of navLinks) {
	link.addEventListener("click", () => {
		if (siteNav && menuToggle) {
			siteNav.classList.remove("open");
			menuToggle.setAttribute("aria-expanded", "false");
		}
	});
}

const observer = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		}
	},
	{ threshold: 0.2 }
);

for (const section of sections) {
	observer.observe(section);
}
