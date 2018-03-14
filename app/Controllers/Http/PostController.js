'use strict'

const Post = use('App/Models/Post')
const Database = use('Database')
const Logger = use('Logger')

const notFound = 'post not found'
const badRequest = 'fields error'

class PostController {
    async create ({ request, response }) {
        const body = request.only(['title', 'content'])

        if (body.title && body.content) {
            Logger.info('%s - %s', request.method(), request.url())
            const newPost = new Post()
            newPost.title = body.title
            newPost.content = body.content
            await newPost.save()

            return response.status(201).json(newPost)
        } else {
            Logger.error('%s - %s', request.method(), request.url())
            return response.status(400).json({ message: badRequest })
        }
    }

    async index ({ request, response }) {
        const posts = await Database
        .table('posts')
        .orderBy('id', 'desc')

        if (Object.keys(posts).length === 0) {
            Logger.error('%s - %s', request.method(), request.url())
            return response.json({ message: 'No posts available' })
        }
        
        Logger.info('%s - %s', request.method(), request.url())
        return posts
    }

    async fetchOne ({ params, request, response }) { 
        const post = await Post.find(params.id)

        if (!post) {
            Logger.error('%s - %s', request.method(), request.url())
            return response.status(404).json({ message: notFound })
        }

        Logger.info('%s - %s', request.method(), request.url())
        return post   
    }

    async update ({ params, request, response }) {
        const body = request.only(['title', 'content'])
        const post = await Post.find(params.id)

        if (!post) {
            Logger.error('%s - %s', request.method(), request.url())
            return response.status(404).json({ message: notFound })
        }

        if (body.title && body.content) {
            post.title = body.title
            post.content = body.content
            await post.save()

            Logger.info('%s - %s', request.method(), request.url())
            return post
        } else {
            Logger.error('%s - %s', request.method(), request.url())
            return response.status(400).json({ message: badRequest })
        }
    }

    async delete ({ params, request, response }){
        const post = await Post.find(params.id)

        if (!post) {
            Logger.error('%s - %s', request.method(), request.url())
            return response.status(404).json({ message: notFound })
        }

        await post.delete()

        Logger.info('%s - %s', request.method(), request.url())
        return response.json({ message: 'post deleted!' })
    }
}

module.exports = PostController
