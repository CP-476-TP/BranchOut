const select = document.getElementById("dropdown-tags");
const tagContainer = document.getElementById("selectedTags");
var tags = ["Python", "SQL", "C", "Java", "C#", "Javascript", "Typescript", "C++"]


function addTag(value) {

  if (!value) return;

  //prevent dupes
  if(document.querySelector(`[data-tag="${value}"]`)) return;

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
}

function autocomplete(input, arr){
    var currentFocus;

    input.addEventListener("input", function(e) {
        var a, b, i, val = this.value;

        closeAllLists();
        if(!val) {return false;}
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++){
            /*check input value if starting letter is same as any tags */
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
                b = document.createElement("DIV");

                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    addTag(input.value);
                    input.value = "";
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }

        if (a.getElementsByTagName("div").length > 0) {
            currentFocus = 0;
            addActive(a.getElementsByTagName("div"));
        }
    });


  input.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");

      
      if (e.keyCode == 40) { //down arrow pressed then highlight next item
        currentFocus++;
        addActive(x);

      } else if (e.keyCode == 38) { //up arrow
        currentFocus--;
        addActive(x);

      } else if (e.keyCode == 13) { //enter
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }    
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++){
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}


autocomplete(document.getElementById("tag-search"), tags);

function renderProjects(projects) {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    projects.forEach(proj => {
        const box = document.createElement("div");
        box.classList.add("project-box");

        // project title and link
        const h3 = document.createElement("h3");
        const a = document.createElement("a");
        a.href = "view-post.html?id=" + proj.ProjectID;
        a.textContent = proj.ProjectName;
        h3.appendChild(a);
        box.appendChild(h3);

        // project tags
        if (proj.Tags && proj.Tags.length > 0) {
            const ul = document.createElement("ul");
            proj.Tags.forEach(tagObj => {
                const li = document.createElement("li");
                li.classList.add("tag");
                li.textContent = tagObj.Tag;
                ul.appendChild(li);
            });
            box.appendChild(ul);
        }

        const p = document.createElement("p");
        p.textContent = proj.Description;
        box.appendChild(p);


        grid.appendChild(box);
    });
}

renderProjects(Projects);
