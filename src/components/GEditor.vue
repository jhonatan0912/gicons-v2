<template>
  <div class="editor">
    <div v-if="editor" class="editor-toolbar">
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
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" title="Heading 1">
        <span class="icon">H1</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" title="Heading 2">
        <span class="icon">H2</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" title="Heading 3">
        <span class="icon">H3</span>
      </button>

      <!-- Text Alignment -->
      <button type="button" @click="editor.chain().focus().setTextAlign('left').run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" title="Align Left">
        <span class="icon">←</span>
      </button>
      <GIcon name="TextAlignCenter" title="TextAlignCenter" hover :selected="editor.isActive({ textAlign: 'center' })"
        @click="editor.chain().focus().setTextAlign('center').run()" />
      <GIcon name="TextAlignRight" title="TextAlignRight" hover :selected="editor.isActive({ textAlign: 'right' })"
        @click="editor.chain().focus().setTextAlign('right').run()" />

      <!-- Lists -->
      <GIcon name="UnorderedList" title="Bullet List" hover :selected="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()" />
      <GIcon name="NumberList" title="Numbered List" hover :selected="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()" />

      <!-- Block Formatting -->
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('blockquote') }" title="Blockquote">
        <span class="icon">" "</span>
      </button>

      <GIcon name="Substract" title="Horizontal Line" hover @click="editor.chain().focus().setHorizontalRule().run()" />

      <!-- Links & Media -->
      <GIcon name="FileImage" title="Insert Image" hover @click="openImageUpload" />

      <!-- Code -->
      <button type="button" @click="editor.chain().focus().toggleCode().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('code') }" title="Inline Code">
        <span class="icon">{{ "</>" }}</span>
      </button>
      <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" class="editor-toolbar-button"
        :class="{ 'is-active': editor.isActive('codeBlock') }" title="Code Block">
        <span class="icon">{{ "'</>'" }}</span>
      </button>

      <!-- Undo/Redo -->
      <button type="button" @click="editor.chain().focus().undo().run()" class="editor-toolbar-button"
        :disabled="!editor.can().undo()" title="Undo">
        <span class="icon">↩️</span>
      </button>
      <button type="button" @click="editor.chain().focus().redo().run()" class="editor-toolbar-button"
        :disabled="!editor.can().redo()" title="Redo">
        <span class="icon">↪️</span>
      </button>
    </div>

    <editor-content :editor="editor" class="editor-content" />

    <div v-if="false">
      <div data-image>
        <img class="resizable-image" :src="node.attrs.src" :alt="node.attrs.alt" 
             :style="{ width: node.attrs.width, height: node.attrs.height }">
        <div data-resize-handle></div>
      </div>
    </div>

    <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleImageUpload" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import GIcon from "./GIcon.vue"

export default {
  components: { EditorContent, GIcon },
  data: () => ({
    editor: null,
    isUploading: false,
    activeImage: null,
    startX: 0,
    startWidth: 0,
    aspectRatio: 1,
  }),

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Image.configure({
          HTMLAttributes: {
            class: "resizable-image",
            'data-draggable': true,
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      // ... rest of your editor config
    });

    this.setupResizeHandlers();
  },

  methods: {
    openImageUpload() {
      this.$refs.fileInput.click();
    },
    setupResizeHandlers() {
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },

    handleMouseDown(e) {
      const handle = e.target.closest('[data-resize-handle]');
      if (!handle) return;

      const img = handle.closest('.resizable-image');
      if (!img) return;

      e.preventDefault();
      
      this.activeImage = img;
      this.startX = e.clientX;
      this.startWidth = parseFloat(img.style.width) || img.offsetWidth;
      this.aspectRatio = (parseFloat(img.style.width) || img.offsetWidth) / 
                        (parseFloat(img.style.height) || img.offsetHeight);
    },

    handleMouseMove(e) {
      if (!this.activeImage) return;

      const dx = e.clientX - this.startX;
      const newWidth = Math.max(100, this.startWidth + dx); // Min width 100px
      const newHeight = newWidth / this.aspectRatio;

      this.activeImage.style.width = `${newWidth}px`;
      this.activeImage.style.height = `${newHeight}px`;
    },

    handleMouseUp() {
      if (!this.activeImage) return;
      
      // Update the editor with new dimensions
      const imgNode = this.activeImage.closest('[data-image]');
      if (imgNode) {
        this.editor.commands.updateAttributes('image', {
          width: this.activeImage.style.width,
          height: this.activeImage.style.height
        });
      }

      this.activeImage = null;
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const displayWidth = Math.min(800, img.width); // Limit initial size
          
          this.editor.chain().focus().setImage({
            src: e.target.result,
            alt: file.name,
            width: `${displayWidth}px`,
            height: `${displayWidth / aspectRatio}px`,
            'data-aspect-ratio': aspectRatio
          }).run();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // ... rest of your methods
  },

  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    if (this.editor) this.editor.destroy();
  }
}
</script>

<style lang="scss">
.editor {
  border: 1px solid var(--p-gray-scale-200);
  border-radius: 5px;

  &-toolbar {
    padding: 4px 8px;
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

.is-active {
  background-color: var(--p-disabled-button-main);
}

.resizable-image {
  position: relative;
  display: inline-block;
  max-width: 100%;
  transition: width 0.2s ease;
  margin: 0.5rem 0;
}

[data-resize-handle] {
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
  transition: opacity 0.2s;
  z-index: 10;
}

.resizable-image:hover [data-resize-handle] {
  opacity: 1;
}
</style>
