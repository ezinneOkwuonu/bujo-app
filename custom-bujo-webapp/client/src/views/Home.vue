<template>
 <v-app id="inspire">
    <v-app-bar app color="pink" dark>   
    <v-toolbar-title style="width: 400px" class="ml-0 pl-4" >
      <v-btn icon>
              <v-icon>book</v-icon>
            </v-btn>
    <span class="hidden-sm-and-down">Custom Bujo Services Web App</span>
    </v-toolbar-title>
  <v-spacer />
  <div class="my-2">
      <router-link style="color: white; " to="/about">About Us/FAQ</router-link>   
  </div>  
  </v-app-bar>
    <v-main>
        <v-container class="scroll-y" fluid >
        <v-row  align="center"  justify="center"  >
        <v-col cols="20" md="8">
          <v-card class="ml-5 mr-5">
            <v-app-bar dark color="#2C3A47"   >
            <v-btn icon>
              <v-icon>book</v-icon>
            </v-btn>
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="1000px">
            <template v-slot:activator="{ on }">
                <v-btn color="white" v-on="on" outlined="">
                  <v-icon left>add</v-icon> ADD  </v-btn>
            </template>
              <v-card>
                <v-form @submit.prevent="savePost" ref="postData" lazy-validation enctype="multipart/form-data" autocomplete="off">
                  <v-card-title>
                    <span class="headline">Details</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Name*"  v-model="postData.name" :rules="[() => !!name || 'This field is required']" color="#2C3A47"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Email Address*"  v-model="postData.email"  color="#2C3A47"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field label="Themes"  v-model="postData.themes" color="#2C3A47"></v-text-field>
                      </v-flex>
                  <v-flex xs12 sm12 md12>                    
                        <v-text-field label="Description" v-model="postData.description" color="#2C3A47"></v-text-field>
                    </v-flex>
                    </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#2C3A47" dark @click="close" outlined small>
                      <v-icon left>exit_to_app</v-icon> Close
                    </v-btn>
                    <v-btn color="light-green darken-4" dark type="submit" outlined small>
                      <v-icon left>edit</v-icon> {{saveDialog}}
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
          </v-dialog>
            </v-app-bar>
            <v-container>
              <v-card class="mx-auto elevation-19">
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#2C3A47"  >
                  </v-text-field>
                </v-card-title>
        <v-data-table
        item-key="id"
        :headers="headers"
        :items="posts"
        :search="search"    >
        <template v-slot:[`item.actions`]="{item}">
          <v-btn color="success" class="mx-2" fab x-small @click="editPost(item)" outlined>
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="pink" fab x-small @click="deletePost(item._id)" outlined>
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-slot:no-results>
            <v-alert :value="true" color="pink" icon="warning" dark>
              Your Search {{search}} does not exist.
            </v-alert>
        </template>

        </v-data-table>
              </v-card>
            </v-container>
          </v-card>
          <v-snackbar v-model="snackbar" top  right :color="color"
          >
          {{text}}
          <v-btn
          color="black"
          text
          @click="snackbar = false"
          >
          Close
          </v-btn>

          </v-snackbar>
        </v-col>

        </v-row>

        </v-container>
    </v-main>
   
    <v-footer
    color="primary lighten-5"
    padless
  >
    <v-row
      justify="center"
      no-gutters>
    
      <v-col
        class="pink lighten-2 py-2 text-center white--text"
        cols="12">
        {{ new Date().getFullYear() }} — Ezinne Okwuonu : 4339 Final Project 
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
  </template>

<script>
import axios from "axios";
export default {
  props:{
    source: String
  },
  data: () => ({
    mini: false,
    dialog:false,
    fab: false,
    search:'',
    snackbar: false,
    text:'',
    color:'',
    posts:[],
    headers: [
        {text: 'Name', value: 'name', sortable: true},
        {text: 'Email', value: 'email', sortable: true},
        {text: 'Themes', value: 'themes', sortable: false},
        {text: 'Extra Details', value: 'description', sortable: false},
        {text: 'Edit/Delete', value: 'actions', sortable: true, width: '180px'},
    ],
    
    postData: {
      name: '',
      email: '',
      themes: '',
      description:''
    },
    default: {
      name: '',
      email: '',
      themes: '',
      description:''
    },
    editedIndex: -1,
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  computed: {
    saveDialog() {
      return this.editedIndex === -1 ? 'Save' : 'Update'
    }
  },
  mounted() {
    this.loadPosts();
  },
  methods: {
loadPosts: async function(){
  let apiURL = 'http://localhost:4000/api';
  axios.get(apiURL).then(res => {
    this.posts = res.data;
  }).catch(error => {
    console.log(error)
  });
},

    onScroll (e) {
      if(typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop(){
      this.$vuetify.goTo(0)
    },
    close(){
      this.dialog = false
      setTimeout(()=>{
        this.postData = Object.assign({}, this.default)
        this.editedIndex = -1
      }, 300)
    },
    savePost: async function(){
        if(this.editedIndex > -1) {
         this.updatePost();
        }else {
          this.createPost();
        }
    },
    createPost(){
      let apiURL = 'http://localhost:4000/api/create-post';
        axios.post(apiURL, this.postData).then(() => {
          this.postData = {
            name: '',
            email: '',
            themes: '',
            description: '',
          }
          this.close();
          this.loadPosts();
          this.color = 'success lighten-1'
          this.text ='Saved'
          this.snackbar = true;
        }).catch(error => {
          console.log(error)
        });
    },
    editPost(item) {
      this.editedIndex = this.posts.indexOf(item)
      this.postData = Object.assign({}, item)
      this.dialog = true
    },
    updatePost(){
      let apiURL = `http://localhost:4000/api/update-post/${this.postData._id}`;
      axios.post(apiURL, this.postData).then((res) => {
        console.log(res)
        this.close();
        this.loadPosts();
        this.color ='blue'
        this.text = 'Updated!'
        this.snackbar = true;
      }).catch(error => {
        console.log(error)
        console.log(this.$route.params.id)
      })
    },
     deletePost(id){
  this.$swal({
                    title: 'Are you sure?',
                    text: "This is permanent.",
                    icon: '',
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    cancelButtonColor: '#d63031',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    }).then((result) => {
                        // Send request to the server
                         if (result.value) {
                               try {
                let apiURL = `http://localhost:4000/api/delete-post/${id}`;
                let indexOfArrayItem = this.posts.findIndex(i => i._id === id);
                axios.delete(apiURL).then(() => {
                        this.posts.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                 this.$swal(
                         'Deleted!',
                         '',
                         'success'
                        )
                        //Notification error
                this.color = 'error lighten-2'
                this.text = "Information deleted."
                this.snackbar = true;
                //Notification error
            }catch (error) {
             this.$swal("Failed!", "There was something wrong.", "warning");
            }
                         }
                    })
  
            },
  },

}
</script>