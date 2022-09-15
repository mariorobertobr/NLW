import express, { json, Request, Response, response } from 'express'
import { PrismaClient} from '@prisma/client'

const app = express()
const prisma = new PrismaClient( {
//   log: [ 'query', 'error', 'warn', 'info',]
})

app.use(json())
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

app.get('/games/:gameId/ads', async(req: Request, res: Response) => {

  const ads = await prisma.ad.findMany(
   {
      where: {
        gameId: req.params.gameId
      },
      select: {
         id: true,
         name: true,
         weekDays: true,
         useInvoiceChannel: true,
         yarsPlaying: true,
         hourStart: true,
         hoursEnd: true,
      },
      orderBy: {
         createdAt: 'desc',
      }
   }
  )

   return res.json(ads.map(ad=>{
      return {
         ...ads,
         weekDays: ad.weekDays.split(',')
      }
   }))

})




app.listen(3000, function(){
   console.log('listening on port 3000')
});