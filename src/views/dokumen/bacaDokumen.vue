<template>
<div id="app">
    <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
</div>
</template>

<script>
import PSPDFKitContainer from "@/components/PSPDFKitContainer";

export default {
    name: "baca-dokumen",
    props: {
        jenisFile: Object,
        id: Object,
    },
    data() {
        return {
            pdfFile: this.pdfFile ,
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
            this.pdfFile = "http://127.0.0.1:8000/api/showDokumen/"+this.id+"/"+this.jenisFile;
            console.log(this.pdfFile,'url');
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
