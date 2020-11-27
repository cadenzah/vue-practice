# vue-practice
Let's learn Vue.js ASAP!

## Index
- Single File Component
- Vue.js Fundamentals
- Vue.js Mixins
- Vue.js Directives
- Vue.js Plugins
- Vue.js Render Function
- Vuex
- Vue Router
- Vue.js Test

---

## Single File Component

### 각 블록들의 역할
TL;DR: `<template>`이라는 평면적인 뷰에 대하여 프로그래밍적인 의미(Semantic)와 논리를 부여하는 것이 `<script>`의 역할. `<script>`에 적힌 Vue 인스턴스 옵션을 기반으로 뷰에 적힌 코드들의 의미를 파악할 수 있다.

한 `.vue` 파일 스코프 내에서, `<script>` 내에서 정의되거나 선언되는 모든 식별자들은 해당 파일의 `<template>` 내에서만 통용되는 지역적인 값이다.

Vue 인스턴스 옵션의 `component` 객체의 경우를 예로 들면, 여기에 선언되어야만 `<template>` 내에서 뷰 블록으로서 사용될 수 있다.

### `css-loader` 관련 오류
`css-loader`와 `vue-style-locader`가 충돌하여, 스타일이 적용되지 않는 버그가 있었다. `css-loader` 4.x.x 버전에서 있었던 이슈인데 5.x.x 버전에서도 여전히 해당 이슈가 존재하는 듯하다. ([관련 링크](https://github.com/vuejs/vue-style-loader/issues/46#issuecomment-670624576))

이를 픽스하려면 아래와 같이 빌드 설정을 추가해주면 된다.

```js
// webpack.config.js
...
{
  test: /\.css$/,
  use: [
    'vue-style-loader', {
      loader: 'css-loader',
      options: {
        esModule: false,
      },
    },
  ],
},
```

### SFC 구조 하에서는 Vue 인스턴스의 옵션에서 `template` 옵션값을 사용할 수 없다
해당 옵션을 사용하여 컴포넌트를 배치하면 아래와 같이 경고를 발생시킨다.

```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

반드시 `.vue` 파일을 별도로 작성한 뒤 로드하여 `<template>` 블록 내에 배치할 것.

---

## Vue.js Fundamentals

### `.vue` 파일 `import`할 때에는 확장자를 생략하면 안 된다
`.jsx`와 달리 Webpack 로더가 알아서 처리 안 해준다.

### 컴포넌트 이름의 대소문자
`component` 객체 내에서 대문자로 등록된 컴포넌트는 `<template>` 내에서 대소문자 구분 없이 사용되더라도 제대로 렌더링된다. 하지만 소문자로 등록된 컴포넌트는 반드시 `<template>` 내에서도 소문자로 사용되어야 한다. 대소문자 구분 못하는 HTML의 특성이 적당히 반영된듯

### 자식 컴포넌트에서 발생한 (커스텀) 이벤트를 감지하려면 해당 자식 컴포넌트에 대하여 핸들러를 등록해주어야 한다
자식 컴포넌트 내에서 `this.$emit()`으로 발생한 이벤트는 해당 자식 컴포넌트에 `v-on:custom-event`를 통하여 처리할 수 있다.

자식에서 발생한 이벤트는 자식 내에서는 캡처가 안되며, 부모 컴포넌트 수준의 스코프에서만 캡처할 수 있다. 이마저도 부모 컴포넌트의 `<template>` 내에서 *자식 컴포넌트에 등록된 핸들러*에서만 해당 이벤트를 감지하고 핸들링 할 수 있다. *해당 이벤트 이름과 `v-on`을 사용하더라도 다른 요소에서는 감지할 수 없다는 것.*

즉, `this.$emit()`은 부모-자식 컴포넌트 간의 고유한 이벤트 버스라고 간주할 수 있다.

### `computed` == React의 `usememo`

`methods`에 등록한 함수는 리렌더링마다 항상 다시 실행되지만, `computed`는 *해당 값이 의존하는 `data`가 변하지 않는다면* 다시 실행되지 않고 따라서 값도 캐싱된(미리 계산된) 것이 고스란히 다시 반환된다.

### Slot == React의 `children`
다음과 같은 구조의 템플릿 마크업을 떠올려보면,

```vue
<!-- App.vue -->
<template>
  <div>
    <Child></Child>
  </div>
</template>
```
`<Child>`가 표현하고자 하는 내용은 해당 컴포넌트의 `.vue` 파일 내에서 구체적으로 정의되어야 한다. 예를 들어, 위 마크업에서 `<Child>` 컴포넌트를 통하여 어떤 문장을 표시하는 기능을 한다면, 이 컴포넌트는 다음과 같이 렌더링될 것이다.

```vue
<!-- App.vue -->
<template>
  <div>
    <p>Child 컴포넌트의 내용은 이 마크업으로 대체되었다</p>
  </div>
<template>
```

여기서 만약, `<Child>`에서 사용되는 내용(`<p>`에 표시되는 메시지 내용)을 부모 컴포넌트에서 전달하여 재사용성을 높이고자 한다면 어떻게 해야 할까? 즉, 부모 컴포넌트에서 사용되는 데이터 또는 메서드 등을 자식 컴포넌트에서 사용하고자 한다면 어떻게 할까? 위의 경우라면 `<Child>` 컴포넌트로 `props`를 사용하여 데이터들을 전달해야 한다. 또한, `<Child>` 상에서도 이들을 전달받아 사용가능한 형태로 코드를 작성해주어야 한다.

```vue
<!-- App.vue -->
<template>
  <div>
    <Child :message="message"></Child>
  </div>
<template>

<!-- Child.vue -->
<!-- 구현 생략 -->
```

여기는 문제가 있다. 우선, 번거롭다. 데이터를 전달하기 위하여 props를 전달하고 자식 컴포넌트 측에서 대응 코드를 작성하는 등 추가 작업이 필요하다. 또한, 데이터 관리 포인트가 늘어난다. 앱의 복잡도가 늘어나고 전달해야 하는 데이터가 늘어난다면 이는 바람직하지 않다.

여기서 도입되는 개념이 **제어의 역전(Inversion of Control)**이다. 즉, 자식 컴포넌트 내에서 표현되는 뷰와 관련 로직을 부모 컴포넌트 쪽에서 관리할 수 있도록 해주는 것이다. 이는 자식 컴포넌트의 로직에 대한 책임이 부모 컴포넌트 쪽으로 이동하는 효과를 가진다. 이를 구현하기 위한 뷰 문법이 **Slot**이다.

```vue
<!-- App.vue -->
<template>
  <div>
    <Child>
      <p>{{message}}</p>
    </Child>
  </div>
</template>

<!-- Child.vue -->
<template>
  <slot></slot>
</template>
```

이렇게 되면, `<Child>`의 자식으로 전달된 마크업 요소들은 `<slot>`을 대체하게 된다. 즉, 기존에 필요했던 자식 컴포넌트로서의 역할을 동일하게 수행한다. 그러면서 동시에, 자식 요소에서 필요로 하는 데이터는 동일하게 `<Child>` 컴포넌트의 스코프 내에서 관리할 수 있게 된다. 관리 포인트가 하나로 단일화된 것이다. 이를 통하여, 더 적은 코드로 재사용성을 확보할 수 있게 되었고, `<Child>` 컴포넌트는 가지고 있는 로직이 적은 가벼운 컴포넌트로 변했다.

### Named slot

```vue
<!-- Child.vue -->
<template>
  <p>
    <slot name="header"></slot>
  </p>
</template>

<!-- App.vue -->
<template>
  <div>
    <Child>
      <template v-slot:header>
        전달할 메시지를 여기에 적어보자
      </template>
    </Child>
  </div>
</template>
```

- 여러 슬롯을 사용하는 것도 가능하다. `<template v-slot:slot_name>` 식으로 전달하면 해당 마크업 아래의 내용을 원하는 위치의 슬롯에 전달할 수 있다.
  - 위 형식 없이 이름없는 슬롯을 사용하는 것은 Default Slot으로 취급된다.
  - Default Slot은 `<template v-slot:default>`과 동일하다

### Slot에 속성 전달하기 - Scoped Slot

만약 `<slot>`을 정의하고 있는 자식 컴포넌트에서 데이터 또는 메서드를 사용하고 있고, 이를 부모 컴포넌트 측에서 사용할 수 있도록 제공하려면 어떻게 할까?

자식 컴포넌트의 `<slot>`에 `v-bind` 속성을 사용하여 전달하고자 하는 데이터를 속성값으로 명시하고, 부모 컴포넌트에서는 `v-slot` 속성의 속성값을 통하여 이에 접근할 수 있다. 이렇게 `<slot>` 요소에 연결된 속성을 **Slot props**라고 부른다.

```vue
<!-- Child.vue -->
<template>
  <p>
    <slot name="default" v-bind:child_slot="message">
    </slot>
  </p>
</template>
<script>
export default {
  data: function() {
    return {
      message: 'Data from Child component\'s slot',
    };
  },
};
</script>

<!-- App.vue Component -->
<template>
  <div>
    <Child>
      <template v-slot:default="child_slot">
        {{child_slot.message}} <!-- data from Child component -->
      </template>
    </Child>
  </div>
</template>
```

만약 자식 컴포넌트에 `<slot>`이 Default Slot 단 하나뿐이고 그 외의 Named slot이 존재하지 않는다면, 바로 위의 Slot 사용례는 간소화할 수 있다.

```vue
<!-- App.vue -->
<!-- 아래 마크업은 바로 위의 예제와 동일하게 작동 -->
<template>
  <div>
    <Child v-slot="child_slot">
      {{child_slot.message}} <!-- data from Child component -->
    </Child>
  </div>
</template>
```

---

## Vue.js Mixins
- 믹스인이 가지고 있는 옵션의 내용을 컴포넌트에 고스란히 Merge
  - 옵션의 `data`나 `methods` 등에서 겹치는 식별자가 있다면 **컴포넌트의 것을 더 우선시**
- 믹스인은 믹스인이 적용되는 컴포넌트의 초기화보다 먼저 초기화된다 → 라이프사이클 고려 필요
- 인스턴스 옵션에서 `mixins` 속성은 배열로 전달되므로, **다중 상속 구현 가능**
  - 이것이 `.extends`와의 가장 큰 차이

---

## Vue.js Directives (부제: Mixin과 무엇이 다른가)
- Mixin은 "기능을 확장할 때"에, Directive는 "HTML 요소에 특정 동작 방식을 부여하고자 할 때"에 사용
- Directive에서 사용되는 각각의 Hook들(`bind`, `update` 등)은 고정된 형식의 함수
- `function(el, binding, vnode) { }`
  - `binding.arg`: 대괄호 통하여 전달하는 Dynamic Directive Argument의 값
    - 단일값으로만 전달 가능
  - `binding.value`: 해당 디렉티브에 대한 속성값
    - 값 평가되므로, JS의 모든 타입 전달 가능 - 원시값, 객체 등
  - `vnode`는 해당 디렉티브가 실행되는 HTML 요소에 대한 추상화 객체(`VNode`)
    - `vnode.context`를 통하여 현재 컴포넌트(`VueComponent`)에 동일하게 접근 가능
- `bind`와 `update`의 로직이 동일하다면 하나로 합쳐서 사용해도 된다. 즉, directive 등록시 객체 대신 함수만 전달하는 것

---

## Vue.js Plugins 
- `install()` 함수를 가지는 객체 형태로 정의
  - 이 함수 안에서 하고자 하는 작업을 모두 수행하는 형태
- 이 객체는 이후 `Vue.use(PLUGIN)` 형태로 호출되야 하고, 그 안에서는 `PLUGIN.install()`이 실행되는 식으로 초기화된다
- 주로 `Vue.prototype`에 값을 추가하는 등의 작업이 이루어진다

### Mixin과 무엇이 다른가
- Mixin은 개별 컴포넌트 내에, 재사용가능한 기능을 주입
- Plugin은 전체 컴포넌트 단위에서; 전역적으로 두루 사용될 수 있는 기능을 저장

---

## Vue.js Render Function

### 왜 필요할까
- 렌더링되는 Template의 내용을 자바스크립트를 사용하여 동적으로 조작하고자 할 때
- SFC 구조의 Vue 프로젝트에서 화면을 구성할 때 사용되는 함수; pre-compile시 필요

### SFC에서 Render가 작동하는 양상
- 각 `.vue` 파일 내의 `<template>` 부분은 `vue-template-compiler`에 의하여 `render()` 함수로 변환되어 해당 SFC 파일에 대응하는 Vue 인스턴스 속성으로 사용된다.
- SFC는 실제 실행되기 전에 컴파일과 빌드가 이루어지는 것을 전제로 한다(by Webpack). 따라서 인스턴스 옵션에서 `template`은 사용되지 않으며, `<template>`이 `render()`로 변환
- `template` 속성을 사용한다는 것은 런타임에서 해당 템플릿을 컴파일한다는 의미로, SFC와는 거리가 멀다

---

## Vue.js Vuex

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

### Action과 Mutation의 차이
- Mutation은 직접적으로 Vuex Store를 갱신하는 동작
  - Mutation을 통하여 Store가 (동기적으로) 변경되는 과정들을 순서대로 추적(Debug)할 수 있다
- Action은 Store를 비롯한 앱 로직을 변경하는 행위를 포괄적으로 추상화하는 컨트롤러 역할
  - "컴포넌트는 내부 동작들을 구체적으로 알아서는 안 된다"
- 뷰 안에서 발생하는 명시적인 동작들은 모두 비동기로 취급되어야 한다. JS 특성상, 여러 동작들이 예측불가로 트리거되므로. 이것을 담당하는 추상화가 Action
  - 비동기 Action 작업들이 동기적 순서를 부여받았을때 그때 비로소 실행되는, Vue에 영향을 가하는 동작들은 Mutation이 담당
- 결국 중요한 것은 Debug의 용이성, 그리고 비동기 / 동기 작업들에 대한 관심사 분리

---

## Vue Router
- `this.$router`: Router 객체; `.push()`, `.go()` 등의 메서드 호출에 사용
- `this.$route`: 현재 라우트 위치; `.params`, `.query`, `.hash` 등의 값들에 접근하여 활용 가능
- `<router-view>`는 해당 컴포넌트로 라우팅되었을 때 기준으로 최상위 outlet을 표시하는 곳; 즉, 최상위 경로와 일치하는 컴포넌트를 렌더링
  - 현재 라우팅 URL을 기준으로, 하위 라우팅이 변경됨에 따라(`/` 기준) `<router-view>` 위치에 어떤 컴포넌트가 표시되는지가 달라진다 
  - 그래서 `<router-view>`는 중첩 가능. 라우팅이 중첩되는 경우, 자신의 하위 라우트를 표시할 영역을 재귀적으로 `<template>`에 표시
  - 그 바깥에 있는 다른 마크업들은 라우팅과 무관하게 항상 존재하는 요소가 된다
- Webpack-dev-server를 사용중이라면, `devServer` 옵션에서 `historyApiFallback`을 `true`로 설정해야 한다
  - 그래야 '/' 이외의 경로로 진입시 라우팅이 제대로 이루어진다 (｢wds｣: 404s will fallback to /index.html)

---

## Vue.js Test

### 환경 설정 관련 문제해결
- [`@vue/cli-plugin-unit-jest`](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-unit-jest/presets/default/jest-preset.js)의 프리셋을 기반으로 설정
  - 그 외 config 파일 해설([참조](https://heropy.blog/2020/05/20/vue-test-with-jest/))를 참고
- `vue-jest`가 `@babel/core` 모듈을 찾지 못하는 이슈가 있다. 내부에서 `peerDependencies`로 `babel-core`를 사용하고 있기 때문. 이는 Babel이 7버전 이후부터 라이브러리의 모듈 이름 규칙을 `@babel/`로 변경함에 따라 발생한 이슈이다.
  - `babel-core`와 `@babel/core`를 연결해주는 Bridge 라이브러리를 사용하여 해결([참조1](https://stackoverflow.com/questions/54677044/vue-jest-cant-find-babel)/[참조2](https://github.com/vuejs/vue-jest/issues/160))

## References

- [맨 땅에 Vue.js 시리즈](https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-%EB%A6%AC%EC%8A%A4%ED%8A%B8-462d88047893)
- [Single File Component](https://vue-loader-v14.vuejs.org/kr/)
  - [실제 예시 + 쉬운 설명](https://blog.naver.com/bkcaller/221461986249)
- [[Vue] 개발환경 만들기 (without vue-cli)](https://velog.io/@kyusung/Vue-app-sfc-without-vue-cli)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
- [Vuex 시작하기 시리즈](https://joshua1988.github.io/web-development/vuejs/vuex-start/)
  - [Should a component commit a mutation directly?(Mutation과 Action의 차이)](https://github.com/vuejs/vuex/issues/587)
  - [Vuex Action vs Mutations](https://stackoverflow.com/questions/39299042/vuex-action-vs-mutations)
- [Vue.js 라이프사이클 이해하기](https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4)
- [Jest와 Vue Test Utils(VTU)로 Vue 컴포넌트 단위(Unit) 테스트](https://heropy.blog/2020/05/20/vue-test-with-jest/)
- [Vue 기본 강좌 7-1. slot](https://www.youtube.com/watch?v=qZUV1-FA0-Q)
- [Mixins vs. Plugins vs. extends](https://m.blog.naver.com/z1004man/221791394624)
- Render Function 관련
  - [VueJS render 메소드](https://greenmon.dev/2019/02/25/vuejs-render.html)
  - [Vue에서 컴포넌트 템플릿을 정의하는 7가지 방법](https://github.com/FEDevelopers/tech.description/wiki/Vue%EC%97%90%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%85%9C%ED%94%8C%EB%A6%BF%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%98%EB%8A%94-7%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)
  - [Introduction to Vue Render Functions (w/ Examples)](https://snipcart.com/blog/vue-render-functions)
  - [Why can Vue render function process SFC](https://stackoverflow.com/questions/49509719/why-can-vue-render-function-process-single-file-component)  
