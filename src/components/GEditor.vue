<template>
  <div class="editor">
    <div v-if="editor" class="editor-toolbar">
      <Popover>
        <div class="popover__main">
          <span class="g-text--content-1-b" v-html="currentText.label"></span>
          <GIcon name="ArrowGeorDown" size="xs" />
        </div>

        <template #content="{ close }">
          <div class="text__option" v-for="option in options" :key="option.value" @click="setHeading(option, close)">
            <span v-html="option.htmlLabel"></span>
          </div>
        </template>
      </Popover>
      <div class="vertical-separator"></div>
      <!-- Text Formatting -->
      <GIcon name="Bold3" title="Bold" hover :selected="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()" />

      <GIcon name="Italic3" title="Italic" hover :selected="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()" />

      <GIcon name="Underline" title="Underline" hover :selected="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()" />

      <GIcon name="Strikethrough" title="Strikethrough" hover :selected="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()" />

      <!-- Headings -->
      <!-- <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        class="editor-toolbar-button" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        title="Heading 1">
        <span class="icon">H1</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        class="editor-toolbar-button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        title="Heading 2">
        <span class="icon">H2</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        class="editor-toolbar-button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        title="Heading 3">
        <span class="icon">H3</span>
      </button> -->

      <!-- :selected="editor.isActive({ textAlign: 'left' })" -->
      <div class="vertical-separator"></div>
      <GIcon name="Text" title="Text Color" hover @click="toggleColorPicker" />
      <div class="vertical-separator"></div>

      <!-- Text Alignment -->
      <GIcon name="TextAlignLeft" title="TextAlignLeft" hover :selected="editor.isActive({ textAlign: 'left' })"
        @click="editor.chain().focus().setTextAlign('left').run()" />
      <GIcon name="TextAlignCenter" title="TextAlignCenter" hover :selected="editor.isActive({ textAlign: 'center' })"
        @click="editor.chain().focus().setTextAlign('center').run()" />
      <GIcon name="TextAlignRight" title="TextAlignRight" hover :selected="editor.isActive({ textAlign: 'right' })"
        @click="editor.chain().focus().setTextAlign('right').run()" />

      <div class="vertical-separator"></div>

      <!-- Lists -->
      <GIcon name="UnorderedList" title="Bullet List" hover :selected="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()" />
      <GIcon name="NumberList" title="Numbered List" hover :selected="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()" />

      <!-- Block Formatting -->
      <!-- <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('blockquote') }" title="Blockquote">
        <span class="icon">" "</span>
      </button> -->

      <!-- <GIcon name="Substract" title="Horizontal Line" hover @click="editor.chain().focus().setHorizontalRule().run()" /> -->

      <div class="vertical-separator"></div>

      <!-- Links & Media -->
      <GIcon name="Image2" title="Insert Image" hover @click="openImageUpload" />

      <GIcon name="Link" title="Insert Link" hover :selected="editor.isActive('link')" @click="setLink" />

      <!-- Code -->
      <!-- <button type="button" @click="editor.chain().focus().toggleCode().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('code') }" title="Inline Code">
        <span class="icon">{{ "</>" }}</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('codeBlock') }" title="Code Block">
        <span class="icon">{{ "'</>'" }}</span>
      </button> -->

      <!-- Undo/Redo -->
      <!-- <button type="button" @click="editor.chain().focus().undo().run()" class="editor-toolbar-button"
        :disabled="!editor.can().undo()" title="Undo">
        <span class="icon">↩️</span>
      </button>
      <button type="button" @click="editor.chain().focus().redo().run()" class="editor-toolbar-button"
        :disabled="!editor.can().redo()" title="Redo">
        <span class="icon">↪️</span>
      </button> -->
    </div>

    <editor-content :editor="editor" class="editor-content" />

    <div class="resize-handle" data-resize-handle="bottom-right"></div>
    <div class="resize-handle" data-resize-handle="bottom-left"></div>
    <div class="resize-handle" data-resize-handle="top-right"></div>
    <div class="resize-handle" data-resize-handle="top-left"></div>
    <input type="file" ref="fileInput" accept="image/jpeg,image/webp" style="display: none"
      @change="handleImageUpload" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageWithTools from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link"
import Gapcursor from '@tiptap/extension-gapcursor'
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color";


import GIcon from "./GIcon.vue";
import Popover from "./utils/Popover.vue";

export default {
  components: { EditorContent, GIcon, Popover },

  props: {
    value: {
      type: String,
      default: () => `<p class="g-text--content-1-a"></p>`
    },
  },

  data: () => ({
    editor: null,
    isUploading: false,
    resizeData: null,
    currentText: {
      label: 'Texto normal',
      htmlLabel: `<p class="g-text--content-1-a">Texto normal</p>`,
      value: 'normal',
    },
    options: [
      {
        label: 'Texto normal',
        htmlLabel: `<p class="g-text--content-1-a">Texto normal</p>`,
        value: 'normal',
      },
      {
        label: 'Título 1',
        htmlLabel: `<h1 class="g-tx--h5-b">Título 1</h1>`,
        value: 1,
      },
      {
        label: 'Título 2',
        htmlLabel: `<h2 class="g-tx--h6-b">Título 2</h2>`,
        value: 2,
      },
      {
        label: 'Título 3',
        htmlLabel: `<h3 class="g-tx--content-b">Título 3</h3>`,
        value: 3,
      }
    ]
  }),

  watch: {
    value: {
      immediate: true,
      handler(value) {

        if (this.editor && value !== this.editor.getHTML()) {
          this.editor.commands.setContent(value, false);
        }
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
              class: "g-editor-heading",
            },
          },
          paragraph: {
            HTMLAttributes: {
              class: "g-text--content-1-a",
            },
          },
        }),
        Color.configure({
          types: ['textStyle'],
        }),
        TextStyle,
        Underline,
        Gapcursor,
        Link.configure({
          autolink: true,
          openOnClick: false,
          linkOnPaste: true,
          HTMLAttributes: {
            class: "g-text--content-1-a",
          },
        }),
        ImageWithTools.configure({
          HTMLAttributes: {
            class: "resizable-image",
          },
          resize: true,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ['left', 'center', 'right'],
          defaultAlignment: 'left',
        }),
      ],
      onUpdate: () => {

        const html = this.editor.getHTML();

        this.$emit('update:value', html);
      },
      onBlur: () => {
        this.$emit('update:value', this.editor.getHTML());
      }
    });

    this.setupResizeHandlers();
  },

  methods: {
    setHeading(option, closePopover) {
      if (option.value === 'normal') {
        this.editor.chain().focus().setParagraph().run();
        this.currentText.label = `<p class="g-text--content-1-a">Texto normal</p>`;
      } else {
        this.editor.chain().focus().toggleHeading({ level: option.value }).run();
        this.currentText.label = option.label;
      }
      closePopover()
    },

    toggleColorPicker() {
      const colorPicker = document.createElement('input')
      colorPicker.type = 'color'
      colorPicker.addEventListener('input', (event) => {
        this.editor.chain().focus().setColor(event.target.value).run()
      })
      colorPicker.click()
    },

    setLink() {
      if (this.editor.isActive('link')) {
        this.editor.chain().focus().unsetLink().run()
      } else {
        let url = window.prompt('Enter the URL')

        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url
        }

        if (url) {
          this.editor.chain().focus().toggleLink({ href: url }).run()
        }
      }
    },

    openImageUpload() {
      this.$refs.fileInput.click();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = ['image/jpeg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        this.$emit('on-upload-error', 'Por favor, cargue una imagen JPEG o WebP');
        return;
      }

      const MAX_SIZE = 500 * 1024;
      if (file.size > MAX_SIZE) {
        this.$emit('on-upload-error', 'Por favor, suba una imagen de menos de 500KB');
        return;
      }

      event.target.value = "";

      this.isUploading = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        const img = new Image();
        img.src = base64;

        img.onload = () => {
          this.editor
            .chain()
            .focus()
            .setImage({
              src: base64,
              alt: file.name,
              width: `${img.width}px`,
            })
            .run();
          this.isUploading = false;
        };
      };
      reader.readAsDataURL(file);
    },

    setupResizeHandlers() {
      let animationFrameId = null;

      const onMouseDown = (e) => {
        const img = e.target.closest(".resizable-image");
        if (!img || e.button !== 0) return;

        e.preventDefault();
        e.stopPropagation();

        const rect = img.getBoundingClientRect();
        this.resizeData = {
          img,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: rect.width,
          startHeight: rect.height,
          aspectRatio: rect.width / rect.height,
          edge: e.target.dataset.resizeHandle,
        };

        img.classList.add("resizing");
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp, { once: true });
      };

      const updateCursorOnHover = (e) => {
        const img = e.target.closest(".resizable-image");
        if (!img) return;

        const rect = img.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;


        const edgeThreshold = 10;
        const nearTop = offsetY < edgeThreshold;
        const nearBottom = rect.bottom - e.clientY < edgeThreshold;
        const nearLeft = offsetX < edgeThreshold;
        const nearRight = rect.right - e.clientX < edgeThreshold;


        if (nearTop && nearLeft) {
          img.style.cursor = 'nwse-resize';
        } else if (nearTop && nearRight) {
          img.style.cursor = 'nesw-resize';
        } else if (nearBottom && nearLeft) {
          img.style.cursor = 'nesw-resize';
        } else if (nearBottom && nearRight) {
          img.style.cursor = 'nwse-resize';
        } else if (nearTop) {
          img.style.cursor = 'n-resize';
        } else if (nearBottom) {
          img.style.cursor = 's-resize';
        } else if (nearLeft) {
          img.style.cursor = 'w-resize';
        } else if (nearRight) {
          img.style.cursor = 'e-resize';
        } else {
          img.style.cursor = 'default';
        }
      };

      const onMouseMove = (e) => {
        if (!this.resizeData) return;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          const { img, startX, startY, startWidth, startHeight, aspectRatio, edge } =
            this.resizeData;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;

          let newWidth = startWidth;
          let newHeight = startHeight;

          if (!e.shiftKey) {
            newWidth = Math.max(50, startWidth + dx);
            newHeight = Math.max(50, startHeight + dy);
          } else {
            switch (edge) {
              case 'bottom-right':
                newWidth = Math.max(50, startWidth + dx);
                newHeight = newWidth / aspectRatio;
                break;
              case 'bottom-left':
                newWidth = Math.max(50, startWidth - dx);
                newHeight = newWidth / aspectRatio;
                break;
              case 'top-right':
                newHeight = Math.max(50, startHeight - dy);
                newWidth = newHeight * aspectRatio;
                break;
              case 'top-left':
                newHeight = Math.max(50, startHeight + dy);
                newWidth = newHeight * aspectRatio;
                break;
              default:
                newWidth = Math.max(50, startWidth + dx);
                newHeight = newWidth / aspectRatio;
            }
          }

          img.style.width = `${newWidth}px`;
          img.style.height = `${newHeight}px`;
        });
      };

      const onMouseUp = () => {
        if (!this.resizeData) return;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }

        const { img } = this.resizeData;
        img.classList.remove("resizing");

        this.editor
          .chain()
          .focus()
          .updateAttributes("image", {
            width: img.style.width,
            height: img.style.height,
          })
          .run();

        this.resizeData = null;
        document.removeEventListener("mousemove", onMouseMove);
      };

      const onMouseOver = (e) => {
        if (e.target.closest(".resizable-image")) {
          updateCursorOnHover(e);
        }
      };

      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseover", onMouseOver);

      this.$once("hook:beforeDestroy", () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseover", onMouseOver);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }

  },

  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
};
</script>
<style lang="scss">
.editor {
  border: 1px solid var(--p-gray-scale-200);
  border-radius: 5px;

  &-toolbar {
    padding: 4px 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid var(--p-gray-scale-200);

    &-button {
      border: none;
      background: none;
    }
  }

  p {
    margin: 0;
  }
}

.tiptap.ProseMirror {
  outline: none;
  padding: 16px;
}

.vertical-separator {
  width: 1px;
  height: 27px;
  margin-top: 1px;
  background-color: var(--p-gray-scale-200);
}

.is-active {
  background-color: var(--p-disabled-button-main);
}

.resizable-image {
  position: relative;
  display: inline-block;
  max-width: 100%;
  height: auto;
  transition: width 0.05s linear, height 0.05s linear;
  touch-action: none;
  border: 2px solid transparent;
}

.resizable-image.resizing {
  border: 2px solid var(--p-primary-main);
  user-select: none;
  will-change: width, height;
}

.popover__main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.text__option {
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background-color: var(--p-gray-scale-100);
  }
}
</style>
