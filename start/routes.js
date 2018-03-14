'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('posts', 'PostController.create')
  Route.get('posts', 'PostController.index')
  Route.get('posts/:id', 'PostController.fetchOne')
  Route.put('posts/:id', 'PostController.update')
  Route.delete('posts/:id', 'PostController.delete')
}).prefix('api/v1')