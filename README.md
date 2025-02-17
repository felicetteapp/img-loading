# ImgLoading Library

ImgLoading is a lightweight JavaScript library for lazy loading images with support for thumbnails and full-size images. It uses Intersection Observer API to load images only when they are in the viewport.

## Installation

### Using GitHub Packages

To use this npm package from GitHub Packages, you need to configure your .npmrc file and install the package using the GitHub registry. Here are the steps:

- 1 Create or update your `.npmrc` file in the root of your project with the following content:

```sh
@felicetteapp:registry=https://npm.pkg.github.com
```

- 2 Authenticate with GitHub Packages by adding your GitHub token to the `.npmrc` file:

```sh
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

- 3 Install the package using the GitHub registry:

```sh
npm install @felicetteapp/img-loading
```

## Usage

### HTML

Add the img-loading attribute to the elements you want to lazy load. You can also specify the thumbnail and full-size image URLs, dimensions, aspect ratio, and main color.

**Tip:** you can use the [@felicetteapp/img-loading-utils](https://github.com/felicetteapp/img-loading-utils) package to generate the data attributes for the images, thumbnails and even the html code.

```html
<section id="images-container">
    <div
        img-loading
        il-thumbnail="path/to/thumbnail.jpg"
        il-fullsize="path/to/fullsize.jpg"
        il-width="300"
        il-height="300"
        il-aspect-ratio="1/1"
        il-main-color="rgb(255, 255, 255)"
        >
        <p>a content placeholder until the library its ready</p>
    </div>
</section>
```

### JavaScript

Initialize the library and call the `init` method with the selector for the elements you want to lazy load.

```js
const imgLoading = new ImgLoadingLibrary.ImgLoading();

imgLoading.init("[img-loading]", {
  container: document.getElementById("images-container"),
  intersectionObserverConfig: {
    threshold: 0.5,
  },
});
```

### CSS

You can customize the appearance of the images using CSS. The library provides several CSS classes and variables that you can use.

```css
.il-item {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: var(--il-aspect-ratio);
  background: var(--il-main-color);
}

.il-item .il-img,
.il-item .il-thumbnail {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  display: block;
}

.il-item .il-thumbnail {
  transition: opacity 2s;
}

.il-item .il-img,
.il-item .il-thumbnail {
  opacity: 0;
}

.il-item.il-item--thumbnail-loaded .il-thumbnail {
  opacity: 1;
}

.il-item.il-item--img-loaded .il-img {
  opacity: 1;
}

.il-item.il-item--img-loaded .il-thumbnail {
  opacity: 0;
  transition: opacity 1s;
}

#images-container {
  max-height: 80vh;
  overflow-y: auto;
}
```

## Development

To build the project, run:

```sh
npm run build
```

To watch for changes and rebuild automatically, run:

```sh
npm run watch
```

To lint the code, run:

```sh
npm run lint
```
