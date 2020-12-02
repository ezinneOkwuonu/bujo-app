<template>
<v-app>
 <div>
 <v-app-bar app color="pink" dark>
    <v-toolbar-title
    style="width: 500px"
    class="ml-0 pl-4">
    <v-btn icon><v-icon>book</v-icon></v-btn>
    <span class="hidden-sm-and-down"> Jourstae Custom Journals</span>
    </v-toolbar-title>
  <v-spacer />
  <div class="my-2">
    <router-link style="color: white;" to="/">Home</router-link>        
  </div>
  </v-app-bar> </div>
  <v-container style="padding-top: 2.5cm;">
  <v-card class="mx-auto" max-width="900" outlined>
  <v-list-item three-line>
    <v-list-item-content>
      <div class="overline mb-4">
        JOURSTAE CUSTOM JOURNALS
      </div>
      <v-list-item-title class="headline mb-1">
        About Us
      </v-list-item-title>
      <v-list-item-subtitle>
        <br>
        This is a student run small business that creates beautiful customized journals for users.             
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <br>
          Business Email: jourstae@gmail.com            
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <br>
        Instagram: @jourstae      
        </v-list-item-subtitle>        
        <v-list-item-subtitle>          <br>
         Phone No: 433-943-1234       
        </v-list-item-subtitle>
        <v-list-item-title class="headline mb-1">
          <br>
          FAQ
        </v-list-item-title>
        <v-list-item-subtitle>
          <br>       
       How do I place my order?      
        </v-list-item-subtitle>&nbsp;
        <v-list-item-subtitle>
          <br>
         - Click on the Home Tab, input the information required and I will get in contact with you!  
        </v-list-item-subtitle>&nbsp;
        <v-list-item-subtitle>
          <br>       
       How long will it take my journal to arrive?      
        </v-list-item-subtitle>&nbsp;
        <v-list-item-subtitle>          <br>
        -It usually takes about 2-3 weeks for me to customize your journal and ship it to you.      
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <br>
        Is everything hand drawn?           
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <br>
         -Absolutely! I hand draw these according you your order.       
        </v-list-item-subtitle>
      </v-list-item-content>
         </v-list-item>
    <v-card-actions>    
    </v-card-actions>
  </v-card>
    </v-container>
    <v-footer    color="primary lighten-5" padless  >
    <v-row justify="center" no-gutters>    
      <v-col class="pink lighten-2 py-2 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — Ezinne Okwuonu : 4339 Final Project 
      </v-col>
    </v-row>
  </v-footer>
  </v-app>
</template>
