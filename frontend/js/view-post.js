const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

const project = Projects.find(p => p.ProjectID === projectId);

const titleEl = document.getElementById("project-title");
const descEl = document.getElementById("project-description");
const tagsEl = document.getElementById("project-tags");
const linksEl = document.getElementById("project-links");
const editLink = document.getElementById("edit-link");

if (project) {
    titleEl.textContent = project.ProjectName;
    descEl.textContent = project.Description;
    editLink.href = "edit-post.html?id=" + project.ProjectID;

    project.Tags.forEach(tagObj => {
        const span = document.createElement("span");
        span.classList.add("tag");
        span.textContent = tagObj.Tag;
        tagsEl.appendChild(span);
    })

    if (project.GitHub_Link) {
        const div = document.createElement("div");
        div.classList.add("link-section");

        div.innerHTML = `
            <h2>GitHub</h2>
            <a href="${project.GitHub_Link}" target="_blank">
                ${project.GitHub_Link}
            </a>
        `;

        linksEl.appendChild(div);
    }

    if (project.Website_Link) {
        const div = document.createElement("div");
        div.classList.add("link-section");

        div.innerHTML = `
            <h2>Website</h2>
            <a href="${project.Website_Link}" target="_blank">
                ${project.Website_Link}
            </a>
        `;

        linksEl.appendChild(div);
    }

    if (project.Communication_Link) {
        const div = document.createElement("div");
        div.classList.add("link-section");

        div.innerHTML = `
            <h2>Communication</h2>
            <a href="${project.Communication_Link}" target="_blank">
                ${project.Communication_Link}
            </a>
        `;

        linksEl.appendChild(div);
    }

} else {
    titleEl.textContent = "Project Not Found";
}