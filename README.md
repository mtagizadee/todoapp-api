# Description
    That's a simple todoapp. The current project is the 
    back-end RESTapi for this idea.

#Technologies used
    1. Main framework --> NestJS
    2. PostgreSQL + Prisma integration

#How to run the project
    1. Clone the git repo
    2. open pgAdmin 4 and create a db (if you don't have pgAdmin4 install it)
    3. run npm install command
    4. set up the .env file in the following format:
        # server configuration
        PORT="5000"
        
        # database configuration
        DB_HOST="localhost"
        DB_PORT="5432"
        DB_USERNAME="yourvalue"
        DB_PASSWORD="yourvalue"
        DB_NAME="yourvalue"
        
        DB_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
    5. run npm run start:dev command

#Notes
    I decided to not to use JWT auth this time,
    just because i wanted to try create my own session
    system in nestjs at the same time as auth system.