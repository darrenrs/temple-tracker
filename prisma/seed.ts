import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "admin@example.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    }
  })
  
  // Create temple ordinances
  const ordinanceBaptism = await prisma.ordinance.create( {data: {slug: "baptism", name: "Baptism", description: "Washing away of sins"}} )
  const ordinanceConfirmation = await prisma.ordinance.create( {data: {slug: "confirmation", name: "Confirmation", description: "Blessing of the Holy Ghost"}} )
  const ordinanceInitiatory = await prisma.ordinance.create( {data: {slug: "initiatory", name: "Initiatory", description: "Washing, sealing, and anointing"}} )
  const ordinanceEndowment = await prisma.ordinance.create( {data: {slug: "endowment", name: "Endowment", description: "Making sacred covenants"}} )
  const ordinanceSealing = await prisma.ordinance.create( {data: {slug: "sealing", name: "Sealing", description: "Families can be together forever"}} )
  const ordinanceTempleWorker = await prisma.ordinance.create( {data: {slug: "ordinance-worker", name: "Temple Worker", description: "Serving at the temple"}} )
  const ordinanceOther = await prisma.ordinance.create( {data: {slug: "other", name: "Other", description: "Other"}} )

  const templeStatusOpen = await prisma.templeStatus.create( {data: {slug: "open", name: "Open", description: "The temple is operating normally"}} )
  const templeStatusRenovation = await prisma.templeStatus.create( {data: {slug: "renovation", name: "Closed for Renovation", description: "The temple is temporarily closed for renovations"}} )
  const templeStatusUnderConstruction = await prisma.templeStatus.create( {data: {slug: "under-construction", name: "Under Construction", description: "The temple is under construction"}} )
  const templeStatusAnnounced = await prisma.templeStatus.create( {data: {slug: "announced", name: "Announced", description: "The temple has been announced but construction has not commenced"}} )
  const templeStatusClosed = await prisma.templeStatus.create( {data: {slug: "closed", name: "Closed", description: "The temple is indefinitely closed"}} )

  // Create temples
  const templeOgden = await prisma.temple.create({
    data: {
      slug: "ogden-utah",
      name: "Ogden Utah Temple",
      country: "United States",
      state: "Utah",
      county: "Weber",
      city: "Ogden",
      latitude: 41.227786,
      longitude: -111.971506,
      dateDedicated: new Date("1972-01-18"),
      templeStatusId: templeStatusOpen.id
    }
  })
  const templeProvo = await prisma.temple.create({
    data: {
      slug: "provo-utah",
      name: "Provo Utah Rock Canyon Temple",
      country: "United States",
      state: "Utah",
      county: "Utah",
      city: "Provo",
      latitude: 40.26347161,
      longitude: -111.6405,
      dateDedicated: new Date("1972-02-09"),
      templeStatusId: templeStatusRenovation.id
    }
  })
  const templeProvoCityCenter = await prisma.temple.create({
    data: {
      slug: "provo-city-center",
      name: "Provo City Center Temple",
      country: "United States",
      state: "Utah",
      county: "Utah",
      city: "Provo",
      latitude: 40.232667,
      longitude: -111.659299,
      dateDedicated: new Date("2016-03-20"),
      templeStatusId: templeStatusOpen.id
    }
  })
  const templeWashingtonDC = await prisma.temple.create({
    data: {
      slug: "washington-dc",
      name: "Washington D.C. Temple",
      country: "United States",
      state: "Maryland",
      county: "Montgomery",
      city: "Kensington",
      latitude: 39.014079,
      longitude: -77.065624,
      dateDedicated: new Date("1974-11-19"),
      templeStatusId: templeStatusOpen.id
    }
  })
  const templeToronto = await prisma.temple.create({
    data: {
      slug: "toronto-ontario",
      name: "Toronto Ontario Temple",
      country: "Canada",
      state: "Ontario",
      city: "Brampton",
      latitude: 43.744338,
      longitude: -79.746059,
      dateDedicated: new Date("1990-08-25"),
      templeStatusId: templeStatusOpen.id
    }
  })
  const templeAbidjan = await prisma.temple.create({
    data: {
      slug: "abidjan-ivory-coast",
      name: "Abidjan Ivory Coast Temple",
      country: "Cote d'Ivoire",
      city: "Abidjan",
      latitude: 5.362307,
      longitude: -3.976865,
      templeStatusId: templeStatusUnderConstruction.id
    }
  })
  const templeShanghai = await prisma.temple.create({
    data: {
      slug: "shanghai-peoples-republic-of-china",
      name: "Shanghai People's Republic of China",
      country: "China",
      city: "Shanghai",
      templeStatusId: templeStatusAnnounced.id
    }
  })

  const visit = await prisma.visit.create({
    data: {
      userId: user.id,
      templeId: templeOgden.id,
      sessionDate: new Date("2025-09-25"),
      sessionTime: new Date("2025-09-25 18:00:00"),
      userNote: "Great time at Ogden Temple!\nI felt the Spirit strongly and talked to my friend that I saw afterward.",
      ordinances: {
        create: [
          { ordinanceId: ordinanceBaptism.id, count: 5 },
          { ordinanceId: ordinanceConfirmation.id, count: 5 }
        ]
      }
    }
  })
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async() => { await prisma.$disconnect() })