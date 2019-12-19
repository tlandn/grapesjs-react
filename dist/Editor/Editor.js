var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import GrapesJS from 'grapesjs';
import mjml from 'grapesjs-mjml';
import newsletter from 'grapesjs-preset-newsletter';
import webpage from 'grapesjs-preset-webpage';
import React from 'react';
var presets = {
    webpage: webpage,
    newsletter: newsletter,
    mjml: mjml,
};
var Editor = React.forwardRef(function (props, ref) {
    var id = props.id, onInit = props.onInit, onDestroy = props.onDestroy, presetType = props.presetType, blockManager = props.blockManager, storageManager = props.storageManager, styleManager = props.styleManager, width = props.width, height = props.height, components = props.components, blocks = props.blocks, children = props.children;
    var _a = React.useState(GrapesJS.editors.find(function (e) {
        return e.getContainer().id === id;
    })), editor = _a[0], setEditor = _a[1];
    var handleCleanup = React.useCallback(function () {
        if (editor) {
            if (onDestroy) {
                onDestroy(editor);
            }
            GrapesJS.editors = GrapesJS.editors.filter(function (e) { return e !== editor; });
            editor.destroy();
            if (document) {
                var container = document.getElementById(id);
                if (container) {
                    container.innerHTML = '';
                }
            }
        }
    }, [editor, onDestroy]);
    React.useEffect(function () {
        if (!editor) {
            var newEditor = GrapesJS.init({
                container: "#" + id,
                fromElement: true,
                blockManager: blockManager,
                styleManager: styleManager,
                storageManager: storageManager,
                width: width,
                height: height,
                plugins: __spreadArrays([
                    presets[presetType]
                ], props.plugins),
            });
            console.log("TCL: newEditor", newEditor);
            setEditor(newEditor);
            console.log("TCL: editor", editor);
            if (onInit) {
                onInit(editor);
            }
        }
        return handleCleanup;
    }, [
        editor,
        id,
        blockManager,
        styleManager,
        storageManager,
        onInit,
        presetType,
        onDestroy,
        width,
        height,
        blocks,
        components,
        props,
    ]);
    return (React.createElement("div", { id: id, ref: ref }, children));
});
Editor.defaultProps = {
    id: 'grapesjs-react-editor',
    presetType: 'newsletter',
    plugins: [],
    blocks: [],
    blockManager: {},
    storageManager: {},
    styleManager: {},
    width: 'auto',
    height: '100vh',
    components: [],
};
export default Editor;
//# sourceMappingURL=Editor.js.map