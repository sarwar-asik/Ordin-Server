### Book-listing-Backend :::


#### ready server with 

                express
                prisma 
                postgres
                zod 



#### installation >>>>


for node modules>>

                yarn

after change in schema.prisma >>

            npx prisma migrate dev

start prisma studio >>
    
            npx prisma studio

**auto generate modules**

            node generateFiles [enter click]
            User
###### .env file>>>

    DATABASE_URL="postgresql://postgres:password@localhost:5431/book_listing?schema=SCHEMA"

    PORT = 5000
    NODE_ENV = developments

    JWT_SECRET = 'very-secret'
    JWT_EXPIRES_IN=1d
    JWT_REFRESH_SECRET='very-refresh-secret'
    JWT_REFRESH_EXPIRES_IN=365d# Ordin-Server
