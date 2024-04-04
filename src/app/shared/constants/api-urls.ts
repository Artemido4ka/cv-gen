export class API_URLS {
  public static readonly BASE_URL = 'http://localhost:3000';
  public static readonly LOGIN = this.BASE_URL + '/api/auth/login';
  public static readonly LOGOUT_URL = this.BASE_URL + '/api/auth/logout';
  public static readonly REFRESH_TOKEN = this.BASE_URL + '/api/auth/refresh';

  public static readonly PROJECTS = this.BASE_URL + '/api/projects';
}
