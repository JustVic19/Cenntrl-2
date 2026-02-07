// User types
export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

// Session types
export interface Session {
  user: User
  expires: Date
}

// Add more types as needed per module
