<template>
  <v-layout flex align-center justify-center fill-height>
    <v-flex xs12 sm4 align-center justify-center>
      <v-card>
        <v-card-text class="pt-2">
          <v-form v-model="formValido">
            <v-text-field 
            label="Email" 
            v-model="email"
            :rules="regrasEmail" 
            require 
            outline
            error-count="2"
            />
            <v-text-field
            label="Senha"
            v-model="senha"
            type="password"
            :rules="regrasSenha"
            min="8"
            counter
            aria-required=""
            
            />
            <v-select
                :items="itens"
                v-model="tipo"
                :rules="regrasTipo"
                label="Tipo de usuário"
                item-text="nome"
                item-value="valor"
            />
            <v-btn :disabled="!formValido" @click="adicionarUsuario" color="primary">Criar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from "../../service/UserService"
export default {
    data(){
        return {
            email: "",
            senha: "",
            tipo: "",
            formValido: "false",
            msgSucesso: "",
            msgErro: "",
            itens: [
                {nome : "Administrador", valor: "1"},
                {nome : "Balcão", valor: "2"},
                {nome : "Cozinha", valor: "3"},
            ],
            regrasEmail: [
                v => !!v || "Email precisa ser preenchido",
                v => /.+@.+/.test(v) || "Email é inválido"
            ],
            regrasSenha: [
                v => !!v || "Senha precisa ser preenchida",
                v => (v && v.length >= 8) || "Senha precisa ter ao menos 8 caracteres"
            ],
            regrasTipo: [
                v => !!v || "Tipo de usuário precisa ser preenchido"
            ]
        };
    },
    methods: {
        adicionarUsuario: function(){
            this.msgSucesso="";
            this.msgErro="";
            let dados = {
                email: this.email,
                senha: this.senha,
                tipo: this.tipo
            }
            UserService.sigup(dados).then(response =>{
                alert(response.data);
                this.msgSucesso = response.data;
            }).catch(e=>{
                alert(e);
                this.msgErro = e;
            })
        }
    }
};
</script>