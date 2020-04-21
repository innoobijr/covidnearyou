import { notNullorUndefined, unique } from "./data-utils";
import { extent } from "d3-array";

/**
 * return quantile domain for an array of data
 * @param {array} data
 * @param {function | undefined} valueAccessor
 * @param {function | undefined} sortFunc
 * @returns {array} domain
 */
export function getQuantileDomain(data, valueAccessor, sortFunc) {
  const values =
    typeof valueAccessor === "function" ? data.map(valueAccessor) : data;

  return values.filter(notNullorUndefined).sort(sortFunc);
}

/**
 * return ordinal domain for an array of data
 * @param {array} data
 * @param {function} valueAccessor
 * @returns {array} domain
 */
export function getOrdinalDomain(data, valueAccessor) {
  const values =
    typeof valueAccessor === "function" ? data.map(valueAccessor) : data;

  return unique(values).filter(notNullorUndefined).sort();
}

/**
 * return linear domain for an array of data
 * @param {Array} data
 * @param {function} valueAccessor
 * @returns {Array} domain
 */
export function getLinearDomain(data, valueAccessor = null) {
  const range =
    typeof valueAccessor === "function"
      ? extent(data, valueAccessor)
      : extent(data);

  return range.map((d, i) => (d === undefined ? i : d));
}

/**
 * return linear domain for an array of data. A log scale domain cannot contain 0
 * @param {Array} data
 * @param {function} valueAccessor
 * @returns {Array} domain
 */
export function getLogDomain(data, valueAccessor) {
  const [d0, d1] = getLinearDomain(data, valueAccessor);

  return [d0 === 0 ? 1e-5 : d0, d1];
}
