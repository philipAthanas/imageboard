import * as Vue from "./vue.js";
import modal from "./components/modal.js";

Vue.createApp({
    components: {
        modal: modal,
    },
    data() {
        return {
            headline: "My Vue App",
            images: [],
            cardCSS: "data-card",
            message: "",
            photo: "",
            title: "",
            description: "",
            username: "",
            isModal: false,
            selectedImage: undefined,
        };
    },
    methods: {
        uploadImage: function (e) {
            e.preventDefault();
            console.log("clicked");
            const myFileInput = document.querySelector("input[type='file']");

            const photo = myFileInput.files[0];
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            fetch("/images", {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
                    console.log("Result in post upload", result);
                    this.images.push(result.data);
                    this.clearInput();
                });
            // .catch((err) => console.log(err));
        },
        clearInput: function () {
            this.photo = ""; //may not work
            this.message = "";
            this.username = "";
            this.description = "";
        },
        openModal: function (image) {
            console.log("image", image);
            this.isModal = true;

            this.selectedImage = image;
        },
        closeModal: function () {
            this.isModal = false;
        },
    },
    // components: {
    //     //key is the name in the html and the value ist what i want to import
    //     Modal: modal,
    //     comment: comment,
    // },

    mounted() {
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((images) => {
                console.log(images);
                this.images = images;
            });
    },
}).mount("#main");
