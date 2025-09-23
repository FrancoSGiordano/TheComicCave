# Comic Cave

**Comic Cave** es una aplicación web para explorar, buscar, guardar y compartir cómics. Está pensada para ofrecer una experiencia responsiva y moderna que funcione bien tanto en desktop como en dispositivos móviles.

## Qué hace
- Muestra listados de cómics (portadas y títulos).
- Búsqueda y filtrado (nombre, personajes y creadores).
- Páginas de detalle con información de cada cómic (fecha de lanzamiento, descricpcion,y creadores).
- Posibilidad de compartir cómics por mail.
- Geolocalizacion (integración con Leaflet).
- Manejo de estado global con stores simples y reactivos.

## Tecnologías y librerías principales
- **React**
- **Vite**
- **TypeScript**
- **React Router** — enrutamiento.
- **Zustand** — gestión de estado.
- **React-Select** — selects.
- **Leaflet** + **React-Leaflet** — mapas interactivos.
- **md5** — hashing.

## Integración con APIs
La aplicación consume una API externa para obtener los datos de los cómics (por ejemplo, la API pública de cómics).
https://developer.marvel.com/

## Responsive
- Diseño desktop-first: la UI se adapta a pantallas pequeñas y grandes.

## Ejecutar aplicacion
Luego de clonar repositorio, ejecutar:
- cd client
- npm i
- npm run dev
