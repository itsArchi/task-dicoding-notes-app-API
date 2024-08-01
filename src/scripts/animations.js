import gsap from "gsap";

export const showElement = (element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

export const hideElement = (element) => {
  gsap.to(element, { opacity: 0, duration: 1 });
};
