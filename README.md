# 클린코드 실습 - 상품 리스트 만들기

## 상품 데이터
```js
{
    id: 1,
    name: '이지페이론',
    organization: '하나은행',
    limit: 3500000,
    interest: {
        min: 4.39,
        max: 6.55
    },
    is_prime: true
}
```

- id: 상품 등록 순서
- name: 대출 상품 이름
- organization: 금융사 이름
- limit: 대출 한도
- interest: 금리 최대(max)/최저(min) 값
- is_prime: 1 금융권(은행) 여부


## 요구 사항
1. 상품 데이터(`loans`)를 기반으로 상품 리스트를 구현하라
2. 은행 여부(`is_prime`)로 리스트를 필터링할 수 있는 기능을 구현하라
3. 등록 순서(`id`), 낮은 금리(`interest.min`), 한도(`limit`)로 리스트를 정렬할 수 있는 기능을 구현하라

#### 샘플 UI
![image](src/img/ui.png)
