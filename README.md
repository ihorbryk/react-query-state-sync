# REACT QUERY STATE SYNC

This package provide hook for manage your variables needed store in state and synced with query params.


This package has dependencie to `react-router-dom`.

## Instalation

```
npm i react-query-state-sync
```

## How to use

Create some page, wrap it with `Router`.

```jsx
import { useQueryStateSync } from "react-query-state-sync";

const TestPage = () => {
  const { queryParams, querySetters } = useQueryStateSync({
    page: "1",
    limit: "10",
  });
  return (
    <div>
      <div>Page: {queryParams.page}</div>
      <div>
        <button
          onClick={() =>
            querySetters.set_page(String(Number(queryParams.page) + 1))
          }
        >
          Next page
        </button>
        <button
          onClick={() =>
            querySetters.set_page(String(Number(queryParams.page) - 1))
          }
        >
          Prew page
        </button>
      </div>
      <div>
        Limit:{" "}
        <select onChange={(e) => querySetters.set_limit(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};
```

```jsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TestPage from "./TestPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <TestPage />
        </Route>
      </Switch>
    </Router>
  );
}
```

## How it work

All you need is `useQueryStateSync`. This hook API designed with `useState` in mind.

  ```jsx
  const { queryParams, querySetters } = useQueryStateSync({
    page: "1",
    limit: "10",
  });
  ```

Object you pass to `useQueryStateSync` as param, is object where you define inital state.

So, `queryParams` is object returned same object as you pass to `useQueryStateSync`, but with actual values.

`querySetters` is object with setters. All setters creates by add `set_` to parametr name. If you define page then you get `set_page` function for update `page` value.
