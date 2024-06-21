/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#controllers/auth/register_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.on('/').renderInertia('home', { version: 6 })
router.on('/link/:id').renderInertia('home', { version: 8 })

router.on('/dashboard').renderInertia('dashboard/main', () => {})
router
  .group(() => {
    router
      .get('/signup', async ({ inertia, auth }) => {
        return inertia.render('auth/signup', { user: auth.use('web').user?.serialize() })
      })
      .as('signup')
    router.post('/signup', [RegisterController, 'store']).as('register.store')

    router.post('/login', [RegisterController, 'login']).as('register.login')
    router
      .get('/login', async ({ inertia }) => {
        return inertia.render('auth/login')
      })
      .as('login')
      .use(
        middleware.guest({
          guards: ['web'],
        })
      )

    router.get('/me', [RegisterController, 'getMe']).as('register.getMe')
    router.post('/logout', [RegisterController, 'logout']).as('register.logout')
  })
  .as('auth')
  .prefix('/auth')
