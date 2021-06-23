# 이론 정리
## TS에서의 객체 구조 분해 할당
- [참고](https://velog.io/@modolee/typeScript-destructuring#typescript%EC%97%90%EC%84%9C%EC%9D%98-destructuring)  

``function Counter({ $app: HTMLElement | null })``처럼 입력하면 구조 분해 할당이 되지 않는다. 이러한 표현은 $app의 디폴트 값을 지정하는 문법으로 적용되기 때문이다.

TS에서 구조 분해 할당을 하는 방법은 두 가지가 있다.
  1. 구조 분해 할당 할 전체 변수에 대해 타입을 지정해주는 방법
  ``function Counter({ $app }: { $app: HTMLElement | null })``
  2. (권장) interface로 미리 타입을 정의하고 해당 interface를 타입으로 지정하는 방법
     ```
      interface App {
        $app: HTMLElement | null
      }

      function Counter({ $app }: App) ...
      ```

<br>

## [🧨 **애매한 항목** ] Cypress에서 비동기를 포함하는 테스트 작성 시 주의점
### 코드 리뷰 이후 추기
처음 테스트 코드를 작성하고 테스트를 진행하였을 때 [아래](https://github.com/hyo-choi/cypress-basic/blob/main/docs/NOTES.md#%EC%9B%90%EB%9E%98-%EC%98%A4%EB%A5%98-%EC%83%81%ED%99%A9)와 같은 문제가 발생하였고, 이를 해결하기 위해 공부한 내용을 기록해두었다. 그런데 [코드 리뷰](https://github.com/404-DriverNotFound/cypress-basic/pull/1#discussion_r657193055)를 받고 suggest 받은 코드로 여러 차례 테스트를 진행해보니 같은 문제가 발생하지 않았다.  
당시에도 유사한 코드를 작성했던 것으로 기억하는데, 정확히 어떤 코드를 작성한 상황에서 발생한 오류인지 기록해두지 않아 오류 상황 재현이 불가능해졌다. 그때 발생했던 오류의 원인을 알 수 없게 되어버린 것이다…….  
오류를 해결하는 것도 중요하지만 오류가 발생한 환경, 오류를 발생시킨 코드를 기록해두는 것 또한 중요하다는 것을 깨닫게 되었다. 다음부터는 꼭 코드도 잘 기록해두어야겠다.

***따라서 이하 내용은 정확한 원인과 해결법이 아닐 수 있음!***

<br>

### 원래 오류 상황
plus, minus 버튼에 EventListener를 등록한 뒤 테스트 코드를 작성하였는데, 어떨 때는 테스트가 정상적으로 진행되었으나 어떨 때는 의도하지 않은 값을 얻으며 테스트에 실패하였다. [에러 메시지에 링크된 사이트](https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached/)를 확인해보니 이 문제의 원인과 해결 방법을 알 수 있었다.
### 원인
테스트가 실패한 원인은 비동기 처리와 테스트 코드 실행 간의 순서가 정해져있지 않은 것이었다. 순서가 정해져 있지 않으니 비동기 처리가 먼저 되었을 때에는 테스트가 정상적으로 작동하였고, 그렇지 않을 때에는 테스트가 먼저 실행되어 원하지 않는 결과를 얻게 된 것이다. [링크](https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached/#detached-elements)에서 좀 더 자세한 설명을 확인할 수 있다.

### 해결법
따라서 이 문제를 해결하려면 비동기 처리 이후 테스트가 실행되도록 테스트 코드를 수정해주어야 한다. 해결 방법은 생각보다 간단한데, 비동기 함수를 호출하는 동작 이후에 [해당 element를 다시 get()으로 조회](https://github.com/hyo-choi/cypress-basic/blob/5135bccf9b66760286edf0d246e70cd395da13e0/cypress/integration/counter_spec.js#L7)하면 된다. 이 또한 [링크](https://www.cypress.io/blog/2021/07/22/do-not-get-too-detached/#avoid-race-conditions)에서 자세한 설명을 확인할 수 있다.

### 원리
이런 방식으로 동기화가 가능하게 되는 이유는 **cy.get() 커맨드**의 [Retry-ability](https://docs.cypress.io/guides/core-concepts/retry-ability#Commands-vs-assertions)에서 찾을 수 있다. ``cy.get()`` 커맨드는 커맨드 실행이 성공했을 시 이어지는 assertion을 실행하지만, 커맨드 실행이 실패했을 시 command timeout이 될 때까지 ``.get()`` 커맨드를 재실행한다. 따라서 비동기 처리가 완료되는 것을 기다린 후 assertion을 실행하는 방식으로 실행되는 것이다.  
``.find()``, ``.contains()`` 또한 retry하는 커맨드이고, 이외의 커맨드도 [Assertions section에서 retry 여부를 확인할 수 있다](https://docs.cypress.io/guides/core-concepts/retry-ability#Not-every-command-is-retried)고 한다.

<br>

## 기타
- ``cy.get()``의 경우 ``cy.``에 연결되어 있기 때문에 다른 커맨드에 chain해서 사용하여도 항상 ``document`` 전체에서 selector를 찾는다. 따라서 다른 element 뒤에 .get()을 chain하여도 js에서 하위 element를 찾는 것처럼 동작하지 않는다. 그러한 동작을 기대한다면 [``.within()`` 커맨드 내부에서 ``get()``을 실행](https://docs.cypress.io/api/commands/get#Get-in-within)하면 된다.
- ``get()``과 ``find()``는 유사한 동작을 하는 커맨드지만 탐색 범위에 차이가 있다. 위에서 서술한 것처럼 ``get()``은 ``cy.``에 연결되어 ``document`` 전체에서 탐색하는 반면 ``find()``는 앞의 커맨드에 chain되어 해당 element 안에서 selector를 탐색한다.  
따라서 위의 예제처럼 하나의 ``get()``을 통해 여러 개의 하위 element를 조회해야 할 때는 ``within()``과 ``get()``의 조합을 사용하고, 하나의 하위 element만 확인하고자 할 때에는 ``find()``를 사용하는 것이 좋을 것 같다.
