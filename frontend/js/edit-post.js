const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

const project = Projects.find(p => p.ProjectID === projectId);


nameEl = document.getElementById("name");
descEl = document.getElementById("description");
tagsEl = document.getElementById("selectedTags");
githubEl = document.getElementById("github-link");
websiteEl = document.getElementById("website-link");
commEl = document.getElementById("communication-link");


nameEl.value = project.ProjectName;
descEl.value = project.Description;
githubEl.value = project.GitHub_Link;
websiteEl.value = project.Website_Link;
commEl.value = project.Communication_Link;

project.Tags.forEach(tagObj => addTag(tagObj.Tag));