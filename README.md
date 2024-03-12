# Challenge/Project Name (e.g. Frontend Mentor - Results summary component solution)

This is a solution to the [e.g. Results summary component challenge on Frontend Mentor](https://www.example.com). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- [View Code](https://www.example.com)
- [Live Preview](https://www.example.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

### What I learned

- CSS ```all``` property - can be used to reset all properties of an element

- I don't usually like using "hacky" wrappers, but this [article](https://css-tricks.com/color-inputs-a-deep-dive-into-cross-browser-differences/) shows just how complicated and near impossible it is to style color type inputs, so I opted to use a div wrapper around it to make it a circle with ```overflow: hidden``` instead of playing around with things like ```-webkit-appearance```, ```-webkit-color-swatch```, ```-webkit-color-swatch-wrapper```, and ```-moz-color-swatch``` and still not getting it right across browsers.

- How to style sliders (range inputs) with consistency across all browsers. There is a very handy style generator for range inputs liked below in the Useful resources section.

- What HEAD means in git, what the caret(s) that come after it mean, ```git reset```, ```git reset HEAD^```, ```git reset HEAD^^```. Also ```git commit --fixup=b1d7848``` https://stackoverflow.com/a/27721031

- ```e.target.tagName``` to access the element type.

- Function nesting is necessary to draw only when mouse is clicked and kept pressed while moving the cursor and stop drawing when it is released.

```js
boardSquares.forEach(square => square.addEventListener('mousedown', startDrawing));

function startDrawing(e) {
  boardSquares.forEach(square => square.addEventListener('mouseenter', draw));
  window.addEventListener('mouseup', () => {
    boardSquares.forEach(square => square.removeEventListener('mouseenter', draw))
  })
}

function draw(e) {
  ...
}
```

- Sometimes, the browser confuses this activity with drag and drop, so preventing the default behavior of these events is helpful.

```js
document.body.addEventListener('dragstart', event => {
  event.preventDefault();
});

document.body.addEventListener('drop', event => {
  event.preventDefault();
});
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [CSS ```all``` property](https://developer.mozilla.org/en-US/docs/Web/CSS/all) - Has browser compatibity across all major browsers
- [range input style CSS generator](https://range-input-css.netlify.app/) - This CSS generator is very handy in styling range inputs with consistency across all browsers.
- [removeEventListener](https://www.reddit.com/r/learnjavascript/comments/101i2ca/comment/j2nq9sx/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- [disabling drag and drop events](https://bobbyhadz.com/blog/disable-drag-and-drop-in-javascript#disabling-drag-and-drop-for-all-elements-in-the-document)

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.