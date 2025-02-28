# gicons-v2

`gicons-v2` es una librería de íconos vectorizados fácil de integrar en tus proyectos. Permite agregar íconos personalizados y escalables con facilidad.

## Instalación

Puedes instalar `gicons-v2` usando npm o yarn.

### Con npm

```bash
npm install gicons-v2
```

<template>
  <div>
    <gicon name="Burger" size="24" color="black" />
    <gicon name="Search" size="24" color="black" />
  </div>
</template>

<script>
import { GIcon } from 'gicons-v2';

export default {
  components: {
    GIcon
  }
};
</script>

## Propiedades

`gicons-v2` permite varias personalizaciones mediante las siguientes propiedades:

- **`name`**: Nombre del ícono a mostrar (por ejemplo: `"Burger"`, `"Search"`).
- **`size`**: Tamaño del ícono en píxeles (por defecto: `24`).
- **`color`**: Color del ícono. Puede ser un valor CSS válido, como `'red'`, `'#FF0000'`, `'rgba(0,0,0,0.5)'`, etc.

## Contribuciones

Si deseas contribuir a gicons-v2, por favor sigue estos pasos:

Haz un fork de este repositorio.
Crea una nueva rama para tu funcionalidad (git checkout -b feature-nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Envía tu rama a tu fork (git push origin feature-nueva-funcionalidad).
Abre un Pull Request en el repositorio principal.
