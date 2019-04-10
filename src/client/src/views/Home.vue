<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="person in persons" v-bind:key="person.id">id: {{person.id}}, name: {{person.name}}</div>

    <hr>
    Create a person:<br>
    <input type="text" v-model="personName"/><br>
    <button @click="onCreatePersonClicked">Create!</button><br>
    <div>{{createMessage}}</div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  private persons: object[] = [];
  private personName: string = '';
  private createMessage: string = '';

  async mounted(){
    const response = await axios.get('person');
    this.persons.push(...response.data);
  }

  async onCreatePersonClicked(){
    this.createMessage = 'creating person...';

    const response = await axios.post('person', {name: this.personName});
    this.persons.push(response.data);

    this.createMessage = 'person created';
    this.personName = '';
    setTimeout( () => this.createMessage = '', 2000);
  }

}
</script>
