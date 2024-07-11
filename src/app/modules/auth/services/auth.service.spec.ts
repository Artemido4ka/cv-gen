import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let testingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should login', () => {
    const fakeCredentials = {
      userName: 'test name',
      password: '1234',
    };

    const TEST_RES = {
      access_token: '12345678',
      refresh_token: '12345678',
    };

    authService.login(fakeCredentials).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(TEST_RES);
    });

    const mockReq = testingController.expectOne('http://localhost:3000/api/auth/login');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(fakeCredentials);
    mockReq.flush(TEST_RES);
  });

  it('should refresh token', () => {
    const TEST_RES = {
      access_token: '12345678',
      refresh_token: '12345678',
    };

    authService.refreshToken().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(TEST_RES);
    });

    const mockReq = testingController.expectOne('http://localhost:3000/api/auth/refresh');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(TEST_RES);
  });

  it('should logout', () => {
    authService.logout().subscribe(res => {
      expect(res).toBeTruthy();
      const navigateSpy = spyOn(router, 'navigate');
      expect(navigateSpy).toHaveBeenCalledWith([RoutingPaths.AUTH]);
    });

    const mockReq = testingController.expectOne('http://localhost:3000/api/auth/logout');
    expect(mockReq.request.method).toEqual('GET');
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('getAccessToken', () => {
    localStorage.setItem('accessToken', 'testToken');
    const accessToken = authService.getAccessToken();
    expect(accessToken).toBe('testToken');
  });

  it('setAccessToken', () => {
    authService.setAccessToken('testToken');
    const accessToken = localStorage.getItem('accessToken');
    expect(accessToken).toBe('testToken');
  });

  it('removeAccessToken', () => {
    localStorage.setItem('accessToken', 'testToken');
    authService.removeAccessToken();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('checkIsUserLogged', () => {
    localStorage.setItem('accessToken', 'testToken');
    expect(authService.checkIsUserLogged()).toBeTrue();
  });

  it('checkIsUserNotLogged', () => {
    localStorage.removeItem('accessToken');
    expect(authService.checkIsUserLogged()).toBeFalse();
  });
});

