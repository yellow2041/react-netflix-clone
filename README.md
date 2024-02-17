# 프로젝트 소개

> 인프런 '따라하며 배우는 리액트 A-Z'강의의 실습 내용입니다.

- [강의 바로가기](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8/dashboard)
- themovie db api 사용(API 키 생성 필요)

## 구조

### 컴포넌트 구조

<img src="./img/컴포넌트구조.jpg" alt="component-structure" style="width:500px;"/>

# 학습 정리

## eslint jsx-a11y 사용시

- `jsx-a11y/click-events-have-key-events` 에러 발생
  - 마우스를 사용하지 못하거나 화면을 보지 못하는 사람들을 위해 button태그가 아닌 곳에 onClick 이벤트 등록시 에러발생.
  - [해결방법](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/0d5321a5457c5f0da0ca216053cc5b4f571b53ae/docs/rules/click-events-have-key-events.md)
- `jsx-a11y/no-noninteractive-element-interactions` 에러 발생
  - 마우스나 키보드 이벤트 핸들링을 지원하지 않는 non-interactiove HTML 태그에 클릭이벤트 핸들러를 추가하여 발생.
  - [해결방법](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/0d5321a5457c5f0da0ca216053cc5b4f571b53ae/docs/rules/no-noninteractive-element-interactions.md)
    - `role='presentation'`을 추가
      > 이게 맞는 방법인가...?
      - `role="presentation", role="none"`은 semantic 의미를 요소와 그 자식요소로부터 제거하기 위해 사용됨. 시각적으로
        게시하는 요소에 적용. `none`은 비교적 최근에 나온 속성값으로 `presentation`과 같은 역할.

## CSS media query

- 화면 가로가 769px보다 줄어들면 어떻게 할지 정의

```css
@media (max-width: 769px) {
  padding: 20px 20px;
  padding-bottom: 30px;
}
```

## Debounce

- 사용자가 타이핑을 멈출때까지 처리를 지연시키는것
  - 서버로 api 호출을 줄일 수 있다(검색시 검색어 변겅될때마다 검색하는 api 호출하고 있음)
- hook으로 만들어서 사용

```js
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
```

- 사용부분

```js
const debouncedSearchTerm = useDebounce(query.get('q'), 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    fetchSearchMovie(debouncedSearchTerm);
  }
}, [debouncedSearchTerm]);
```
