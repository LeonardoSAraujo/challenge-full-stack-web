<template>
  <div>
    <div id="list">
      <div class="d-flex justify-space-around">
        <div class="d-flex mt-5">
          <input v-model="searchinput" type="text" id="search" name="fname">
          <v-btn
            class="grey"
            dark
            elevation="2"
            raised
            text
            @click.native="searchstudents()"
          > Buscar</v-btn>
        </div>
        <div class="d-flex mt-5">
          <v-btn
            class="secondary"
            dark
            elevation="2"
            raised
            text
            @click.native="newStudent()"
          > Cadastrar Aluno</v-btn>
        </div>
      </div>
      <div class="mt-5">
        <v-data-table
        id="students-table"
        :headers="headers"
        :items="students"
        class="elevation-1"
      >
      <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editStudent(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteStudent(item)"
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table>
    </div>
    </div>
    <div id="edit" style="display:none">
      <form class="pl-5 pt-15">
        <div class="d-flex mt-5"><label class="label-edit">Nome</label><input class="input-edit" placeholder="Nome do Aluno" v-model="tempStudent.name" type="text"/></div>
        <div class="d-flex mt-5"><label class="label-edit">Email</label><input class="input-edit" placeholder="Email do aluno" v-model="tempStudent.email" type="text"/></div>
        <div class="d-flex mt-5"><label class="label-edit">RA</label><input :disabled="edit?true:false" class="input-edit" placeholder="Registro Acadêmico" v-model="tempStudent.register" type="text"/></div>
        <div class="d-flex mt-5"><label class="label-edit">CPF</label><input v-mask="'###.###.###-##'" :disabled="edit?true:false" class="input-edit" placeholder="CPF" v-model="tempStudent.cpf" type="text"/></div>
        <br><br>
        <div class="d-flex justify-space-around"> <v-btn
            class="grey"
            dark
            elevation="2"
            raised
            text
            @click.native="abortEdit()"
            id="abortbtn"
          > Cancelar</v-btn>
          <v-btn
            class="secondary"
            dark
            elevation="2"
            raised
            text
            @click.native="creatStudent()"
            id="savebtn"
          > {{ editButtonText }}</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
import axios from 'axios';

  export default {
    name: 'StudentsList',

    data: () => ({
      searchinput: '',
      students: [],
      tempStudent: {},
      edit: false,
      new: false,
      headers: [
          {
            text: 'Registro Acadêmico',
            align: 'start',
            value: 'register',
            class: 'white--text'
          },
          { text: 'Nome', value: 'name',class: 'white--text'},
          { text: 'CPF', value: 'cpf',class: 'white--text' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
    }),
    computed:{
      editButtonText: function(){
       return this.new?'Criar Cadastro':'Editar Cadastro'
      }
    },
    methods:{
      searchstudents:function(){
        const headers = {headers: {
          Authorization: process.env.TOKEN
        }}
        axios.get(`http://localhost:3000/users?search=${this.searchinput}`,headers)
        .then((response)=> {
          console.log(response.data.students);
          this.students = response.data.students
        })
      },
      newStudent: function(){
        this.new = true
        this.edit = false
        this.tempStudent = {}
        document.getElementById("list").style.display = this.new?'none':'block';
        document.getElementById("edit").style.display = this.new?'block':'none';
      },
      deleteStudent: function(item){
        if(confirm('Quer mesmo excluir este cadastro?') == true){
          axios.delete(`http://localhost:3000/users?id=${item.id}`,this.headers).then(function(response){
          alert(response.data.status)
        })
        }
        this.searchstudents()
      },
      editStudent: function(item){
        this.edit = true
        this.new = false
        document.getElementById("list").style.display = this.edit?'none':'block';
        document.getElementById("edit").style.display = this.edit?'block':'none';
        this.tempStudent = item
      },
      abortEdit: function(){
        this.edit = false
        this.new = false
        document.getElementById("list").style.display = 'block';
        document.getElementById("edit").style.display = 'none';
        this.tempStudent = {}
      },
      creatStudent: function(){
        const headers = {headers: {
          Authorization: process.env.TOKEN
        }}
        document.getElementById("abortbtn").disabled = true;
        document.getElementById("savebtn").disabled = true;
        if(this.new){
        axios.post('http://localhost:3000/users',this.tempStudent,headers).then(function(response){
          alert(response.data.status)
          if(response.data.status == 'Cadastro efetuado'){
            document.getElementById("list").style.display = 'block';
            document.getElementById("edit").style.display = 'none';
            document.getElementById("abortbtn").disabled = false;
            document.getElementById("savebtn").disabled = false;
          }
        })
      }else if(this.edit){
        axios.put(`http://localhost:3000/users?id=${this.tempStudent.id}`,this.tempStudent,headers).then(function(response){
          alert(response.data.status)
          if(response.data.status == 'Cadastro alterado com sucesso'){
            document.getElementById("list").style.display = 'block';
            document.getElementById("edit").style.display = 'none';
            document.getElementById("abortbtn").disabled = false;
            document.getElementById("savebtn").disabled = false;
          }
        })
      }}
    },
    created() {
      this.searchstudents();
    }
  }
</script>
<style>
  #search{
    border: solid grey 0.5px;
    font-size: 0.875rem;
    min-width: 350px;
  }
  #students-table thead{
    background-color: darkgray;
    color: white;
  }
  .label-edit{
    background-color: rgb(244, 244, 244);
    width: 150px;
    padding: 5px 5px 5px 10px;
    border: solid lightgray 0.2px;
  }
  .input-edit{
    padding-left: 5px;
    width: 70%;
    border: solid lightgray 0.4px;
  }
  .input-edit:disabled{
    background-color: lightgray;
    color: white;
  }
  #savebtn:disabled,#abortbtn:disabled{
    background-color: white !important;
    color: black;
  }
</style>
