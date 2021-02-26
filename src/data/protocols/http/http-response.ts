export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  ok = 200
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
