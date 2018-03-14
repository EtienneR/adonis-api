'use strict'

const { test, trait } = use('Test/Suite')('posts API')
const post = use('App/Models/Post')

trait('Test/ApiClient')

test('No posts', async ({ client }) => {
  const response = await client
  .get('api/v1/posts')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'No posts available'
  })
})

test('Post a post with missing field', async ({ client }) => {
  const a = await client
  .post('api/v1/posts')
  .send({
    title: 'test'
  })
  .end()

  a.assertHeader('content-type', 'application/json; charset=utf-8')
  a.assertStatus(400)
  a.assertJSONSubset({
    message: 'fields error'
  })
})

test('Post a post', async ({ client }) => {
  const a = await client
  .post('api/v1/posts')
  .send({
    title: 'My First Post',
    content: 'Lorem Ipsum'
  }).end()

  a.assertHeader('content-type', 'application/json; charset=utf-8')
  a.assertStatus(201)
  a.assertJSONSubset({
    id: 1,
    title: 'My First Post',
    content: 'Lorem Ipsum'
  })

  const b = await client
  .post('api/v1/posts')
  .send({
    id: 2,
    title: 'My Second Post',
    content: 'Rosa Rosae'
  }).end()

  b.assertHeader('content-type', 'application/json; charset=utf-8')
  b.assertStatus(201)
  b.assertJSONSubset({
    title: 'My Second Post',
    content: 'Rosa Rosae'
  })
 
  const response = await client
  .get('api/v1/posts')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset([{
    id: 1,
    title: 'My First Post',
    content: 'Lorem Ipsum'
  },
  {
    id: 2,
    title: 'My Second Post',
    content: 'Rosa Rosae'
  }])
})

test('Get a post', async ({ client }) => {
  const response = await client
  .get('api/v1/posts/1')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset({
    title: 'My First Post',
    content: 'Lorem Ipsum'
  })
})

test('Update a post with a missing field', async ({ client }) => {
  const response = await client
  .put('api/v1/posts/1')
  .field('title', 'test2')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(400)
  response.assertJSONSubset({
    message: 'fields error'
  })
})

test('Update a post with bad id', async ({ client }) => {
  const response = await client
  .put('api/v1/posts/42')
  .field('title', 'test2')
  .field('content', 'adonis')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(404)
  response.assertJSONSubset({
    message: 'post not found'
  })
})

test('Update a post', async ({ client }) => {
  const response = await client
  .put('api/v1/posts/1')
  .field('title', 'My First Post')
  .field('content', 'Updated')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset({
    title: 'My First Post',
    content: 'Updated'
  })
})

test('Delete a post with bad id', async ({ client }) => {
  const response = await client
  .delete('api/v1/posts/42')
  .end()
  
  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(404)
  response.assertJSONSubset({
    message: 'post not found'
  })
})

test('Delete a post', async ({ client }) => {
  const response = await client
  .delete('api/v1/posts/1')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'post deleted!'
  })
})

test('Post 404', async ({ client }) => {
  const response = await client
  .get('api/v1/posts/1')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(404)
  response.assertJSONSubset({
    message: 'post not found'
  })
})

test('All posts', async ({ client }) => { 
  const response = await client
  .get('api/v1/posts')
  .end()

  response.assertHeader('content-type', 'application/json; charset=utf-8')
  response.assertStatus(200)
  response.assertJSONSubset([{
    title: 'My Second Post',
    content: 'Rosa Rosae'
  }])
})