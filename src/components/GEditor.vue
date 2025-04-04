<template>
  <div class="editor">
    <div v-if="editor" class="editor-toolbar">
      <!-- Text Formatting -->
      <GIcon
        name="Bold3"
        title="Bold"
        hover
        :selected="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      />

      <GIcon
        name="Italic3"
        title="Italic"
        hover
        :selected="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      />

      <GIcon
        name="Underline"
        title="Underline"
        hover
        :selected="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      />

      <GIcon
        name="Strikethrough"
        title="Strikethrough"
        hover
        :selected="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      />

      <!-- Headings -->
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        title="Heading 1"
      >
        <span class="icon">H1</span>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        title="Heading 2"
      >
        <span class="icon">H2</span>
      </button>

      <!-- Text Alignment -->
      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        title="Align Left"
      >
        <span class="icon">←</span>
      </button>
      <GIcon
        name="TextAlignCenter"
        title="TextAlignCenter"
        hover
        :selected="editor.isActive({ textAlign: 'center' })"
        @click="editor.chain().focus().setTextAlign('center').run()"
      />
      <GIcon
        name="TextAlignRight"
        title="TextAlignRight"
        hover
        :selected="editor.isActive({ textAlign: 'right' })"
        @click="editor.chain().focus().setTextAlign('right').run()"
      />

      <!-- Lists -->
      <GIcon
        name="UnorderedList"
        title="Bullet List"
        hover
        :selected="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <GIcon
        name="NumberList"
        title="Numbered List"
        hover
        :selected="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />

      <!-- Block Formatting -->
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        title="Blockquote"
      >
        <span class="icon">"</span>
      </button>

      <GIcon
        name="Substract"
        title="Horizontal Line"
        hover
        @click="editor.chain().focus().setHorizontalRule().run()"
      />

      <!-- Links & Media -->
      <GIcon
        name="FileImage"
        title="Insert Image"
        hover
        @click="openImageUpload"
      />

      <!-- Code -->
      <button
        @click="editor.chain().focus().toggleCode().run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('code') }"
        title="Inline Code"
      >
        <span class="icon">{{ "</>" }}</span>
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        title="Code Block"
      >
      <span class="icon">{{ "'</>'" }}</span>
      </button>

      <!-- Undo/Redo -->
      <button
        @click="editor.chain().focus().undo().run()"
        class="editor-toolbar-button"
        :disabled="!editor.can().undo()"
        title="Undo"
      >
        <span class="icon">↩️</span>
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        class="editor-toolbar-button"
        :disabled="!editor.can().redo()"
        title="Redo"
      >
        <span class="icon">↪️</span>
      </button>
    </div>

    <editor-content :editor="editor" class="editor-content" />
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      style="display: none"
      @change="handleImageUpload"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import ImageWithTools from "@tiptap/extension-image";

import GIcon from "./GIcon.vue";

export default {
  components: { EditorContent, GIcon },

  props: {
    initialContent: {
      type:String,
      required: false,
      default:()=>`<p class="g-text--content-1-a"></p>`
    },
  },

  data: () => ({
    editor: null,
    isUploading: false,
    resizeData: null,
  }),

  mounted() {
    this.editor = new Editor({
      content: this.initialContent,
      extensions: [
        StarterKit.configure({
          heading: false,
        }),
        ImageWithTools.configure({
          HTMLAttributes: {
            class: "resizable-image",
          },
          resize: true,
        }),
      ],
    });

    this.setupResizeHandlers();
  },

  methods: {
    openImageUpload() {
      this.$refs.fileInput.click();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

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
        };

        img.classList.add("resizing");
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp, { once: true });
      };

      const onMouseMove = (e) => {
        if (!this.resizeData) return;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          const { img, startX, startY, startWidth, startHeight, aspectRatio } =
            this.resizeData;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;

          let newWidth = Math.max(50, startWidth + dx);
          let newHeight = Math.max(50, startHeight + dy);

          if (e.shiftKey) {
            newHeight = newWidth / aspectRatio;
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

      document.addEventListener("mousedown", onMouseDown);

      this.$once("hook:beforeDestroy", () => {
        document.removeEventListener("mousedown", onMouseDown);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      });
    },
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
    padding: 4px 8px;
    display: flex;
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

.is-active {
  background-color: var(--p-disabled-button-main);
}

.resizable-image {
  position: relative;
  display: inline-block;
  max-width: 100%;
  height: auto;
  transition: width 0.05s linear, height 0.05s linear;
  cursor: move;
  touch-action: none;
}

.resizable-image.resizing {
  outline: 2px dashed #4299e1;
  user-select: none;
  will-change: width, height;
}

.resizable-image::after {
  content: "";
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 16px;
  height: 16px;
  background: #4299e1;
  border: 2px solid white;
  border-radius: 50%;
  cursor: nwse-resize;
  opacity: 0;
  transition: opacity 0.1s ease;
  z-index: 10;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.resizable-image:hover::after {
  opacity: 1;
  pointer-events: auto;
}
</style>
