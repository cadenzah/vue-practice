const DialogMixin = {
  data: function() {
    return {
      dialog: true,
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  }
};

export default DialogMixin;