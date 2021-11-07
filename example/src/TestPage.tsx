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

export default TestPage;
