# gicons-v2

`gicons-v2` is a Vue 2 icon library that provides a set of vector icons, allowing easy integration and customization in your Vue 2 applications.

## Installation

You can install `gicons-v2` using npm:

### With npm

```bash
npm install @jhonatan0912/gicons-v2
```

## Usage

### Basic Example

```vue
<template>
  <div>
    <GIcon name="Burger" size="md" color="black" />
    <GIcon name="Search" size="md" color="black" hover />
  </div>
</template>

<script>
import { GIcon } from "@jhonatan0912/gicons-v2";

export default {
  components: {
    GIcon,
  },
};
</script>
```

## Props

| Prop         | Type    | Default                      | Description                                           |
|-------------|---------|------------------------------|-------------------------------------------------------|
| `name`      | String  | **(required)**               | Icon name to display (e.g., `"Burger"`, `"Search"`). |
| `size`      | String  | `'md'`                       | Size of the icon (`'sm'`, `'md'`, `'lg'`, etc.).       |
| `hover`     | Boolean | `false`                      | Enables hover effect.                                 |
| `active`    | Boolean | `false`                      | Indicates active state.                               |
| `selected`  | Boolean | `false`                      | Indicates selected state.                             |
| `color`     | String  | `'--p-text-primary'`         | Icon color (CSS variable or valid color value).       |
| `hoverColor`| String  | `'--p-secondary-low-shade'`  | Icon color on hover (CSS variable or valid color).   |
| `rotate`    | Number  | `0`                          | Rotates the icon in degrees.                         |

## Events

| Event   | Description                 |
|---------|-----------------------------|
| `click` | Emitted when the icon is clicked. |

## Contributing

If you want to contribute to `gicons-v2`, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-new-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push your branch to your fork:
   ```bash
   git push origin feature-new-feature
   ```
5. Open a Pull Request on the main repository.

## License

This project is licensed under the MIT License.

---

[Repository](https://github.com/jhonatan0912)

