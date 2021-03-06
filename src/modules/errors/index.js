'use strict'

class AppError extends Error {
  constructor(type, message, status) {
    super(message)
    this.type = type
    this.status = status
  }
}

class ValidationError extends AppError {
  constructor(errors = []) {
    super('Validation', 'Invalid data format.', 400)
    this.errors = errors
  }
}

class NotFound extends AppError {
  constructor(type = 'NotFound', message = 'Requested resources was not found.') {
    super(type, message, 404)
  }
}

class ConflictError extends AppError {
  constructor(type = 'Conflict', message = 'Entity conflict.') {
    super(type, message, 409)
  }
}

class Unauthorized extends AppError {
  constructor(type = 'Unauthorized', message = 'Not authorized.') {
    super(type, message, 401)
  }
}


module.exports = {
  AppError,
  ValidationError,
  NotFound,
  ConflictError,
  Unauthorized,
}
