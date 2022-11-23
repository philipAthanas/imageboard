import comment from "./comment.js";

const Modal = {
    props: ["image"],
    components: {
        comment: comment,
    },
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            created_at: "",
            closeModal() {
                this.isModal = false;
            },
        };
    },
    methods: {
        close() {
            console.log("closeaction");
            this.$emit("close");
        },
    },

    mounted() {
        console.log("image in mounted", this.image);
        fetch(`/modal/${this.image.id}`)
            .then((res) => {
                return res.json();
            })
            .then((image) => {
                this.currentImage = image;
                this.id = image.id;
            });
    },
    template: `<div class="modal">
                <button type="button" style="color:white" class="close" 
                @click="close">X</button>
                <div class="modalImgContainer">
                    <h1> {{ image.title}} </h1><br>
                    <img style="width:60%; height:60%" :src="image.url"  /><br>
                    <p>{{ image.description }}</p> 
                    <p>Uploaded by: {{ image.username }}</p>     
                    <p>Uploaded on: {{ image.created_at }}</p>    
                    <h3>Add a Comment!</h3>
                     <div class="modal-info">
                    <comment v-bind:id="image.id"></comment>
                </div>
                </div>
            </div>`,
};
export default Modal;
