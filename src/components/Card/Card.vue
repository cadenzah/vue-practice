<template>
  <div>
    <hr />
    Child counter: {{getCounter}} <br />
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>

    <!-- Custom directive practice-->
    <p v-conditional:[getCounter]="10">10이 되면 카운터가 보입니다</p>
    <p v-conditional:[getCounter]="20">20이 되면 보이는 카운터입니다.</p>

    <hr />
    <p v-if="_dialog">이 메시지가 보일까?</p>
    <button @click="showMessage">보여줘</button>
    <button @click="hideMessage">가려줘</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { dialogMixin } from '../../mixins';

export default {
  mixins: [
    dialogMixin,
  ],
  props: ['num'],
  computed: {
    _dialog: function() {
      return this.dialog
    },
    ...mapGetters([
      'getCounter'
    ])
  },
  methods:{
    ...mapMutations([
      'addCounter',
      'subCounter',
    ]),
    showMessage: function() {
      this.showDialog();
    },
    hideMessage: function() {
      this.closeDialog();
    }
  }
};
</script>

<style>

</style>
