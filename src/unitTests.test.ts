import { describe } from "node:test";


describe('isValidNote function', () => {
    test('should validate valid notes', () => {
      expect(isValidNote(5, 10)).toBe(true);
      expect(isValidNote(0, 10)).toBe(true);
      expect(isValidNote(10, 10)).toBe(true);
    });
  
    test('should invalidate invalid notes', () => {
      expect(isValidNote(-1, 10)).toBe(false);
      expect(isValidNote(11, 10)).toBe(false);
      expect(isValidNote(NaN, 10)).toBe(false);
      expect(isValidNote(undefined, 10)).toBe(false);
    });
  