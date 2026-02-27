const select = document.getElementById("dropdown-tags");
const tagContainer = document.getElementById("selectedTags");
var tags = ["Python", "SQL", "C", "Java", "C#", "Javascript", "Typescript", "C++"]

const Projects = [
  {
    ProjectID: 1, /*xUnit.net */
    ProjectName: "xUnit.net",
    Description: "A free, open source, community-focused unit testing tool for the .NET Framework.",
    GitHub_Link: "https://github.com/xunit/xunit",
    Website_Link: "https://xunit.net/?tabs=cs",
    Communication_Link: "https://github.com/bradwilson",
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
    ProjectName: "GLPI",
    Description: "GLPI is a Free Asset and IT Management Software package, Data center management, ITIL Service Desk, licenses tracking and software auditing.",
    GitHub_Link: "https://github.com/glpi-project/glpi",
    Website_Link: "https://www.glpi-project.org/en/",
    Communication_Link: "https://forum.glpi-project.org/",
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

  {
    ProjectID: 3,
    ProjectName: "supercollider",
    Description: "An audio server, programming language, and IDE for sound synthesis and algorithmic composition.",
    GitHub_Link: "https://github.com/supercollider/supercollider",
    Website_Link: "supercollider.github.io",
    Communication_Link: "https://scsynth.slack.com/join/shared_invite/zt-ezoyz15j-SVM7JVul94pxtDiUDRnd0w#/shared-invite/email",
    Tags: [
      {
        TagID: 5,
        Tag: "C++",
        Type: "Language"
      },
    ]
  },

  {
    ProjectID: 4,
    ProjectName: "mopidy",
    Description: "Mopidy is an extensible music server written in Python",
    GitHub_Link: "https://github.com/mopidy/mopidy",
    Website_Link: "https://mopidy.com/",
    Communication_Link: "https://mopidy.zulipchat.com/",
    Tags: [
      {
        TagID: 6,
        Tag: "Python",
        Type: "Language"
      },
    ]
  },
  {
    ProjectID: 5,
    ProjectName: "Antenna Pod",
    Description: "A podcast manager for Android",
    GitHub_Link: "https://github.com/AntennaPod/AntennaPod",
    Website_Link: "www.antennapod.org",
    Communication_Link: "https://forum.antennapod.org/",
    Tags: [
      {
        TagID: 7,
        Tag: "Java",
        Type: "Language"
      },
    ]
  },
  {
    ProjectID: 6,
    ProjectName: "amphtml",
    Description: "The AMP web component framework.",
    GitHub_Link: "https://github.com/ampproject/amphtml",
    Website_Link: "amp.dev",
    Communication_Link: "https://amp.dev/support/",
    Tags: [
      {
        TagID: 8,
        Tag: "Javascript",
        Type: "Language"
      },
      {
        TagID: 9,
        Tag: "HTML",
        Type: "Language"
      },
    ]
  },
];


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
