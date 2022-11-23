const Modal = {
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            timestamp: "",
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
    props: ["image"],
    mounted() {
        console.log("image in mounted", this.image);
    },
    template: `<div class="modal">
                <button type="button" style="color:white" class="close" 
                @click="close">X</button>
                <div class="modalImgContainer">
                    <h1> {{ image.title}} </h1><br>
                    <img style="width:60%; height:60%" :src="image.url"  /><br>
                    <p>{{ image.description }}</p> 
                    <p>Uploaded by: {{ image.username }}</p>     
                    <p>{{ image.timestamp }}</p>    
                    <h3>Add a Comment!</h3>
                </div>
            </div>`,
};
export default Modal;
