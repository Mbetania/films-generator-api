
# Film Generator 
## Descripción
Films Generator API es una aplicación backend desarrollada con NestJS que permite gestionar una base de datos de películas. La API cuenta con un sistema de autenticación y autorización basado en roles, permitiendo a los usuarios regulares y administradores acceder a diferentes funcionalidades.

## Características principales:
- La API está desplegada en Vercel y se puede acceder en la siguiente URL:
[generator-api.vercel.app](https://generator-api-mbetania-mbetanias-projects.vercel.app/api/v1)
- Autenticación y Autorización: La API implementa un sistema de autenticación y autorización utilizando JWT (JSON Web Tokens).
- Gestión de Roles: Existen dos roles de usuario: "Usuario Regular" y "Administrador". Los usuarios regulares tienen acceso a consultar la lista de películas y los detalles de una película específica. Los administradores pueden crear, actualizar y eliminar películas.
- Población de la Base de Datos: La API realiza una única solicitud a la API pública de Star Wars para popular la base de datos de películas. Esta información se mantiene en la base de datos y puede ser editada por los administradores.

## Endpoints de la API:
- Registro de usuarios
- Inicio de sesión de usuarios y obtención de token de acceso
- Obtener la lista de películas
- Obtener los detalles de una película específica
- Crear una nueva película (solo administradores)
- Actualizar la información de una película existente (solo administradores)
- Eliminar una película (solo administradores)

  
## Instalación y Ejecución Local
## Clonar el repositorio:
```bash
git clone https://github.com/Mbetania/films-generator-api.git
```
## Instalar dependencias
```bash
$ pnpm install
```
## Configurar las variables de entorno basandóse en el archivo .env.example

```bash
#<------------- NODE VARIABLES ------------->
NODE_ENV= 'development'
NODE_PORT=3000
#<------------- DATABASE VARIABLES ------------->
MONGODB_CONNECT=mongodb
MONGODB_URI=
MONGODB_NAME=
#<------------- BCRYPT VARIABLES ------------->
HASH_ROUNDS= 10
#<------------- RATE LIMIT VARIABLES ------------->
RATE_LIMIT_TTL=1000
RATE_LIMIT_COUT=10
#<------------- JWT VARIABLES ------------->
JWT_SECRET=
```
## Inicio de aplicación
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
