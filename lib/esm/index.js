var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
export var useQueryStateSync = function (parameters) {
    var history = useHistory();
    var currentQString = useLocation().search;
    var query = new URLSearchParams(currentQString);
    Object.keys(parameters).forEach(function (key) {
        var p = query.get(String(key));
        if (p) {
            parameters[key] = p;
        }
    });
    var _a = useState(parameters), queryParams = _a[0], setQueryParams = _a[1];
    Object.keys(parameters).forEach(function (key) {
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
    var nextQString = query.toString();
    useEffect(function () {
        if (currentQString !== "?" + nextQString) {
            history.push({ search: query.toString() });
        }
    }, [currentQString, nextQString]);
    var querySetters = Object.keys(queryParams).reduce(function (acc, key) {
        acc[("set_" + key)] = function (value) {
            setQueryParams(function (prev) {
                var _a;
                return __assign(__assign({}, prev), (_a = {}, _a[key] = value, _a));
            });
        };
        return acc;
    }, {});
    return { queryParams: queryParams, querySetters: querySetters };
};
