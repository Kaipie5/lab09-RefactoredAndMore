const client = new pg.Client(process.env.DATABASE_URL);

client.on('error', err => {
    console.error(err)
})