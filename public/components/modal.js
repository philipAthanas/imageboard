const Modal = {
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
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
                <button type="button" class="close" 
    @click="close"> X 
</button>
    <div class="modalImgContainer">
    <h1> {{ image.title}} </h1>
    <img style="width:90%;" :src="image.url"  />
    <p>{{ image.description }}</p> 
        <p>uploaded by {{ image.username }}</p>         
    </div>
    </div>`,
};
export default Modal;
