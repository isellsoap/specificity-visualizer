# 📈 Specificity Visualizer

[![Travis CI Build Status](https://travis-ci.org/isellsoap/specificity-visualizer.svg?branch=master)](https://travis-ci.org/isellsoap/specificity-visualizer)

A visual way to analyze the specificity of selectors in CSS.

- [Website](https://isellsoap.github.io/specificity-visualizer/)
- [Introductory blog post](https://francescoschwarz.de/en/blog/introducing-the-specificity-visualizer/)
- [Features](#features)
- [Contributing](#contributing)
- [Download](#download)

---

The *Specificity Visualizer* enables you to identify patterns, trends and inconsistencies across a CSS file in bird’s-eye view. It’s especially useful for analyzing big and complex stylesheets. The underlying concept of the [specificity graph](https://csswizardry.com/2014/10/the-specificity-graph/) has been coined by Harry Roberts.

## Features

- 😍 It’s a pretty fun and nice visual experience and potentially changes the way how you look into and think about (your) stylesheets.
- 🔍 Hover over single data points to see the exact selector or zoom into areas of interest, e.g. you can look at only the selectors of the first half of the file or you can zoom into all selectors with the specificity of `0,2,1` across the entire file.
- 📊 To better distinguish different specificity categories the data points are using proper colors and forms. You can also click on a legend item to toggle its visibility, e.g. if you only want to see all ID selectors.
- 📸️ Taking screenshots of the chart is great to track progress, e.g. you could save a snapshot of your stylesheet before and after a major refactoring to visualize the difference. Also, you could use it for presentations to effectively communicate to other developers and/or stakeholders.
- 📏 Specificities are treated as proper categories on the `y` axis and aren’t simply “added up” (after all, no amount of class selectors can overrule an ID selector). Also, selectors inside of `@media`, `@supports` and `@document` blocks are counted, selectors inside of `@keyframes` blocks aren’t.

## Contributing

Pull requests go into the `master` branch. The `gh-pages` branch is a presentation of the `master` branch at the last given push.

### Prerequisites

- You must have [**Node.js**](https://nodejs.org/) and [**Yarn**](https://yarnpkg.com/lang/en/) installed to run the *Specificity Visualizer* locally.
- Clone the repository with
`git clone https://github.com/isellsoap/specificity-visualizer.git`
- Go into the folder with
`cd specificity-visualizer`

### Developing

- **`yarn start`** starts the application in development mode and continuously watches all files.

### Building

- **`yarn build`** builds the application in production mode.

## Download

You can simply [download the latest version of the website as a ZIP file](https://github.com/isellsoap/specificity-visualizer/archive/gh-pages.zip).

## License

This repository is published under the [MIT license](https://github.com/isellsoap/specificity-visualizer/LICENSE.md).
