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

### `computed` == React의 `usememo`

`methods`에 등록한 함수는 리렌더링마다 항상 다시 실행되지만, `computed`는 *해당 값이 의존하는 `data`가 변하지 않는다면* 다시 실행되지 않고 따라서 값도 캐싱된(미리 계산된) 것이 고스란히 다시 반환된다.

### `computed` == `Vuex`의 `getters`
로컬 컴포넌트에서 *지역 computed*와 `mapGetters`를 함께 사용하려면, 객체 해체 연산자(`...`)를 사용하여 합치자

```js
import { mapGetters } from 'vuex';

computed: {
  ...mapGetters([
    'getCounter'
  ]),
  anotherLocalCounter: function() {

  },
}
```

### `methods` === `Vuex`의 `mutations` -> `commit()`으로 트리거
- 둘 다 상태를 바꾸지만, `mutation`은 동기, `action`은 비동기 작업
- `mutations`에 정의한 메서드는 직접 접근하여 실행 불가. 반드시 `commit`을 통하여 간접적으로 호출홰야 한다.
- `commit(<mutation_name>, payload)`로 부가 데이터 전달, 메서드에서 받을 때는 `method(state, payload)`로 정의하여 부가 데이터 전달받음

### `methods` === `Vuex`의 `actions` -> `dispatch()`으로 트리거
- 지연된 동작(setTimeout), 네트워크 통신 등 -> 결과를 받아올 타이밍이 예측 불가인 로직
- `actions`에 정의한 메서드는 직접 접근하여 실행 불가. 반드시 `dispatch`을 통하여 간접적으로 호출홰야 한다.
- `dispatch(<mutation_name>, payload)`로 부가 데이터 전달, 메서드에서 받을 때는 `method(state, payload)`로 정의하여 부가 데이터 전달받음
- `actions` 내에서 `mutations`를 사용하는 구조는, 비동기적인(임의의) 타이밍에 동기적인 동작을 취하더라도 이를 추적할 수 있도록 기록하기 위한 단서 제공

---

### Vue.js Mixins
- 믹스인이 가지고 있는 옵션의 내용을 컴포넌트에 고스란히 Merge
  - 옵션의 `data`나 `methods` 등에서 겹치는 식별자가 있다면 컴포넌트의 것을 더 우선시
- 믹스인은 믹스인이 적용되는 컴포넌트의 초기화보다 먼저 초기화된다 → 라이프사이클 고려 필요

## References

- [맨 땅에 Vue.js 시리즈](https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EB%A6%AC%EC%8A%A4%ED%8A%B8-462d88047893)
- [Single File Component](https://vue-loader-v14.vuejs.org/kr/)
  - [실제 예시 + 쉬운 설명](https://blog.naver.com/bkcaller/221461986249)
- [[Vue] 개발환경 만들기 (without vue-cli)](https://velog.io/@kyusung/Vue-app-sfc-without-vue-cli)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
- [Vuex 시작하기 시리즈](https://joshua1988.github.io/web-development/vuejs/vuex-start/)
- [Vue.js 라이프사이클 이해하기](https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4)
