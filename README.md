# Introduction

**This project is still under development**

This project is to provide a tool that to tile several images into one file.

From

![input_1](./assets/input_1.png)

to

![output_1](./assets/output_1.png)

or from

![input_2](./assets/input_2.png)

to

![output_2](./assets/output_2.png)

# Run

clone this project

```bash
$ yarn install
$ npm run build_ts
$ npm run main src/test/assets/ /tmp/output/
```

# Test

```bash
$ yarn jest
```

# Limitations

* only support png as input
