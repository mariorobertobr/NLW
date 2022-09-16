import express, { json, request, Request, Response, response } from 'express'
import cors from 'cors'
import { PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minuts'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()
app.use(express.json())
const prisma = new PrismaClient( {
//   log: [ 'query', 'error', 'warn', 'info',]
})


app.use(cors({
      origin: '*',
}))

app.use(json())

interface createAd {
   name: string,
   gameId: string,
   yarsPlaying: number,
   discord: string,
   hoursEnd: string,
   hourStart: string,
   weekDays: string,
   useInvoiceChannel: boolean,
}

app.get('/games',  async(req: Request, res: Response) => {

   const getGames = await prisma.game.findMany(
      {
         include: {
           _count: {
            select: {
               ads: true
            }
           }
         }
      }
   );

   return res.json(getGames)
  
})



app.get('/ads/:id/discord', async(req: Request, res: Response) => {
   const ads = await prisma.ad.findUniqueOrThrow({
      where: {
         id: req.params.id
      },
      select: {
         discord: true,
      }
   })

   return res.json({
      discord: ads?.discord
   })
})

app.post('/games/:id/ads', async(req: Request, res: Response) =>{
   const gameId = req.params.id
   
   const gameIdExists = await prisma.game.findUnique({
      where: {
         id: gameId
      },
   })

   if (!gameIdExists) {
      return res.json({ message: 'game not found'})
   }

   
   const createAds = await prisma.ad.create(
      {
         data: {
            gameId: gameId,
            name: req.body.name,
            discord: req.body.discord,
            yarsPlaying: req.body.yarsPlaying,
            hourStart: convertHourStringToMinutes(req.body.hourStart),
            hourEnd: convertHourStringToMinutes(req.body.hourEnd),
            weekDays: req.body.weekDays.join(','),
            useInvoiceChannel: req.body.useInvoiceChannel
         
         }
      }
   )
   return res.status(201).json(createAds)


})

app.get('/games/:id/ads', async(req: Request, res: Response) => {

  const ads = await prisma.ad.findMany(
   {
      where: {
        gameId: req.params.id
      },
      select: {
         id: true,
         name: true,
         weekDays: true,
         useInvoiceChannel: true,
         yarsPlaying: true,
         hourStart: true,
         hourEnd: true,
      },
      orderBy: {
         createdAt: 'desc',
      }
   }
  )

   return res.json(ads.map(ad=>{
      return {
         ...ad,
         weekDays: ad.weekDays.split(','),
         hourStart: convertMinutesToHourString(ad.hourStart),
         hourEnd: convertMinutesToHourString(ad.hourEnd),
      }
   }))

})

app.listen(3000, function(){
   console.log('listening on port 3000')
});