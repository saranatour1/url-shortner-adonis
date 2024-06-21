import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
export default class RegisterController {
  async store({ request, response, auth, logger }: HttpContext) {
    logger.info('hitting /auth/signup post method')
    const data = await request.validateUsing(signUpValidator)

    const user = await User.create(data)
    await auth.use('web').login(user)
    return response.redirect().toPath('/dashboard')
  }

  async logout(ctx: HttpContext) {
    ctx.logger.info('logging out')
    await ctx.auth.use('web').logout()
    return ctx.response.redirect().toPath('/dashboard')
  }

  async login(ctx: HttpContext) {
    ctx.logger.info('logging in')

    const data = await ctx.request.validateUsing(signInValidator)

    const badResponseMsg = {
      errors: [
        {
          message: 'Incorrect email or password',
        },
      ],
    }

    try {
      const { email, password } = ctx.request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      await ctx.auth.use('web').login(user)
      return ctx.response.redirect().toPath('/dashboard')
    } catch (e) {
      ctx.logger.error('Login error:', e)
      return ctx.response.unauthorized(badResponseMsg)
    }
  }

  async getMe(ctx: HttpContext) {
    ctx.logger.info('getting logged in user')
    try {
      if (ctx.auth.user) {
        return ctx.auth.user.serialize()
      }
    } catch (e) {
      return { ok: false }
    }
  }
}
