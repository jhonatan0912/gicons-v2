import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const CustomPasteHandler = Extension.create({
  name: "customPasteHandler",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            const clipboardText = event.clipboardData?.getData("text/plain");

            if (
              clipboardText &&
              (clipboardText.includes("\n") || clipboardText.includes("✅"))
            ) {
              const lines = clipboardText
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line !== "");

              const { schema } = view.state;

              const paragraphs = lines.map((line) =>
                schema.nodes.paragraph.create({}, schema.text(line))
              );

              const fragment = schema.nodes.doc.createAndFill({}, paragraphs);

              const tr = view.state.tr.replaceSelectionWith(fragment, false);
              view.dispatch(tr);

              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
