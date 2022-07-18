<template>
    <div id="app">
        <label for="file-upload" class="custom-file-upload">
            Open PDF
        </label>
        <button type="submit" @click="getValue"></button>
        <input id="file-upload" type="file" @change="openDocument" class="btn" />
        <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
    </div>
</template>

<script>
import PSPDFKitContainer from "@/components/PSPDFKitContainer";

export default {
    data() {
        return {
            pdfFile: this.pdfFile || "/example.pdf",
        };
    },
    /**
     * Render the `PSPDFKitContainer` component.
     */
    components: {
        PSPDFKitContainer,
    },
    /**
     * Our component has two methods — one to check when the document is loaded, and the other to open the document.
     */
    methods: {
        getValue() {
            fetch("http://perpustakaan_itk.test/storage/documents/1/cover_1_1658128910.pdf", { mode: "no-cors" })
                .then(
                    (response) => {
                        // this.pdfFile = response
                        console.log(response, 'file');
                    }
                );
        },
        handleLoaded(instance) {
            console.log("PSPDFKit has loaded: ", instance);
            // Do something.
        },

        openDocument(event) {
            // To access the Vue.js instance data properties, use `this` keyword.
            if (this.pdfFile && this.pdfFile.startsWith('blob:')) {
                window.URL.revokeObjectURL(this.pdfFile);
            }
            this.pdfFile = window.URL.createObjectURL(event.target.files[0]);
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

body {
    margin: 0;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background: #4A8FED;
    padding: 10px;
    color: #fff;
    font: inherit;
    font-size: 16px;
    font-weight: bold;
}
</style>