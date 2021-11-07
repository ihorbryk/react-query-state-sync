"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryStateSync = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const useQueryStateSync = (parameters) => {
    const history = (0, react_router_dom_1.useHistory)();
    const currentQString = (0, react_router_dom_1.useLocation)().search;
    const query = new URLSearchParams(currentQString);
    Object.keys(parameters).forEach((key) => {
        const p = query.get(String(key));
        if (p) {
            parameters[key] = p;
        }
    });
    const [queryParams, setQueryParams] = react_1.default.useState(parameters);
    Object.keys(parameters).forEach((key) => {
        if (queryParams[key] !== "" &&
            queryParams[key] !== undefined &&
            queryParams[key] !== "undefined" &&
            queryParams[key] != null &&
            queryParams[key] !== "null") {
            query.set(String(key), queryParams[key]);
        }
        else {
            query.delete(String(key));
        }
    });
    const nextQString = query.toString();
    react_1.default.useEffect(() => {
        if (currentQString !== "?" + nextQString) {
            history.push({ search: query.toString() });
        }
    }, [currentQString, nextQString]);
    const querySetters = Object.keys(queryParams).reduce((acc, key) => {
        acc[("set_" + key)] = (value) => {
            setQueryParams((prev) => {
                return Object.assign(Object.assign({}, prev), { [key]: value });
            });
        };
        return acc;
    }, {});
    return { queryParams, querySetters };
};
exports.useQueryStateSync = useQueryStateSync;
