/**
 * Check if an object's class is a child of the given parent class
 * @param obj Object to check
 * @param parent Parent class
 * @returns If the object herits from the parent class
 */
export function isChildOf<T>(obj: unknown, parent: new (...args: any[]) => T) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return obj.constructor instanceof parent.constructor;
}
