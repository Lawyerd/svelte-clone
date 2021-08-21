import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import strip from "@rollup/plugin-strip";

import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import css from "rollup-plugin-css-only";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";
import path from "path";
const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      preprocess: sveltePreprocess({
        // scss가 있다면, 전역에 걸쳐서 해당 scss 적용
        // 단 해당 컴포넌트 style에 lang='scss'가 명시되어 있는 경우에만
        scss: {
          prependData: '@import "./src/scss/main.scss";',
        },
        postcss: {
          plugins: [require("autoprefixer")()],
        },
      }),
    }),
    css({ output: "bundle.css" }),
    // 모든 플러그인들의 가장 상위에 표시한다.
    replace({
      values: {
        "crypto.randomBytes": 'require("randombytes")',
        // 대체하고싶은 대상 : 대체할 할 값
        // crypto라는 모듈은 사용할 수 있지만,
        // randomBytes라는 메소드가 없다.
        // 그래서 그 구멍을 별도의 모듈을 가지고와서 대체한다.
      },
    }),
    resolve({
      // 변화된 코드가 번들이 된다.
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    // ES6 모듈로 변화시킨다.
    globals(),
    builtins(), // builtins가 사용되려면 globals가 필요하다.
    // 왜냐하면 builtins가 사용하는 일부 모듈은 전역 API를 사용하기 때문에

    alias({
      entries: [{ find: "~", replacement: path.resolve(__dirname, "src/") }],
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),
    // If we're building for production (npm run build
    // instead of npm run dev), minify

    production &&
      strip({
        include: "**/*.(svelte|js)",
        functions: ["console.*", "assert.*"],
      }),
    // 제품 모드인 경우에만 사용한다.
    // 우리 모듈에서 불필요한 것들을 벗어 던진다.
    // include 뒤에는 경로 명시
    // **는 우리 프로젝트의 모든 경로, 와일드카드라고도 함
    // 우리 프로젝트의 모든 파일 중 확장자가 svelte혹은 js인 경우
    // 필없는 것들을 다 지운다.
    // 우리 프로젝트에서 console.로 시작하는 모든 것들을 지운다.
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
