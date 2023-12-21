/**
 * Merge all class names into one, for html class property
 * @param classNames Class Names to merge
 * @returns Merged class names
 */
export function classNames(
  ...classNames: (string | undefined | { [key: string]: boolean | undefined })[]
) {
  return classNames.reduce<string>((result, name) => {
    const value =
      typeof name === "object"
        ? Object.entries(name).reduce<string>(
            (r, v) => (v[1] ? r + (r && v[0] ? " " : "") + v[0] : r),
            ""
          )
        : name ?? "";

    return result + (result && value ? " " : "") + value;
  }, "");
}
