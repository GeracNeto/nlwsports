import express from 'express'
import cors from "cors" // Permissão de dominios para acessar nosso backend

import { PrismaClient } from '@prisma/client'

import { convertHoursStringToMinutes } from './utils/convert-hour-string-to-minute'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

/*
- Query: localhost:3333/ads?page=2 -> Persistir estado, todos os parametros precisam ser nomeados
- Route: São parâmetros não nomeados -> localhost:3333/ads/5 -> Estou tentando acessar o anúncio 5 (olhando para a URL ja sabemos o que está 'acontecendo')
- body: Envio de várias informações -> Exemplo formulários

*/

// www.minhaapi.com/ads

// HTTP methods / API RESTful / HTTP Codes

// GET, POST, PUT, PATCH, DELETE

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ad: true,
                }
            }
        }
    })

    return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id
    const body: any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringToMinutes(body.hourStart),
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad)
})

// colcoando dois pontos na frente do id -> :id o express entende que esse valor é dinâmico. Podemos escrever, por exemplo: localhost:3333/games/12/ads
app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id

    const ads = await prisma.ad.findMany({

        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    })
})

app.listen(3333)