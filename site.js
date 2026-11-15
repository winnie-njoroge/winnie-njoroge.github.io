"use strict";
const profile = window.academicProfile;
const element = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
};
function link(label, url) {
  const node = element("a", label);
  node.href = url;
  return node;
}
function paperList(target, papers, emptyText) {
  const container = document.getElementById(target);
  if (!papers.length) {
    container.append(element("p", emptyText, "placeholder"));
    return;
  }
  for (const paper of papers) {
    const article = element("article", "", "paper");
    const title = element("h3");
    title.append(paper.url ? link(paper.title, paper.url) : document.createTextNode(paper.title));
    article.append(title);
    if (paper.authors) article.append(element("p", paper.authors, "authors"));
    if (paper.venue || paper.year) {
      const venue = element("p", "", "venue");
      if (paper.venue) venue.append(element("em", paper.venue));
      if (paper.venue && paper.year) venue.append(document.createTextNode(", "));
      if (paper.year) venue.append(document.createTextNode(paper.year));
      article.append(venue);
    }
    if (paper.abstract) {
      const details = element("details");
      details.append(element("summary", "Abstract"), element("p", paper.abstract));
      article.append(details);
    }
    if (paper.links?.length) {
      const links = element("div", "", "paper-links");
      for (const item of paper.links) links.append(link(item.label, item.url));
      article.append(links);
    }
    container.append(article);
  }
}
document.title = `${profile.name} | Academic homepage`;
document.getElementById("name").textContent = profile.name;
document.getElementById("affiliation").textContent = profile.affiliation;
document.getElementById("draft").hidden = !profile.draft;
const biography = document.getElementById("biography");
biography.replaceChildren(...profile.biography.map(paragraph => element("p", paragraph)));
if (profile.portrait) {
  const portrait = document.getElementById("portrait");
  portrait.src = profile.portrait;
  portrait.alt = `Portrait of ${profile.name}`;
  portrait.hidden = false;
}
for (const item of profile.links) document.getElementById("profile-links").append(link(item.label, item.url));
const contacts = document.getElementById("contact-details");
if (profile.email) {
  const email = element("dd");
  email.append(link(profile.email, `mailto:${profile.email}`));
  contacts.append(element("dt", "Email"), email);
}
if (profile.office) contacts.append(element("dt", "Office"), element("dd", profile.office));
document.getElementById("contact-placeholder").hidden = Boolean(profile.email || profile.office);
paperList("publication-list", profile.publications, "Add your publications in profile.js.");
paperList("working-list", profile.workingPapers, "Add your working papers in profile.js.");
paperList("progress-list", profile.workInProgress, "Add your ongoing research in profile.js.");
for (const course of profile.teaching) {
  const article = element("article", "", "course");
  const heading = element("h3");
  heading.append(course.url ? link(course.title, course.url) : document.createTextNode(course.title));
  article.append(heading);
  if (course.description) article.append(element("p", course.description));
  document.getElementById("teaching-list").append(article);
}
if (!profile.teaching.length) document.getElementById("teaching-list").append(element("p", "Add your courses in profile.js.", "placeholder"));
document.getElementById("copyright").textContent = `© ${new Date().getFullYear()} ${profile.name}`;
