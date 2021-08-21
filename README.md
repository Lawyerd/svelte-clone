# Svelte를 사용하여 만든 Trello

## Netlify
[링크](https://lawyerd-trello.netlify.app/)

## 🌨Snowpack🌨
### 번들러
기존에는 Rollup을 사용하여 개발을 진행하였다. 그에 따라 template도 webpack svelte template이 아닌 rollup svelte template를 설치하였다. `npx degit sveltejs/template` 
Rollup이나 Webpack, Parcel 같은 빌드 도구들을 '번들러'라고 부른다. 이러한 녀석들은 모듈들을 결합하여 하나의 번들을 만들도록 동작한다. public 폴더에 들어있는 bundle.js, bundle.css 같은 파일들이 대표적인 결과물이다. 

### Snowpack의 장점
**하지만 Snowpack은 번들러가 아니다. 빌드 도구이다.** 일반적으로 프로젝트에서 `import` 키워드를 많이 사용하는데, 이 키워드가 브라우저에서도 동작을 한다. Snowpack은 이 방법을 활용하여 브라우저에서 모듈을 직접 가져오는 방법을 택하고 있다. 그래서 어떠한 결과를 번들로 만들 필요가 없다. 따라서 빌드하는데 드는 시간이 획기적으로 줄어든다. 즉 bundle 방식에서 export, import 방식으로 넘어오면 시간을 단축시킬 수 있다. 정리하자면 Snowpack은 기존의 무거운 번들러들의 번들 소요시간을 절약하여 빠른 웹 개발을 가능하게 해준다. 

### 방법
JavaScript의 ESM(ES Modules)를 활용하여 동일 파일을 다시 빌드하지 않는 최초의 빌드 시스템을 생성해 변경사항을 브라우저에 즉시 적용할 수 있다. 
- ESM : import "module" from 'svelte'
- CommonJS : const xx = require('module') // nodeJS에서 활용한다. 

### 출처 
(Heropy Tech)(https://heropy.blog/2020/10/31/snowpack/)
