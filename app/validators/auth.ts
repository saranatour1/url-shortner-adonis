import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
