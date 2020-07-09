# bodymovin-data-bundler
Bundles [bodymovin](http://aescripts.com/bodymovin/) animation data into a JS object for use with [Lottie](https://github.com/airbnb/lottie-web). Combines multiple .json files into a single JS file to minimize requests.

## Requirements
Node v11.x and up.

## Getting Started

1. Place `.json` files in `./animations/`
2. Enter `node .` in terminal. 

Alternatively if you have npm, `npm run bundle` to run the script.

### Output

Given the following files:

```
./animations/data1.json
./animations/data2.json
./animations/data3.json
```

The script will create an Object in `./dist/output.js`:

```
...{
  "data1": {...},
  "data2": {...},
  "data3": {...}
}
```

### Output Usage

> Use `animationPath` instead of `path` in the loadAnimation options.

```
bodymovin.loadAnimation({
  animationPath: animations[data1],
  ...
})
```

## Configuration

Make a copy of the default config like so:

```
cp ./src/default.config.js ./script.config.js
```

## Caveats

Does not manage/bundle any referenced image assets. Instead, the script will prefix any `.png` file references.

For example, `img_0.png` will now be `{key}-img_0.png`. `{key}` is a slugified version of the original animation.json filename. The script also creates `./dist/output.js.map` which includes a key-filename mapping for reference.