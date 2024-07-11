import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { ErrorsService } from '../../../shared/services/errors-service/errors.service';

describe('AuthInterceptor', () => {
  let testingController: HttpTestingController;
  let authInterceptor: AuthInterceptor;
  const authServiceSpy = jasmine.createSpyObj('AuthService', [
    'getAccessToken',
    'setAccessToken',
    'refreshToken',
    'logout',
  ]);
  const errorsServiceSpy = jasmine.createSpyObj('ErrorsService', ['handleError']);
  let httpClient: HttpClient;

  const requestUrl = 'http://localhost:3000/api/test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        ErrorsService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ErrorsService, useValue: errorsServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    authInterceptor = TestBed.inject(AuthInterceptor);
    testingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should add Authorization header with access token to the request if token exists', () => {
    const testToken = 'testToken';
    authServiceSpy.getAccessToken.and.returnValue(testToken);

    httpClient.get(requestUrl).subscribe();

    const mockReq = testingController.expectOne(requestUrl);
    expect(mockReq.request.headers.has('Authorization')).toBe(true);
    expect(mockReq.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    mockReq.flush({});
  });

  it('should not add Authorization header to the request if token does not exist', () => {
    authServiceSpy.getAccessToken.and.returnValue(null);

    httpClient.get(requestUrl).subscribe();

    const mockReq = testingController.expectOne(requestUrl);
    expect(mockReq.request.headers.has('Authorization')).toBe(false);
    mockReq.flush({});
  });

  it('should handle 401 Unauthorized error by refreshing token and retrying the request', () => {
    const testToken = 'testToken';
    const testNewToken = 'newToken';
    authServiceSpy.getAccessToken.and.returnValue(testToken);
    authServiceSpy.refreshToken.and.returnValue(
      of({ access_token: 'newToken', refresh_token: 'newRefreshToken' })
    );

    httpClient.get(requestUrl).subscribe();

    const initialReq = testingController.expectOne(requestUrl);
    expect(initialReq.request.headers.has('Authorization')).toBe(true);
    expect(initialReq.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    initialReq.flush({}, { status: 401, statusText: 'Unauthorized' });

    const retryReq = testingController.expectOne(requestUrl);
    expect(retryReq.request.headers.has('Authorization')).toBe(true);
    expect(retryReq.request.headers.get('Authorization')).toBe(`Bearer ${testNewToken}`);
    retryReq.flush({});
  });

  it('should handle other errors by calling the error handling service', () => {
    httpClient.get(requestUrl).subscribe({
      error(e) {
        expect(e.status).toBe(500);
        expect(e.statusText).toBe('Internal Server Error');
      },
    });

    const req = testingController.expectOne(requestUrl);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });

    expect(errorsServiceSpy.handleError.calls.count()).toBe(1);
  });
});
