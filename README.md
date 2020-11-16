# vue-practice
Let's learn Vue.js ASAP!

## Notes

### Single File Component 구조에서 각 블록들의 역할
TL;DR: `<template>`이라는 평면적인 뷰에 대하여 프로그래밍적인 의미(Semantic)와 논리를 부여하는 것이 `<script>`의 역할. `<script>`에 적힌 Vue 인스턴스 옵션을 기반으로 뷰에 적힌 코드들의 의미를 파악할 수 있다.

한 `.vue` 파일 스코프 내에서, `<script>` 내에서 정의되거나 선언되는 모든 식별자들은 해당 파일의 `<template>` 내에서만 통용되는 지역적인 값이다.

Vue 인스턴스 옵션의 `component` 객체의 경우를 예로 들면, 여기에 선언되어야만 `<template>` 내에서 뷰 블록으로서 사용될 수 있다.

### 컴포넌트 이름의 대소문자
`component` 객체 내에서 대문자로 등록된 컴포넌트는 `<template>` 내에서 대소문자 구분 없이 사용되더라도 제대로 렌더링된다. 하지만 소문자로 등록된 컴포넌트는 반드시 `<template>` 내에서도 소문자로 사용되어야 한다. 대소문자 구분 못하는 HTML의 특성이 적당히 반영된듯

### 자식 컴포넌트에서 발생한 (커스텀) 이벤트를 감지하려면 해당 자식 컴포넌트에 대하여 핸들러를 등록해주어야 한다
자식 컴포넌트 내에서 `this.$emit()`으로 발생한 이벤트는 해당 자식 컴포넌트에 `v-on:custom-event`를 통하여 처리할 수 있다.

자식에서 발생한 이벤트는 자식 내에서는 캡처가 안되며, 부모 컴포넌트 수준의 스코프에서만 캡처할 수 있다. 이마저도 부모 컴포넌트의 `<template>` 내에서 *자식 컴포넌트에 등록된 핸들러*에서만 해당 이벤트를 감지하고 핸들링 할 수 있다. *해당 이벤트 이름과 `v-on`을 사용하더라도 다른 요소에서는 감지할 수 없다는 것.*

즉, `this.$emit()`은 부모-자식 컴포넌트 간의 고유한 이벤트 버스라고 간주할 수 있다.

## References

- [맨 땅에 Vue.js 시리즈](https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EB%A6%AC%EC%8A%A4%ED%8A%B8-462d88047893)
- [Single File Component](https://vue-loader-v14.vuejs.org/kr/)
  - [실제 예시 + 쉬운 설명](https://blog.naver.com/bkcaller/221461986249)
- [[Vue] 개발환경 만들기 (without vue-cli)](https://velog.io/@kyusung/Vue-app-sfc-without-vue-cli)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
