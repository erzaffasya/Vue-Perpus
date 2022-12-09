<template>
<div id="app">
    <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
</div>
</template>

<script>
import PSPDFKitContainer from "@/components/PSPDFKitContainer";
// import apiDokumen from "../../apis/Dokumen.js";

export default {
    name: "baca-dokumen",
    props: {
        jenisFile: Object,
        id: Object,
    },
    data() {
        return {
            pdfFile: this.pdfFile,
            array: null,
        };
    },
    mounted() {
        this.getValue();
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
            this.pdfFile = "https://digilib.itk.ac.id/Lumen-PerpustakaanITK/public/api/showDokumen/" + this.id + "/" + this.jenisFile;
            //   this.array = { id: this.id, jenisFile: this.jenisFile };
            //   this.pdfFile = apiDokumen.bacaDokumen(this.array);
            console.log(this.pdfFile, "url");
        },
        handleLoaded(instance) {
            console.log("PSPDFKit has loaded: ", instance);
            // Do something.
        },

        openDocument(event) {
            // To access the Vue.js instance data properties, use `this` keyword.
            if (this.pdfFile && this.pdfFile.startsWith("blob:")) {
                window.URL.revokeObjectURL(this.pdfFile);
            }
            this.pdfFile = window.URL.createObjectURL(event.target.files[0]);
        },
    },
};
</script>
