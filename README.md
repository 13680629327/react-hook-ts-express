<!--
 * @Author: your name
 * @Date: 2022-04-15 15:53:30
 * @LastEditTime: 2022-04-15 15:53:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fcz-example/README.md
-->
# yarn workspaces example

This is a simple example of a monorepo project that use new [Yarn Workspaces](https://github.com/thejameskyle/rfcs-1/blob/workspaces/accepted/0000-workspaces.md) feature.

## Run

To check workspaces working just run

```
$ yarn install
$ cd packages/b
$ yarn start
```

First, Yarn will hoist dependencies in the project root, after that you can link your packages among then and running without publish. You'll see in the `package.json` of `b` package that depends of `a` package and works great without any `./node_modules` folder inside it.

Workspaces are a great alternative for some monorepo tools and in the near future can be a better solution!

Cheers 🍻