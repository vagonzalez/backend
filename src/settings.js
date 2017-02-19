// De cara a próxima implementación
// debería tener secciones: dev, production, staging

const settings = {
  port: 3000,
  debug: true,
  db: {
    db: 'air-stats',
    password: 'air-stats',
    port: '27017',
    server: 'localhost',
    user: 'air-stats'
  }
}

export default settings
