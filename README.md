# Introduction

**This project is still under development**

This project is to provide a tool that to tile several images into one file.

From

![src 1](./assets/src_1.png)

and

![src 2](./assets/src_2.png)

and

![src 3](./assets/src_3.png)

to

![output](./assets/output.png)

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

* currently only tile images horizontally
* only support png as input
