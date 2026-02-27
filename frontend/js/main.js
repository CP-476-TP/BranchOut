const select = document.getElementById("dropdown-tags");
const tagContainer = document.getElementById("selectedTags");
var tags = ["Python", "SQL", "C", "Java", "C#", "Javascript", "Typescript"]

const Projects = [
  {
    ProjectID: 1, /*xUnit.net */
    Description: "A free, open source, community-focused unit testing tool for the .NET Framework.",
    GitHub_Link: "https://github.com/xunit/xunit",
    Website_Link: "https://xunit.net/?tabs=cs",
    Communication_Link: "",
    Tags: [
      {
        TagID: 1,
        Tag: "C#",
        Type: "Language"
      },
      {
        TagID: 2,
        Tag: ".Net",
        Type: "Framework"
      }
    ]
  },

  {
    ProjectID: 2, /*GLPI Project*/
    Description: "GLPI is a Free Asset and IT Management Software package, Data center management, ITIL Service Desk, licenses tracking and software auditing.",
    GitHub_Link: "https://github.com/glpi-project/glpi",
    Website_Link: "https://www.glpi-project.org/en/",
    Communication_Link: "",
    Tags: [
      {
        TagID: 3,
        Tag: "Python",
        Type: "Language"
      },
      {
        TagID: 4,
        Tag: "Typescript",
        Type: "Language"
      }
    ]
  },
];


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

        this.parentNode.appendChild(a)

        for (i = 0; i < arr.length; i++){
            /*check input value if starting letter is same as any tags */
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
                b = document.createElement("DIV");

                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length)
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    }
};