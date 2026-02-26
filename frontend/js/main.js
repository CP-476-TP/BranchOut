const select = document.getElementById("dropdown-tags");
const tagContainer = document.getElementById("selectedTags");

select.addEventListener("change", function () {
  const value = this.value;

  if (!value) return;

  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.setAttribute("data-tag", value);
  tag.textContent = value;

  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "tagRemoveBtn")
  removeBtn.textContent = "X";

  removeBtn.addEventListener("click", function () {
    tag.remove();
  });

  tag.appendChild(removeBtn);
  tagContainer.appendChild(tag);
});