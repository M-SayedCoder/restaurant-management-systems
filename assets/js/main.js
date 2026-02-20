const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sid");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  console.log("omar");
  
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});