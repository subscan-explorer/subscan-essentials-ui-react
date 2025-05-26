import BigNumber from 'bignumber.js';
import {
  getThemeColor,
  checkIsExtrinsicIndex,
  formatHash,
  formatNumber,
  getBalanceAmount,
  timeAgo,
} from '@/utils/text';
import { BIGNUMBER_FMT } from '@/utils/const';

describe('Utils - text', () => {
  describe('getThemeColor', () => {
    it('should return "danger" if isSubstrate is true', () => {
      expect(getThemeColor(true)).toBe('danger');
    });

    it('should return "primary" if isSubstrate is false', () => {
      expect(getThemeColor(false)).toBe('primary');
    });

    it('should return "primary" if isSubstrate is undefined', () => {
      expect(getThemeColor()).toBe('primary');
    });
  });

  describe('checkIsExtrinsicIndex', () => {
    it('should return true for valid extrinsic index', () => {
      expect(checkIsExtrinsicIndex('12345-1')).toBe(true);
      expect(checkIsExtrinsicIndex('0-0')).toBe(true);
    });

    it('should return false for invalid extrinsic index', () => {
      expect(checkIsExtrinsicIndex('12345')).toBe(false);
      expect(checkIsExtrinsicIndex('12345-')).toBe(false);
      expect(checkIsExtrinsicIndex('-1')).toBe(false);
      expect(checkIsExtrinsicIndex('abc-def')).toBe(false);
      expect(checkIsExtrinsicIndex('')).toBe(false);
    });
  });

  describe('formatHash', () => {
    it('should format hash correctly with default units', () => {
      const hash = '0x1234567890abcdef1234567890abcdef';
      expect(formatHash(hash)).toBe('0x1234....abcdef');
    });

    it('should format hash correctly with custom units', () => {
      const hash = '0x1234567890abcdef1234567890abcdef';
      expect(formatHash(hash, 8)).toBe('0x12....cdef');
    });

    it('should return original hash if length is less than units', () => {
      const hash = '0x12345';
      expect(formatHash(hash, 12)).toBe('0x12345');
    });

    it('should return undefined if hash is undefined', () => {
      expect(formatHash(undefined)).toBeUndefined();
    });
  });

  describe('formatNumber', () => {
    it('should format number string correctly', () => {
      BigNumber.config({ FORMAT: BIGNUMBER_FMT });
      expect(formatNumber('1234567.89')).toBe('1,234,567.89');
    });

    it('should format number correctly', () => {
      BigNumber.config({ FORMAT: BIGNUMBER_FMT });
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    it('should format BigNumber correctly', () => {
      BigNumber.config({ FORMAT: BIGNUMBER_FMT });
      expect(formatNumber(new BigNumber('1234567.89'))).toBe('1,234,567.89');
    });
  });

  describe('getBalanceAmount', () => {
    it('should calculate balance amount with decimals', () => {
      const amount = new BigNumber('1234500000000');
      const decimals = 10;
      // 1234500000000 / 10^10 = 123.45
      expect(getBalanceAmount(amount, decimals).toString()).toBe('123.45');
    });

    it('should calculate balance amount with 0 decimals if decimals is undefined', () => {
      const amount = new BigNumber('12345');
      // 12345 / 10^0 = 12345
      expect(getBalanceAmount(amount).toString()).toBe('12345');
    });
  });

  describe('timeAgo', () => {
    const mockNow = new Date(2025, 5, 15, 12, 0, 0).getTime(); // 2025-05-15 12:00:00

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(mockNow);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return "0 sec ago" for same time', () => {
      const time = mockNow / 1000;
      expect(timeAgo(time, mockNow)).toBe('0 sec ago');
    });

    it('should return seconds ago', () => {
      const time = (mockNow / 1000) - 30; // 30 seconds ago
      expect(timeAgo(time, mockNow)).toBe('30 secs ago');
    });

     it('should return "1 sec ago" for 1 second ago', () => {
      const time = (mockNow / 1000) - 1;
      expect(timeAgo(time, mockNow)).toBe('1 sec ago');
    });

    it('should return minutes ago', () => {
      const time = (mockNow / 1000) - (5 * 60); // 5 minutes ago
      expect(timeAgo(time, mockNow)).toBe('5 mins ago');
    });

    it('should return "1 min ago" for 1 minute ago', () => {
      const time = (mockNow / 1000) - 60;
      expect(timeAgo(time, mockNow)).toBe('1 min ago');
    });

    it('should return hours and minutes ago', () => {
      const time = (mockNow / 1000) - (2 * 3600 + 15 * 60); // 2 hours 15 minutes ago
      expect(timeAgo(time, mockNow)).toBe('2 hrs 15 mins ago');
    });

     it('should return "1 hr ago" for 1 hour ago', () => {
      const time = (mockNow / 1000) - 3600;
      expect(timeAgo(time, mockNow)).toBe('1 hr ago');
    });

    it('should return "1 hr 1 min ago" for 1 hour 1 minute ago', () => {
      const time = (mockNow / 1000) - (3600 + 60);
      expect(timeAgo(time, mockNow)).toBe('1 hr 1 min ago');
    });


    it('should return days and hours ago', () => {
      const time = (mockNow / 1000) - (3 * 86400 + 5 * 3600); // 3 days 5 hours ago
      expect(timeAgo(time, mockNow)).toBe('3 days 5 hrs ago');
    });

    it('should return "1 day ago" for 1 day ago', () => {
      const time = (mockNow / 1000) - 86400;
      expect(timeAgo(time, mockNow)).toBe('1 day ago');
    });

     it('should return "1 day 1 hr ago" for 1 day 1 hour ago', () => {
      const time = (mockNow / 1000) - (86400 + 3600);
      expect(timeAgo(time, mockNow)).toBe('1 day 1 hr ago');
    });

    // Test for "after" cases
    it('should return seconds after', () => {
      const time = (mockNow / 1000) + 30; // 30 seconds after
      expect(timeAgo(time, mockNow)).toBe('after 30 secs ago'); // "ago" is part of the string literal
    });
  });
});
