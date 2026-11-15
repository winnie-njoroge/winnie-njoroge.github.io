# Academic homepage

A minimal single-page academic website inspired by the organization of https://gautam-rao.com/. Original HTML/CSS; the reference author's biography, papers, and images are not copied.

This is a draft with clearly marked placeholder content. Edit `profile.js` for your name, affiliation, biography, contact details, paper titles, abstracts, links, and courses. Set `draft: false` when your real content is ready. A portrait is optional. Add files such as your CV and photograph in an `assets` folder and use relative links.

## Preview

Open `index.html` in a browser. No build or installation is needed.

## Publish on GitHub Pages

1. Create a repository named `YOUR-USERNAME.github.io` in your GitHub account.
2. Upload the contents of this folder to the repository root, including `index.html`, `styles.css`, `profile.js`, `site.js`, and `.nojekyll`.
3. In **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.
4. Your site will be at `https://YOUR-USERNAME.github.io/` after GitHub finishes deployment.

You can also use an ordinary project repository. All asset links are relative, so the site supports a repository subpath.

Official instructions: https://docs.github.com/en/pages/quickstart

## Editing papers

Each publication or working paper is an object in `profile.js`:

```js
{
  title: "Paper title",
  authors: "With coauthor names",
  venue: "Journal name",
  year: "2026",
  url: "papers/paper.pdf",
  abstract: "Your abstract.",
  links: [
    { label: "Online appendix", url: "papers/appendix.pdf" },
    { label: "Data and code", url: "https://your-repository-url" }
  ]
}
```

Leave optional fields empty or omit them. Abstracts use native expandable details, accessible by keyboard. The layout adjusts for mobile screens and respects reduced-motion preferences.
