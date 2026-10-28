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

const skillPhrase = document.getElementById("skillPhrase");
const skillPhrases = [
	"polished, real-world websites",
	"clear paths for customers",
	"responsive layouts that feel simple",
	"thoughtful user flows",
	"welcoming brand sites",
];

if (skillPhrase) {
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	skillPhrase.textContent = skillPhrases[0];

	if (!reduceMotion) {
		let phraseIndex = 0;
		let charIndex = skillPhrases[0].length;
		let isDeleting = true;

		const typeSkillPhrase = () => {
			const currentPhrase = skillPhrases[phraseIndex];

			if (isDeleting) {
				charIndex -= 1;
				skillPhrase.textContent = currentPhrase.slice(0, charIndex);

				if (charIndex === 0) {
					isDeleting = false;
					phraseIndex = (phraseIndex + 1) % skillPhrases.length;
					window.setTimeout(typeSkillPhrase, 160);
					return;
				}

				window.setTimeout(typeSkillPhrase, 42);
				return;
			}

			charIndex += 1;
			skillPhrase.textContent = currentPhrase.slice(0, charIndex);

			if (charIndex === currentPhrase.length) {
				isDeleting = true;
				window.setTimeout(typeSkillPhrase, 1800);
				return;
			}

			window.setTimeout(typeSkillPhrase, 85);
		};

		window.setTimeout(typeSkillPhrase, 1800);
	}
}
