<template>
  <div class="form-produto mt-3 mx-auto col-6">
    <p class="headline">Adicionar Produto</p>

    <div>
      <v-form v-model="formValidado">
        <v-text-field
          v-model="produto.nome"
          :rules="[(v) => !!v || 'Nome é um campo obrigatório']"
          label="Nome"
          required
        />
        <v-text-field
          v-model="produto.valor"
          :rules="[(v) => !!v || 'Valor é um campo obrigatório']"
          label="Valor"
          type="number"
          required
        />

        <v-divider class="my-5" />

        <v-btn color="success" small class="mr-2" @click="atualizarProduto">
          atualizarProduto
        </v-btn>

      </v-form>
    </div>
  </div>
</template>

<script>
import ProductService from '../../services/ProductService.js';

export default{
    data() {
        return{
            produto: [],
            msgSucesso: "",
            msgErro: "",
            formValidado: false
        }
    },
    methods: {
        buscarProduto(id){
            ProductService.get(id).then(response => {
                this.produto = response.data;
            }).catch(e => console.log(e));
        },
        atualizarProduto(){
            ProductService.update(this.produto.idproduto, this.produto).then(response => {
                this.msgSucesso = response.data;
            }).catch(e => {
                this.msgErro= e;
                console.log(e);
            })
        }
    },
    mounted(){
        this.buscarProdutos(this.$routers.params.id);
    }
}
</script>
