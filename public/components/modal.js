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
        // console.log("image in mounted", this.image.id);
        this.image.id = this.id;
        console.log("Here is my IMAGE ID: ", this.image.id);

        fetch(`/images/${this.image.id}`).then((res) =>
            res
                .json()
                .then((images) => {
                    this.image.url = images.url;
                    this.image.title = images.title;
                    this.image.description = images.description;
                    this.image.username = images.username;
                })
                .catch((err) => console.log("No image in modal"), error)
        );
    },

    template: `<div class="modal">
                <button type="button" class="close" 
    @click="close"> X 
</button>
    <div class="modalImgContainer">
    <h1> {{ image.title }} </h1>
    <img style="width:90%;" :src="images.url"  />
    <p>{{ image.description }}</p> 
        <p>uploaded by {{ image.username }}</p>         
    </div>
    </div>`,
};
export default Modal;
