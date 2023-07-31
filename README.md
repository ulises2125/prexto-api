# Proyecto de NestJS - CRUD de Gatos y Obtención de Imágenes Aleatorias

Este proyecto es una aplicación web desarrollada con NestJS, MongoDB y TypeScript. Consiste en un CRUD (Create, Read, Update, Delete) para gestionar gatos, accesible a través de la ruta `/cats`. Además, se obtienen imágenes aleatorias de la API https://thecatapi.com/.

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- Node.js y npm (Node Package Manager)
- MongoDB (asegúrate de que el servidor de MongoDB esté en ejecución)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto y ejecuta `npm install` para instalar las dependencias.

## Variables de entorno

Crear un archivo llamado .env al mismo nivel que la carpeta src que contendra lo siguiente:

```
MY_DATABASE = url de la base de datos
CAT_API_KEY = apiKey-otorgada-por-la-api-de-imagenes
API_URL = https://api.thecatapi.com/v1/images
```

## Ejecución

Una vez configurada la base de datos, puedes iniciar la aplicación mediante el siguiente comando:

```
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Endpoints

La aplicación ofrece los siguientes endpoints:

- **CRUD de Gatos**

  - `GET /cats`: Obtiene una lista de todos los gatos registrados.
  - `GET /cats/:id`: Obtiene un gato específico por su ID.
  - `POST /cats`: Crea un nuevo gato. Los datos del gato se envían en el cuerpo de la solicitud (por ejemplo, mediante JSON).
  - `PUT /cats/:id`: Actualiza los datos de un gato existente por su ID. Los nuevos datos se envían en el cuerpo de la solicitud.
  - `DELETE /cats/:id`: Elimina un gato existente por su ID.

- **Obtención de Imágenes Aleatorias**
  - `GET /images`: Obtiene una imagen aleatoria de la API de imágenes.
  - `POST /images/favorites`: A traves de un id pasado por body retorna la imagen guardada como favorito
  - `GET /images/favorites`: Obtiene las imagenes guardadas como favorito
