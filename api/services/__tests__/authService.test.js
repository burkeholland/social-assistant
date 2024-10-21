import { expect, suite, test } from 'vitest';
import * as authService from '../authService';

suite('authService', () => {
  test('Test Case 1: isUserAuthorized should return clientPrincipal for valid microsoft.com email', () => {
    const req = {
      headers: {
        'x-ms-client-principal': Buffer.from(JSON.stringify({
          userDetails: 'user@microsoft.com'
        })).toString('base64')
      }
    };
    const result = authService.isUserAuthorized(req);
    expect(result).not.toBeNull();
    expect(result.userDetails).toBe('user@microsoft.com');
  });

  test('Test Case 2: isUserAuthorized should return clientPrincipal for valid github.com email', () => {
    const req = {
      headers: {
        'x-ms-client-principal': Buffer.from(JSON.stringify({
          userDetails: 'user@github.com'
        })).toString('base64')
      }
    };
    const result = authService.isUserAuthorized(req);
    expect(result).not.toBeNull();
    expect(result.userDetails).toBe('user@github.com');
  });

  test('Test Case 3: isUserAuthorized should return null for invalid email domain', () => {
    const req = {
      headers: {
        'x-ms-client-principal': Buffer.from(JSON.stringify({
          userDetails: 'user@example.com'
        })).toString('base64')
      }
    };
    const result = authService.isUserAuthorized(req);
    expect(result).toBeNull();
  });

  test('Test Case 4: isUserAuthorized should return null if header is missing', () => {
    const req = {
      headers: {}
    };
    const result = authService.isUserAuthorized(req);
    expect(result).toBeNull();
  });

  test('Test Case 5: isUserAuthorized should return null if header is not base64 encoded', () => {
    const req = {
      headers: {
        'x-ms-client-principal': 'invalid-base64'
      }
    };
    const result = authService.isUserAuthorized(req);
    expect(result).toBeNull();
  });

  test('Test Case 6: isUserAuthorized should return null if JSON parsing fails', () => {
    const req = {
      headers: {
        'x-ms-client-principal': Buffer.from('invalid-json').toString('base64')
      }
    };
    const result = authService.isUserAuthorized(req);
    expect(result).toBeNull();
  });
});
