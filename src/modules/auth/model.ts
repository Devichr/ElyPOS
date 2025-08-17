export interface JwtPayload {
  id: string
  username: string
  email: string
  [key: string]: string | number
}

export interface AuthResponse {
  token: string
}

export interface PublicUser {
  id: string
  username: string
  email: string
}
