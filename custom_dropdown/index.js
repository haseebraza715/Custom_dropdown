document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownHeader = dropdown.querySelector(".dropdown-header");
  const dropdownList = dropdown.querySelector(".dropdown-list");
  const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
  const clearSelectionButton = document.getElementById("clear-selection");

  let currentIndex = -1; // For keyboard navigation

  // Toggle dropdown visibility
  dropdownHeader.addEventListener("click", () => {
    dropdownList.classList.toggle("open");
    currentIndex = -1; // Reset navigation index
  });

  // Handle item selection
  dropdownItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Update header with selected item text
      dropdownHeader.querySelector(".dropdown-placeholder").textContent =
        item.textContent;

      // Clear previous selection and mark the new one
      dropdownItems.forEach((i) => i.classList.remove("selected"));
      item.classList.add("selected");

      // Close dropdown
      dropdownList.classList.remove("open");
    });

    // Add keyboard navigation functionality
    item.addEventListener("keydown", (e) => handleKeyboardNavigation(e, index));
  });

  // Clear selection
  clearSelectionButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent dropdown toggle
    dropdownHeader.querySelector(".dropdown-placeholder").textContent =
      "Select an Item";
    dropdownItems.forEach((i) => i.classList.remove("selected"));
    dropdownList.classList.remove("open");
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdownList.classList.remove("open");
    }
  });

  // Keyboard navigation
  dropdownHeader.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % dropdownItems.length;
      focusItem(currentIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentIndex =
        (currentIndex - 1 + dropdownItems.length) % dropdownItems.length;
      focusItem(currentIndex);
    } else if (e.key === "Enter" && currentIndex >= 0) {
      dropdownItems[currentIndex].click();
    }
  });

  function focusItem(index) {
    dropdownItems.forEach((item) => item.classList.remove("hover"));
    dropdownItems[index].classList.add("hover");
    dropdownItems[index].focus();
  }
});
