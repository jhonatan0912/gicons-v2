const modules = import.meta.glob("./*.vue", { eager: true });

const components = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const name = path.match(/\.\/(.*?)\.vue$/)[1];

    return [name, module.default];
  })
);

export default components;
