# gicons-v2

`gicons-v2` is a vector icon library that is easy to integrate into your projects. It allows you to add customizable and scalable icons with ease.

## Installation

You can install `gicons-v2` using npm.

### With npm

```bash
npm install @jhonatan0912/gicons-v2
```

## Usage

### Basic Example

```vue
<template>
  <div>
    <GIcon name="Burger" size="24" color="black" />
    <GIcon name="Search" size="24" color="black" />
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

| Prop    | Type   | Default | Description                                          |
| ------- | ------ | ------- | ---------------------------------------------------- |
| `name`  | String | `''`    | Icon name to display (e.g., `"Burger"`, `"Search"`). |
| `size`  | Number | `24`    | Icon size in pixels.                                 |
| `color` | String | `''`    | Icon color. Accepts any valid CSS color value.       |

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
