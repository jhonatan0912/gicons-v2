import { mergeAttributes } from "@tiptap/core";
import { Image } from "@tiptap/extension-image";

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

export const CustomImage = Image.extend<ImageOptions>({
  addAttributes() {
    const baseAttrs = Image.config.addAttributes?.() ?? {};

    return {
      ...baseAttrs,
      width: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("width") || element.style.width || null,
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
      height: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("height") || element.style.height || null,
        renderHTML: (attributes) =>
          attributes.height ? { height: attributes.height } : {},
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style") || null,
        renderHTML: (attributes) =>
          attributes.style ? { style: attributes.style } : {},
      },
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class") || null,
        renderHTML: (attributes) =>
          attributes.class ? { class: attributes.class } : {},
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});
