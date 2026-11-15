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
  if (!url.startsWith("#") && !/^(mailto:|tel:)/i.test(url)) {
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  }
  return node;
}
function appendLinkedNames(container, text) {
  const destinations = {
    "CERGE-EI": "https://www.cerge-ei.cz/",
    "Michal Bauer": "https://sites.google.com/view/michal-bauer/home",
    "Julie Chytilová": "https://www.cerge-ei.cz/cs/researchers-cz/doc-phdr-julie-chytilova-phd",
    "Jana Cahlíková": "http://janacahlikova.net/",
    "Edward Miguel": "https://emiguel.econ.berkeley.edu/"
  };
  for (const part of text.split(/(CERGE-EI|Michal Bauer|Julie Chytilová|Jana Cahlíková|Edward Miguel)/g)) {
    container.append(destinations[part] ? link(part, destinations[part]) : document.createTextNode(part));
  }
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
    if (paper.status) title.append(element("span", ` (${paper.status})`, "paper-status"));
    article.append(title);
    if (paper.authors) {
      const names = paper.authors.trim().replace(/^\((.*)\)$/s, "$1").replace(/^with\s+/i, "");
      const authors = element("p", "", "authors");
      appendLinkedNames(authors, `(with ${names})`);
      article.append(authors);
    }
    if (paper.venue || paper.year) {
      const venue = element("p", "", "venue");
      if (paper.venue) venue.append(element("em", paper.venue));
      if (paper.venue && paper.year) venue.append(document.createTextNode(", "));
      if (paper.year) venue.append(document.createTextNode(paper.year));
      article.append(venue);
    }
    if (paper.abstract || target === "working-list") {
      const details = element("details");
      const summary = element("summary", "Abstract (click to expand)");
      const abstract = element("span", paper.abstract || "Abstract to be added.", "abstract-text");
      details.append(summary, abstract);
      details.addEventListener("toggle", () => {
        summary.textContent = details.open ? "Abstract:" : "Abstract (click to expand)";
      });
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
const affiliation = document.getElementById("affiliation");
const institution = profile.affiliationLink;
const institutionStart = institution ? profile.affiliation.indexOf(institution.text) : -1;
if (institutionStart >= 0) {
  affiliation.replaceChildren(
    document.createTextNode(profile.affiliation.slice(0, institutionStart)),
    link(institution.text, institution.url),
    document.createTextNode(profile.affiliation.slice(institutionStart + institution.text.length))
  );
} else {
  affiliation.textContent = profile.affiliation;
}
const cvLink = document.getElementById("cv-link");
if (profile.cvUrl) {
  cvLink.href = profile.cvUrl;
  cvLink.target = "_blank";
  cvLink.rel = "noopener noreferrer";
  cvLink.removeAttribute("aria-disabled");
  cvLink.removeAttribute("title");
}
document.getElementById("draft").hidden = !profile.draft;
const biography = document.getElementById("biography");
biography.replaceChildren(...profile.biography.map(text => {
  const paragraph = element("p");
  appendLinkedNames(paragraph, text);
  return paragraph;
}));
document.getElementById("fields-of-interest").textContent = profile.fieldsOfInterest || "Add your fields of interest in profile.js.";
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
  contacts.append(element("dt", "Email:", "email-label"), email);
}
// Publications temporarily disabled; uncomment with its section in index.html.
// paperList("publication-list", profile.publications, "Add your publications in profile.js.");
paperList("working-list", profile.workingPapers, "Add your working papers in profile.js.");
paperList("progress-list", profile.workInProgress, "Add your ongoing research in profile.js.");
document.getElementById("teaching-interests").textContent = profile.teachingInterests || "Add your teaching interests in profile.js.";
if (!profile.teachingInterests) document.getElementById("teaching-interests").classList.add("placeholder");
for (const course of profile.teaching) {
  const article = element("article", "", "course");
  const heading = element("h3");
  heading.append(course.url ? link(course.title, course.url) : document.createTextNode(course.title));
  article.append(heading);
  if (course.description) article.append(element("p", course.description));
  document.getElementById("teaching-list").append(article);
}
if (!profile.teaching.length) document.getElementById("teaching-list").append(element("p", "Add your teaching experience in profile.js.", "placeholder"));
