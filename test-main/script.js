function toggleDropdown(id, arrowId) {
  const dropdown = document.getElementById(id);
  const arrow = document.getElementById(arrowId);
  
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    arrow.textContent = "▼";
  } else {
    dropdown.style.display = "block";
    arrow.textContent = "▲";
  }
}
